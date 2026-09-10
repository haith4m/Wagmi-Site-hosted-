import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { getRequestUser } from "@/lib/route-auth";
import type { ContentStatus } from "@/types";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

const VALID_STATUSES: ContentStatus[] = ["published", "pending", "removed"];

function canModerate(role: string): boolean {
  return role === "super_admin" || role === "content_moderator";
}

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const user = await getRequestUser();
  if (!user || !canModerate(user.role)) {
    return NextResponse.json({ error: "Only moderators can moderate gallery content." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { status?: ContentStatus };
    if (!body.status || !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 422 });
    }
    const item = await services.gallery.setStatus(id, body.status);
    return NextResponse.json({ item });
  } catch (error) {
    if (error instanceof Error && error.message === "Gallery item not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const user = await getRequestUser();
  if (!user || !canModerate(user.role)) {
    return NextResponse.json({ error: "Only moderators can remove gallery content." }, { status: 403 });
  }

  try {
    await services.gallery.remove(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Gallery item not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}