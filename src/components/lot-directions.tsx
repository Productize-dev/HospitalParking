import { Navigation } from "lucide-react";
import type { DirectionStep } from "@/lib/lots";

type LotDirectionsProps = {
  steps: DirectionStep[];
  driveMinutes: number;
  walkMinutes: number;
};

export function LotDirections({
  steps,
  driveMinutes,
  walkMinutes,
}: LotDirectionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">
            Follow the way
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            ~{driveMinutes} min drive · {walkMinutes} min walk to Building 5
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          <Navigation className="size-3.5" />
          Route
        </span>
      </div>

      {/* Simple path diagram */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-accent/30 to-mist px-4 py-5">
        <svg
          viewBox="0 0 320 88"
          className="h-20 w-full"
          aria-hidden
        >
          <path
            d="M16 64 C 70 64, 90 24, 150 24 S 230 64, 304 40"
            fill="none"
            stroke="oklch(0.38 0.07 230 / 0.35)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M16 64 C 70 64, 90 24, 150 24 S 230 64, 304 40"
            fill="none"
            stroke="oklch(0.38 0.07 230)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
            className="animate-[drift_3s_ease-in-out_infinite_alternate]"
          />
          <circle cx="16" cy="64" r="7" fill="oklch(0.38 0.07 230)" />
          <circle
            cx="304"
            cy="40"
            r="9"
            fill="oklch(0.72 0.1 165)"
            stroke="white"
            strokeWidth="3"
          />
          <text
            x="16"
            y="84"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="9"
            fontWeight="600"
          >
            You
          </text>
          <text
            x="304"
            y="70"
            textAnchor="middle"
            className="fill-available-foreground"
            fontSize="9"
            fontWeight="600"
          >
            Lot
          </text>
        </svg>
      </div>

      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.instruction} className="relative flex gap-4 pb-6 last:pb-0">
            {index < steps.length - 1 ? (
              <span
                className="absolute left-[15px] top-8 bottom-0 w-px bg-border"
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <div className="pt-1">
              <p className="font-medium text-ink">{step.instruction}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
