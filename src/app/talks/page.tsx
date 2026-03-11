import { Section, Container } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { getTalks, getCopy } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talks",
  description: "A collection of my talks covering a wide range of topics",
};

export default function TalksPage() {
  const talks = getTalks();
  const copy = getCopy();

  return (
    <>
      <SiteHeader title="Talks" lead={copy.talksLead} />
      <Section size="3">
        <Container size="4" px="4">
          <ArticleTeasers articles={talks} />
        </Container>
      </Section>
    </>
  );
}
