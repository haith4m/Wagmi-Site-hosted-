import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { getRequestUser } from "@/lib/route-auth";
import type { RsvpStatus } from "@/types";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

const STATUSES: RsvpStatus[] = ["going", "interested", "canceled"];

export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to RSVP." }, { status: 401 });

  try {
    const body = (await request.json()) as { status?: RsvpStatus; plusGuests?: number };
    const status = body.status ?? "going";
    if (!STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid RSVP status." }, { status: 422 });
    }

    const { event, participant } = await services.events.rsvp(id, {
      userId: user.id,
      displayName: user.displayName,
      status,
      plusGuests: body.plusGuests ?? 0,
    });
    return NextResponse.json({ event, participant }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Event not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof Error && error.message === "This event is full.") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to cancel your RSVP." }, { status: 401 });

  try {
    const event = await services.events.cancelRsvp(id, user.id);
    return NextResponse.json({ event });
  } catch (error) {
    if (error instanceof Error && error.message === "Event not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}