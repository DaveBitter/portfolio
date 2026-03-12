import { Badge } from "@radix-ui/themes";
import { TransitionLink } from "@/components/transition-link";
import { SiteHeader } from "@/components/site/site-header";
import { getTags, getAllContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all content by tag",
};

export default function TagsPage() {
  const tags = getTags();
  const allContent = getAllContent();

  const tagCounts = Object.keys(tags).reduce(
    (acc, key) => {
      acc[key] = allContent.filter((a) => a.tags?.includes(key)).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <SiteHeader title="Tags" lead="Browse all content by tag" />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <div className="flex flex-wrap gap-3">
          {Object.entries(tags)
            .sort(([a], [b]) => (tagCounts[b] || 0) - (tagCounts[a] || 0))
            .map(([key, label]) => (
              <TransitionLink key={key} href={`/tags/${key}`}>
                <Badge
                  variant="soft"
                  color="gray"
                  size="3"
                  className="cursor-pointer transition-colors hover:bg-[var(--site-surface-hover)]"
                >
                  {label} ({tagCounts[key] || 0})
                </Badge>
              </TransitionLink>
            ))}
        </div>
      </div>
    </>
  );
}
