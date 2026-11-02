import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** One share-image design, a different headline per page. */
export function ogImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f7f3ec", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#0c3b39", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 30, borderRadius: "50% 50% 45% 45%", background: "#c4622d" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#0c3b39" }}>Saltbrook</span>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 4, color: "#c4622d" }}>HEATING &amp; AIR</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: "#c4622d" }}>{eyebrow.toUpperCase()}</span>
          <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.04, color: "#0c3b39", marginTop: 12, maxWidth: 1000 }}>{title}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#586663" }}>
          <span>(919) 555-0142 · Raleigh, Durham, Cary, Apex, Wake Forest</span>
          <span>Concept site by Zordev</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
