import { getTalks } from "@/lib/content";
import { generateOGImage, ogSize, ogContentType } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Talk";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getTalks().map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const talk = getTalks().find((t) => t.slug === slug);
  return generateOGImage(talk?.title ?? "Talk", talk?.teaserCopy);
}
