import { Section, Container } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { JsonLd } from "@/components/json-ld";
import { getQuickBits, getCopy } from "@/lib/content";
import { buildCollectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Bits",
  description: "A collection of my Quick Bits covering a wide range of topics",
};

export default function QuickBitsPage() {
  const description =
    "A collection of my Quick Bits covering a wide range of topics";
  const quickBits = getQuickBits();
  const copy = getCopy();
  const jsonLd = buildCollectionPageJsonLd({
    path: "/quick-bits",
    title: "Quick Bits",
    description,
    items: quickBits.map((item) => ({
      name: item.title,
      path: `/quick-bits/${item.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader title="Quick Bits" lead={copy.quickBitsLead} interactive />
      <Section size="3">
        <Container size="4" px="4">
          <ArticleTeasers articles={quickBits} />
        </Container>
      </Section>
    </>
  );
}
