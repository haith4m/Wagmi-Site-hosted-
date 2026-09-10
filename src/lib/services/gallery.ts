import type { ContentStatus, GalleryItem, GalleryItemInput } from "@/types";
import { mockGallery } from "@/data/mock-data";

export interface GalleryService {
  list(options?: { status?: ContentStatus; limit?: number }): Promise<GalleryItem[]>;
  getById(id: string): Promise<GalleryItem | null>;
  create(input: GalleryItemInput, uploadedBy: string | null): Promise<GalleryItem>;
  setStatus(id: string, status: ContentStatus): Promise<GalleryItem>;
  remove(id: string): Promise<void>;
}

/**
 * In-memory gallery backed by demo data.
 * Replace with a Supabase Storage + table adapter later — same interface.
 */
export class MockGalleryService implements GalleryService {
  async list(options?: { status?: ContentStatus; limit?: number }): Promise<GalleryItem[]> {
    let items = [...mockGallery];
    if (options?.status) items = items.filter((i) => i.status === options.status);
    if (options?.limit) items = items.slice(0, options.limit);
    return items;
  }

  async getById(id: string): Promise<GalleryItem | null> {
    return mockGallery.find((i) => i.id === id) ?? null;
  }

  async create(input: GalleryItemInput, uploadedBy: string | null): Promise<GalleryItem> {
    const item: GalleryItem = {
      id: `gal_${Date.now().toString(36)}`,
      title: input.title.trim(),
      caption: input.caption.trim(),
      tag: input.tag.trim() || "Community",
      imageUrl: input.imageUrl ?? null,
      imageClass: input.imageClass ?? "from-[#a8a093] via-[#8f8677] to-[#6e6659]",
      status: "pending", // New uploads require moderation before going public.
      uploadedBy,
      createdAt: new Date().toISOString(),
    };
    mockGallery.push(item);
    return item;
  }

  async setStatus(id: string, status: ContentStatus): Promise<GalleryItem> {
    const item = mockGallery.find((i) => i.id === id);
    if (!item) throw new Error("Gallery item not found.");
    item.status = status;
    return { ...item };
  }

  async remove(id: string): Promise<void> {
    const index = mockGallery.findIndex((i) => i.id === id);
    if (index === -1) throw new Error("Gallery item not found.");
    mockGallery.splice(index, 1);
  }
}