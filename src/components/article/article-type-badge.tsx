import { Badge } from "@radix-ui/themes";
import {
  FileTextIcon,
  LightningBoltIcon,
  ChatBubbleIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type { ComponentType } from "react";

const typeConfig: Record<
  string,
  {
    label: string;
    color: "orange" | "red" | "blue" | "green";
    icon: ComponentType<IconProps>;
  }
> = {
  articles: { label: "Article", color: "orange", icon: FileTextIcon },
  "quick-bits": { label: "Quick Bit", color: "blue", icon: LightningBoltIcon },
  talks: { label: "Talk", color: "green", icon: ChatBubbleIcon },
  "friday-tips": { label: "Friday Tip", color: "red", icon: VideoIcon },
};

export function ArticleTypeBadge({ type }: { type: string }) {
  const config = typeConfig[type] ?? {
    label: type,
    color: "orange" as const,
    icon: FileTextIcon,
  };
  const Icon = config.icon;

  return (
    <Badge color={config.color} variant="soft" size="1">
      <Icon width={12} height={12} />
      {config.label}
    </Badge>
  );
}
