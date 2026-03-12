function normalizeFenceOpening(line: string): { lines: string[]; opensFence: boolean } {
  const match = line.match(/^(```)([A-Za-z0-9_-]+)?(?:\s*\{[\d\-,\s]+\})?(?:\s+(.*))?$/);
  if (!match) {
    return { lines: [line], opensFence: false };
  }

  const [, fence, language = "", rest = ""] = match;
  const opening = `${fence}${language}`;

  if (!rest.trim()) {
    return { lines: [opening], opensFence: true };
  }

  return { lines: [opening, rest], opensFence: true };
}

function normalizeFenceClosing(line: string): { lines: string[]; closesFence: boolean } {
  if (line.trim() === "```") {
    return { lines: ["```"], closesFence: true };
  }

  const match = line.match(/^(.*?)(\s*```)\s*$/);
  if (!match) {
    return { lines: [line], closesFence: false };
  }

  const beforeFence = match[1] ?? "";
  if (!beforeFence.trim()) {
    return { lines: ["```"], closesFence: true };
  }

  return { lines: [beforeFence, "```"], closesFence: true };
}

export function normalizeMarkdown(content: string): string {
  const lines = content.replace(/^\* (\d+)\. /gm, "$1. ").split("\n");
  const normalized: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (!inFence) {
      const { lines: nextLines, opensFence } = normalizeFenceOpening(line);
      normalized.push(...nextLines);
      inFence = opensFence;
      continue;
    }

    const { lines: nextLines, closesFence } = normalizeFenceClosing(line);
    normalized.push(...nextLines);
    inFence = !closesFence;
  }

  return normalized.join("\n");
}
