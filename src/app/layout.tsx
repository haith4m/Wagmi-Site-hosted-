import type { Metadata } from "next";
import { Archivo_Black, Inter, Caveat, Space_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const display = Archivo_Black({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const script = Caveat({
  weight: ["600", "700"],
  variable: "--font-script",
  subsets: ["latin"],
});

const kicker = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-kicker",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WAGMI Club — Run Together",
    template: "%s · WAGMI Club",
  },
  description: "WAGMI Club — premium London running club. Running. Community. Progress.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} ${kicker.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("wagmi-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t;}catch(e){}})();',
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

