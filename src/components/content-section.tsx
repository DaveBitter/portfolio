import {
  Section,
  Container,
  Flex,
  Heading,
  Button,
} from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { TransitionLink } from "@/components/transition-link";

interface ContentSectionProps {
  title: string;
  href?: string;
  linkLabel?: string;
  animationId?: string;
  children: React.ReactNode;
}

export function ContentSection({
  title,
  href,
  linkLabel,
  animationId,
  children,
}: ContentSectionProps) {
  return (
    <Section
      size="2"
      className={animationId ? "home-scroll-section" : undefined}
      data-home-section={animationId}
    >
      <Container size="4" px="4">
        <Flex
          justify="between"
          align="baseline"
          mb="5"
          data-home-section-heading={animationId ? "" : undefined}
        >
          <Heading size="5" weight="bold">
            {title}
          </Heading>
          {href && linkLabel && (
            <TransitionLink href={href}>
              <Button
                variant="ghost"
                color="tomato"
                size="2"
                className="cursor-pointer"
              >
                {linkLabel}
                <ArrowRightIcon width={14} height={14} />
              </Button>
            </TransitionLink>
          )}
        </Flex>
        <div data-home-section-content={animationId ? "" : undefined}>
          {children}
        </div>
      </Container>
    </Section>
  );
}
