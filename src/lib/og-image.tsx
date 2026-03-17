import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const SUPPORTED_FORMATS = new Set(["jpg", "jpeg", "png", "svg", "webp"]);

async function readImageAsDataUrl(imagePath: string): Promise<string | null> {
  const ext = path.extname(imagePath).slice(1).toLowerCase();
  if (!SUPPORTED_FORMATS.has(ext)) return null;

  const filePath = path.join(process.cwd(), "public", imagePath);
  try {
    const buffer = fs.readFileSync(filePath);

    if (ext === "svg") {
      return `data:image/svg+xml;base64,${buffer.toString("base64")}`;
    }

    // Normalize raster images to PNG so next/og can render them consistently.
    const pngBuffer = await sharp(buffer).png().toBuffer();
    return `data:image/png;base64,${pngBuffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function generateOGImage(
  title: string,
  subtitle?: string,
  imagePath?: string
) {
  const imageDataUrl = imagePath ? await readImageAsDataUrl(imagePath) : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #222, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          {imageDataUrl && (
            <div
              style={{
                display: "flex",
                position: "relative",
                width: "54%",
                height: "100%",
                flexShrink: 0,
              }}
            >
              {/* `next/image` is not available inside `next/og` image rendering. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageDataUrl}
                alt=""
                width={579}
                height={502}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.28) 100%)",
                }}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "34px 38px",
              width: imageDataUrl ? "46%" : "100%",
              background: "rgba(42, 42, 42, 0.92)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 16,
                color: "#8d9297",
              }}
            >
              <div
                style={{
                  fontSize: 24,
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
                  fontSize: 22,
                }}
              >
                davebitter.com
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.12,
                  marginBottom: 18,
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
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
