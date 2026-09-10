"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Event, RsvpStatus } from "@/types";

interface RsvpPanelProps {
  event: Event;
  /** True once the signed-in user already has a "going"/"interested" RSVP. */
  hasRsvp: boolean;
  isFull: boolean;
}

export function RsvpPanel({ event, hasRsvp, isFull }: RsvpPanelProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(hasRsvp);
  const router = useRouter();

  async function rsvp(status: RsvpStatus) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${event.id}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, plusGuests: 0 }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not save your RSVP.");
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function cancel() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${event.id}/rsvp`, { method: "DELETE" });
      if (!res.ok) setError("Could not cancel your RSVP.");
      setDone(false);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  const spotsLeft = Math.max(0, event.capacity - event.attending);
  const pct = event.capacity > 0 ? Math.round((event.attending / event.capacity) * 100) : 0;

  return (
    <div className="rounded-md border border-foreground/10 bg-surface p-6">
      <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/50">RSVP — Race bib</p>
      <p className="font-display mt-4 text-3xl leading-[0.9] text-foreground">
        {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left` : "Event full"}
      </p>
      <div className="mt-4 h-1 overflow-hidden bg-foreground/10">
        <div className="h-full bg-accent" style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
      <p className="mt-2 font-kicker text-[11px] uppercase tracking-[0.16em] text-foreground/40">
        {event.attending} of {event.capacity} attending
      </p>

      {error && (
        <p role="alert" className="mt-4 rounded-md border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-5 space-y-3">
        {!done ? (
          <>
            <Button className="w-full" disabled={busy || isFull} onClick={() => rsvp("going")}>
              {isFull ? "Join waitlist" : "Yes, I'm going"}
            </Button>
            <Button variant="secondary" className="w-full" disabled={busy} onClick={() => rsvp("interested")}>
              Maybe — keep me posted
            </Button>
          </>
        ) : (
          <>
            <p className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 text-sm font-medium text-accent">
              You&apos;re on the list. See you there!
            </p>
            <Button variant="ghost" className="w-full" disabled={busy} onClick={cancel}>
              Cancel my RSVP
            </Button>
          </>
        )}
      </div>
    </div>
  );
}