"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accessibility,
  CarFront,
  Clock3,
  Eye,
  Footprints,
  List,
  Navigation,
  Sparkles,
  Star,
} from "lucide-react";
import {
  parkingLots,
  typeLabel,
  type ParkingLot,
} from "@/lib/lots";
import { CampusMap, MapLegend } from "@/components/campus-map";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StatusPill } from "@/components/status-pill";
import { cn } from "@/lib/utils";

type SortKey = "shift" | "night" | "closest" | "best";

export function FindParking() {
  const [maxPrice, setMaxPrice] = useState(10);
  const [maxWalk, setMaxWalk] = useState(15);
  const [openOnly, setOpenOnly] = useState(false);
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [proposedZones, setProposedZones] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("shift");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);

  const filtered = useMemo(() => {
    let lots = parkingLots.filter((lot) => {
      if (maxPrice < 10 && lot.pricePerHour != null && lot.pricePerHour > maxPrice) {
        return false;
      }
      if (lot.walkMinutes > maxWalk) return false;
      if (openOnly && lot.status === "full") return false;
      if (accessibleOnly && lot.type !== "accessible") return false;
      if (!proposedZones && lot.proposed) return false;
      return true;
    });

    lots = [...lots].sort((a, b) => {
      if (sortBy === "closest") return a.walkMinutes - b.walkMinutes;
      if (sortBy === "night") {
        const score = (l: ParkingLot) =>
          (l.type === "garage" ? 0 : 2) + (l.status === "full" ? 3 : 0);
        return score(a) - score(b);
      }
      if (sortBy === "best") {
        const score = (l: ParkingLot) =>
          l.openSpots / Math.max(l.capacity, 1) * 10 - l.walkMinutes;
        return score(b) - score(a);
      }
      // shift fit — prefer open + closer + garage
      const score = (l: ParkingLot) =>
        (l.status === "available" ? 30 : l.status === "limited" ? 15 : 0) +
        (l.type === "garage" ? 10 : 0) -
        l.walkMinutes;
      return score(b) - score(a);
    });

    return lots;
  }, [maxPrice, maxWalk, openOnly, accessibleOnly, proposedZones, sortBy]);

  const selected = filtered.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="space-y-4 pb-2">
      {/* Filters */}
      <section className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Max price / hr</Label>
              <span className="text-xs font-medium text-ink">
                {maxPrice >= 10 ? "Any" : `$${maxPrice}`}
              </span>
            </div>
            <Slider
              value={[maxPrice]}
              min={0}
              max={10}
              step={0.5}
              onValueChange={(v) => setMaxPrice(v[0] ?? 10)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Max walk</Label>
              <span className="text-xs font-medium text-ink">
                {maxWalk >= 15 ? "Any" : `${maxWalk} min`}
              </span>
            </div>
            <Slider
              value={[maxWalk]}
              min={1}
              max={15}
              step={1}
              onValueChange={(v) => setMaxWalk(v[0] ?? 15)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <FilterChip
            active={openOnly}
            onClick={() => setOpenOnly((v) => !v)}
            icon={<CarFront className="size-3.5" />}
            label="Open only"
          />
          <FilterChip
            active={accessibleOnly}
            onClick={() => setAccessibleOnly((v) => !v)}
            icon={<Accessibility className="size-3.5" />}
            label="Accessible only"
          />
          <FilterChip
            active={proposedZones}
            onClick={() => setProposedZones((v) => !v)}
            icon={<Eye className="size-3.5" />}
            label="Proposed zones"
          />
        </div>

        <div>
          <p className="mb-2 text-xs text-muted-foreground">Sort by</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <SortChip
              active={sortBy === "shift"}
              onClick={() => setSortBy("shift")}
              icon={<Clock3 className="size-3.5" />}
              label="Shift fit"
            />
            <SortChip
              active={sortBy === "night"}
              onClick={() => setSortBy("night")}
              icon={<Sparkles className="size-3.5" />}
              label="Night safety"
            />
            <SortChip
              active={sortBy === "closest"}
              onClick={() => setSortBy("closest")}
              icon={<Footprints className="size-3.5" />}
              label="Closest"
            />
            <SortChip
              active={sortBy === "best"}
              onClick={() => setSortBy("best")}
              icon={<Star className="size-3.5" />}
              label="Best"
            />
          </div>
        </div>
      </section>

      <CampusMap
        lots={filtered}
        selectedId={selectedId}
        onSelect={setSelectedId}
        walkMinutes={Math.min(maxWalk, 10)}
      />

      <Button
        variant="secondary"
        className="h-11 w-full gap-2"
        onClick={() => setListOpen(true)}
      >
        <List className="size-4" />
        View as list ({filtered.length})
      </Button>

      <MapLegend />

      {/* Pin detail sheet */}
      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        <SheetContent side="bottom" className="max-h-[85vh] rounded-t-3xl">
          {selected ? (
            <>
              <SheetHeader className="text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {typeLabel[selected.type]}
                    </p>
                    <SheetTitle className="font-heading text-xl">
                      {selected.name}
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground">
                      {selected.address}
                    </p>
                  </div>
                  <StatusPill status={selected.status} />
                </div>
              </SheetHeader>

              <div className="mt-4 space-y-4 overflow-y-auto pb-6">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="font-medium text-ink">
                    {selected.openSpots}/{selected.capacity} open
                  </span>
                  <span>·</span>
                  <span>{selected.rate}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Footprints className="size-3.5" />
                    {selected.walkMinutes} min
                  </span>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <Navigation className="size-3.5" />
                    Follow the way
                  </p>
                  <ol className="space-y-2">
                    {selected.directions.map((step, i) => (
                      <li key={step.instruction} className="flex gap-3 text-sm">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-medium text-ink">{step.instruction}</p>
                          <p className="text-muted-foreground">{step.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <Button asChild size="lg" className="h-11 w-full">
                  <Link href={`/lots/${selected.id}`}>
                    Open spot map & busy times
                  </Link>
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      {/* List sheet */}
      <Sheet open={listOpen} onOpenChange={setListOpen}>
        <SheetContent side="bottom" className="max-h-[90vh] rounded-t-3xl p-0">
          <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
            <SheetTitle className="font-heading text-xl">
              All spots ({filtered.length})
            </SheetTitle>
          </SheetHeader>
          <ul className="space-y-2 overflow-y-auto px-4 py-3 pb-8">
            {filtered.map((lot) => (
              <li key={lot.id}>
                <button
                  type="button"
                  className="flex w-full gap-3 rounded-2xl border border-border/70 bg-card px-3 py-3 text-left transition-colors hover:bg-mist/60"
                  onClick={() => {
                    setListOpen(false);
                    setSelectedId(lot.id);
                  }}
                >
                  <span
                    className={cn(
                      "w-1 shrink-0 rounded-full",
                      lot.type === "accessible" && "bg-[oklch(0.55_0.18_300)]",
                      lot.type === "proposed" && "bg-full",
                      lot.type === "garage" && "bg-primary",
                      lot.type === "metered" && "bg-available",
                      lot.type === "time-limited" && "bg-limited"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading font-semibold text-ink">
                      {lot.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {lot.address}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {lot.rate} · {lot.walkMinutes} min walk
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusPill status={lot.status} />
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {lot.openSpots}/{lot.capacity}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center text-[0.7rem] font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/80 bg-card text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function SortChip({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/80 bg-card text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
