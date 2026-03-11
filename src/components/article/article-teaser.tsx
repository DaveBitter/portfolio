import Image from "next/image";
import { TransitionLink } from "@/components/transition-link";
import { Card, Text } from "@radix-ui/themes";
import { ArticleTypeBadge } from "./article-type-badge";
import { TagList } from "@/components/tag";
import { formatDate } from "@/lib/format-date";
import type { Article } from "@/lib/content";

function getArticleHref(article: Article): string {
  const typeMap: Record<string, string> = {
    articles: "articles",
    "quick-bits": "quick-bits",
    talks: "talks",
    "friday-tips": "friday-tips",
  };
  const prefix = typeMap[article.type] || "articles";
  return `/${prefix}/${article.slug}`;
}

function vtName(article: Article, element: string): string {
  return `${article.type}-${element}-${article.slug}`;
}

export function ArticleTeaser({ article }: { article: Article }) {
  const href = getArticleHref(article);

  return (
    <TransitionLink href={href} className="group block">
      <Card
        size="2"
        className="h-full transition-colors hover:bg-[var(--color-surface-hover)]"
      >
        {article.teaserImage && (
          <div
            className="relative -mx-4 -mt-4 mb-4 aspect-video overflow-hidden rounded-t-[var(--card-border-radius)]"
            style={{ viewTransitionName: vtName(article, "image") }}
          >
            <Image
              src={article.teaserImage}
              alt=""
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span style={{ viewTransitionName: vtName(article, "badge") }}>
              <ArticleTypeBadge type={article.type} />
            </span>
            <Text
              size="1"
              color="gray"
              style={{ viewTransitionName: vtName(article, "date") }}
            >
              {formatDate(article.date)}
            </Text>
          </div>
          <Text
            size="3"
            weight="bold"
            className="transition-colors group-hover:text-[var(--color-primary)]"
            style={{ viewTransitionName: vtName(article, "title") }}
          >
            {article.title}
          </Text>
          <Text size="2" color="gray" className="line-clamp-2">
            {article.teaserCopy}
          </Text>
          {article.tags && article.tags.length > 0 && (
            <TagList tags={article.tags} size="small" />
          )}
        </div>
      </Card>
    </TransitionLink>
  );
}

export function ArticleTeasers({
  articles,
  columns = 3,
}: {
  articles: Article[];
  columns?: 2 | 3 | 4;
}) {
  const gridClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {articles.map((article) => (
        <ArticleTeaser
          key={`${article.type}-${article.slug}`}
          article={article}
        />
      ))}
    </div>
  );
}
