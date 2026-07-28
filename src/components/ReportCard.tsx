import { useReport } from "../hooks/useReport";
import { buttonClasses } from "./ui/buttonStyles";

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.75v7.5m0 0 2.75-2.75M8 9.25 5.25 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 10.5v1.25c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ReportCard() {
  const { downloadUrl, ready } = useReport();

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Daily report
        </p>
        <p className="text-sm text-slate-600">
          {ready
            ? "Today's report is ready to download."
            : "Available on weekdays, 16:45–midnight HKT."}
        </p>
      </div>
      {ready ? (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClasses.primary} shrink-0`}
        >
          <DownloadIcon />
          Download report
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex shrink-0 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-2 text-sm font-semibold text-slate-400"
        >
          <DownloadIcon />
          Download report
        </span>
      )}
    </section>
  );
}
