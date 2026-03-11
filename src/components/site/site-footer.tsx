import { Socials } from "@/components/socials";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-12"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Hey explorer! You&apos;ve reached the end!
        </p>
        <p className="mb-6 text-[var(--color-text-muted)]">
          Let&apos;s get in touch
        </p>
        <Socials />
      </div>
    </footer>
  );
}
