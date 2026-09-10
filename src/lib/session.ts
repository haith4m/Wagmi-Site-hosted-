import { cookies } from "next/headers";
import { services, SESSION_COOKIE } from "@/lib/services";
import type { User } from "@/types";

/**
 * Server-side session resolver.
 *
 * With Supabase wired in, this becomes `getUser()` from
 * `@supabase/ssr` reading the auth cookie. For now it resolves the user from
 * the mock session cookie value.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const store = await cookies();
    const value = store.get(SESSION_COOKIE)?.value;
    return await services.auth.getSessionUser(value);
  } catch {
    // Outside a request scope (e.g. build-time static render) there is no
    // cookie store — treat as signed out.
    return null;
  }
}

export { SESSION_COOKIE };