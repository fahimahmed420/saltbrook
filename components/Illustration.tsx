/** Hero illustration: a Triangle bungalow with an outdoor unit, drawn as flat shapes (no photos to license, ~2 KB). */
export function HouseIllustration() {
  return (
    <svg viewBox="0 0 480 380" role="img" aria-label="Illustration of a house with a heat pump outside" className="h-auto w-full">
      <rect x="0" y="300" width="480" height="80" rx="0" className="fill-cream-2" />
      <circle cx="390" cy="80" r="46" className="fill-copper" opacity="0.9" />
      <path d="M70 300V170l130-90 130 90v130Z" className="fill-paper" />
      <path d="M50 182 200 76l150 106" fill="none" strokeWidth="18" strokeLinejoin="round" className="stroke-teal" />
      <rect x="100" y="200" width="60" height="56" rx="4" className="fill-teal" opacity="0.9" />
      <path d="M130 200v56M100 228h60" strokeWidth="4" className="stroke-paper" />
      <rect x="230" y="200" width="56" height="100" rx="4" className="fill-copper" />
      <circle cx="275" cy="252" r="4" className="fill-paper" />
      <rect x="250" y="40" width="26" height="60" className="fill-teal" />
      {/* Outdoor unit */}
      <rect x="350" y="236" width="86" height="64" rx="6" className="fill-teal-2" />
      <circle cx="393" cy="268" r="22" fill="none" strokeWidth="5" className="stroke-cream-2" />
      <path d="M393 250v36M375 268h36M380 255l26 26M406 255l-26 26" strokeWidth="3" className="stroke-cream-2" />
      <path d="M330 270h20" strokeWidth="6" strokeLinecap="round" className="stroke-copper" />
      <path d="M20 300h440" strokeWidth="4" className="stroke-line" />
    </svg>
  );
}

/** Static service-area map: five towns placed roughly by real geography, not to scale. No Maps embed, no tracking. */
export function AreaMap() {
  const towns = [
    { name: "Durham", x: 120, y: 90 },
    { name: "Wake Forest", x: 380, y: 60 },
    { name: "Raleigh", x: 330, y: 170, home: true },
    { name: "Cary", x: 230, y: 210 },
    { name: "Apex", x: 190, y: 290 },
  ];
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Map of the service area: Durham, Wake Forest, Raleigh, Cary and Apex" className="h-auto w-full rounded-2xl bg-paper">
      <path d="M60 70C140 20 300 10 430 40c30 90 20 200-30 270-110 40-250 40-330 0C30 230 30 140 60 70Z" className="fill-cream-2" />
      <path d="M90 130c80 20 160 30 330 10" fill="none" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" className="stroke-teal" opacity="0.35" />
      <path d="M120 90 230 210 330 170 380 60M230 210 190 290" fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-line" />
      {towns.map((t) => (
        <g key={t.name}>
          <circle cx={t.x} cy={t.y} r={t.home ? 14 : 9} className={t.home ? "fill-copper" : "fill-teal"} />
          {t.home && <circle cx={t.x} cy={t.y} r="24" fill="none" strokeWidth="2" className="stroke-copper" opacity="0.5" />}
          <text x={t.x} y={t.y - (t.home ? 32 : 18)} textAnchor="middle" className="fill-ink" style={{ font: "700 17px var(--font-bricolage), sans-serif" }}>
            {t.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
