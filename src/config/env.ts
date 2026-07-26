/**
 * Centralised, validated access to environment configuration.
 *
 * The rest of the app imports `config` from here and never touches
 * `import.meta.env` directly. Required variables are validated once at module
 * load, so a misconfigured deployment fails fast with a clear message instead
 * of surfacing as a confusing runtime error deep in the UI.
 */

const env = import.meta.env as unknown as Record<string, string | undefined>;

function required(name: string): string {
  const value = env[name];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        `Copy .env.example to .env and fill it in.`,
    );
  }
  return value.trim();
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

const reportDownloadUrlTemplate = required("VITE_REPORT_DOWNLOAD_URL");
if (!reportDownloadUrlTemplate.includes("{date}")) {
  throw new Error(
    'VITE_REPORT_DOWNLOAD_URL must contain the "{date}" placeholder, e.g. ' +
      "https://bucket.s3.region.amazonaws.com/reports/report-v3-{date}.docx",
  );
}

export interface AppConfig {
  /** Stock-manager API Gateway base URL, without a trailing slash. */
  readonly apiBaseUrl: string;
  /**
   * Daily-report download URL containing a literal `{date}` token, replaced at
   * runtime with the report date as DDMMYYYY (UTC). Point this at a different
   * bucket/path to switch report sources — no code change required.
   */
  readonly reportDownloadUrlTemplate: string;
}

export const config: AppConfig = {
  apiBaseUrl: stripTrailingSlash(required("VITE_API_BASE_URL")),
  reportDownloadUrlTemplate,
};
