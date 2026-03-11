import {
  Section,
  Container,
  Flex,
  Heading,
  Button,
} from "@radix-ui/themes";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/transition-link";

interface ContentSectionProps {
  title: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
}

export function ContentSection({
  title,
  href,
  linkLabel,
  children,
}: ContentSectionProps) {
  return (
    <Section size="2">
      <Container size="4" px="4">
        <Flex justify="between" align="baseline" mb="5">
          <Heading size="5" weight="bold">
            {title}
          </Heading>
          {href && linkLabel && (
            <TransitionLink href={href}>
              <Button
                variant="ghost"
                color="orange"
                size="2"
                className="cursor-pointer"
              >
                {linkLabel}
                <ArrowRight size={14} />
              </Button>
            </TransitionLink>
          )}
        </Flex>
        {children}
      </Container>
    </Section>
  );
}
