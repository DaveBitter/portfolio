import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { getTags, getAllContent } from "@/lib/content";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tags = getTags();
  const label = tags[tag];
  if (!label) return {};

  return {
    title: label,
    description: `A collection of articles covering ${label}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const tags = getTags();
  const label = tags[tag];

  if (!label) notFound();

  const content = getAllContent().filter((a) => a.tags?.includes(tag));

  return (
    <>
      <SiteHeader
        title={label}
        lead={`A collection of articles covering ${label}`}
      />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <ArticleTeasers articles={content} />
      </div>
    </>
  );
}
