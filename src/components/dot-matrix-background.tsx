"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 16;
const DOT_BASE_RADIUS = 1;
const INFLUENCE_RADIUS = 510;
const GLOW_FALLOFF_POWER = 2.2;
const GROUP_COUNT = 4;
const MOUSE_LERP = 0.1;
const GLOW_LERP = 0.08;
const FRAME_INTERVAL = 1000 / 30;
const AMBIENT_SPEED = 0.00026;

const PRIMARY_RGB: [number, number, number] = [255, 84, 32];
const SECONDARY_RGB: [number, number, number] = [255, 19, 67];

const FALLBACK_BASE_DARK: [number, number, number] = [141, 146, 151];
const FALLBACK_BASE_LIGHT: [number, number, number] = [120, 119, 116];

interface Dot {
  x: number;
  y: number;
  group: number;
  sizeJitter: number;
}

function hash(seed: number) {
  const s = Math.sin(seed * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 3 && clean.length !== 6) return null;

  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const parsed = Number.parseInt(full, 16);
  if (Number.isNaN(parsed)) return null;

  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

function lerpColor(
  from: [number, number, number],
  to: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
}

function buildGrid(
  width: number,
  height: number,
): { dots: Dot[]; cols: number; rows: number } {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / CELL_SIZE) + 1;
  const rows = Math.ceil(height / CELL_SIZE) + 1;

  let index = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const groupSeed = hash(index * 1.37 + row * 0.91 + col * 3.14);
      const sizeSeed = hash(index * 5.21 + col * 2.03 + 4.2);

      dots.push({
        x: col * CELL_SIZE + CELL_SIZE / 2,
        y: row * CELL_SIZE + CELL_SIZE / 2,
        group: Math.floor(groupSeed * GROUP_COUNT) % GROUP_COUNT,
        sizeJitter: 0.65 + sizeSeed * 0.7,
      });
      index++;
    }
  }

  // Dots are stored row-major (row * cols + col), which lets the render loop
  // address a cursor-centered bounding box directly by index instead of
  // scanning every dot on screen.
  return { dots, cols, rows };
}

/**
 * Full-screen ambient dot-grid background, inspired by originkit.dev's Dot
 * Matrix component. Dots gently breathe in staggered groups and softly
 * brighten near the cursor. Pure canvas + rAF, no dependencies.
 */
export function DotMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dots: Dot[] = [];
    let gridCols = 0;
    let gridRows = 0;
    let nearFlags = new Uint8Array(0);
    let rafId: number | null = null;
    let lastFrameTime = 0;
    let reducedMotion = reducedMotionQuery.matches;
    let coarsePointer = coarsePointerQuery.matches;
    let isLight = document.documentElement.classList.contains("light");
    let baseColor: [number, number, number] = isLight
      ? FALLBACK_BASE_LIGHT
      : FALLBACK_BASE_DARK;

    const mouseTarget = { x: width / 2, y: height / 2 };
    const mouseCurrent = { x: width / 2, y: height / 2 };
    const glowStrength = { current: 0, target: 0 };
    const groupPhaseOffsets = Array.from({ length: GROUP_COUNT }, (_, g) =>
      hash(g * 7.13 + 2.7) * Math.PI * 2,
    );

    const updateColors = () => {
      isLight = document.documentElement.classList.contains("light");
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-muted")
        .trim();
      baseColor =
        hexToRgb(raw) ?? (isLight ? FALLBACK_BASE_LIGHT : FALLBACK_BASE_DARK);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const grid = buildGrid(width, height);
      dots = grid.dots;
      gridCols = grid.cols;
      gridRows = grid.rows;
      nearFlags = new Uint8Array(dots.length);

      if (reducedMotion) {
        renderFrame(0, false);
      }
    };

    const renderFrame = (time: number, animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      const alphaMin = isLight ? 0.11 : 0.12;
      const alphaRange = isLight ? 0.22 : 0.24;

      const groupAmbient = groupPhaseOffsets.map((phase, g) =>
        animate
          ? (Math.sin(time * AMBIENT_SPEED + phase) + 1) / 2
          : 0.45 + g * 0.05,
      );

      const pointerActive = animate && glowStrength.current > 0.01;

      // Restrict the cursor-proximity scan to a grid-aligned bounding box
      // around the pointer instead of walking every dot on screen. This
      // keeps cost proportional to the glow's *area* (~radius^2) rather than
      // total dot count, which matters since INFLUENCE_RADIUS covers a much
      // larger region than a single screen-scan pass needs.
      let boxColMin = 0;
      let boxColMax = -1;
      let boxRowMin = 0;
      let boxRowMax = -1;

      if (pointerActive) {
        nearFlags.fill(0);

        boxColMin = Math.max(
          0,
          Math.floor((mouseCurrent.x - INFLUENCE_RADIUS) / CELL_SIZE),
        );
        boxColMax = Math.min(
          gridCols - 1,
          Math.ceil((mouseCurrent.x + INFLUENCE_RADIUS) / CELL_SIZE),
        );
        boxRowMin = Math.max(
          0,
          Math.floor((mouseCurrent.y - INFLUENCE_RADIUS) / CELL_SIZE),
        );
        boxRowMax = Math.min(
          gridRows - 1,
          Math.ceil((mouseCurrent.y + INFLUENCE_RADIUS) / CELL_SIZE),
        );

        for (let row = boxRowMin; row <= boxRowMax; row++) {
          const rowOffset = row * gridCols;
          for (let col = boxColMin; col <= boxColMax; col++) {
            const index = rowOffset + col;
            const dot = dots[index];
            const dx = dot.x - mouseCurrent.x;
            const dy = dot.y - mouseCurrent.y;
            if (dx * dx + dy * dy < INFLUENCE_RADIUS * INFLUENCE_RADIUS) {
              nearFlags[index] = 1;
            }
          }
        }
      }

      for (let g = 0; g < GROUP_COUNT; g++) {
        const ambient = groupAmbient[g];
        const alpha = alphaMin + ambient * alphaRange;
        const path = new Path2D();
        let hasAny = false;

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          if (dot.group !== g || (pointerActive && nearFlags[i])) continue;

          const radius =
            DOT_BASE_RADIUS * dot.sizeJitter * (0.82 + ambient * 0.36);
          path.moveTo(dot.x + radius, dot.y);
          path.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          hasAny = true;
        }

        if (hasAny) {
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha})`;
          ctx.fill(path);
        }
      }

      if (pointerActive) {
        const strength = glowStrength.current;

        for (let row = boxRowMin; row <= boxRowMax; row++) {
          const rowOffset = row * gridCols;
          for (let col = boxColMin; col <= boxColMax; col++) {
            const index = rowOffset + col;
            if (!nearFlags[index]) continue;

            const dot = dots[index];
            const dx = dot.x - mouseCurrent.x;
            const dy = dot.y - mouseCurrent.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // Linear ramp to zero at the influence radius (no hard cutoff),
            // then shaped by GLOW_FALLOFF_POWER: >1 keeps the hot core tight
            // near the cursor and lets the mid/outer band read as a soft,
            // gradual gradient instead of a washed-out disc at this radius.
            const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
            const eased = proximity ** GLOW_FALLOFF_POWER * strength;

            const ambient = groupAmbient[dot.group];
            const baseAlpha = alphaMin + ambient * alphaRange;
            // Capped well below full opacity: at this radius the glow
            // frequently sits behind body copy, so the brightest dots must
            // stay soft enough not to compete with foreground text contrast.
            const alpha = Math.min(0.58, baseAlpha + eased * 0.5);
            const radius =
              DOT_BASE_RADIUS *
              dot.sizeJitter *
              (0.82 + ambient * 0.36) *
              (1 + eased * 1.3);

            const color =
              eased > 0.7
                ? lerpColor(PRIMARY_RGB, SECONDARY_RGB, (eased - 0.7) / 0.3)
                : lerpColor(baseColor, PRIMARY_RGB, eased / 0.7);
            const [r, g, b] = color.map((c) => Math.round(c));

            ctx.beginPath();
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            // Only pay for the (relatively expensive) shadow blur on dots
            // bright enough for it to be visible, since the larger radius
            // means many more dots pass through this path per frame.
            if (eased > 0.12) {
              ctx.shadowBlur = 6 * eased;
              ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.shadowBlur = 0;
      }
    };

    const frame = (time: number) => {
      rafId = window.requestAnimationFrame(frame);

      if (time - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = time;

      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * MOUSE_LERP;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * MOUSE_LERP;
      glowStrength.current +=
        (glowStrength.target - glowStrength.current) * GLOW_LERP;

      renderFrame(time, true);
    };

    const startAnimation = () => {
      if (rafId === null) {
        lastFrameTime = 0;
        rafId = window.requestAnimationFrame(frame);
      }
    };

    const stopAnimation = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || coarsePointer || event.pointerType !== "mouse") {
        return;
      }

      mouseTarget.x = event.clientX;
      mouseTarget.y = event.clientY;
      glowStrength.target = 1;
    };

    const handlePointerLeave = () => {
      glowStrength.target = 0;
    };

    const handleMotionPreference = () => {
      reducedMotion = reducedMotionQuery.matches;
      coarsePointer = coarsePointerQuery.matches;

      if (reducedMotion || coarsePointer) {
        glowStrength.target = 0;
      }

      if (reducedMotion) {
        stopAnimation();
        renderFrame(0, false);
      } else if (document.visibilityState === "visible") {
        startAnimation();
      }
    };

    const handleVisibilityChange = () => {
      if (reducedMotion) return;

      if (document.visibilityState === "visible") {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    const themeObserver = new MutationObserver(() => {
      updateColors();
      if (reducedMotion) {
        renderFrame(0, false);
      }
    });

    updateColors();
    resize();
    handleMotionPreference();

    if (!reducedMotion) {
      startAnimation();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
    coarsePointerQuery.addEventListener("change", handleMotionPreference);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      coarsePointerQuery.removeEventListener("change", handleMotionPreference);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
