import type { Metadata } from "next";
import type { Article } from "./content";

const AUTHOR_NAME = "Dave Bitter";
const TWITTER_CREATOR = "@Dave_Bitter";

function toIsoDate(date: string): string {
  return new Date(date).toISOString();
}

export function buildArticleMetadata(
  article: Article,
  image: string,
  section: string
): Metadata {
  const publishedTime = toIsoDate(article.date);

  return {
    title: article.title,
    description: article.teaserCopy,
    authors: [{ name: AUTHOR_NAME }],
    keywords: article.tags,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.teaserCopy,
      publishedTime,
      authors: [AUTHOR_NAME],
      tags: article.tags,
      section,
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
