import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex approximations of the dark theme tokens (the OG renderer has no oklch).
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#141a22",
        color: "#f3f0ea",
      }}
    >
      <div style={{ fontSize: 88, fontWeight: 700 }}>{profile.name}</div>
      <div style={{ fontSize: 52, color: "#5fdcc0", marginTop: 16 }}>
        {profile.title}
      </div>
      <div style={{ fontSize: 32, color: "#a8b0bd", marginTop: 40 }}>
        {profile.topStack.join(" · ")}
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          marginTop: 56,
          padding: "16px 32px",
          borderRadius: 999,
          background: "#5fdcc0",
          color: "#141a22",
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        Open to remote roles — view portfolio →
      </div>
    </div>,
    size,
  );
}
