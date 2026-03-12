import { Button, Text } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";
import { TransitionLink } from "@/components/transition-link";
import { getCopy } from "@/lib/content";

export default function NotFound() {
  const copy = getCopy();

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-gradient mb-4 text-6xl font-bold">404</h1>
      <Text size="5" className="mb-2 block">
        {copy.ahhh}
      </Text>
      <Text color="gray" className="mb-8 block">
        {copy.pageNotFound}
      </Text>
      <TransitionLink href="/">
        <Button variant="soft" color="tomato" size="3" className="cursor-pointer">
          <HomeIcon width={16} height={16} />
          Go home
        </Button>
      </TransitionLink>
    </div>
  );
}
