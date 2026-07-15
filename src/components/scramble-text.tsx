"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

interface ScrambleTextProps {
  text: string;
  trigger?: "mount" | "in-view";
  className?: string;
}

export function ScrambleText({
  text,
  trigger = "in-view",
  className,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const elRef = useRef<HTMLSpanElement>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    const runScramble = () => {
      if (hasRunRef.current || reducedMotion) return;
      hasRunRef.current = true;

      const duration = 550;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const revealCount = Math.floor(progress * text.length);

        const next = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealCount) return char;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("");

        setDisplay(next);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    if (trigger === "mount") {
      runScramble();
      return () => cancelAnimationFrame(frame);
    }

    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, trigger]);

  return (
    <span ref={elRef} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
