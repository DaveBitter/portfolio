import { generateOGImage, ogSize, ogContentType } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Dave Bitter - Senior Front-end Consultant & Engineering Manager";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage(
    "Dave Bitter",
    "Senior Front-end Consultant · Developer Advocate · Engineering Manager"
  );
}
