import { notFound, redirect } from "next/navigation";
import { EventForm } from "@/components/events/event-form";
import { services } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();
  const event = await services.events.getBySlug(slug);
  if (!event) notFound();

  const isAdmin = user?.role === "super_admin" || user?.role === "event_manager";
  if (!user) redirect(`/login?next=/events/${slug}/edit`);
  if (!isAdmin) redirect("/dashboard");

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">Admin · Events</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground">Edit event</h1>
        <p className="mt-4 max-w-2xl text-foreground/80">
          Update the details, adjust capacity, or change the publish status.
        </p>
        <div className="mt-10 rounded-3xl border border-foreground/10 bg-surface p-8">
          <EventForm event={event} />
        </div>
      </section>
    </main>
  );
}