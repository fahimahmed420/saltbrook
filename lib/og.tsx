import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** One share-image design, a different headline per page. */
export function ogImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f0e4", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#0f4c4a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 30, borderRadius: "50% 50% 45% 45%", background: "#b5562b" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#0f4c4a" }}>Saltbrook</span>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 4, color: "#b5562b" }}>HEATING &amp; AIR</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: "#b5562b" }}>{eyebrow.toUpperCase()}</span>
          <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.04, color: "#0f4c4a", marginTop: 12, maxWidth: 1000 }}>{title}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#55615e" }}>
          <span>(919) 555-0142 · Raleigh, Durham, Cary, Apex, Wake Forest</span>
          <span>Fictional demo by Zordev</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
