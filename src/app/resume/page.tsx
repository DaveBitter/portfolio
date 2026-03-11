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
import { ResumeProfileChart } from "@/components/resume/resume-profile-chart";
import { ResumeWorkExperience } from "@/components/resume/resume-work-experience";
import { ResumeEducation } from "@/components/resume/resume-education";
import { Socials } from "@/components/socials";
import { getCopy, getWorkExperience, getEducation } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Senior Front-end Consultant, Developer Advocate, Google Developer Expert for Web, and Engineering Manager",
};

export default function ResumePage() {
  const copy = getCopy();
  const workExperience = getWorkExperience();
  const education = getEducation();

  return (
    <>
      <Section size="3" pb="0">
        <Container size="4" px="4">
          <Flex direction="column" align="center" gap="4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
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
                Dave Bitter
              </Heading>
              <Text size="3" color="gray" align="center">
                Senior Front-end Consultant · Developer Advocate · Engineering
                Manager
              </Text>
              <Box mt="2">
                <Socials />
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Section>

      <Section size="3">
        <Container size="4" px="4">
          <Flex
            direction={{ initial: "column", md: "row" }}
            gap="8"
            align="start"
          >
            <Box flexGrow="1" flexShrink="1" style={{ minWidth: 0 }}>
              <Heading size="5" mb="4" className="text-gradient">
                About me
              </Heading>
              <ResumePitch pitch={copy.elevatorPitch} showLink={false} />
            </Box>
            <Box
              flexShrink="0"
              width={{ initial: "100%", md: "320px" }}
            >
              <Heading size="5" mb="4" className="text-gradient">
                Skill Proficiency
              </Heading>
              <ResumeProfileChart />
            </Box>
          </Flex>
        </Container>
      </Section>

      <Section size="3">
        <Container size="4" px="4">
          <ResumeWorkExperience items={workExperience} />
          <ResumeEducation items={education} />
        </Container>
      </Section>
    </>
  );
}
