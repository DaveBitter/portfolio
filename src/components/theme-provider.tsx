"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Theme } from "@radix-ui/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <Theme
      appearance={(resolvedTheme as "light" | "dark") ?? "dark"}
      accentColor="tomato"
      grayColor="sand"
      radius="medium"
      scaling="100%"
    >
      {children}
    </Theme>
  );
}
