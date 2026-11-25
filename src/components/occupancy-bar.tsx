import { cn } from "@/lib/utils";

type OccupancyBarProps = {
  open: number;
  capacity: number;
  className?: string;
  showLabel?: boolean;
};

export function OccupancyBar({
  open,
  capacity,
  className,
  showLabel = true,
}: OccupancyBarProps) {
  const busy = Math.max(0, capacity - open);
  const busyPct = capacity === 0 ? 100 : (busy / capacity) * 100;
  const openPct = 100 - busyPct;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
        <span
          className="bg-available transition-[width] duration-500"
          style={{ width: `${openPct}%` }}
        />
        <span
          className="bg-limited transition-[width] duration-500"
          style={{ width: `${busyPct}%` }}
        />
      </div>
      {showLabel ? (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-available-foreground">{open} open</span>
          {" · "}
          <span className="font-medium text-limited-foreground">{busy} busy</span>
          {" · "}
          {capacity} total
        </p>
      ) : null}
    </div>
  );
}
