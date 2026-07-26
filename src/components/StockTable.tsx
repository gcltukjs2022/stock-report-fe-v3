import type { Currency, Stock } from "../types/stock";

const currencyStyles: Record<Currency, string> = {
  USD: "bg-blue-50 text-blue-700 ring-blue-600/20",
  HKD: "bg-sky-50 text-sky-700 ring-sky-600/20",
  RMB: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

const HEADERS = ["Symbol", "Name", "Currency", "Futunn", "Aastocks"] as const;

const TH =
  "border-b border-slate-200 bg-slate-50/70 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500";
const TD = "border-b border-slate-100 px-4 py-3.5";
const CODE = `${TD} whitespace-nowrap font-mono text-[13px] tabular-nums`;

interface StockTableProps {
  stocks: Stock[];
  loading: boolean;
  deletingSymbol: string | null;
  onRemove: (yahooSymbol: string) => void;
}

export function StockTable({
  stocks,
  loading,
  deletingSymbol,
  onRemove,
}: StockTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      {loading ? (
        <p className="px-4 py-16 text-center text-sm text-slate-500">
          Loading stocks…
        </p>
      ) : stocks.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No stocks yet</p>
          <p className="mt-1 text-sm text-slate-400">
            Add one with the form above to start tracking it.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                {HEADERS.map((header, i) => (
                  <th
                    key={header}
                    scope="col"
                    className={`${TH} ${i === 0 ? "sm:pl-6" : ""}`}
                  >
                    {header}
                  </th>
                ))}
                <th scope="col" className={`${TH} sm:pr-6`}>
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const deleting = deletingSymbol === stock.yahooSymbol;
                return (
                  <tr
                    key={stock.yahooSymbol}
                    className="group transition-colors hover:bg-slate-50/70"
                  >
                    <td className={`${CODE} py-3.5 pl-4 pr-3 font-medium tracking-tight text-slate-900 sm:pl-6`}>
                      {stock.yahooSymbol}
                    </td>
                    <td className={`${TD} text-sm text-slate-700`}>
                      {stock.name}
                    </td>
                    <td className={TD}>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${currencyStyles[stock.currency]}`}
                      >
                        {stock.currency}
                      </span>
                    </td>
                    <td className={`${CODE} text-slate-500`}>
                      {stock.futunnParam}
                    </td>
                    <td className={`${CODE} text-slate-500`}>
                      {stock.aastocksParam}
                    </td>
                    <td className={`${TD} whitespace-nowrap text-right sm:pr-6`}>
                      <button
                        type="button"
                        onClick={() => onRemove(stock.yahooSymbol)}
                        disabled={deleting}
                        className="text-sm font-medium text-slate-400 transition-colors hover:text-red-600 disabled:opacity-50 group-hover:text-slate-500"
                      >
                        {deleting ? "Removing…" : "Remove"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
