import { useStocks } from "../hooks/useStocks";
import { AppHeader } from "./AppHeader";
import { Alert } from "./ui/Alert";
import { Button } from "./ui/Button";
import { ReportCard } from "./ReportCard";
import { StockForm } from "./StockForm";
import { StockTable } from "./StockTable";

export function StockManager() {
  const {
    stocks,
    loading,
    error,
    submitting,
    deletingSymbol,
    reload,
    addStock,
    removeStock,
    clearError,
  } = useStocks();

  function handleRemove(yahooSymbol: string) {
    const confirmed = window.confirm(
      `Remove ${yahooSymbol} from the watchlist? This can't be undone.`,
    );
    if (confirmed) void removeStock(yahooSymbol);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppHeader />

      <main className="animate-rise mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <ReportCard />

        {error && <Alert message={error} onDismiss={clearError} />}

        <StockForm submitting={submitting} onAdd={addStock} />

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Watchlist
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {loading
                  ? "…"
                  : `${stocks.length} ${stocks.length === 1 ? "stock" : "stocks"} tracked`}
              </span>
            </div>
            <Button
              variant="secondary"
              onClick={() => void reload()}
              disabled={loading}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M13.5 8a5.5 5.5 0 1 1-1.65-3.92"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M13.75 2.25v3h-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Refresh
            </Button>
          </div>
          <StockTable
            stocks={stocks}
            loading={loading}
            deletingSymbol={deletingSymbol}
            onRemove={handleRemove}
          />
        </section>
      </main>
    </div>
  );
}
