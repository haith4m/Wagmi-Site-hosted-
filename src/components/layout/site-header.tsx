"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { href: "/events", label: "Runs" },
  { href: "/community", label: "Feed" },
  { href: "/gallery", label: "Photos" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader({ sessionUser }: { sessionUser: { displayName: string } | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-baseline gap-1.5" aria-label="WAGMI Club home">
          <span className="font-display text-[22px] leading-none tracking-tight text-foreground">
            WAGMI
          </span>
          <span className="font-script -ml-1 -rotate-6 text-[22px] leading-none text-foreground transition group-hover:text-accent">
            Club
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-kicker text-[12px] font-bold uppercase tracking-[0.18em] transition ${
                  active ? "text-foreground underline decoration-accent decoration-2 underline-offset-8" : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {sessionUser ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-foreground/5 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-foreground transition hover:border-foreground/40"
            >
              <span className="flex h-7 w-7 items-center justify-center bg-accent font-display text-[12px] text-accent-ink">
                {sessionUser.displayName.charAt(0).toUpperCase()}
              </span>
              <span className="hidden sm:inline">{sessionUser.displayName.split(" ")[0]}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden font-kicker text-[12px] font-bold uppercase tracking-[0.16em] text-foreground/60 transition hover:text-foreground sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-accent-ink transition hover:bg-accent/85"
              >
                Join <span aria-hidden>→</span>
              </Link>
            </>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-foreground transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-foreground transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden border-t border-foreground/10 bg-background">
        <div className="ticker-track gap-0 py-1.5 font-kicker text-[10px] uppercase tracking-[0.22em] text-foreground/40">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center" aria-hidden={n === 1}>
              {["Hackney — 07:00", "5K Social", "All paces", "London and beyond", "Community moves differently"].map((t) => (
                <span key={`${n}-${t}`} className="flex items-center">
                  <span className="px-4">{t}</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {open && (
        <nav className="fixed inset-x-0 top-full bottom-0 z-40 flex flex-col bg-background px-6 pb-10 pt-8 md:hidden" aria-label="Mobile" style={{ height: "calc(100dvh - 100%)" }}>
          <div className="flex flex-col gap-2">
            <Link href="/" onClick={() => setOpen(false)} className="rule-t py-4 font-display text-5xl text-foreground">
              Run
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rule-t py-4 font-display text-5xl text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="font-script mt-auto -rotate-3 text-4xl text-foreground/25">Club</p>
          <p className="mt-2 font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            London and beyond
          </p>
          <div className="mt-6 flex items-center justify-between rule-t pt-6">
            <span className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              Theme
            </span>
            <ThemeToggle />
          </div>
          {!sessionUser && (
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-accent-ink"
            >
              Join the community <span aria-hidden>→</span>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
