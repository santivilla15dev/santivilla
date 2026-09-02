import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Santi Villa — Websites für lokale Betriebe in Wien";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// process.cwd() + ruta literal para que el file tracing de Next incluya el PNG en el bundle.
async function loadPortrait(): Promise<string> {
  const buffer = await readFile(
    join(process.cwd(), "src/app/opengraph-portrait.png"),
  );
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function OpengraphImage() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 80,
        background: "#e9eef2",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 640,
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
      </div>

      <img
        src={portrait}
        alt=""
        width={376}
        height={470}
        style={{
          width: 376,
          height: 470,
          borderRadius: 32,
          objectFit: "cover",
          background: "#0c0c0c",
        }}
      />
    </div>,
    size,
  );
}
