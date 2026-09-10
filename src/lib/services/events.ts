import type { Event, EventInput, EventParticipant, RsvpInput } from "@/types";
import { mockEvents, mockParticipants } from "@/data/mock-data";

export interface EventsService {
  /** All events (including drafts — filtering for public display is the caller's job). */
  list(): Promise<Event[]>;
  getBySlug(slug: string): Promise<Event | null>;
  getById(id: string): Promise<Event | null>;
  create(input: EventInput, createdBy: string): Promise<Event>;
  update(id: string, patch: Partial<EventInput>): Promise<Event>;
  remove(id: string): Promise<void>;
  setPublished(id: string, published: boolean): Promise<Event>;
  rsvp(eventId: string, input: RsvpInput): Promise<{ event: Event; participant: EventParticipant }>;
  cancelRsvp(eventId: string, userId: string): Promise<Event>;
  listParticipants(eventId: string): Promise<EventParticipant[]>;
  listRsvpsForUser(userId: string): Promise<EventParticipant[]>;
  isFull(event: Event): boolean;
  getSummary(): Promise<{ total: number; published: number; draft: number; totalRsvps: number }>;
}

export class MockEventsService implements EventsService {
  async list(): Promise<Event[]> {
    return [...mockEvents];
  }

  async getBySlug(slug: string): Promise<Event | null> {
    return mockEvents.find((e) => e.slug === slug) ?? null;
  }

  async getById(id: string): Promise<Event | null> {
    return mockEvents.find((e) => e.id === id) ?? null;
  }

  async create(input: EventInput, createdBy: string): Promise<Event> {
    const now = new Date().toISOString();
    const event: Event = {
      id: `evt_${Date.now().toString(36)}`,
      title: input.title.trim(),
      slug: slugify(input.title),
      category: input.category,
      date: input.date,
      time: input.time,
      location: input.location.trim(),
      description: input.description.trim(),
      capacity: input.capacity,
      attending: 0,
      featured: input.featured,
      published: input.published,
      status: input.published ? "published" : "draft",
      imageUrl: input.imageUrl ?? null,
      imageClass: input.imageClass ?? "from-[#8a6f52] via-[#a5876a] to-[#6b5138]",
      createdBy,
      createdAt: now,
      updatedAt: now,
    };
    mockEvents.unshift(event);
    return event;
  }

  async update(id: string, patch: Partial<EventInput>): Promise<Event> {
    const event = mockEvents.find((e) => e.id === id);
    if (!event) throw new Error("Event not found.");
    if (patch.title !== undefined && patch.title.trim() !== event.title) {
      event.slug = slugify(patch.title);
    }
    if (patch.title !== undefined) event.title = patch.title.trim();
    if (patch.category !== undefined) event.category = patch.category;
    if (patch.date !== undefined) event.date = patch.date;
    if (patch.time !== undefined) event.time = patch.time;
    if (patch.location !== undefined) event.location = patch.location.trim();
    if (patch.description !== undefined) event.description = patch.description.trim();
    if (patch.capacity !== undefined) event.capacity = patch.capacity;
    if (patch.featured !== undefined) event.featured = patch.featured;
    if (patch.published !== undefined) {
      event.published = patch.published;
      event.status = patch.published ? "published" : "draft";
    }
    if (patch.imageUrl !== undefined) event.imageUrl = patch.imageUrl;
    if (patch.imageClass !== undefined) event.imageClass = patch.imageClass;
    event.updatedAt = new Date().toISOString();
    return { ...event };
  }

  async remove(id: string): Promise<void> {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Event not found.");
    mockEvents.splice(index, 1);
    // Cascade: remove the event's RSVPs too.
    for (let i = mockParticipants.length - 1; i >= 0; i -= 1) {
      if (mockParticipants[i].eventId === id) mockParticipants.splice(i, 1);
    }
  }

  async setPublished(id: string, published: boolean): Promise<Event> {
    return this.update(id, { published });
  }

  async rsvp(
    eventId: string,
    input: RsvpInput,
  ): Promise<{ event: Event; participant: EventParticipant }> {
    const event = mockEvents.find((e) => e.id === eventId);
    if (!event) throw new Error("Event not found.");
    if (this.isFull(event)) throw new Error("This event is full.");

    const existing = mockParticipants.findIndex((p) => p.eventId === eventId && p.userId === input.userId);
    const participant: EventParticipant = {
      id: existing !== -1 ? mockParticipants[existing].id : `rsvp_${Date.now().toString(36)}`,
      eventId,
      userId: input.userId,
      displayName: input.displayName,
      status: input.status,
      plusGuests: Math.max(0, Math.min(input.plusGuests ?? 0, 4)),
      confirmedAt: new Date().toISOString(),
    };

    if (existing !== -1) {
      mockParticipants[existing] = participant;
    } else {
      mockParticipants.push(participant);
      event.attending += 1;
    }
    return { event: { ...event }, participant: { ...participant } };
  }

  async cancelRsvp(eventId: string, userId: string): Promise<Event> {
    const event = mockEvents.find((e) => e.id === eventId);
    if (!event) throw new Error("Event not found.");
    const index = mockParticipants.findIndex((p) => p.eventId === eventId && p.userId === userId);
    if (index !== -1) {
      mockParticipants.splice(index, 1);
      event.attending = Math.max(0, event.attending - 1);
    }
    return { ...event };
  }

  async listParticipants(eventId: string): Promise<EventParticipant[]> {
    return mockParticipants.filter((p) => p.eventId === eventId);
  }

  async listRsvpsForUser(userId: string): Promise<EventParticipant[]> {
    return mockParticipants.filter((p) => p.userId === userId);
  }

  async getSummary(): Promise<{ total: number; published: number; draft: number; totalRsvps: number }> {
    return {
      total: mockEvents.length,
      published: mockEvents.filter((e) => e.published).length,
      draft: mockEvents.filter((e) => !e.published).length,
      totalRsvps: mockParticipants.length,
    };
  }

  isFull(event: Event): boolean {
    return event.attending >= event.capacity;
  }
}

export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}