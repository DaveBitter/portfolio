import { NextResponse } from "next/server";
import { getQuickBits } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ quickBits: getQuickBits() });
}
