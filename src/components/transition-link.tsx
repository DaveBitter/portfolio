"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigateWithTransition } from "@/lib/view-transitions";
import type { ComponentProps, MouseEvent } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    const url = typeof href === "string" ? href : href.pathname ?? "/";
    navigateWithTransition(() => router.push(url));
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
