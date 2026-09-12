"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { href: "/runs", label: "Runs" },
  { href: "/community", label: "Community" },
  { href: "/photos", label: "Photos" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center" aria-label="WAGMI Club home">
          <span
            className={`logo-mask w-[50px] sm:w-[58px] ${pathname === "/" ? "logo-mask--active" : "group-hover:bg-[#cdbb9d]"}`}
            style={{ aspectRatio: "1 / 1" }}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-kicker text-[12px] font-bold uppercase tracking-[0.18em] transition ${
                  active ? "text-foreground underline decoration-accent decoration-2 underline-offset-8" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/signup" className="hidden font-kicker text-[12px] font-bold uppercase tracking-[0.16em] text-muted transition hover:text-foreground sm:inline-flex">
            Sign in
          </Link>
          <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-accent-ink transition hover:bg-accent/85 sm:inline-flex">
            Join us <span aria-hidden>→</span>
          </Link>

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

      {open && (
        <nav className="fixed inset-x-0 top-full bottom-0 z-40 flex flex-col bg-background px-6 pb-10 pt-8 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rule-t py-4 font-display text-5xl text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="font-script mt-auto -rotate-3 text-4xl text-foreground/25">Club</p>
          <p className="mt-2 font-kicker text-[11px] uppercase tracking-[0.22em] text-muted">London and beyond</p>
          <div className="mt-6 flex items-center justify-between rule-t pt-6">
            <span className="font-kicker text-[11px] uppercase tracking-[0.22em] text-muted">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-accent-ink transition hover:bg-accent/85"
          >
            Join us <span aria-hidden>→</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
