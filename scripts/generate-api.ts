import fs from "fs";
import path from "path";
import {
  getArticles,
  getQuickBits,
  getTalks,
  getTags,
  getDictionary,
  getCopy,
  getHeadings,
  getWorkExperience,
  getEducation,
} from "../src/lib/content";

const dirs = [
  path.join(process.cwd(), "out", "api", "content"),
  path.join(process.cwd(), "public", "api", "content"),
];

for (const dir of dirs) {
  fs.mkdirSync(dir, { recursive: true });
}

const endpoints: Record<string, unknown> = {
  "articles.json": { articles: getArticles() },
  "quick-bits.json": { quickBits: getQuickBits() },
  "talks.json": { talks: getTalks() },
  "friday-tips.json": { fridayTips: [] },
  "tags.json": { tags: getTags() },
  "ui.json": {
    dictionary: getDictionary(),
    copy: getCopy(),
    headings: getHeadings(),
  },
  "work-and-education.json": {
    workExperience: getWorkExperience(),
    education: getEducation(),
  },
};

for (const [file, data] of Object.entries(endpoints)) {
  const json = JSON.stringify(data, null, 2);
  for (const dir of dirs) {
    fs.writeFileSync(path.join(dir, file), json);
  }
  console.log(`wrote ${file}`);
}

console.log("static API generated");
