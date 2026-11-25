import { MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
};

const sizes = {
  sm: { mark: "size-7", icon: "size-3.5", word: "text-base" },
  md: { mark: "size-9", icon: "size-4", word: "text-lg" },
  lg: { mark: "size-12", icon: "size-5", word: "text-2xl" },
};

export function BrandMark({
  className,
  size = "md",
  showWordmark = true,
}: BrandMarkProps) {
  const s = sizes[size];

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_-10px_oklch(0.42_0.12_255/0.8)]",
          s.mark
        )}
        aria-hidden
      >
        <MapPinned className={s.icon} strokeWidth={2.25} />
      </span>
      {showWordmark ? (
        <span
          className={cn(
            "font-heading font-semibold tracking-tight text-ink",
            s.word
          )}
        >
          ParkCare
        </span>
      ) : null}
    </div>
  );
}
