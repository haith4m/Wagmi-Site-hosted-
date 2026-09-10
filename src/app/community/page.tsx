import { Badge } from "@/components/ui/form";
import { PostComposer } from "@/components/community/post-composer";
import { services } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";
import { initials } from "@/lib/format";
import type { CommunityContent, Profile } from "@/types";

export const dynamic = "force-dynamic";

function PostCard({
  post,
  authorProfile,
}: {
  post: CommunityContent;
  authorProfile: Profile | null;
}) {
  return (
    <article className="border-b border-foreground/10 py-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center bg-surface text-sm font-display text-foreground">
            {initials(authorProfile?.displayName ?? post.authorName)}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{authorProfile?.displayName ?? post.authorName}</p>
            <p className="text-xs text-foreground/35">@{authorProfile?.username ?? post.authorName.replace(/\s+/g, "_").toLowerCase()}</p>
          </div>
        </div>
        <Badge tone={post.status === "pending" ? "warning" : post.status === "removed" ? "danger" : "success"}>
          {post.status}
        </Badge>
      </div>
      <h2 className="mt-5 text-xl font-display text-foreground">{post.title}</h2>
      <p className="mt-3 leading-7 text-foreground/60">{post.body}</p>
      <div className="mt-5 flex items-center gap-5 border-t border-foreground/10 pt-4 text-sm text-foreground/45">
        <span className="font-kicker text-[11px] uppercase tracking-[0.14em]">{post.likes} likes</span>
        <span className="font-kicker text-[11px] uppercase tracking-[0.14em]">{post.comments} replies</span>
        <span className="ml-auto text-xs text-foreground/35">
          {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
    </article>
  );
}

export default async function CommunityPage() {
  const user = await getCurrentUser();
  const [posts, profiles] = await Promise.all([services.community.list(), services.profiles.list()]);

  const profileByUserId = new Map<string, Profile>();
  profiles.forEach((p) => profileByUserId.set(p.userId, p));

  // Public feed shows published posts only; pending/removed hidden unless you're a moderator.
  const visible = posts.filter(
    (p) => p.status === "published" ||
      (user && (user.role === "super_admin" || user.role === "content_moderator")),
  );

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="kicker text-foreground/60">Feed / Field notes</p>
        <h1 className="mt-3 text-4xl font-display tracking-tight text-foreground sm:text-5xl">Field notes</h1>
        <p className="mt-4 text-lg leading-8 text-foreground/60">
          Wins, routes, and encouragement — what the crew is sharing this week.
        </p>

        {user && (
          <div className="mt-8">
            <PostComposer />
          </div>
        )}

        <div className="mt-10 space-y-5">
          {visible.length === 0 ? (
            <div className="rounded-md border border-dashed border-foreground/15 bg-surface px-6 py-14 text-center">
              <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/35">No.000</p>
              <h2 className="mt-4 text-xl font-display text-foreground">The feed is quiet right now</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-foreground/45">
                {user
                  ? "Be the first to share a win, a route, or something the crew should know."
                  : "Sign in and share the first update of the week."}
              </p>
            </div>
          ) : (
            visible.map((post) => (
              <PostCard key={post.id} post={post} authorProfile={profileByUserId.get(post.authorId) ?? null} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}