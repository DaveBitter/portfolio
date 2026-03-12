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

function TeaserMeta({
  article,
  titleSize = "3",
  clampClass = "",
}: {
  article: Article;
  titleSize?: "3" | "5";
  clampClass?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:h-full">
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
        size={titleSize}
        weight="bold"
        className="transition-colors group-hover:text-[var(--color-primary)]"
        style={{ viewTransitionName: vtName(article, "title") }}
      >
        {article.title}
      </Text>
      <Text size="2" color="gray" className={clampClass}>
        {article.teaserCopy}
      </Text>
      {article.tags && article.tags.length > 0 && (
        <div className="sm:mt-auto sm:pt-2">
          <TagList tags={article.tags} size="small" />
        </div>
      )}
    </div>
  );
}

export function ArticleTeaser({ article }: { article: Article }) {
  const href = getArticleHref(article);

  return (
    <TransitionLink href={href} className="group block sm:h-full">
      <Card
        size="2"
        className="shadow-md shadow-black/25 transition-all hover:bg-[var(--site-surface-hover)] hover:shadow-lg hover:shadow-black/30 sm:h-full"
      >
        <div className="flex flex-col sm:h-full">
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
          <TeaserMeta article={article} />
        </div>
      </Card>
    </TransitionLink>
  );
}

function ArticleTeaserFeatured({
  article,
  imageRight = false,
}: {
  article: Article;
  imageRight?: boolean;
}) {
  const href = getArticleHref(article);

  return (
    <TransitionLink href={href} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-3)] bg-[var(--site-surface)] shadow-md shadow-black/25 transition-all hover:bg-[var(--site-surface-hover)] hover:shadow-lg hover:shadow-black/30 sm:min-h-[420px] sm:flex-row">
        {article.teaserImage && (
          <div
            className={`relative aspect-video sm:aspect-auto sm:w-1/2${imageRight ? " sm:order-2" : ""}`}
            style={{ viewTransitionName: vtName(article, "image") }}
          >
            <Image
              src={article.teaserImage}
              alt=""
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        )}
        <div
          className={`flex flex-col p-4 sm:w-1/2 sm:p-8${imageRight ? " sm:order-1" : ""}`}
        >
          <TeaserMeta
              article={article}
              titleSize="5"
              clampClass=""
            />
        </div>
      </div>
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

type MasonrySlot =
  | { variant: "default" }
  | { variant: "featured"; imageRight: boolean };

const masonryPattern: MasonrySlot[] = [
  { variant: "featured", imageRight: true },
  { variant: "default" },
  { variant: "default" },
  { variant: "default" },
  { variant: "default" },
  { variant: "featured", imageRight: false },
  { variant: "default" },
  { variant: "default" },
  { variant: "default" },
  { variant: "default" },
];

export function ArticleMasonryGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => {
        const slot =
          masonryPattern[index % masonryPattern.length] ?? { variant: "default" };
        const isFeatured = slot.variant === "featured";
        return (
          <div
            key={`${article.type}-${article.slug}`}
            className={`masonry-item${isFeatured ? " sm:col-span-2" : ""}`}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {isFeatured ? (
              <ArticleTeaserFeatured
                article={article}
                imageRight={slot.imageRight}
              />
            ) : (
              <ArticleTeaser article={article} />
            )}
          </div>
        );
      })}
    </div>
  );
}
