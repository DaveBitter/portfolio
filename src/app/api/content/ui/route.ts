import { NextResponse } from "next/server";
import { getDictionary, getCopy, getHeadings } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    dictionary: getDictionary(),
    copy: getCopy(),
    headings: getHeadings(),
  });
}
