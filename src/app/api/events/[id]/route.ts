import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { getRequestUser } from "@/lib/route-auth";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const event = await services.events.getById(id);
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });
  return NextResponse.json({ event });
}

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to edit events." }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const patch: Record<string, unknown> = { ...body };
    delete patch.id;
    delete patch.slug;
    delete patch.attending;
    delete patch.createdBy;
    delete patch.createdAt;
    delete patch.updatedAt;

    const event = await services.events.update(id, patch);
    return NextResponse.json({ event });
  } catch (error) {
    if (error instanceof Error && error.message === "Event not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to delete events." }, { status: 401 });

  try {
    await services.events.remove(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Event not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}