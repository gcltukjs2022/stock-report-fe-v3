export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-7 w-7 place-items-center rounded-md bg-blue-600 shadow-sm"
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="7" width="2.5" height="6" rx="0.6" fill="white" fillOpacity="0.65" />
              <rect x="5.75" y="3.25" width="2.5" height="9.75" rx="0.6" fill="white" />
              <rect x="10.5" y="5.25" width="2.5" height="7.75" rx="0.6" fill="white" fillOpacity="0.85" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Stock Watchlist
          </span>
        </div>
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">
          Pipeline console
        </span>
      </div>
    </header>
  );
}
