"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

const MAX_TILT_DEG = 6;

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--glow-x", `${px * 100}%`);
    el.style.setProperty("--glow-y", `${py * 100}%`);
    el.style.setProperty("--glow-opacity", "1");
    el.style.setProperty("--tilt-x", `${(0.5 - py) * MAX_TILT_DEG}deg`);
    el.style.setProperty("--tilt-y", `${(px - 0.5) * MAX_TILT_DEG}deg`);
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--glow-opacity", "0");
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
