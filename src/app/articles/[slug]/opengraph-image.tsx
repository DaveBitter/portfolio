import { getArticles } from "@/lib/content";
import { generateOGImage, ogSize, ogContentType } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Article";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticles().find((a) => a.slug === slug);
  return generateOGImage(article?.title ?? "Article", article?.teaserCopy, article?.teaserImage);
}
