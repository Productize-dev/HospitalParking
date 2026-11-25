"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  formatDuration,
  type ParkingSpot,
  type SpotLayout,
} from "@/lib/spots";

type SpotMapProps = {
  layout: SpotLayout;
  lotName: string;
};

export function SpotMap({ layout, lotName }: SpotMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    layout.spots.find((s) => s.state === "busy")?.id ?? null
  );

  const selected = layout.spots.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">
            Spot map
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {layout.levelLabel} · {layout.aisleLabel}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-available" />
            Open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-limited" />
            Busy
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
        <p className="mb-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Drive aisle
        </p>

        <div className="space-y-2">
          {layout.rows.map((row) => {
            const rowSpots = layout.spots.filter((s) => s.row === row);
            return (
              <div key={row} className="flex items-center gap-2">
                <span className="w-4 shrink-0 text-center text-xs font-semibold text-muted-foreground">
                  {row}
                </span>
                <div
                  className="grid flex-1 gap-1.5"
                  style={{
                    gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
                  }}
                >
                  {rowSpots.map((spot) => (
                    <SpotCell
                      key={spot.id}
                      spot={spot}
                      selected={spot.id === selectedId}
                      onSelect={() => setSelectedId(spot.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Drive aisle
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-mist/50 px-4 py-3">
        {selected ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Stall {selected.label}
              </p>
              {selected.state === "open" ? (
                <p className="mt-1 font-heading text-lg font-semibold text-available-foreground">
                  Open — ready to park
                </p>
              ) : (
                <>
                  <p className="mt-1 font-heading text-lg font-semibold text-limited-foreground">
                    Busy for {formatDuration(selected.parkedMinutes)}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Occupied at {lotName}
                  </p>
                </>
              )}
            </div>
            <span
              className={cn(
                "mt-1 rounded-md px-2 py-0.5 text-xs font-medium",
                selected.state === "open"
                  ? "bg-available/25 text-available-foreground"
                  : "bg-limited/30 text-limited-foreground"
              )}
            >
              {selected.state === "open" ? "Open" : "Busy"}
            </span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Tap a stall to see if it’s open or how long it’s been parked.
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat label="Open here" value={String(layout.openCount)} tone="open" />
        <Stat label="Busy here" value={String(layout.busyCount)} tone="busy" />
        <Stat
          label="Longest stay"
          value={
            layout.longestBusyMinutes
              ? formatDuration(layout.longestBusyMinutes)
              : "—"
          }
          tone="neutral"
        />
      </div>
    </div>
  );
}

function SpotCell({
  spot,
  selected,
  onSelect,
}: {
  spot: ParkingSpot;
  selected: boolean;
  onSelect: () => void;
}) {
  const busy = spot.state === "busy";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={
        busy
          ? `${spot.label}, busy ${formatDuration(spot.parkedMinutes)}`
          : `${spot.label}, open`
      }
      className={cn(
        "relative aspect-[3/4] rounded-md border transition-all duration-200",
        busy
          ? "border-limited/50 bg-limited/80 hover:bg-limited"
          : "border-available/40 bg-available/70 hover:bg-available",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.04]"
      )}
    >
      {busy ? (
        <span className="absolute inset-x-0 bottom-0.5 text-center text-[0.55rem] font-semibold leading-none text-limited-foreground/90">
          {formatDuration(spot.parkedMinutes)}
        </span>
      ) : null}
    </button>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "open" | "busy" | "neutral";
}) {
  return (
    <div className="rounded-xl bg-card/80 px-2 py-3 ring-1 ring-border/60">
      <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-heading text-lg font-semibold",
          tone === "open" && "text-available-foreground",
          tone === "busy" && "text-limited-foreground",
          tone === "neutral" && "text-ink"
        )}
      >
        {value}
      </p>
    </div>
  );
}
