import Link from "next/link";

const NAV_ITEMS = [
  { href: "/runs", label: "Runs" },
  { href: "/community", label: "Community" },
  { href: "/photos", label: "Photos" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M16.6 3c.4 2.1 1.8 3.6 3.9 3.9v2.6c-1.5 0-2.9-.5-3.9-1.3v5.6c0 3.4-2.5 6.2-6 6.2-3.1 0-5.6-2.5-5.6-5.6 0-3.3 2.9-5.9 6.3-5.5v2.7c-.3-.1-.6-.1-.9-.1-1.6 0-2.8 1.3-2.8 2.9 0 1.6 1.3 2.9 2.9 2.9 1.7 0 3.5-1.3 3.5-3.5V3h2.6Z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://www.instagram.com/wagmiclub_/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/@wagmiclub_", label: "TikTok", Icon: TikTokIcon },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Link href="/" className="group inline-flex items-center" aria-label="WAGMI Club home">
              <span
                className="logo-mask block w-[200px]"
                style={{ aspectRatio: "1818 / 865" }}
                role="img"
                aria-label="WAGMI Club logo"
              />
            </Link>
            <p className="font-kicker mt-3 text-[11px] uppercase tracking-[0.24em] text-muted">We&rsquo;re all gonna make it.</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              A London running community. Mondays, 7PM, North Greenwich. All paces, all backgrounds — just turn up.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <p className="font-kicker text-[11px] uppercase tracking-[0.24em] text-muted/70">Club</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-foreground/80 transition hover:text-accent">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-kicker text-[11px] uppercase tracking-[0.24em] text-muted/70">Follow</p>
              <ul className="mt-4 flex flex-col gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-foreground/80 transition hover:text-accent"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line">
                        <Icon />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rule-t mt-14 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-kicker text-[11px] uppercase tracking-[0.24em] text-muted">
            A brighter tomorrow. Together.
          </p>
          <p className="font-kicker text-[11px] uppercase tracking-[0.24em] text-muted/60">
            &copy; {new Date().getFullYear()} WAGMI Club — London
          </p>
        </div>
      </div>
    </footer>
  );
}

