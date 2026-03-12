import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { enrichHtml } from "./enrich-html";
import { normalizeMarkdown } from "./normalize-markdown";

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

export function renderMarkdown(content: string | undefined | null): string {
  if (!content) return "";
  const html = marked.parse(normalizeMarkdown(content), { async: false }) as string;
  return enrichHtml(html);
}
