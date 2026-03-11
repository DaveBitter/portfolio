import { Section, Container } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { getQuickBits, getCopy } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Bits",
  description: "A collection of my Quick Bits covering a wide range of topics",
};

export default function QuickBitsPage() {
  const quickBits = getQuickBits();
  const copy = getCopy();

  return (
    <>
      <SiteHeader title="Quick Bits" lead={copy.quickBitsLead} />
      <Section size="3">
        <Container size="4" px="4">
          <ArticleTeasers articles={quickBits} />
        </Container>
      </Section>
    </>
  );
}
