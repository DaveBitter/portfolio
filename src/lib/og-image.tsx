import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const SUPPORTED_FORMATS = new Set(["jpg", "jpeg", "png", "svg"]);

function readImageAsDataUrl(imagePath: string): string | null {
  const ext = path.extname(imagePath).slice(1).toLowerCase();
  if (!SUPPORTED_FORMATS.has(ext)) return null;

  const filePath = path.join(process.cwd(), "public", imagePath);
  try {
    const buffer = fs.readFileSync(filePath);
    const mime = ext === "svg" ? "image/svg+xml" : ext === "jpg" ? "image/jpeg" : `image/${ext}`;
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export function generateOGImage(
  title: string,
  subtitle?: string,
  imagePath?: string
) {
  const imageDataUrl = imagePath ? readImageAsDataUrl(imagePath) : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #222, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            flex: 1,
            paddingRight: imageDataUrl ? 48 : 0,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 22,
                color: "#8d9297",
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {imageDataUrl && (
          <div
            style={{
              display: "flex",
              width: 400,
              height: 400,
              borderRadius: 16,
              overflow: "hidden",
              alignSelf: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={imageDataUrl}
              width={400}
              height={400}
            />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            fontSize: 28,
            fontWeight: 700,
            background: "linear-gradient(45deg, #ff5420, #ff1343)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Dave Bitter
        </div>
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 64,
            fontSize: 20,
            color: "#8d9297",
          }}
        >
          davebitter.com
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
