import type { Article } from "./content";

const PLAYLIST_ID = "PLsES66lgcKHD9oRnyN3PEvyTjWXJF4IgT";
const API_BASE = "https://www.googleapis.com/youtube/v3/playlistItems";

interface YouTubeSnippet {
  title: string;
  description: string;
  resourceId: { videoId: string };
}

interface YouTubeContentDetails {
  videoPublishedAt: string;
}

interface YouTubePlaylistItem {
  snippet: YouTubeSnippet;
  contentDetails: YouTubeContentDetails;
}

interface YouTubeResponse {
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
}

function toFridayTip(item: YouTubePlaylistItem): Article {
  const { snippet, contentDetails } = item;

  return {
    type: "friday-tips",
    body: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${snippet.resourceId.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    date: contentDetails.videoPublishedAt,
    slug: snippet.title
      .split("|")[0]
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase(),
    tags: [],
    intro: snippet.description,
    teaserCopy: snippet.description,
    teaserImage: "/img/friday-tips.webp",
    title: snippet.title.replace("#", ""),
    youtubeVideoId: snippet.resourceId.videoId,
  };
}

async function fetchAllPages(apiKey: string): Promise<YouTubePlaylistItem[]> {
  const items: YouTubePlaylistItem[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(API_BASE);
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", PLAYLIST_ID);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`YouTube API error: ${res.status} ${res.statusText}`);
      break;
    }

    const data: YouTubeResponse = await res.json();
    items.push(...data.items);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return items;
}

function dedupeBySlug(items: Article[]): Article[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export async function fetchFridayTips(): Promise<Article[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const items = await fetchAllPages(apiKey);

  const tips = items
    .filter((item) => item.snippet.title !== "Private video")
    .map(toFridayTip)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return dedupeBySlug(tips);
}
