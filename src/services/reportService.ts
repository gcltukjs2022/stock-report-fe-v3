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
 * The backend generates it on weekdays at ~17:00 HKT, and the download is offered
 * through the rest of the day — so the button is live on weekdays from 17:00 HKT
 * until midnight. Hong Kong is UTC+8 with no DST, so that maps to 09:00–16:00 UTC.
 */
const REPORT_START_UTC_HOUR = 9; // 17:00 HKT
const REPORT_END_UTC_HOUR = 16; // 00:00 HKT (next day)

export function isReportReady(now: Date = new Date()): boolean {
  const day = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getUTCHours();

  const isWeekday = day >= 1 && day <= 5;
  const isWithinWindow =
    hour >= REPORT_START_UTC_HOUR && hour < REPORT_END_UTC_HOUR;

  return isWeekday && isWithinWindow;
}
