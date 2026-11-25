"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CircleAlert, Info, MapPinned } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", label: "Find parking", icon: MapPinned },
  { href: "/no-spot", label: "Can't find parking?", icon: CircleAlert },
  { href: "/info", label: "Info", icon: Info },
];

export function AppHeader() {
  const pathname = usePathname();
  const [staffMode, setStaffMode] = useState(true);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3 sm:px-8">
        <div>
          <BrandMark size="sm" />
          <p className="mt-0.5 pl-9 text-[0.7rem] text-muted-foreground">
            ZSFG · {staffMode ? "Staff mode" : "Visitor mode"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full px-3 text-xs"
          onClick={() => setStaffMode((v) => !v)}
        >
          Switch
        </Button>
      </div>

      <nav
        className="mx-auto flex max-w-2xl gap-1 overflow-x-auto px-4 pb-2 sm:px-7"
        aria-label="Sections"
      >
        {tabs.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href === "/home" && pathname.startsWith("/lots"));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
