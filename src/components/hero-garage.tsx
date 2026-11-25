export function HeroGarage() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 hero-atmosphere" />
      <div className="animate-soft-pulse absolute -right-10 top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-[55%]">
        {/* Soft campus skyline — parking decks + hospital wing */}
        <svg
          viewBox="0 0 800 320"
          className="absolute bottom-0 h-full w-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.42 0.05 230)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.28 0.04 235)" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="wing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.04 220)" />
              <stop offset="100%" stopColor="oklch(0.35 0.04 230)" />
            </linearGradient>
          </defs>
          {/* Hospital wing */}
          <rect x="480" y="40" width="280" height="280" fill="url(#wing)" rx="4" />
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={500 + col * 48}
                y={60 + row * 40}
                width={28}
                height={22}
                rx="2"
                fill="oklch(0.78 0.05 210 / 0.55)"
              />
            ))
          )}
          {/* Garage decks */}
          <rect x="40" y="110" width="400" height="210" fill="url(#deck)" rx="6" />
          {[0, 1, 2, 3].map((level) => (
            <g key={level}>
              <rect
                x="55"
                y={130 + level * 42}
                width="370"
                height="28"
                rx="3"
                fill="oklch(0.55 0.04 220 / 0.35)"
              />
              {Array.from({ length: 8 }).map((_, i) => (
                <rect
                  key={i}
                  x={70 + i * 44}
                  y={138 + level * 42}
                  width={28}
                  height={12}
                  rx="1.5"
                  fill="oklch(0.75 0.08 195 / 0.45)"
                />
              ))}
            </g>
          ))}
          {/* Soft ground fog */}
          <ellipse
            cx="400"
            cy="310"
            rx="420"
            ry="40"
            fill="oklch(0.94 0.02 210 / 0.7)"
          />
        </svg>
      </div>
    </div>
  );
}
