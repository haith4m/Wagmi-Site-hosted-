"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ContentStatus } from "@/types";

interface PostModerationProps {
  id: string;
  status: ContentStatus;
}

export function PostModeration({ id, status }: PostModerationProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function setStatus(next: ContentStatus) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/community/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) setError("Could not update status.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Remove this post permanently?")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/community/${id}`, { method: "DELETE" });
      if (!res.ok) setError("Could not remove the post.");
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
      {status !== "published" && (
        <Button variant="primary" className="!px-3 !py-1.5 !text-xs" disabled={busy} onClick={() => setStatus("published")}>
          Approve
        </Button>
      )}
      {status !== "pending" && (
        <Button variant="secondary" className="!px-3 !py-1.5 !text-xs" disabled={busy} onClick={() => setStatus("pending")}>
          Set pending
        </Button>
      )}
      <Button variant="ghost" className="!px-3 !py-1.5 !text-xs !text-danger hover:!text-danger" disabled={busy} onClick={remove}>
        Remove
      </Button>
    </div>
  );
}