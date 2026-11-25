import { Suspense } from "react";
import { AppHeader } from "@/components/app-header";
import { AppNav } from "@/components/app-nav";

function NavFallback() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 h-16 border-t border-border/70 bg-card/90"
      aria-hidden
    />
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell-bg flex min-h-dvh flex-col">
      <Suspense
        fallback={
          <header className="sticky top-0 z-30 h-[6.5rem] border-b border-border/60 bg-card/90" />
        }
      >
        <AppHeader />
      </Suspense>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-4 sm:px-8">
        {children}
      </main>

      <Suspense fallback={<NavFallback />}>
        <AppNav />
      </Suspense>
    </div>
  );
}
