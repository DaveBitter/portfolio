import { NextResponse } from "next/server";
import { getArticles } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ articles: getArticles() });
}
