import type { CommunityContent, CommunityInput, ContentStatus } from "@/types";
import { mockCommunity } from "@/data/mock-data";

export interface CommunityService {
  list(options?: { limit?: number }): Promise<CommunityContent[]>;
  getById(id: string): Promise<CommunityContent | null>;
  create(input: CommunityInput): Promise<CommunityContent>;
  updateStatus(id: string, status: ContentStatus): Promise<CommunityContent>;
  remove(id: string): Promise<void>;
}

/**
 * In-memory community feed backed by demo data.
 * Replace with a Supabase-backed adapter later — same interface.
 */
export class MockCommunityService implements CommunityService {
  async list(options?: { limit?: number }): Promise<CommunityContent[]> {
    const items = [...mockCommunity];
    return options?.limit ? items.slice(0, options.limit) : items;
  }

  async getById(id: string): Promise<CommunityContent | null> {
    return mockCommunity.find((p) => p.id === id) ?? null;
  }

  async create(input: CommunityInput): Promise<CommunityContent> {
    const post: CommunityContent = {
      id: `post_${Date.now().toString(36)}`,
      authorId: input.authorId,
      authorName: input.authorName,
      title: input.title.trim(),
      body: input.body.trim(),
      likes: 0,
      comments: 0,
      status: "pending", // New posts require moderation before going public.
      createdAt: new Date().toISOString(),
    };
    mockCommunity.unshift(post);
    return post;
  }

  async updateStatus(id: string, status: ContentStatus): Promise<CommunityContent> {
    const post = mockCommunity.find((p) => p.id === id);
    if (!post) throw new Error("Post not found.");
    post.status = status;
    return { ...post };
  }

  async remove(id: string): Promise<void> {
    const index = mockCommunity.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Post not found.");
    mockCommunity.splice(index, 1);
  }
}