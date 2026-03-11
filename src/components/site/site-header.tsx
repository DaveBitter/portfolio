import Image from "next/image";
import { Container, Section, Flex, Heading, Text } from "@radix-ui/themes";
import { Socials } from "@/components/socials";

interface SiteHeaderProps {
  title: string;
  lead?: string;
  showSocials?: boolean;
  image?: string;
}

export function SiteHeader({
  title,
  lead,
  showSocials = false,
  image,
}: SiteHeaderProps) {
  return (
    <Section size="3" pb="0">
      <Container size="4" px="4">
        <Flex
          direction={{ initial: "column", md: "row" }}
          align={{ initial: "start", md: "center" }}
          justify="between"
          gap="6"
        >
          <Flex direction="column" gap="3" flexGrow="1">
            <Heading
              size={{ initial: "8", md: "9" }}
              className="text-gradient"
            >
              {title}
            </Heading>
            {lead && (
              <Text
                size={{ initial: "3", md: "4" }}
                color="gray"
                as="p"
                style={{ maxWidth: "40em" }}
              >
                {lead}
              </Text>
            )}
            {showSocials && <Socials />}
          </Flex>
          {image && (
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl md:h-64 md:w-64">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
}
