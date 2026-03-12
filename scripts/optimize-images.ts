import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd());
const PUBLIC_IMG = path.join(ROOT, "public/img");
const CONTENT_DIR = path.join(ROOT, "content");

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;
const OPTIMIZABLE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const SKIP_DIRS = new Set(["favicons"]);

interface OptimizeResult {
  file: string;
  originalSize: number;
  newSize: number;
  renamed: boolean;
}

function collectImages(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        results.push(...collectImages(fullPath));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (OPTIMIZABLE_EXTS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function optimizeImage(filePath: string): Promise<OptimizeResult> {
  const originalSize = fs.statSync(filePath).size;
  const webpPath = filePath.replace(/\.[^.]+$/, ".webp");

  const image = sharp(filePath);
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, undefined, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);

  const newSize = fs.statSync(webpPath).size;
  const renamed = webpPath !== filePath;

  if (renamed) {
    fs.rmSync(filePath);
  }

  return { file: filePath, originalSize, newSize, renamed };
}

function updateContentReferences(renames: Map<string, string>) {
  const mdFiles: string[] = [];

  function collectMd(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectMd(fullPath);
      } else if (entry.name.endsWith(".md")) {
        mdFiles.push(fullPath);
      }
    }
  }

  collectMd(CONTENT_DIR);

  for (const mdFile of mdFiles) {
    let content = fs.readFileSync(mdFile, "utf-8");
    let changed = false;

    for (const [oldName, newName] of renames) {
      if (content.includes(oldName)) {
        content = content.replaceAll(oldName, newName);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(mdFile, content, "utf-8");
      console.log(`  Updated references in: ${path.relative(ROOT, mdFile)}`);
    }
  }
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KiB`;
}

async function main() {
  console.log("Scanning public/img/ for optimizable images...\n");
  const images = collectImages(PUBLIC_IMG);

  if (images.length === 0) {
    console.log("No JPG/PNG images found to optimize.");
    return;
  }

  console.log(`Found ${images.length} image(s) to optimize.\n`);

  const results: OptimizeResult[] = [];
  const renames = new Map<string, string>();

  for (const imagePath of images) {
    const relativePath = path.relative(path.join(ROOT, "public"), imagePath);
    process.stdout.write(`  Optimizing: ${relativePath}...`);

    const result = await optimizeImage(imagePath);
    results.push(result);

    const savings = ((1 - result.newSize / result.originalSize) * 100).toFixed(0);
    console.log(
      ` ${formatSize(result.originalSize)} → ${formatSize(result.newSize)} (-${savings}%)`
    );

    if (result.renamed) {
      const oldWebPath = "/" + relativePath;
      const newWebPath = oldWebPath.replace(/\.[^.]+$/, ".webp");
      renames.set(oldWebPath, newWebPath);
    }
  }

  if (renames.size > 0) {
    console.log(`\nUpdating ${renames.size} reference(s) in content markdown files...`);
    updateContentReferences(renames);
  }

  const totalOriginal = results.reduce((s, r) => s + r.originalSize, 0);
  const totalNew = results.reduce((s, r) => s + r.newSize, 0);
  const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(0);

  console.log(
    `\nTotal: ${formatSize(totalOriginal)} → ${formatSize(totalNew)} (-${totalSavings}%)`
  );
  console.log("Done!");
}

main();
