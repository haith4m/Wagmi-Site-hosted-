/**
 * WAGMI Club — domain models.
 *
 * These types mirror the Supabase schema we intend to ship with.
 * Until Supabase credentials are wired up, the app runs against a mock
 * service layer (`src/lib/services`) backed by demo data — see `.env.example`.
 */

export type AdminRole = "super_admin" | "event_manager" | "content_moderator" | "member";

export type EventCategory = "Run" | "Trail" | "Strength" | "Community" | "Recovery";

export type EventStatus = "draft" | "published" | "archived";

export type RsvpStatus = "going" | "interested" | "canceled";

export type ContentStatus = "published" | "pending" | "removed";

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: AdminRole;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  bio: string;
  location: string;
  avatarUrl: string | null;
  runningInterests: string[];
  favouriteActivities: string[];
  streak: number;
  joinedAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** 24h clock, HH:MM */
  time: string;
  location: string;
  description: string;
  capacity: number;
  attending: number;
  featured: boolean;
  published: boolean;
  status: EventStatus;
  /** Supabase Storage URL once wired up; null while using mock gradients. */
  imageUrl: string | null;
  /** Tailwind gradient classes used as a placeholder until real images exist. */
  imageClass: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventInput {
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  featured: boolean;
  published: boolean;
  imageUrl?: string | null;
  imageClass?: string;
}

/** An RSVP / attendance record. */
export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  displayName: string;
  status: RsvpStatus;
  plusGuests: number;
  confirmedAt: string;
}

export interface RsvpInput {
  userId: string;
  displayName: string;
  status: RsvpStatus;
  plusGuests?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  imageUrl: string | null;
  imageClass: string;
  status: ContentStatus;
  uploadedBy: string | null;
  createdAt: string;
}

export interface GalleryItemInput {
  title: string;
  caption: string;
  tag: string;
  imageUrl?: string | null;
  imageClass?: string;
}

export interface CommunityContent {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  body: string;
  likes: number;
  comments: number;
  status: ContentStatus;
  createdAt: string;
}

export interface CommunityInput {
  title: string;
  body: string;
  authorId: string;
  authorName: string;
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  status: "Admin" | "Member";
  lastActive: string;
}

export interface AdminEventRow {
  id: string;
  title: string;
  date: string;
  status: "Published" | "Draft";
  attendees: number;
}

export interface DashboardSummary {
  totalEvents: number;
  publishedEvents: number;
  totalMembers: number;
  totalRsvps: number;
}

/* ------------------------------------------------------------------ */
/* Legacy aliases — kept so existing views can migrate incrementally.  */
/* ------------------------------------------------------------------ */

export type UserProfile = Profile;
export type EventItem = Event;
export type CommunityPost = CommunityContent;