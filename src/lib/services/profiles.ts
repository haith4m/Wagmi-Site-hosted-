import type { Profile, User } from "@/types";
import { mockProfiles } from "@/data/mock-data";

export interface ProfilesService {
  getByUserId(userId: string): Promise<Profile | null>;
  list(): Promise<Profile[]>;
  update(userId: string, patch: Partial<Pick<Profile, "displayName" | "username" | "bio" | "location" | "avatarUrl" | "runningInterests">>): Promise<Profile>;
}

/**
 * In-memory profiles backed by demo data.
 * Replace with a Supabase-backed adapter later — same interface.
 */
export class MockProfilesService implements ProfilesService {
  async getByUserId(userId: string): Promise<Profile | null> {
    return mockProfiles.find((p) => p.userId === userId) ?? null;
  }

  async list(): Promise<Profile[]> {
    return [...mockProfiles];
  }

  async update(
    userId: string,
    patch: Partial<Pick<Profile, "displayName" | "username" | "bio" | "location" | "avatarUrl" | "runningInterests">>,
  ): Promise<Profile> {
    const profile = mockProfiles.find((p) => p.userId === userId);
    if (!profile) throw new Error("Profile not found.");
    Object.assign(profile, patch);
    return { ...profile };
  }
}

export async function getUserDisplayName(user: User | null, profiles = new MockProfilesService()): Promise<string> {
  if (!user) return "Guest";
  const profile = await profiles.getByUserId(user.id);
  return profile?.displayName ?? user.displayName;
}