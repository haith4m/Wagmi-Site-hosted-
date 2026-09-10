"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/form";

export function PostComposer() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not publish your post.");
        return;
      }
      setTitle("");
      setBody("");
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-foreground/10 bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">Share an update</p>
      {success && (
        <p className="mt-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm text-accent">
          Thanks! Your post is pending moderation and will appear in the feed soon.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}
      <div className="mt-4 space-y-4">
        <Field label="Title" htmlFor="post-title">
          <Input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. First 10K completed" required minLength={3} maxLength={90} />
        </Field>
        <Field label="What happened?" htmlFor="post-body">
          <Textarea id="post-body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Share a win, a route, or something the crew should know…" required minLength={10} rows={4} maxLength={600} />
        </Field>
        <Button type="submit" disabled={busy || title.trim().length < 3 || body.trim().length < 10}>
          {busy ? "Posting…" : "Post to community"}
        </Button>
      </div>
    </form>
  );
}