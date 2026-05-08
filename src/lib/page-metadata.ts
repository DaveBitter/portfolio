import type { Metadata } from "next";
import type { Article } from "./content";

const AUTHOR_NAME = "Dave Bitter";
const TWITTER_CREATOR = "@Dave_Bitter";
const SITE_ORIGIN = "https://www.davebitter.com";

function toIsoDate(date: string): string {
  return new Date(date).toISOString();
}

function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}

/** URL path for the published page (e.g. `/articles/my-slug`). */
export function articlePagePath(article: Article): string {
  switch (article.type) {
    case "articles":
      return `/articles/${article.slug}`;
    case "quick-bits":
      return `/quick-bits/${article.slug}`;
    case "talks":
      return `/talks/${article.slug}`;
    case "friday-tips":
      return `/friday-tips/${article.slug}`;
  }
}

export function buildArticleMetadata(
  article: Article,
  image: string,
  section: string
): Metadata {
  const publishedTime = toIsoDate(article.date);
  const pageUrl = absoluteUrl(articlePagePath(article));

  return {
    title: article.title,
    description: article.teaserCopy,
    authors: [{ name: AUTHOR_NAME }],
    keywords: article.tags,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.teaserCopy,
      publishedTime,
      authors: [AUTHOR_NAME],
      tags: article.tags,
      section,
      url: pageUrl,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: TWITTER_CREATOR,
      title: article.title,
      description: article.teaserCopy,
      images: [image],
    },
  };
}
