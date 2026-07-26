import { useCallback, useEffect, useState } from "react";
import type { Stock } from "../types/stock";
import * as stocksService from "../services/stocksService";

function sortBySymbol(stocks: Stock[]): Stock[] {
  return [...stocks].sort((a, b) => a.yahooSymbol.localeCompare(b.yahooSymbol));
}

export interface UseStocksResult {
  stocks: Stock[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  deletingSymbol: string | null;
  reload: () => Promise<void>;
  /** Adds a stock; returns true on success so the form can reset itself. */
  addStock: (stock: Stock) => Promise<boolean>;
  removeStock: (yahooSymbol: string) => Promise<void>;
  clearError: () => void;
}

/** Owns the watchlist collection and its list/add/remove operations. */
export function useStocks(): UseStocksResult {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingSymbol, setDeletingSymbol] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await stocksService.getStocks();
      setStocks(sortBySymbol(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stocks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load on mount. Fetching in an effect is the intended pattern here;
    // a data library (React Query / SWR) would be the larger-scale alternative.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  const addStock = useCallback(
    async (stock: Stock): Promise<boolean> => {
      setError(null);
      if (stocks.some((s) => s.yahooSymbol === stock.yahooSymbol)) {
        setError(`${stock.yahooSymbol} is already in the list`);
        return false;
      }
      setSubmitting(true);
      try {
        const created = await stocksService.addStock(stock);
        setStocks((prev) => sortBySymbol([...prev, created]));
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add stock");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [stocks],
  );

  const removeStock = useCallback(async (yahooSymbol: string): Promise<void> => {
    setError(null);
    setDeletingSymbol(yahooSymbol);
    try {
      await stocksService.removeStock(yahooSymbol);
      setStocks((prev) => prev.filter((s) => s.yahooSymbol !== yahooSymbol));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove stock");
    } finally {
      setDeletingSymbol(null);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    stocks,
    loading,
    error,
    submitting,
    deletingSymbol,
    reload,
    addStock,
    removeStock,
    clearError,
  };
}
