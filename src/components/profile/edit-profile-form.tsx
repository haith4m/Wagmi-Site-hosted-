"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/form";
import type { Profile } from "@/types";

interface EditProfileFormProps {
  profile: Profile;
  onDone: () => void;
}

export function EditProfileForm({ profile, onDone }: EditProfileFormProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [interests, setInterests] = useState(profile.runningInterests.join(", "));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim(),
          username: username.trim(),
          bio: bio.trim(),
          location: location.trim(),
          runningInterests: interests.split(",").map((i) => i.trim()).filter(Boolean),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not save your profile.");
        return;
      }
      router.refresh();
      onDone();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="edit-name">
          <Input id="edit-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required minLength={3} />
        </Field>
        <Field label="Username" htmlFor="edit-username">
          <Input id="edit-username" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} />
        </Field>
      </div>
      <Field label="Location" htmlFor="edit-location">
        <Input id="edit-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Hackney, London" />
      </Field>
      <Field label="Bio" htmlFor="edit-bio">
        <Textarea id="edit-bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} maxLength={240} />
      </Field>
      <Field
        label="Running interests"
        htmlFor="edit-interests"
        hint="Comma separated — e.g. 5K runs, Trail sessions, Pacing"
      >
        <Input id="edit-interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
      </Field>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save profile"}
        </Button>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
}