import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fetchFridayTips } from "./youtube";

const contentDir = path.join(process.cwd(), "content");

function loadMarkdownData<T>(filePath: string): T[] {
  const fullPath = path.join(contentDir, filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return (data.items as T[]) || [];
}

function dedupeBySlug(items: Article[]): Article[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export interface Article {
  type: "articles" | "quick-bits" | "talks" | "friday-tips";
  title: string;
  slug: string;
  date: string;
  body: string;
  intro?: string;
  teaserCopy: string;
  teaserImage: string;
  tags: string[];
  event?: string;
  city?: string;
  countryCode?: string;
  summary?: string;
}

export interface FridayTip {
  type: "friday-tips";
  title: string;
  slug: string;
  date: string;
  teaserCopy: string;
  teaserImage?: string;
  tags: string[];
  youtubeVideoId?: string;
  body?: string;
}

export interface WorkExperienceSubEntry {
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  present: boolean;
}

export interface WorkExperience {
  company: string;
  companyWebsite: string;
  body: string;
  roles: {
    role: string;
    startDate: string;
    endDate: string;
    present: boolean;
  }[];
  startDate: string;
  endDate: string;
  present: boolean;
  city: string;
  countryCode: string;
  subEntries?: WorkExperienceSubEntry[];
}

export interface Education {
  institute: string;
  instituteWebsite: string;
  study: string;
  body: string;
  grade?: string;
  startDate: string;
  endDate: string;
  present: boolean;
  city: string;
  countryCode: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export function getArticles(): Article[] {
  const sorted = loadMarkdownData<Article>("articles/articles.md").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return dedupeBySlug(sorted);
}

export function getQuickBits(): Article[] {
  const sorted = loadMarkdownData<Article>("articles/quickBits.md").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return dedupeBySlug(sorted);
}

export function getTalks(): Article[] {
  const sorted = loadMarkdownData<Article>("speaking/talks.md").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return dedupeBySlug(sorted);
}

export function getWorkExperience(): WorkExperience[] {
  return loadMarkdownData<WorkExperience>("resume/workExperience.md");
}

export function getEducation(): Education[] {
  return loadMarkdownData<Education>("resume/education.md");
}

export function getCopy(): Record<string, string> {
  const items = loadMarkdownData<KeyValue>("general/copy.md");
  return Object.fromEntries(items.map((i) => [i.key, i.value]));
}

export function getDictionary(): Record<string, string> {
  const items = loadMarkdownData<KeyValue>("general/dictionary.md");
  return Object.fromEntries(items.map((i) => [i.key, i.value]));
}

export function getHeadings(): Record<string, string> {
  const items = loadMarkdownData<KeyValue>("general/headings.md");
  return Object.fromEntries(items.map((i) => [i.key, i.value]));
}

export function getTags(): Record<string, string> {
  const items = loadMarkdownData<KeyValue>("general/tags.md");
  return Object.fromEntries(items.map((i) => [i.key, i.value]));
}

export async function getFridayTips(): Promise<Article[]> {
  return fetchFridayTips();
}

export function getAllContent(): Article[] {
  return [...getArticles(), ...getQuickBits(), ...getTalks()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllContentWithFridayTips(): Promise<Article[]> {
  const fridayTips = await getFridayTips();
  return [...getArticles(), ...getQuickBits(), ...getTalks(), ...fridayTips].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
