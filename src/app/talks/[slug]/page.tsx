import { notFound } from "next/navigation";
import { Article } from "@/components/article/article";
import { getTalks } from "@/lib/content";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTalks().map((talk) => ({ slug: talk.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const talk = getTalks().find((t) => t.slug === slug);
  if (!talk) return {};

  const image = `/talks/${slug}/opengraph-image`;

  return {
    title: talk.title,
    description: talk.teaserCopy,
    openGraph: {
      title: talk.title,
      description: talk.teaserCopy,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: talk.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Dave_Bitter",
      title: talk.title,
      description: talk.teaserCopy,
      images: [image],
    },
  };
}

export default async function TalkPage({ params }: PageProps) {
  const { slug } = await params;
  const talks = getTalks();
  const talk = talks.find((t) => t.slug === slug);

  if (!talk) notFound();

  const relatedTalks = talks
    .filter(
      (t) =>
        t.slug !== slug &&
        t.tags?.some((tag) => talk.tags?.includes(tag))
    )
    .slice(0, 4);

  return <Article article={talk} relatedArticles={relatedTalks} />;
}
