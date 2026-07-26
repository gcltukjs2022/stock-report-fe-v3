import axios from "axios";
import { config } from "../config/env";

/** Shared axios instance for the stock-manager API. */
export const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

/**
 * Normalises any thrown value into a user-facing message, preferring an
 * `error` field the API returns in its body, then the axios/Error message,
 * then the provided fallback.
 */
export function toErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
