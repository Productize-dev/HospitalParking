"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleAlert, Info, MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/home", label: "Find", icon: MapPinned },
  { href: "/no-spot", label: "No spot?", icon: CircleAlert },
  { href: "/info", label: "Info", icon: Info },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 backdrop-blur-md"
      aria-label="Main"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href === "/home" && pathname.startsWith("/lots"));

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[0.7rem] font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active ? (
                  <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-primary" />
                ) : null}
                <Icon
                  className={cn(
                    "size-5 transition-transform duration-200",
                    active && "scale-105"
                  )}
                  strokeWidth={active ? 2.25 : 1.75}
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
