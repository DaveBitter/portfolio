import { getFridayTips } from "@/lib/content";
import { generateOGImage, ogSize, ogContentType } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Friday Tip";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const tips = await getFridayTips();
  return tips.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tip = (await getFridayTips()).find((t) => t.slug === slug);
  return generateOGImage(tip?.title ?? "Friday Tip", tip?.teaserCopy, tip?.teaserImage);
}
