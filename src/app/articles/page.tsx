import { Section, Container } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { getArticles, getCopy } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "A collection of my articles covering a wide range of topics",
};

export default function ArticlesPage() {
  const articles = getArticles();
  const copy = getCopy();

  return (
    <>
      <SiteHeader title="Articles" lead={copy.articlesLead} interactive />
      <Section size="3">
        <Container size="4" px="4">
          <ArticleTeasers articles={articles} />
        </Container>
      </Section>
    </>
  );
}
