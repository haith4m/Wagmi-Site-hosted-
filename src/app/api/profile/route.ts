import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { getRequestUser } from "@/lib/route-auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to view your profile." }, { status: 401 });
  const profile = await services.profiles.getByUserId(user.id);
  return NextResponse.json({ profile });
}

export async function PATCH(request: Request) {
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to edit your profile." }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const patch: Record<string, unknown> = {};

    if (typeof body.displayName === "string") {
      const value = body.displayName.trim();
      if (value.length < 3) {
        return NextResponse.json({ error: "Name must be at least 3 characters." }, { status: 422 });
      }
      patch.displayName = value;
    }
    if (typeof body.username === "string") {
      const value = body.username.trim().replace(/[^a-z0-9_]/g, "").toLowerCase();
      if (value.length < 3) {
        return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 422 });
      }
      patch.username = value;
    }
    if (typeof body.bio === "string") patch.bio = body.bio.trim();
    if (typeof body.location === "string") patch.location = body.location.trim();
    if (typeof body.avatarUrl === "string" || body.avatarUrl === null) patch.avatarUrl = body.avatarUrl;
    if (Array.isArray(body.runningInterests)) {
      patch.runningInterests = (body.runningInterests as unknown[])
        .filter((v) => typeof v === "string")
        .map((v) => (v as string).trim())
        .filter(Boolean);
    }

    const profile = await services.profiles.update(user.id, patch);
    return NextResponse.json({ profile });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}