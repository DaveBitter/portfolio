import { getQuickBits } from "@/lib/content";
import { generateOGImage, ogSize, ogContentType } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Quick Bit";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getQuickBits().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getQuickBits().find((a) => a.slug === slug);
  return generateOGImage(article?.title ?? "Quick Bit", article?.teaserCopy, article?.teaserImage);
}
