export const CURRENCIES = ["USD", "HKD", "RMB"] as const;

export type Currency = (typeof CURRENCIES)[number];

export interface Stock {
  yahooSymbol: string;
  name: string;
  currency: Currency;
  futunnParam: string;
  aastocksParam: string;
}
