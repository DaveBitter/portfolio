import { Section, Container } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { JsonLd } from "@/components/json-ld";
import { getArticles, getCopy } from "@/lib/content";
import { buildCollectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "A collection of my articles covering a wide range of topics",
};

export default function ArticlesPage() {
  const description = "A collection of my articles covering a wide range of topics";
  const articles = getArticles();
  const copy = getCopy();
  const jsonLd = buildCollectionPageJsonLd({
    path: "/articles",
    title: "Articles",
    description,
    items: articles.map((article) => ({
      name: article.title,
      path: `/articles/${article.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader title="Articles" lead={copy.articlesLead} interactive />
      <Section size="3">
        <Container size="4" px="4">
          <ArticleTeasers articles={articles} />
        </Container>
      </Section>
    </>
  );
}
