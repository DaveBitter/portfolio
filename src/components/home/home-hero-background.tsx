"use client";

import { useEffect, useRef } from "react";

const polygonLayers = [
  {
    className: "home-hero-polygon home-hero-polygon-primary",
    points: "82,56 184,24 292,84 244,198 120,190",
  },
  {
    className: "home-hero-polygon home-hero-polygon-secondary",
    points: "304,104 432,58 544,146 482,270 352,246",
  },
  {
    className: "home-hero-polygon home-hero-polygon-tertiary",
    points: "176,232 298,188 396,274 338,392 210,372",
  },
  {
    className: "home-hero-polygon home-hero-polygon-outline",
    points: "430,240 558,190 676,266 628,404 476,398",
  },
];

const nodePositions = [
  { x: 82, y: 56 },
  { x: 184, y: 24 },
  { x: 292, y: 84 },
  { x: 304, y: 104 },
  { x: 432, y: 58 },
  { x: 544, y: 146 },
  { x: 176, y: 232 },
  { x: 298, y: 188 },
  { x: 396, y: 274 },
  { x: 430, y: 240 },
  { x: 558, y: 190 },
  { x: 676, y: 266 },
  { x: 628, y: 404 },
  { x: 476, y: 398 },
  { x: 338, y: 392 },
  { x: 210, y: 372 },
];

const connectionPaths = [
  "82,56 184,24 292,84 304,104 432,58 544,146",
  "176,232 298,188 396,274 430,240 558,190 676,266",
  "292,84 244,198 176,232",
  "396,274 338,392 210,372",
  "544,146 482,270 430,240",
  "244,198 352,246 482,270",
];

export function HomeHeroBackground({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const gyroEnabledRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const updatePosition = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      container.style.setProperty("--hero-parallax-x", `${current.x}px`);
      container.style.setProperty("--hero-parallax-y", `${current.y}px`);

      const isSettled =
        Math.abs(target.x - current.x) < 0.02 &&
        Math.abs(target.y - current.y) < 0.02;

      if (!isSettled) {
        rafRef.current = window.requestAnimationFrame(updatePosition);
        return;
      }

      current.x = target.x;
      current.y = target.y;
      rafRef.current = null;
    };

    const startAnimation = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updatePosition);
      }
    };

    const setTarget = (x: number, y: number) => {
      targetRef.current = { x, y };
      startAnimation();
    };

    const handleMotionPreference = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;
      coarsePointerRef.current = coarsePointerQuery.matches;

      if (reducedMotionRef.current || coarsePointerRef.current) {
        setTarget(0, 0);
      }

      if (!coarsePointerRef.current && gyroEnabledRef.current) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
        gyroEnabledRef.current = false;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotionRef.current || coarsePointerRef.current) {
        return;
      }

      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      setTarget(normalizedX * 88, normalizedY * 64);
    };

    const handlePointerLeave = () => {
      setTarget(0, 0);
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (reducedMotionRef.current || !coarsePointerRef.current) {
        return;
      }

      const gamma = event.gamma ?? 0;
      const beta = event.beta ?? 0;

      const normalizedX = Math.max(-1, Math.min(1, gamma / 18));
      const normalizedY = Math.max(-1, Math.min(1, (beta - 45) / 20));

      setTarget(normalizedX * 72, normalizedY * 52);
    };

    const enableGyroIfAvailable = async () => {
      if (
        reducedMotionRef.current ||
        !coarsePointerRef.current ||
        typeof window === "undefined" ||
        typeof DeviceOrientationEvent === "undefined"
      ) {
        return;
      }

      try {
        if (gyroEnabledRef.current) {
          return;
        }

        if (
          typeof (
            DeviceOrientationEvent as typeof DeviceOrientationEvent & {
              requestPermission?: () => Promise<"granted" | "denied">;
            }
          ).requestPermission === "function"
        ) {
          const permission = await (
            DeviceOrientationEvent as typeof DeviceOrientationEvent & {
              requestPermission: () => Promise<"granted" | "denied">;
            }
          ).requestPermission();

          if (permission !== "granted") {
            setTarget(0, 0);
            return;
          }
        }

        window.addEventListener("deviceorientation", handleDeviceOrientation);
        gyroEnabledRef.current = true;
      } catch {
        setTarget(0, 0);
      }
    };

    container.style.setProperty("--hero-parallax-x", "0px");
    container.style.setProperty("--hero-parallax-y", "0px");
    handleMotionPreference();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("touchstart", enableGyroIfAvailable, { once: true });
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
    coarsePointerQuery.addEventListener("change", handleMotionPreference);

    if (typeof DeviceOrientationEvent !== "undefined") {
      void enableGyroIfAvailable();
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchstart", enableGyroIfAvailable);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      gyroEnabledRef.current = false;
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      coarsePointerQuery.removeEventListener("change", handleMotionPreference);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`home-hero relative isolate overflow-hidden rounded-4xl px-6 py-14 sm:px-10 sm:py-20 ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className="home-hero-background pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="home-hero-grid absolute inset-0" />
        <div className="home-hero-glow home-hero-glow-primary absolute" />
        <div className="home-hero-glow home-hero-glow-secondary absolute" />

        <svg
          viewBox="0 0 760 440"
          className="home-hero-visual absolute left-1/2 top-1/2 h-[135%] w-[135%] max-w-none -translate-x-1/2 -translate-y-1/2"
        >
          <g className="home-hero-connections">
            {connectionPaths.map((points) => (
              <polyline
                key={points}
                points={points}
                className="home-hero-line"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          <g className="home-hero-polygons">
            {polygonLayers.map(({ className, points }) => (
              <polygon
                key={points}
                points={points}
                className={className}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          <g className="home-hero-nodes">
            {nodePositions.map(({ x, y }) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="3"
                className="home-hero-node"
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
