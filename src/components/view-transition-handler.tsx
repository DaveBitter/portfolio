"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { onNavigationComplete } from "@/lib/view-transitions";

export function ViewTransitionHandler() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current !== pathname) {
      onNavigationComplete();
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return null;
}
