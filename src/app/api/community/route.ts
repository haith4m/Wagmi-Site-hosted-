import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { getRequestUser } from "@/lib/route-auth";
import type { CommunityInput, ContentStatus } from "@/types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitRaw = Number(url.searchParams.get("limit") ?? "0");
  const limit = limitRaw > 0 ? limitRaw : undefined;
  const posts = await services.community.list({ limit });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const user = await getRequestUser();
  if (!user) return NextResponse.json({ error: "Sign in to post in the community." }, { status: 401 });

  try {
    const body = (await request.json()) as { title?: string; body?: string };
    const title = body.title?.trim() ?? "";
    const text = body.body?.trim() ?? "";

    if (title.length < 3) {
      return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 422 });
    }
    if (text.length < 10) {
      return NextResponse.json({ error: "Post must be at least 10 characters." }, { status: 422 });
    }

    const input: CommunityInput = { title, body: text, authorId: user.id, authorName: user.displayName };
    // New posts start as pending — a moderator publishes them to the public feed.
    const post = await services.community.create(input);
    post.status = "pending" as ContentStatus;
    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}