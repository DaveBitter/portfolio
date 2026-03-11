import { Badge } from "@radix-ui/themes";
import { TransitionLink } from "@/components/transition-link";
import { getTags } from "@/lib/content";

const tagLabels = getTags();

export function TagItem({
  tagKey,
  size = "default",
}: {
  tagKey: string;
  size?: "small" | "default";
}) {
  return (
    <TransitionLink href={`/tags/${tagKey}`}>
      <Badge
        variant="soft"
        color="gray"
        size={size === "small" ? "1" : "2"}
        className="cursor-pointer transition-colors hover:bg-[var(--color-surface-hover)]"
      >
        {tagLabels[tagKey] || tagKey}
      </Badge>
    </TransitionLink>
  );
}

export function TagList({
  tags,
  size = "default",
}: {
  tags: string[];
  size?: "small" | "default";
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <TagItem key={tag} tagKey={tag} size={size} />
      ))}
    </div>
  );
}
