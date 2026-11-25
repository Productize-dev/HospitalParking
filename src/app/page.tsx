import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { HeroGarage } from "@/components/hero-garage";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <HeroGarage />

      <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10">
        <BrandMark size="md" />
        <Button asChild variant="ghost" className="text-ink/80">
          <Link href="/login">Sign in</Link>
        </Button>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 pt-24 sm:px-10 sm:pb-20">
        <div className="max-w-xl">
          <p className="animate-fade-up font-heading text-5xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl">
            ParkCare
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-md text-balance text-xl font-medium leading-snug text-ink/90 sm:text-2xl">
            See open parking on the ZSFG map.
          </h1>
          <p className="animate-fade-up-delay mt-3 max-w-sm text-pretty text-base leading-relaxed text-ink/65">
            Pin the garage and public lots, check what&apos;s busy, and follow
            the way in — built for staff and visitors.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 px-6">
              <Link href="/login">Get started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 bg-card/60 px-6 backdrop-blur-sm"
            >
              <Link href="/home">Open the map</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
