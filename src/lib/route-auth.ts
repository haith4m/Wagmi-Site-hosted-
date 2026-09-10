import { cookies } from "next/headers";
import { services, SESSION_COOKIE } from "@/lib/services";
import type { User } from "@/types";

/** Resolve the signed-in user inside a route handler from the session cookie. */
export async function getRequestUser(): Promise<User | null> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  return value ? services.auth.getSessionUser(value) : null;
}