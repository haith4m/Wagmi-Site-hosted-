import { MockAuthService } from "@/lib/services/auth";
import { MockCommunityService } from "@/lib/services/community";
import { MockEventsService } from "@/lib/services/events";
import { MockGalleryService } from "@/lib/services/gallery";
import { MockProfilesService } from "@/lib/services/profiles";

/**
 * Service taps — the single seam between the UI and the backend.
 *
 * Wire in real Supabase-backed adapters here once credentials exist
 * (see `.env.example`). Until then the app runs on in-memory mock data so the
 * whole product can be built and reviewed without a backend.
 */
const auth = new MockAuthService();
const events = new MockEventsService();
const profiles = new MockProfilesService();
const gallery = new MockGalleryService();
const community = new MockCommunityService();

export interface Services {
  auth: MockAuthService;
  events: MockEventsService;
  profiles: MockProfilesService;
  gallery: MockGalleryService;
  community: MockCommunityService;
}

export const services: Services = {
  auth,
  events,
  profiles,
  gallery,
  community,
};

/** Human readable event category labels. */
export const CATEGORY_LABELS: Record<string, string> = {
  Run: "Run",
  Trail: "Trail",
  Strength: "Strength",
  Community: "Community",
  Recovery: "Recovery",
};

export const GRADIENT_OPTIONS = [
  { label: "Clay", value: "from-[#8a6f52] via-[#a5876a] to-[#6b5138]" },
  { label: "Dune", value: "from-[#c9b18c] via-[#b39b74] to-[#8a744f]" },
  { label: "Taupe", value: "from-[#7d715c] via-[#94866e] to-[#5c5240]" },
  { label: "Fog", value: "from-[#a8a093] via-[#8f8677] to-[#6e6659]" },
  { label: "Bone", value: "from-[#e5dbc6] via-[#d3c5a8] to-[#b3a385]" },
  { label: "Umber", value: "from-[#6e4f38] via-[#8a6a4e] to-[#4a3526]" },
  { label: "Storm", value: "from-[#5c554a] via-[#75695a] to-[#3f3a32]" },
];

/** Cookie name we use in the mock session layer (Supabase swaps this in later). */
export const SESSION_COOKIE = "wagmi_session";