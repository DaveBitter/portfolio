import { NextResponse } from "next/server";
import { getTags } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ tags: getTags() });
}
