import { Text, Button, Flex } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { TransitionLink } from "@/components/transition-link";
import { renderMarkdown } from "@/lib/markdown";

interface ResumePitchProps {
  pitch: string;
  showLink?: boolean;
  maxWidth?: string;
}

export function ResumePitch({
  pitch,
  showLink = true,
  maxWidth = "65ch",
}: ResumePitchProps) {
  const html = renderMarkdown(pitch);

  return (
    <Flex direction="column" gap="5">
      <Text
        as="div"
        size="3"
        color="gray"
        style={{ lineHeight: 1.8, maxWidth }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showLink && (
        <div>
          <TransitionLink href="/resume">
            <Button
              variant="soft"
              color="tomato"
              size="3"
              className="cursor-pointer"
            >
              View my resume
              <ArrowRightIcon width={16} height={16} />
            </Button>
          </TransitionLink>
        </div>
      )}
    </Flex>
  );
}
