import type { MetadataRoute } from "next";
import {
  getArticles,
  getQuickBits,
  getTalks,
  getTags,
  getFridayTips,
} from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://www.davebitter.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/articles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/quick-bits`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/talks`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/friday-tips`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tags`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const articles = getArticles().map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const quickBits = getQuickBits().map((article) => ({
    url: `${BASE_URL}/quick-bits/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const talks = getTalks().map((talk) => ({
    url: `${BASE_URL}/talks/${talk.slug}`,
    lastModified: new Date(talk.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const fridayTips = (await getFridayTips()).map((tip) => ({
    url: `${BASE_URL}/friday-tips/${tip.slug}`,
    lastModified: new Date(tip.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagPages = Object.keys(getTags()).map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...articles,
    ...quickBits,
    ...talks,
    ...fridayTips,
    ...tagPages,
  ];
}
