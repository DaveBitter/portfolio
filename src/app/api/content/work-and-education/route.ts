import { NextResponse } from "next/server";
import { getWorkExperience, getEducation } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    workExperience: getWorkExperience(),
    education: getEducation(),
  });
}
