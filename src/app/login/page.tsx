import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

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
            <p className="mt-8 font-kicker text-[11px] uppercase tracking-[0.24em] text-foreground/60">Run together — Build together</p>
          </div>
          <p className="absolute bottom-5 left-6 font-kicker text-[10px] uppercase tracking-[0.22em] text-foreground/50">London and beyond</p>
        </div>
        <section className="mx-auto w-full max-w-md px-4 pb-24 pt-14 sm:px-6 lg:pt-20">
          <p className="kicker text-foreground/60">Welcome back</p>
          <h1 className="font-display mt-4 text-4xl leading-[0.9] text-foreground sm:text-5xl">Sign in to WAGMI</h1>
          <p className="mt-3 text-sm text-foreground/45">
            Your sessions, RSVPs, and streak are waiting.
          </p>
          <div className="rule-t mt-8 pt-8">
            <LoginForm />
          </div>
          <p className="mt-6 text-sm text-foreground/45">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-accent transition hover:text-accent/85">
              Create an account
            </Link>
          </p>
          <p className="mt-2 text-xs text-foreground/35">
            Forgot your password? Password recovery lands with Supabase Auth.
          </p>
        </section>
      </div>
    </main>
  );
}