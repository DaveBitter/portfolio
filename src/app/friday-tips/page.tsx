import { Section, Container, Text } from "@radix-ui/themes";
import { SiteHeader } from "@/components/site/site-header";
import { ArticleTeasers } from "@/components/article/article-teaser";
import { getFridayTips, getCopy } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friday Tips",
  description:
    "A collection of my Friday Tips covering a wide range of topics",
};

export default async function FridayTipsPage() {
  const fridayTips = await getFridayTips();
  const copy = getCopy();

  return (
    <>
      <SiteHeader title="Friday Tips" lead={copy.fridayTipsLead} />
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
