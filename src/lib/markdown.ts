import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { enrichHtml } from "./enrich-html";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

function preprocessMarkdown(content: string): string {
  return content
    .replace(/^\* (\d+)\. /gm, "$1. ")
    .replace(/```(\w+)\s*\{[\d\-,\s]+\}/g, "```$1")
    .replace(/```(\w+) /g, "```$1\n")
    .replace(/([^\n])```/g, "$1\n```");
}

export function renderMarkdown(content: string | undefined | null): string {
  if (!content) return "";
  const html = marked.parse(preprocessMarkdown(content), { async: false }) as string;
  return enrichHtml(html);
}
