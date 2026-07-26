import { httpClient, toErrorMessage } from "./httpClient";
import type { Stock } from "../types/stock";

const STOCKS_PATH = "/stocks";

export async function getStocks(): Promise<Stock[]> {
  try {
    const { data } = await httpClient.get<Stock[]>(STOCKS_PATH);
    return data;
  } catch (error) {
    throw new Error(toErrorMessage(error, "Failed to load stocks"), {
      cause: error,
    });
  }
}

export async function addStock(stock: Stock): Promise<Stock> {
  try {
    const { data } = await httpClient.post<Stock>(STOCKS_PATH, stock);
    return data;
  } catch (error) {
    throw new Error(toErrorMessage(error, "Failed to add stock"), {
      cause: error,
    });
  }
}

export async function removeStock(yahooSymbol: string): Promise<void> {
  try {
    await httpClient.delete(`${STOCKS_PATH}/${encodeURIComponent(yahooSymbol)}`);
  } catch (error) {
    throw new Error(toErrorMessage(error, "Failed to remove stock"), {
      cause: error,
    });
  }
}
