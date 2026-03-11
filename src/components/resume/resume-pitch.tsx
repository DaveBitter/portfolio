import { Text, Button, Flex } from "@radix-ui/themes";
import { TransitionLink } from "@/components/transition-link";
import { renderMarkdown } from "@/lib/markdown";

interface ResumePitchProps {
  pitch: string;
  showLink?: boolean;
}

export function ResumePitch({ pitch, showLink = true }: ResumePitchProps) {
  const html = renderMarkdown(pitch);

  return (
    <Flex direction="column" gap="5">
      <Text
        as="div"
        size="3"
        color="gray"
        style={{ lineHeight: 1.8, maxWidth: "65ch" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showLink && (
        <div>
          <TransitionLink href="/resume">
            <Button
              variant="soft"
              color="orange"
              size="3"
              className="cursor-pointer"
            >
              View my resume
            </Button>
          </TransitionLink>
        </div>
      )}
    </Flex>
  );
}
