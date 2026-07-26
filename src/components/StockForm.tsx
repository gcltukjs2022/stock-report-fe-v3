import { useState } from "react";
import type { FormEvent } from "react";
import { CURRENCIES, type Stock } from "../types/stock";
import { Button } from "./ui/Button";
import { TextField } from "./ui/TextField";
import { fieldClasses } from "./ui/fieldStyles";

const EMPTY_FORM: Stock = {
  yahooSymbol: "",
  name: "",
  currency: "HKD",
  futunnParam: "",
  aastocksParam: "",
};

interface StockFormProps {
  submitting: boolean;
  /** Returns true when the stock was added, so the form can reset itself. */
  onAdd: (stock: Stock) => Promise<boolean>;
}

export function StockForm({ submitting, onAdd }: StockFormProps) {
  const [form, setForm] = useState<Stock>(EMPTY_FORM);

  function update<K extends keyof Stock>(key: K, value: Stock[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const added = await onAdd({ ...form, yahooSymbol: form.yahooSymbol.trim() });
    if (added) setForm(EMPTY_FORM);
  }

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        Add to watchlist
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        <TextField
          label="Symbol"
          name="yahooSymbol"
          required
          mono
          value={form.yahooSymbol}
          onChange={(e) => update("yahooSymbol", e.target.value)}
          placeholder="AAPL"
        />
        <TextField
          label="Name"
          name="name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Apple Inc. (AAPL.US)"
          wrapperClassName="lg:col-span-2"
        />
        <div>
          <label
            htmlFor="currency"
            className="mb-1.5 block text-xs font-medium text-slate-600"
          >
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={form.currency}
            onChange={(e) => update("currency", e.target.value as Stock["currency"])}
            className={fieldClasses}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <TextField
          label="Futunn"
          name="futunnParam"
          required
          mono
          value={form.futunnParam}
          onChange={(e) => update("futunnParam", e.target.value)}
          placeholder="AAPL-US"
        />
        <TextField
          label="Aastocks"
          name="aastocksParam"
          required
          mono
          value={form.aastocksParam}
          onChange={(e) => update("aastocksParam", e.target.value)}
          placeholder="AAPL"
        />
        <div className="flex justify-end lg:col-span-6">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding…" : "Add stock"}
          </Button>
        </div>
      </form>
    </section>
  );
}
