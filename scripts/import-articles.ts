import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = path.resolve(process.cwd());
const IMPORT_DIR = path.join(ROOT, "import_articles");
const ARTICLES_DIR = path.join(ROOT, "content/articles");
const TAGS_MD = path.join(ROOT, "content/general/tags.md");
const PUBLIC_IMG = path.join(ROOT, "public/img/articles");

const TAG_MAP: Record<string, string> = {
  ai: "ai",
  frontend: "front-end",
  cloud: "cloud",
  n8n: "n8n",
  "vibe-coding": "vibe-coding",
  cursor: "cursor",
  typescript: "typescript",
  serverless: "serverless",
};

const TAG_DISPLAY: Record<string, string> = {
  ai: "AI",
  "front-end": "Front-end",
  cloud: "Cloud",
  n8n: "n8n",
  "vibe-coding": "Vibe coding",
  cursor: "Cursor",
  typescript: "TypeScript",
  serverless: "Serverless",
};

const ARTICLE_FILES = fs
  .readdirSync(IMPORT_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort();

function fixImagePaths(text: string, slug: string): string {
  const pattern = new RegExp(`/articles/${slug}/`, "g");
  return text.replace(pattern, "/img/articles/");
}

function mapTags(sourceTags: string[]): string[] {
  return sourceTags.map((t) => TAG_MAP[t] || t);
}

function cleanTitle(title: string): string {
  return title.replace(/_/g, "");
}

function buildTeaserImage(images: string[], slug: string): string {
  if (!images || images.length === 0) return "";
  const imgPath = images[0];
  const filename = path.basename(imgPath);
  return `/img/articles/${filename}`;
}

function copyImages(slug: string) {
  const srcDir = path.join(IMPORT_DIR, slug);
  if (!fs.existsSync(srcDir)) return;

  fs.mkdirSync(PUBLIC_IMG, { recursive: true });

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const src = path.join(srcDir, file);
    const dest = path.join(PUBLIC_IMG, file);
    if (fs.statSync(src).isFile() && !file.startsWith(".")) {
      fs.copyFileSync(src, dest);
      console.log(`  Copied: ${file}`);
    }
  }
}

function loadExistingTags(): Set<string> {
  const content = fs.readFileSync(TAGS_MD, "utf-8");
  const { data } = matter(content);
  const keys = new Set<string>();
  if (data.items) {
    for (const item of data.items) {
      keys.add(item.key);
    }
  }
  return keys;
}

function addNewTags(newTags: Set<string>) {
  const existingKeys = loadExistingTags();
  const toAdd: { key: string; value: string }[] = [];

  for (const tag of newTags) {
    if (!existingKeys.has(tag)) {
      toAdd.push({ key: tag, value: TAG_DISPLAY[tag] || tag });
    }
  }

  if (toAdd.length === 0) {
    console.log("No new tags to add.");
    return;
  }

  let content = fs.readFileSync(TAGS_MD, "utf-8");
  const insertionPoint = content.lastIndexOf("---");

  let newEntries = "";
  for (const { key, value } of toAdd) {
    newEntries += `  - key: "${key}"\n    value: "${value}"\n`;
    console.log(`  Added tag: ${key} → ${value}`);
  }

  content =
    content.slice(0, insertionPoint) + newEntries + content.slice(insertionPoint);
  fs.writeFileSync(TAGS_MD, content, "utf-8");
}

function main() {
  if (ARTICLE_FILES.length === 0) {
    console.log("No articles to import in import_articles/.");
    return;
  }

  console.log(`Found ${ARTICLE_FILES.length} article(s) to import.`);
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });

  const allNewTags = new Set<string>();

  for (const filename of ARTICLE_FILES) {
    const slug = filename.replace(/\.md$/, "");
    const filepath = path.join(IMPORT_DIR, filename);
    console.log(`\nProcessing: ${slug}`);

    const raw = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(raw);

    const mappedTags = mapTags(data.tags || []);
    for (const t of mappedTags) allNewTags.add(t);

    const body = fixImagePaths(content.trim(), slug);
    const teaserImage = buildTeaserImage(data.images, slug);
    const title = cleanTitle(data.title);
    const date = `${data.date}T00:00:00.000Z`;

    const frontmatter: Record<string, unknown> = {
      type: "articles",
      date,
      slug,
      tags: mappedTags,
      intro: data.summary || "",
      teaserCopy: data.summary || "",
      teaserImage,
      title,
    };

    const output = matter.stringify(body, frontmatter);
    const dest = path.join(ARTICLES_DIR, `${slug}.md`);
    fs.writeFileSync(dest, output, "utf-8");
    console.log(`  Wrote: content/articles/${slug}.md`);

    console.log("  Copying images...");
    copyImages(slug);
  }

  console.log("\nUpdating tags.md...");
  addNewTags(allNewTags);

  console.log("\nCleaning up import_articles...");
  for (const filename of ARTICLE_FILES) {
    const slug = filename.replace(/\.md$/, "");
    const mdPath = path.join(IMPORT_DIR, filename);
    const assetDir = path.join(IMPORT_DIR, slug);

    fs.rmSync(mdPath, { force: true });
    if (fs.existsSync(assetDir)) {
      fs.rmSync(assetDir, { recursive: true, force: true });
    }
  }
  console.log("  Removed imported files and asset folders.");

  console.log("\nDone!");
}

main();
