"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export function SiteBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-5xl px-4 py-3"
      style={{ viewTransitionName: "breadcrumbs" }}
    >
      <ol className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
        <li>
          <TransitionLink
            href="/"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            Home
          </TransitionLink>
        </li>
        {crumbs.map(({ href, label, isLast }) => (
          <li key={href} className="flex items-center gap-1">
            <ChevronRightIcon width={14} height={14} />
            {isLast ? (
              <span className="text-[var(--color-text)]">{label}</span>
            ) : (
              <TransitionLink
                href={href}
                className="transition-colors hover:text-[var(--color-text)]"
              >
                {label}
              </TransitionLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
