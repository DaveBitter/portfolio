import { Section, Container, Text } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { JsonLd } from "@/components/json-ld";
import { getFridayTips, getCopy } from "@/lib/content";
import { buildCollectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friday Tips",
  description:
    "A collection of my Friday Tips covering a wide range of topics",
};

export default async function FridayTipsPage() {
  const description =
    "A collection of my Friday Tips covering a wide range of topics";
  const fridayTips = await getFridayTips();
  const copy = getCopy();
  const jsonLd = buildCollectionPageJsonLd({
    path: "/friday-tips",
    title: "Friday Tips",
    description,
    items: fridayTips.map((tip) => ({
      name: tip.title,
      path: `/friday-tips/${tip.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader title="Friday Tips" lead={copy.fridayTipsLead} interactive />
      <Section size="3">
        <Container size="4" px="4">
          {fridayTips.length > 0 ? (
            <ArticleTeasers articles={fridayTips} />
          ) : (
            <Text color="gray">
              Friday Tips content will be available once connected to YouTube.
              Check back soon!
            </Text>
          )}
        </Container>
      </Section>
    </>
  );
}
