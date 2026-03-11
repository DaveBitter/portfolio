import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function generateOGImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #222, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: 64,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            marginBottom: 16,
            maxWidth: "80%",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 24,
              color: "#8d9297",
              lineHeight: 1.4,
              maxWidth: "70%",
            }}
          >
            {subtitle}
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
      </div>
    ),
    { ...ogSize }
  );
}
