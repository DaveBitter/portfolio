import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { getFridayTips } from "@/lib/content";
import type { Metadata } from "next";

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

  return {
    title: tip.title,
    description: tip.teaserCopy,
  };
}

export default async function FridayTipPage({ params }: PageProps) {
  const { slug } = await params;
  const fridayTips = await getFridayTips();
  const tip = fridayTips.find((t) => t.slug === slug);

  if (!tip) notFound();

  const relatedTips = fridayTips
    .filter((t) => t.slug !== slug)
    .slice(0, 4);

  return <Article article={tip} relatedArticles={relatedTips} />;
}
