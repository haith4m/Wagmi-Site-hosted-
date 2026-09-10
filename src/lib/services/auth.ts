import type { User } from "@/types";
import { mockUsers } from "@/data/mock-data";

export interface AuthService {
  /** Returns the signed-in user, or null when the credentials are invalid. */
  signIn(input: { email: string; password: string }): Promise<User | null>;
  signUp(input: { displayName: string; email: string; password: string }): Promise<{ user: User | null; error: string | null }>;
  getUserById(id: string): Promise<User | null>;
  /** Resolve the signed-in user from a session token (Supabase session cookie value). */
  getSessionUser(sessionValue: string | undefined): Promise<User | null>;
  signOut(): Promise<void>;
}

/**
 * In-memory auth for development.
 *
 * Replace with a Supabase-backed adapter once credentials exist — same
 * interface, same UI, no other changes required. Sessions are modelled as a
 * `wagmi_session` cookie whose value is the user id.
 */
export class MockAuthService implements AuthService {
  async signIn(input: { email: string; password: string }): Promise<User | null> {
    const email = input.email.trim().toLowerCase();
    const user = mockUsers.find((u) => u.email.toLowerCase() === email);
    if (!user || user.password !== input.password) return null;
    return this.#publicUser(user);
  }

  async signUp(
    input: { displayName: string; email: string; password: string },
  ): Promise<{ user: User | null; error: string | null }> {
    const email = input.email.trim().toLowerCase();
    if (mockUsers.some((u) => u.email.toLowerCase() === email)) {
      return { user: null, error: "An account with this email already exists." };
    }
    if (input.password.length < 8) {
      return { user: null, error: "Password must be at least 8 characters long." };
    }
    const user = {
      id: `u_${Date.now().toString(36)}`,
      email: input.email.trim(),
      username: input.displayName.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, ""),
      displayName: input.displayName.trim(),
      role: "member" as const,
      avatarUrl: null,
      password: input.password,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(user);
    return { user: this.#publicUser(user), error: null };
  }

  async getUserById(id: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === id);
    return user ? this.#publicUser(user) : null;
  }

  async getSessionUser(sessionValue: string | undefined): Promise<User | null> {
    if (!sessionValue) return null;
    return this.getUserById(sessionValue);
  }

  async signOut(): Promise<void> {
    // Stateless mock — the cookie is cleared by the route handler.
  }

  #publicUser(user: { id: string; email: string; username: string; displayName: string; role: string; avatarUrl: string | null; createdAt: string }): User {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      role: user.role as User["role"],
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }
}