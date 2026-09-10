import Link from "next/link";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  if (await getCurrentUser()) return redirect("/dashboard");

  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="grain relative hidden min-h-[560px] overflow-hidden bg-surface lg:block">
          <div className="bw-photo absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(115deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 2px, transparent 2px 16px), radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--foreground) 16%, transparent), transparent 72%)" }} aria-hidden />
          <div className="absolute inset-0 bg-background/45" aria-hidden />
          <div className="brush-slash -right-8 top-12 h-[24px] w-[55%] opacity-95" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
            <p className="font-display text-7xl leading-[0.85] text-foreground">WAGMI</p>
            <p className="font-script -mt-3 rotate-[-6deg] text-5xl text-foreground">Club</p>
            <div className="mt-6 inline-flex -rotate-6 items-center gap-2 rounded-[46%_54%_52%_48%/55%_46%_54%_45%] bg-accent px-6 py-3">
              <span className="font-display text-sm text-accent-ink">WAGMI Club</span>
            </div>
            <p className="mt-6 font-kicker text-[11px] uppercase tracking-[0.24em] text-foreground/60">Become together</p>
          </div>
          <p className="absolute bottom-5 left-6 font-kicker text-[10px] uppercase tracking-[0.22em] text-foreground/50">London and beyond</p>
        </div>
        <section className="mx-auto w-full max-w-md px-4 pb-24 pt-14 sm:px-6 lg:pt-20">
          <p className="kicker text-foreground/60">Join the club</p>
          <h1 className="font-display mt-4 text-4xl leading-[0.9] text-foreground sm:text-5xl">Create your WAGMI account</h1>
          <p className="mt-3 text-sm text-foreground/45">
            Free to join. Built for people who keep showing up.
          </p>
          <div className="rule-t mt-8 pt-8">
            <SignupForm />
          </div>
          <p className="mt-6 text-sm text-foreground/45">
            Already a member?{" "}
            <Link href="/login" className="font-semibold text-accent transition hover:text-accent/85">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}