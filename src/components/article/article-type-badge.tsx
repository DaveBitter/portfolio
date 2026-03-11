import { Badge } from "@radix-ui/themes";

const typeConfig: Record<
  string,
  { label: string; color: "orange" | "red" | "blue" | "green" }
> = {
  articles: { label: "Article", color: "orange" },
  "quick-bits": { label: "Quick Bit", color: "blue" },
  talks: { label: "Talk", color: "green" },
  "friday-tips": { label: "Friday Tip", color: "red" },
};

export function ArticleTypeBadge({ type }: { type: string }) {
  const config = typeConfig[type] ?? { label: type, color: "orange" as const };

  return (
    <Badge color={config.color} variant="soft" size="1">
      {config.label}
    </Badge>
  );
}
