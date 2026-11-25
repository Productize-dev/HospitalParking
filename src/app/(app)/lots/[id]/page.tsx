import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLot, parkingLots, typeLabel } from "@/lib/lots";
import { buildSpotLayout } from "@/lib/spots";
import { StatusPill } from "@/components/status-pill";
import { OccupancyBar } from "@/components/occupancy-bar";
import { SpotMap } from "@/components/spot-map";
import { LotDirections } from "@/components/lot-directions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return parkingLots.map((lot) => ({ id: lot.id }));
}

export default function LotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<LotDetailFallback />}>
      <LotDetail params={params} />
    </Suspense>
  );
}

function LotDetailFallback() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-24 rounded-md bg-muted" />
      <div className="h-10 w-48 rounded-md bg-muted" />
      <div className="h-64 rounded-2xl bg-muted" />
    </div>
  );
}

async function LotDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lot = getLot(id);

  if (!lot) notFound();

  const layout = buildSpotLayout(
    lot.id,
    lot.capacity,
    lot.openSpots,
    lot.levels
  );

  return (
    <div className="space-y-10">
      <div className="animate-fade-up">
        <Link
          href="/lots"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All lots
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {typeLabel[lot.type]}
            </p>
            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-ink">
              {lot.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{lot.address}</p>
          </div>
          <StatusPill status={lot.status} className="mt-1" />
        </div>

        <div className="mt-5 space-y-2">
          <OccupancyBar open={lot.openSpots} capacity={lot.capacity} />
          <p className="text-xs text-muted-foreground">
            Lot-wide sample · map below shows {layout.levelLabel} in detail
          </p>
        </div>
      </div>

      <section className="animate-fade-up-delay">
        <SpotMap layout={layout} lotName={lot.name} />
      </section>

      <Separator />

      <section className="animate-fade-up-delay-2">
        <LotDirections
          steps={lot.directions}
          driveMinutes={lot.driveMinutes}
          walkMinutes={lot.walkMinutes}
        />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">Nearby</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {lot.near.map((place) => (
              <span
                key={place}
                className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                {place}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">Rates</h2>
          <p className="mt-1 text-sm text-muted-foreground">{lot.rate}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{lot.note}</p>

        {lot.status === "full" ? (
          <Button size="lg" className="h-11 w-full" disabled>
            Lot is full
          </Button>
        ) : (
          <Button asChild size="lg" className="h-11 w-full">
            <Link href="/spot">Park in an open stall</Link>
          </Button>
        )}
      </section>
    </div>
  );
}
