"use client";

const SESSION_COOKIE = "wagmi_session";

/** Read the mock session cookie on the client (Supabase swaps this in later). */
export function getClientSession(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}