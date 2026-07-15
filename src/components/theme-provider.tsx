"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Theme } from "@radix-ui/themes";

function subscribe(): () => void {
  return () => {};
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  // Radix's <Theme> mirrors `appearance` into its own internal state on mount
  // and only re-syncs via an effect on a later render. Since next-themes can
  // resolve the real theme within that same first render, force one guaranteed
  // extra render after mount (same hydration-safe trick as ThemeToggle) so
  // Radix's internal state has a chance to catch up to the resolved theme.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const appearance = mounted
    ? ((resolvedTheme as "light" | "dark") ?? "dark")
    : "dark";

  return (
    <Theme
      appearance={appearance}
      accentColor="tomato"
      grayColor="sand"
      radius="medium"
      scaling="100%"
      hasBackground={false}
    >
      {children}
    </Theme>
  );
}
