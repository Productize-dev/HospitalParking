import Link from "next/link";
import { Bus, CarFront, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoSpotPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <section>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink">
          Can&apos;t find parking?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Quick options when the garage and nearby lots look full. Design
          preview — actions are not live yet.
        </p>
      </section>

      <ul className="space-y-3">
        <li className="rounded-2xl border border-border/70 bg-card/80 px-4 py-4">
          <div className="flex gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CarFront className="size-5" />
            </span>
            <div>
              <p className="font-heading font-semibold text-ink">
                Widen your search
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Turn on proposed zones and raise max walk on Find parking.
              </p>
            </div>
          </div>
        </li>
        <li className="rounded-2xl border border-border/70 bg-card/80 px-4 py-4">
          <div className="flex gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Bus className="size-5" />
            </span>
            <div>
              <p className="font-heading font-semibold text-ink">
                Shuttle & transit
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Muni stops and campus shuttles are marked on the ZSFG map.
              </p>
            </div>
          </div>
        </li>
        <li className="rounded-2xl border border-border/70 bg-card/80 px-4 py-4">
          <div className="flex gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <MessageCircle className="size-5" />
            </span>
            <div>
              <p className="font-heading font-semibold text-ink">
                Report a full lot
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Coming soon — help staff see which blocks are overflowing.
              </p>
            </div>
          </div>
        </li>
      </ul>

      <Button asChild size="lg" className="h-11 w-full">
        <Link href="/home">Back to map</Link>
      </Button>
    </div>
  );
}
