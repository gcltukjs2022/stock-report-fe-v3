import { useMemo } from "react";
import {
  buildReportDownloadUrl,
  isReportReady,
} from "../services/reportService";

export interface UseReportResult {
  /** Direct URL to today's report `.docx`. */
  downloadUrl: string;
  /** Whether today's report is expected to exist yet (weekday, post-generation). */
  ready: boolean;
}

/** Exposes the daily-report download URL and a readiness hint for the UI. */
export function useReport(): UseReportResult {
  return useMemo(
    () => ({
      downloadUrl: buildReportDownloadUrl(),
      ready: isReportReady(),
    }),
    [],
  );
}
