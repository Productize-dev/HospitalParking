import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SpotPage() {
  return (
    <div className="space-y-8">
      <section className="animate-fade-up">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-ink">
          My spot
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your active parking session will show here. This is a design mock for
          now.
        </p>
      </section>

      <section className="animate-fade-up-delay relative overflow-hidden rounded-3xl bg-primary px-6 py-8 text-primary-foreground shadow-[0_24px_48px_-24px_oklch(0.38_0.07_230/0.55)]">
        <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 left-10 size-28 rounded-full bg-white/5" />

        <p className="relative text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground/70">
          Active session
        </p>
        <p className="relative mt-3 font-heading text-3xl font-semibold tracking-tight">
          23rd Street Garage · P2
        </p>
        <p className="relative mt-1 text-sm text-primary-foreground/75">
          Space B-214 · 2500 24th St
        </p>

        <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
          <div>
            <p className="text-xs text-primary-foreground/65">Checked in</p>
            <p className="mt-0.5 text-lg font-medium">9:42 AM</p>
          </div>
          <div>
            <p className="text-xs text-primary-foreground/65">Parked for</p>
            <p className="mt-0.5 text-lg font-medium">1h 18m</p>
          </div>
          <div>
            <p className="text-xs text-primary-foreground/65">Est. total</p>
            <p className="mt-0.5 text-lg font-medium">$10.00</p>
          </div>
        </div>
      </section>

      <section className="animate-fade-up-delay-2 space-y-3">
        <Button asChild size="lg" variant="outline" className="h-11 w-full bg-card/70">
          <Link href="/lots">Change lot</Link>
        </Button>
        <Button size="lg" variant="ghost" className="h-11 w-full text-muted-foreground" disabled>
          End session (coming soon)
        </Button>
      </section>
    </div>
  );
}
