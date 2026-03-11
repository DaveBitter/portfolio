import { NextResponse } from "next/server";
import { getFridayTips } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ fridayTips: await getFridayTips() });
}
