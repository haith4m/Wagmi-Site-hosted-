"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { GRADIENT_OPTIONS } from "@/lib/services";
import type { Event, EventCategory, EventInput } from "@/types";

const CATEGORIES: EventCategory[] = ["Run", "Trail", "Strength", "Community", "Recovery"];

interface EventFormProps {
  /** When provided we're editing; otherwise creating. */
  event?: Event;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState(event?.title ?? "");
  const [category, setCategory] = useState<EventCategory>(event?.category ?? "Run");
  const [date, setDate] = useState(event?.date ?? "");
  const [time, setTime] = useState(event?.time ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [capacity, setCapacity] = useState(event ? String(event.capacity) : "40");
  const [featured, setFeatured] = useState(event?.featured ?? false);
  const [published, setPublished] = useState(event?.published ?? false);
  const [imageClass, setImageClass] = useState(event?.imageClass ?? GRADIENT_OPTIONS[0].value);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setFieldErrors({});

    const payload: EventInput = {
      title,
      category,
      date,
      time,
      location,
      description,
      capacity: Number(capacity),
      featured,
      published,
      imageClass,
    };

    try {
      const url = event ? `/api/events/${event.id}` : "/api/events";
      const method = event ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; fields?: Record<string, string>; event?: Event };
      if (!res.ok) {
        if (data.fields) setFieldErrors(data.fields);
        setError(data.error ?? "Could not save the event.");
        return;
      }
      router.push(`/events/${data.event!.slug}`);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  function fieldError(key: string): string | null {
    return fieldErrors[key] ?? null;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {error && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <Field label="Event name" htmlFor="title">
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Sunrise 5K Social Run"
          required
          minLength={3}
          maxLength={90}
        />
        {fieldError("title") && <p className="mt-1.5 text-xs text-danger">{fieldError("title")}</p>}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" htmlFor="date">
          <Input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          {fieldError("date") && <p className="mt-1.5 text-xs text-danger">{fieldError("date")}</p>}
        </Field>
        <Field label="Time" htmlFor="time">
          <Input id="time" name="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          {fieldError("time") && <p className="mt-1.5 text-xs text-danger">{fieldError("time")}</p>}
        </Field>
      </div>

      <Field label="Location" htmlFor="location">
        <Input
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Victoria Park Loop"
          required
          minLength={3}
        />
        {fieldError("location") && <p className="mt-1.5 text-xs text-danger">{fieldError("location")}</p>}
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Category" htmlFor="category">
          <Select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value as EventCategory)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          {fieldError("category") && <p className="mt-1.5 text-xs text-danger">{fieldError("category")}</p>}
        </Field>
        <Field label="Capacity" htmlFor="capacity">
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            max={1000}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          {fieldError("capacity") && <p className="mt-1.5 text-xs text-danger">{fieldError("capacity")}</p>}
        </Field>
        <Field label="Header image" htmlFor="imageClass">
          <Select id="imageClass" name="imageClass" value={imageClass} onChange={(e) => setImageClass(e.target.value)}>
            {GRADIENT_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </Select>
          <p className="mt-1.5 text-xs text-muted/80">Supabase Storage replaces this later.</p>
        </Field>
      </div>

      <Field label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What should people expect? Pace, route, what to bring…"
          required
          minLength={10}
          rows={5}
        />
        {fieldError("description") && <p className="mt-1.5 text-xs text-danger">{fieldError("description")}</p>}
      </Field>

      <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
        <div className="mb-1.5 flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          <label htmlFor="featured" className="text-sm font-medium text-foreground">
            Feature on the homepage
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground">
            Publish immediately <span className="text-muted/80">(draft keeps it private)</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : event ? "Save changes" : "Create event"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export { CATEGORIES };