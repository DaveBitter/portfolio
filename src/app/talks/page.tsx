import { Section, Container } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { JsonLd } from "@/components/json-ld";
import { getTalks, getCopy } from "@/lib/content";
import { buildCollectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talks",
  description: "A collection of my talks covering a wide range of topics",
};

export default function TalksPage() {
  const description = "A collection of my talks covering a wide range of topics";
  const talks = getTalks();
  const copy = getCopy();
  const jsonLd = buildCollectionPageJsonLd({
    path: "/talks",
    title: "Talks",
    description,
    items: talks.map((talk) => ({
      name: talk.title,
      path: `/talks/${talk.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader title="Talks" lead={copy.talksLead} interactive />
      <Section size="3">
        <Container size="4" px="4">
          <ArticleTeasers articles={talks} />
        </Container>
      </Section>
    </>
  );
}
