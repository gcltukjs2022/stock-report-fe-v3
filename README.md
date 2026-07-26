# Stock Watchlist (stock-report-fe-v3)

The control panel for the **stock-report** pipeline — a single-page React app that lets you:

- **Manage the watchlist** — add, list, and remove the stocks the backend scrapes (symbol, name, currency, and the Futunn / AAStocks scrape params).
- **Download the daily report** — grab the generated `.docx` for the current day.

## Tech stack

- **React 19** + **TypeScript**, built with **Vite**
- **Tailwind CSS v4** for styling
- **axios** for HTTP
- **IBM Plex Sans / IBM Plex Mono** (Google Fonts)

## Project structure

```
src/
  config/env.ts     Validated, typed environment config (single source of truth)
  types/stock.ts    Stock + Currency types
  services/         httpClient (axios instance) · stocksService · reportService
  hooks/            useStocks (list/add/remove) · useReport (download URL + readiness)
  components/       StockManager (page) · AppHeader · ReportCard · StockForm · StockTable
    ui/             Button · TextField · Alert + shared style constants
```

The data layer (`services/`) is decoupled from React, hooks own state, and components stay presentational.

## Environment variables

Vite only exposes variables prefixed with `VITE_` to the client, and they are **compiled into the build** (publicly visible — never put secrets here). Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the stock-manager API Gateway serving `GET/POST/DELETE /stocks`. |
| `VITE_REPORT_DOWNLOAD_URL` | Templated URL for the daily report. Must contain a `{date}` token, replaced at runtime with the report date as **DDMMYYYY (UTC)** — matching the backend's `report-v3-DDMMYYYY.docx` filename. |

**Why the `{date}` template?** The backend names each report by date, so the URL is deterministic and the app can build it directly with no lookup call. Keeping the *entire* URL in one variable means you can repoint the download at any bucket/path — for example, fall back to an older source — by editing a single line, with no code change. The date is formatted in **UTC** to stay in step with the backend's clock (the report job runs at 08:55 UTC); local time would drift by a day near the UTC-midnight boundary and 404.

Config is validated once at startup in `src/config/env.ts`: a missing variable — or a `VITE_REPORT_DOWNLOAD_URL` without a `{date}` token — throws a clear error instead of failing silently later.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the two variables
npm run dev            # http://localhost:5173
```

Other scripts:

```bash
npm run build     # type-check (tsc -b) + production build to dist/
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

## Deployment

`npm run build` outputs a static bundle to `dist/` — host it anywhere static (e.g. S3 + CloudFront). The `VITE_*` variables are baked in at build time, so set them in the build environment **before** running `npm run build`.

## Browser support & responsiveness

Targets modern browsers. Tailwind CSS v4 sets the floor — **Safari 16.4+, Chrome 111+, Firefox 128+** (≈ 2023 onward), which covers current iOS Safari and Android Chrome. The layout is responsive down to small phones: sections stack to a single column, and the watchlist table scrolls horizontally within its own container rather than overflowing the page.

## Related services

- **Stock-manager API** (`VITE_API_BASE_URL`) — a separate API Gateway backend that owns the `Stocks` DynamoDB table.
- **Report pipeline** (`stock-report-be-v3`) — scrapes the news, generates the daily `.docx`, and uploads it to the S3 bucket the download URL points at.
