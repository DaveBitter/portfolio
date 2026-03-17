import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { JsonLd } from "@/components/json-ld";
import { getArticles } from "@/lib/content";
import type { Metadata } from "next";
import { buildArticleMetadata } from "@/lib/page-metadata";
import { buildArticlePageJsonLd } from "@/lib/structured-data";

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

  const image = `/articles/${slug}/opengraph-image.png`;

  return buildArticleMetadata(article, image, "Articles");
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
  const jsonLd = buildArticlePageJsonLd({
    article,
    path: `/articles/${slug}`,
    breadcrumbParent: { name: "Articles", path: "/articles" },
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Article article={article} relatedArticles={relatedArticles} />
    </>
  );
}
