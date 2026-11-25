import Link from "next/link";
import { campus } from "@/lib/lots";
import { Button } from "@/components/ui/button";

export default function InfoPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <section>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink">
          Info
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Campus parking context for {campus.shortName}. Design-only for now.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-border/70 bg-card/80 px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Campus
          </p>
          <p className="mt-1 font-heading text-lg font-semibold text-ink">
            {campus.name}
          </p>
          <p className="text-sm text-muted-foreground">{campus.address}</p>
          <p className="text-sm text-muted-foreground">{campus.phone}</p>
        </div>
        <div className="border-t border-border/60 pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Main garage
          </p>
          <p className="mt-1 text-sm text-ink">
            23rd Street Parking Garage · 2500 24th St · 836 spaces · $5 first
            hour · $29 daily max
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <Button asChild variant="outline" className="h-11 w-full justify-start">
          <Link href="/lots/23rd-street-garage">Garage spot map</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 w-full justify-start">
          <Link href="/spot">My spot (demo)</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 w-full justify-start">
          <Link href="/account">Account (demo)</Link>
        </Button>
        <Button asChild variant="ghost" className="h-11 w-full text-muted-foreground">
          <Link href="/">Sign out</Link>
        </Button>
      </section>
    </div>
  );
}
