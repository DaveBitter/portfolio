"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import {
  HomeIcon,
  FileTextIcon,
  LightningBoltIcon,
  ChatBubbleIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/articles", label: "Articles", icon: FileTextIcon },
  { href: "/quick-bits", label: "Quick Bits", icon: LightningBoltIcon },
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/talks", label: "Talks", icon: ChatBubbleIcon },
  { href: "/resume", label: "Resume", icon: BackpackIcon },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 backdrop-blur-md"
      style={{ viewTransitionName: "site-nav" }}
    >
      <div className="mx-auto flex max-w-5xl items-center px-4 py-2">
        <div className="flex flex-1 items-center justify-evenly">
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
              <Icon width={18} height={18} />
              <span>{label}</span>
            </TransitionLink>
          );
        })}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
