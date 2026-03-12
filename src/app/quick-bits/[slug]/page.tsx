import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { getQuickBits } from "@/lib/content";
import type { Metadata } from "next";
import { buildArticleMetadata } from "@/lib/page-metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getQuickBits().map((qb) => ({ slug: qb.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getQuickBits().find((a) => a.slug === slug);
  if (!article) return {};

  const image = `/quick-bits/${slug}/opengraph-image.png`;

  return buildArticleMetadata(article, image, "Quick Bits");
}

export default async function QuickBitPage({ params }: PageProps) {
  const { slug } = await params;
  const quickBits = getQuickBits();
  const article = quickBits.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedArticles = quickBits
    .filter(
      (a) =>
        a.slug !== slug &&
        a.tags?.some((tag) => article.tags?.includes(tag))
    )
    .slice(0, 4);

  return <Article article={article} relatedArticles={relatedArticles} />;
}
