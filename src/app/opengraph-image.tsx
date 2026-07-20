import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BREAKOUT CULTURE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1613",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(201,169,97,0.12), transparent 40%), radial-gradient(circle at 80% 80%, rgba(201,169,97,0.10), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 28px",
            borderRadius: "9999px",
            border: "1px solid #c9a961",
            color: "#c9a961",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          Est. 2026
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#f9f7f4",
            letterSpacing: -2,
          }}
        >
          BREAKOUT&nbsp;<span style={{ color: "#c9a961" }}>CULTURE</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "rgba(249,247,244,0.8)",
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          Premium streetwear for those who refused the default path.
        </div>
      </div>
    ),
    { ...size }
  );
}
