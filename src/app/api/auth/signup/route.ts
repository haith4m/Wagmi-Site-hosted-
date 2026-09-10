import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { services, SESSION_COOKIE } from "@/lib/services";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { displayName?: string; email?: string; password?: string };
    const result = await services.auth.signUp({
      displayName: body.displayName?.trim() ?? "",
      email: body.email?.trim() ?? "",
      password: body.password ?? "",
    });

    if (!result.user) {
      return NextResponse.json({ error: result.error ?? "Could not create account." }, { status: 400 });
    }

    const store = await cookies();
    store.set(SESSION_COOKIE, result.user.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}