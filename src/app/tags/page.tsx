import { Badge } from "@radix-ui/themes";
import { TransitionLink } from "@/components/transition-link";
import { SiteHeader } from "@/components/site/site-header";
import { JsonLd } from "@/components/json-ld";
import { getTags, getAllContent } from "@/lib/content";
import { buildCollectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all content by tag",
};

export default function TagsPage() {
  const description = "Browse all content by tag";
  const tags = getTags();
  const allContent = getAllContent();

  const tagCounts = Object.keys(tags).reduce(
    (acc, key) => {
      acc[key] = allContent.filter((a) => a.tags?.includes(key)).length;
      return acc;
    },
    {} as Record<string, number>
  );
  const tagEntries = Object.entries(tags).sort(
    ([a], [b]) => (tagCounts[b] || 0) - (tagCounts[a] || 0)
  );
  const jsonLd = buildCollectionPageJsonLd({
    path: "/tags",
    title: "Tags",
    description,
    items: tagEntries.map(([key, label]) => ({
      name: label,
      path: `/tags/${key}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader title="Tags" lead="Browse all content by tag" interactive />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <div className="flex flex-wrap gap-3">
          {tagEntries.map(([key, label]) => (
            <TransitionLink key={key} href={`/tags/${key}`}>
              <Badge
                variant="soft"
                color="gray"
                size="3"
                className="cursor-pointer transition-colors hover:bg-(--site-surface-hover)"
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
