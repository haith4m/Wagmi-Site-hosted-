import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { getRequestUser } from "@/lib/route-auth";
import type { EventCategory } from "@/types";

export const runtime = "nodejs";

const CATEGORIES: EventCategory[] = ["Run", "Trail", "Strength", "Community", "Recovery"];

function parseEventInput(body: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const time = typeof body.time === "string" ? body.time.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const capacity = typeof body.capacity === "number" ? body.capacity : Number(body.capacity);

  if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.date = "Please pick a valid date.";
  if (!/^\d{2}:\d{2}$/.test(time)) errors.time = "Please pick a valid time.";
  if (location.length < 3) errors.location = "Location is required.";
  if (description.length < 10) errors.description = "Description must be at least 10 characters.";
  if (!Number.isInteger(capacity) || capacity < 1) errors.capacity = "Capacity must be at least 1.";

  const category = body.category;
  if (!CATEGORIES.includes(category as EventCategory)) errors.category = "Please choose a category.";

  return {
    errors,
    input: {
      title,
      date,
      time,
      location,
      description,
      capacity,
      category: category as EventCategory,
      featured: Boolean(body.featured),
      published: Boolean(body.published),
      imageUrl: typeof body.imageUrl === "string" && body.imageUrl ? body.imageUrl : null,
      imageClass: typeof body.imageClass === "string" ? body.imageClass : undefined,
    },
  };
}

export async function GET() {
  const events = await services.events.list();
  // Public listing only shows published, upcoming-first events.
  const published = events
    .filter((e) => e.published)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  return NextResponse.json({ events: published });
}

export async function POST(request: Request) {
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to create events." }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { errors, input } = parseEventInput(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 422 });
    }
    const event = await services.events.create(input, user.id);
    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}