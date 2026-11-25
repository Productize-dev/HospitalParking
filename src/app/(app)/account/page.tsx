import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const rows = [
  { label: "Vehicles", value: "Honda Civic · ABC 1234" },
  { label: "Payment", value: "Visa ···· 4242" },
  { label: "Notifications", value: "Lot alerts on" },
  { label: "Help", value: "Campus parking desk" },
];

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <section className="animate-fade-up">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-ink">
          Account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Profile details are placeholders for the design pass.
        </p>
      </section>

      <section className="animate-fade-up-delay flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary font-heading text-xl font-semibold text-secondary-foreground">
          AV
        </div>
        <div>
          <p className="font-heading text-xl font-semibold text-ink">
            Alex Visitor
          </p>
          <p className="text-sm text-muted-foreground">visitor@parkside.demo</p>
        </div>
      </section>

      <section className="animate-fade-up-delay-2 overflow-hidden rounded-2xl border border-border/70 bg-card/70">
        {rows.map((row, index) => (
          <div key={row.label}>
            {index > 0 ? <Separator /> : null}
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-mist/50"
            >
              <div>
                <p className="text-sm font-medium text-ink">{row.label}</p>
                <p className="text-sm text-muted-foreground">{row.value}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </section>

      <Button asChild variant="outline" size="lg" className="h-11 w-full bg-card/70">
        <Link href="/">Sign out</Link>
      </Button>
    </div>
  );
}
