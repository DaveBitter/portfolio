import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { getArticles } from "@/lib/content";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticles().find((a) => a.slug === slug);
  if (!article) return {};

  const image = `/articles/${slug}/opengraph-image`;

  return {
    title: article.title,
    description: article.teaserCopy,
    openGraph: {
      title: article.title,
      description: article.teaserCopy,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Dave_Bitter",
      title: article.title,
      description: article.teaserCopy,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedArticles = articles
    .filter(
      (a) =>
        a.slug !== slug &&
        a.tags?.some((tag) => article.tags?.includes(tag))
    )
    .slice(0, 4);

  return <Article article={article} relatedArticles={relatedArticles} />;
}
