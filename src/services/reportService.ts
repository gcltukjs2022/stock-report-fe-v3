import { config } from "../config/env";

/** Formats a date as DDMMYYYY in UTC — matches the backend report filename. */
function formatReportDate(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  return `${dd}${mm}${yyyy}`;
}

/** Builds the report download URL for a given date (defaults to today, UTC). */
export function buildReportDownloadUrl(date: Date = new Date()): string {
  return config.reportDownloadUrlTemplate.replace(
    "{date}",
    formatReportDate(date),
  );
}

/**
 * Whether the daily report is available to download right now.
 *
 * The backend generates it on weekdays at ~16:40 HKT (08:40 UTC). The download
 * button is offered a few minutes later — weekdays from 16:45 HKT until midnight
 * — so the file has landed by the time it appears. Hong Kong is UTC+8 with no DST,
 * so 16:45–24:00 HKT maps to 08:45–16:00 UTC.
 *
 * Tracked in minutes rather than whole hours because the window no longer opens
 * on an hour boundary.
 */
const REPORT_START_UTC_MINUTES = 8 * 60 + 45; // 16:45 HKT
const REPORT_END_UTC_MINUTES = 16 * 60; // 00:00 HKT (next day)

export function isReportReady(now: Date = new Date()): boolean {
  const day = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
  const minutesUtc = now.getUTCHours() * 60 + now.getUTCMinutes();

  const isWeekday = day >= 1 && day <= 5;
  const isWithinWindow =
    minutesUtc >= REPORT_START_UTC_MINUTES &&
    minutesUtc < REPORT_END_UTC_MINUTES;

  return isWeekday && isWithinWindow;
}
