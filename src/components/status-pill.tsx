import { cn } from "@/lib/utils";
import { statusLabel, type LotStatus } from "@/lib/lots";

const styles: Record<LotStatus, string> = {
  available: "bg-available/25 text-available-foreground",
  limited: "bg-limited/30 text-limited-foreground",
  full: "bg-full/15 text-full",
};

export function StatusPill({
  status,
  className,
}: {
  status: LotStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        styles[status],
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "available" && "bg-available",
          status === "limited" && "bg-limited",
          status === "full" && "bg-full"
        )}
      />
      {statusLabel[status]}
    </span>
  );
}
