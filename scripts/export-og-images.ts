import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "out");

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.log("No out/ directory found, skipping OG image export.");
    return;
  }

  let copied = 0;

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.name !== "opengraph-image") continue;

      const pngPath = `${fullPath}.png`;
      fs.copyFileSync(fullPath, pngPath);
      copied += 1;
    }
  };

  walk(OUT_DIR);
  console.log(`Exported ${copied} OG image PNG file(s).`);
}

main();
