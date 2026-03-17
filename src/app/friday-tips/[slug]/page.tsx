import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { JsonLd } from "@/components/json-ld";
import { getFridayTips } from "@/lib/content";
import type { Metadata } from "next";
import { buildArticleMetadata } from "@/lib/page-metadata";
import { buildVideoPageJsonLd } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tips = await getFridayTips();
  return tips.map((tip) => ({ slug: tip.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = (await getFridayTips()).find((t) => t.slug === slug);
  if (!tip) return {};

  const image = `/friday-tips/${slug}/opengraph-image.png`;

  return buildArticleMetadata(tip, image, "Friday Tips");
}

export default async function FridayTipPage({ params }: PageProps) {
  const { slug } = await params;
  const fridayTips = await getFridayTips();
  const tip = fridayTips.find((t) => t.slug === slug);

  if (!tip) notFound();

  const relatedTips = fridayTips
    .filter((t) => t.slug !== slug)
    .slice(0, 4);
  const jsonLd = buildVideoPageJsonLd({
    article: tip,
    path: `/friday-tips/${slug}`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Article article={tip} relatedArticles={relatedTips} />
    </>
  );
}
