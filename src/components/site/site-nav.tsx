"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import {
  Home,
  FileText,
  Zap,
  Mic,
  Briefcase,
} from "lucide-react";

const navItems = [
  { href: "/articles", label: "Articles", icon: FileText },
  { href: "/quick-bits", label: "Quick Bits", icon: Zap },
  { href: "/", label: "Home", icon: Home },
  { href: "/talks", label: "Talks", icon: Mic },
  { href: "/resume", label: "Resume", icon: Briefcase },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm"
      style={{ viewTransitionName: "site-nav" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-evenly px-4 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <TransitionLink
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors sm:flex-row sm:gap-1.5 sm:text-sm ${
                isActive
                  ? "text-gradient font-semibold"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </TransitionLink>
          );
        })}
      </div>
    </nav>
  );
}
