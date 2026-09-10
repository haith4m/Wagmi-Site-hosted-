import type { Event } from "@/types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parse a YYYY-MM-DD date as local time (avoids UTC off-by-one). */
function parseDate(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

/** "2026-09-15" -> "Tuesday 15 September 2026" */
export function formatEventDate(date: string): string {
  const dt = parseDate(date);
  return `${DAYS[dt.getDay()]} ${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
}

/** "2026-09-15" -> "15 Sep" */
export function formatShortDate(date: string): string {
  const dt = parseDate(date);
  return `${dt.getDate()} ${MONTHS[dt.getMonth()].slice(0, 3)}`;
}

/** "07:00" -> "7:00 AM" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour = h ?? 0;
  const minute = m ?? 0;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function isUpcoming(event: Event, today = new Date()): boolean {
  const todayKey = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  return event.date >= todayKey;
}

/** Whole days between today and the event date (can be negative for past events). */
export function daysUntil(date: string, today = new Date()): number {
  const dt = parseDate(date);
  const todayKey = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((dt.getTime() - todayKey.getTime()) / (1000 * 60 * 60 * 24));
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}