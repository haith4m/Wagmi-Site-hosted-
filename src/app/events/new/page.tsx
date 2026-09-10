import { redirect } from "next/navigation";
import { EventForm } from "@/components/events/event-form";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "super_admin" || user?.role === "event_manager";
  if (!user) redirect("/login?next=/events/new");
  if (!isAdmin) redirect("/dashboard");

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">Admin · Events</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground">Create an event</h1>
        <p className="mt-4 max-w-2xl text-foreground/80">
          Set the essentials below. You can keep it as a draft and publish later from the admin area.
        </p>
        <div className="mt-10 rounded-3xl border border-foreground/10 bg-surface p-8">
          <EventForm />
        </div>
      </section>
    </main>
  );
}