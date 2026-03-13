import {
  Section,
  Container,
  Flex,
  Heading,
  Text,
  Box,
} from "@radix-ui/themes";
import Image from "next/image";
import { ResumePitch } from "@/components/resume/resume-pitch";
import { ContentSection } from "@/components/content-section";
import { ArticleMasonryGrid } from "@/components/article/article-teaser";
import { Socials } from "@/components/socials";
import { HomeHeroBackground } from "@/components/home/home-hero-background";
import { getAllContentWithFridayTips, getCopy } from "@/lib/content";

export default async function HomePage() {
  const copy = getCopy();
  const latest = (await getAllContentWithFridayTips()).slice(0, 10);

  return (
    <>
      <Section size="3" pb="0" className="home-hero-section">
        <Container size="4" px="4">
          <HomeHeroBackground>
            <Flex
              direction="column"
              align="center"
              gap="4"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-full ring-1 ring-white/10">
                <Image
                  src="/img/dave.webp"
                  alt="Dave Bitter"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <Flex direction="column" align="center" gap="2">
                <Heading size="8" className="text-gradient" align="center">
                  Hi, I&apos;m Dave
                </Heading>
                <Text size="3" color="gray" align="center" className="max-w-2xl">
                  Senior Front-end Consultant · Developer Advocate · AI
                  Enthusiast · Engineering Manager
                </Text>
                <Box mt="2">
                  <Socials />
                </Box>
              </Flex>
            </Flex>
          </HomeHeroBackground>
        </Container>
      </Section>

      <ContentSection title="About me">
        <ResumePitch pitch={copy.elevatorPitch} />
      </ContentSection>

      <ContentSection title="Fresh off the press">
        <ArticleMasonryGrid articles={latest} />
      </ContentSection>
    </>
  );
}
