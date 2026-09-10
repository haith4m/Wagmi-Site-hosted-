"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface EventActionsProps {
  id: string;
  published: boolean;
}

export function EventActions({ id, published }: EventActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function togglePublish() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (!res.ok) setError("Could not update publish status.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteEvent() {
    if (!window.confirm("Delete this event? This also removes all RSVPs. This can't be undone.")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) setError("Could not delete the event.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {error && <p className="text-xs text-danger">{error}</p>}
      <Button
        variant={published ? "secondary" : "primary"}
        className="!px-3 !py-1.5 !text-xs"
        disabled={busy}
        onClick={togglePublish}
      >
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button variant="ghost" className="!px-3 !py-1.5 !text-xs !text-danger hover:!text-danger" disabled={busy} onClick={deleteEvent}>
        Delete
      </Button>
    </div>
  );
}