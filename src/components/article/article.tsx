import Image from "next/image";
import { Badge, Text } from "@radix-ui/themes";
import { ArticleTypeBadge } from "./article-type-badge";
import { ArticleTeasers } from "./article-teaser";
import { TagList } from "@/components/tag";
import { Share } from "@/components/share";
import { formatDate } from "@/lib/format-date";
import { renderMarkdown } from "@/lib/markdown";
import type { Article as ArticleType } from "@/lib/content";

function vtName(article: ArticleType, element: string): string {
  return `${article.type}-${element}-${article.slug}`;
}

export function Article({
  article,
  relatedArticles,
}: {
  article: ArticleType;
  relatedArticles?: ArticleType[];
}) {
  const html = renderMarkdown(article.body || article.summary || "");

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span style={{ viewTransitionName: vtName(article, "badge") }}>
            <ArticleTypeBadge type={article.type} />
          </span>
          <Text
            size="2"
            color="gray"
            style={{ viewTransitionName: vtName(article, "date") }}
          >
            {formatDate(article.date)}
          </Text>
          {article.event && (
            <Badge variant="outline" size="1">
              {article.event}
            </Badge>
          )}
          {article.city && (
            <Text size="1" color="gray">
              {article.city}
            </Text>
          )}
        </div>
        <h1
          className="text-gradient mb-4 text-3xl font-bold md:text-4xl"
          style={{ viewTransitionName: vtName(article, "title") }}
        >
          {article.title}
        </h1>
        {article.intro && (
          <p className="text-lg text-[var(--color-text-muted)]">
            {article.intro}
          </p>
        )}
      </header>

      {article.teaserImage && (
        <div
          className="relative mb-12 aspect-video overflow-hidden rounded-xl"
          style={{ viewTransitionName: vtName(article, "image") }}
        >
          <Image
            src={article.teaserImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <div
        className="article-body max-w-none text-[var(--color-text)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="mt-16 border-t border-[var(--color-border)] pt-10">
        {article.tags && article.tags.length > 0 && (
          <div className="mb-6">
            <TagList tags={article.tags} />
          </div>
        )}
        <Share />
      </footer>

      {relatedArticles && relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related</h2>
          <ArticleTeasers articles={relatedArticles} columns={2} />
        </section>
      )}
    </article>
  );
}
