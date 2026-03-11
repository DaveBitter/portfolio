import { Socials } from "@/components/socials";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-12"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          You&apos;ve scrolled all the way down. Respect.
        </p>
        <p className="mb-6 text-[var(--color-text-muted)]">
          Always happy to chat.
        </p>
        <Socials />
      </div>
    </footer>
  );
}
