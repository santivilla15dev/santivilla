import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Santi Villa — Websites für lokale Betriebe in Wien";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#e9eef2",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          width: 96,
          height: 8,
          background: "#0b5f63",
          borderRadius: 4,
          marginBottom: 40,
        }}
      />
      <div style={{ fontSize: 84, color: "#0f1a24", lineHeight: 1.05 }}>
        {site.name}
      </div>
      <div
        style={{
          fontSize: 40,
          color: "#5a6b7a",
          marginTop: 24,
          fontFamily: "sans-serif",
        }}
      >
        Websites für lokale Betriebe in Wien
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#0b5f63",
          marginTop: 48,
          fontFamily: "sans-serif",
        }}
      >
        {site.domain}
      </div>
    </div>,
    size,
  );
}
