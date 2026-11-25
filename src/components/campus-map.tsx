"use client";

import { cn } from "@/lib/utils";
import {
  statusRing,
  typeColor,
  type ParkingLot,
  type LotStatus,
} from "@/lib/lots";

type CampusMapProps = {
  lots: ParkingLot[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  walkMinutes: number;
};

export function CampusMap({
  lots,
  selectedId,
  onSelect,
  walkMinutes,
}: CampusMapProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-border/60 shadow-[0_12px_40px_-20px_oklch(0.42_0.12_255/0.45)]">
      <div className="relative aspect-[4/3] w-full bg-[oklch(0.91_0.035_230)] sm:aspect-[5/3]">
        <MapBase />

        {/* Soft walk radius */}
        <div
          className="pointer-events-none absolute left-1/2 top-[46%] z-[5] aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-dashed border-primary/45"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.12 255 / 0.1) 0%, oklch(0.55 0.12 255 / 0.03) 55%, transparent 72%)",
          }}
          aria-hidden
        />

        <span className="pointer-events-none absolute right-[6%] top-[46%] z-[6] -translate-y-1/2 rounded-full bg-card/95 px-2 py-1 text-[0.65rem] font-semibold tracking-wide text-primary shadow-[0_4px_14px_-4px_oklch(0.4_0.1_255/0.4)] backdrop-blur-sm">
          ~{walkMinutes} min walk
        </span>

        {/* Hospital destination */}
        <div
          className="absolute left-1/2 top-[46%] z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-[0.65rem] font-bold tracking-tight text-primary-foreground shadow-[0_8px_20px_-6px_oklch(0.4_0.12_255/0.7)] ring-2 ring-white"
          title="ZSFG Main Hospital"
        >
          H
        </div>

        {lots.map((lot) => (
          <MapPin
            key={lot.id}
            lot={lot}
            selected={lot.id === selectedId}
            onSelect={() => onSelect(lot.id)}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] bg-gradient-to-t from-[oklch(0.88_0.04_230/0.85)] to-transparent px-3 pb-3 pt-8">
          <p className="text-center text-[0.7rem] font-medium text-primary/75">
            Tap a pin for details
          </p>
        </div>
      </div>
    </div>
  );
}

/** Stylized ZSFG-ish block grid: soft blue parcels + white street channels */
function MapBase() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="parcel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.84 0.045 225)" />
          <stop offset="100%" stopColor="oklch(0.78 0.05 230)" />
        </linearGradient>
        <linearGradient id="hospital" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.06 235)" />
          <stop offset="100%" stopColor="oklch(0.62 0.07 245)" />
        </linearGradient>
        <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.05 160)" />
          <stop offset="100%" stopColor="oklch(0.8 0.06 155)" />
        </linearGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1.2"
            floodColor="oklch(0.4 0.05 240)"
            floodOpacity="0.12"
          />
        </filter>
      </defs>

      {/* Street canvas */}
      <rect width="400" height="300" fill="oklch(0.97 0.01 230)" />

      {/* City blocks — leave thick white gaps as streets */}
      <g filter="url(#soft)">
        {/* Top row */}
        <rect x="8" y="8" width="70" height="52" rx="6" fill="url(#parcel)" />
        <rect x="90" y="8" width="88" height="52" rx="6" fill="url(#parcel)" />
        <rect x="190" y="8" width="100" height="52" rx="6" fill="url(#parcel)" />
        <rect x="302" y="8" width="90" height="52" rx="6" fill="url(#parcel)" />

        {/* Mid-left */}
        <rect x="8" y="72" width="70" height="70" rx="6" fill="url(#parcel)" />
        <rect x="90" y="72" width="88" height="70" rx="6" fill="url(#green)" />

        {/* Building 5 — main hospital mass */}
        <rect
          x="190"
          y="72"
          width="100"
          height="96"
          rx="8"
          fill="url(#hospital)"
        />
        {/* Window hints on hospital */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <rect
              key={`w-${row}-${col}`}
              x={200 + col * 17}
              y={84 + row * 18}
              width="10"
              height="8"
              rx="1.5"
              fill="oklch(0.88 0.04 230 / 0.55)"
            />
          ))
        )}

        <rect x="302" y="72" width="90" height="70" rx="6" fill="url(#parcel)" />

        {/* Lower band */}
        <rect x="8" y="156" width="70" height="64" rx="6" fill="url(#parcel)" />
        <rect x="90" y="156" width="88" height="64" rx="6" fill="url(#parcel)" />
        <rect x="302" y="156" width="90" height="64" rx="6" fill="url(#parcel)" />

        {/* Garage block (east) */}
        <rect
          x="302"
          y="72"
          width="90"
          height="70"
          rx="6"
          fill="oklch(0.7 0.055 250)"
          opacity="0.35"
        />

        {/* Bottom row */}
        <rect x="8" y="234" width="110" height="58" rx="6" fill="url(#parcel)" />
        <rect x="130" y="234" width="150" height="58" rx="6" fill="url(#parcel)" />
        <rect x="292" y="234" width="100" height="58" rx="6" fill="url(#parcel)" />
      </g>

      {/* Street centerlines (subtle) */}
      <g stroke="oklch(0.9 0.02 230)" strokeWidth="1" strokeDasharray="4 6" opacity="0.7">
        <line x1="82" y1="0" x2="82" y2="300" />
        <line x1="184" y1="0" x2="184" y2="300" />
        <line x1="296" y1="0" x2="296" y2="300" />
        <line x1="0" y1="66" x2="400" y2="66" />
        <line x1="0" y1="148" x2="400" y2="148" />
        <line x1="0" y1="226" x2="400" y2="226" />
      </g>

      {/* Street labels */}
      <g
        fill="oklch(0.45 0.05 250 / 0.55)"
        fontSize="8"
        fontWeight="600"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        letterSpacing="0.06em"
      >
        <text x="12" y="148" transform="rotate(-90 12 148)">
          22ND
        </text>
        <text x="188" y="148" transform="rotate(-90 188 148)">
          23RD
        </text>
        <text x="200" y="292">
          POTRERO AVE
        </text>
        <text x="310" y="68">
          24TH
        </text>
      </g>

      {/* Small park trees */}
      <g fill="oklch(0.72 0.1 155 / 0.7)">
        <circle cx="120" cy="100" r="5" />
        <circle cx="138" cy="112" r="4" />
        <circle cx="152" cy="98" r="5.5" />
      </g>
    </svg>
  );
}

function MapPin({
  lot,
  selected,
  onSelect,
}: {
  lot: ParkingLot;
  selected: boolean;
  onSelect: () => void;
}) {
  const isGarage = lot.type === "garage" && lot.capacity >= 200;
  const ring = statusRing[lot.status];
  const fill = typeColor[lot.type];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group absolute z-20 -translate-x-1/2 -translate-y-[70%] transition-transform duration-200 ease-out",
        selected ? "z-30 scale-110" : "hover:scale-105 hover:z-30"
      )}
      style={{ left: `${lot.mapX}%`, top: `${lot.mapY}%` }}
      aria-label={`${lot.name}, ${lot.openSpots} of ${lot.capacity} open`}
      aria-pressed={selected}
    >
      <span className="relative flex flex-col items-center drop-shadow-[0_8px_16px_oklch(0.35_0.06_250/0.35)]">
        {/* Pin body */}
        <span className="relative">
          {lot.proposed ? (
            <span
              className="absolute -inset-1.5 rounded-full border-2 border-dashed opacity-90"
              style={{ borderColor: statusRing.full }}
            />
          ) : null}

          <span
            className={cn(
              "relative flex items-center justify-center bg-white transition-shadow",
              isGarage ? "size-9 rounded-[10px]" : "size-7 rounded-full",
              selected && "ring-2 ring-primary ring-offset-2 ring-offset-[oklch(0.91_0.035_230)]"
            )}
            style={{
              boxShadow: `0 0 0 3.5px ${ring}, 0 6px 14px -4px oklch(0.3 0.05 250 / 0.35)`,
            }}
          >
            <span
              className={cn(
                isGarage ? "size-[18px] rounded-md" : "size-3 rounded-full"
              )}
              style={{ backgroundColor: fill }}
            />
          </span>

          {/* Pin tip */}
          {!isGarage ? (
            <span
              className="absolute left-1/2 top-[85%] h-2 w-2 -translate-x-1/2 rotate-45 rounded-[1px]"
              style={{ backgroundColor: ring }}
            />
          ) : null}
        </span>

        {/* Capacity badge */}
        <span
          className={cn(
            "mt-2 rounded-full px-1.5 py-0.5 text-[0.6rem] font-bold tabular-nums tracking-tight shadow-[0_2px_8px_-2px_oklch(0.3_0.05_250/0.35)]",
            badgeClass(lot.status),
            selected && "ring-1 ring-primary/40"
          )}
        >
          {lot.openSpots}/{lot.capacity}
        </span>
      </span>
    </button>
  );
}

function badgeClass(status: LotStatus) {
  if (status === "available") return "bg-available text-available-foreground";
  if (status === "limited") return "bg-limited text-limited-foreground";
  return "bg-full text-full-foreground";
}

export function MapLegend() {
  return (
    <div className="space-y-3 rounded-2xl border border-border/70 bg-card/90 px-4 py-3.5 text-xs shadow-sm">
      <div>
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Availability (outer ring)
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <LegendDot color={statusRing.available} label="Open" />
          <LegendDot color={statusRing.limited} label="Filling up" />
          <LegendDot color={statusRing.full} label="Full" />
        </div>
      </div>
      <div className="border-t border-border/50 pt-3">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Spot type (inner)
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <LegendDot color={typeColor.garage} label="Garage" />
          <LegendDot color={typeColor.metered} label="Metered street" />
          <LegendDot color={typeColor["time-limited"]} label="Time-limited" />
          <LegendDot color={typeColor.accessible} label="Accessible" />
          <LegendDot color={typeColor.proposed} label="Proposed zone" dashed />
        </div>
      </div>
    </div>
  );
}

function LegendDot({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span
        className={cn(
          "size-2.5 rounded-full shadow-sm",
          dashed && "outline outline-1 outline-dashed outline-offset-1"
        )}
        style={{ backgroundColor: color, outlineColor: color }}
      />
      {label}
    </span>
  );
}
