"use client";

import { Button, Text } from "@radix-ui/themes";
import { TransitionLink } from "@/components/transition-link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-gradient mb-4 text-6xl font-bold">AHHH!</h1>
      <Text color="gray" className="mb-8 block">
        One of us screwed up. It&apos;s probably Dave. Please try to navigate to
        a different page.
      </Text>
      <div className="flex gap-4">
        <Button
          variant="soft"
          color="orange"
          size="3"
          className="cursor-pointer"
          onClick={reset}
        >
          Try again
        </Button>
        <TransitionLink href="/">
          <Button
            variant="soft"
            color="gray"
            size="3"
            className="cursor-pointer"
          >
            Go home
          </Button>
        </TransitionLink>
      </div>
    </div>
  );
}
