"use client";
import { useEffect, useState, useRef } from "react";

export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const prevY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setDirection(prevY.current < window.scrollY ? "down" : "up");
      prevY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}
