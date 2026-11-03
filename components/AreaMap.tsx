/** Stylised Triangle map: towns placed by real relative geography (not to scale). No embed, no tracking. */
export function AreaMap() {
  const towns = [
    { name: "Durham", x: 150, y: 120, eta: "Next morning" },
    { name: "Wake Forest", x: 470, y: 80, eta: "Next morning" },
    { name: "Raleigh", x: 420, y: 230, home: true, eta: "Same day" },
    { name: "Cary", x: 300, y: 280, eta: "Same day" },
    { name: "Apex", x: 250, y: 380, eta: "Same day" },
  ];
  return (
    <svg viewBox="0 0 600 470" role="img" aria-label="Map of the service area: Durham, Wake Forest, Raleigh, Cary and Apex" className="h-auto w-full">
      <defs>
        <radialGradient id="glow" cx="0.7" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#c4622d" stopOpacity="0.22" />
          <stop offset="1" stopColor="#c4622d" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="#cfe7df" strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="600" height="470" rx="32" fill="#0c3b39" />
      <rect width="600" height="470" rx="32" fill="url(#grid)" />
      <circle cx="420" cy="230" r="230" fill="url(#glow)" />
      {/* Falls Lake and Jordan Lake, simplified */}
      <path d="M300 70c40-20 90-10 120 10s20 40-20 40-80 0-100-20 0-30 0-30Z" fill="#145653" />
      <path d="M90 300c20-30 60-30 70 0s-10 70-40 70-50-40-30-70Z" fill="#145653" />
      {/* Roads */}
      <path d="M150 120 300 280 420 230 470 80M300 280 250 380M150 120c90 30 200 60 270 110" fill="none" stroke="#cfe7df" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
      {/* Same-day ring */}
      <circle cx="420" cy="230" r="190" fill="none" stroke="#f2b544" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 10" />
      {towns.map((t) => (
        <g key={t.name}>
          {t.home && <circle cx={t.x} cy={t.y} r="30" fill="#c4622d" fillOpacity="0.25" />}
          <circle cx={t.x} cy={t.y} r={t.home ? 15 : 10} fill={t.home ? "#c4622d" : "#fffdf9"} stroke="#0c3b39" strokeWidth="3" />
          <text x={t.x} y={t.y - (t.home ? 42 : 24)} textAnchor="middle" fill="#fffdf9" style={{ font: "700 22px var(--font-bricolage), sans-serif" }}>
            {t.name}
          </text>
          <text x={t.x} y={t.y + (t.home ? 44 : 32)} textAnchor="middle" fill={t.eta === "Same day" ? "#f2b544" : "#cfe7df"} style={{ font: "600 15px var(--font-instrument), sans-serif" }}>
            {t.eta}
          </text>
        </g>
      ))}
    </svg>
  );
}
