# Redesign plan

The plan for rebuilding Wallet (`personal-finance-manager`) and its API (`personal-finance-manager-api`) from scratch:
target stack, features, design direction, data model, releases and the decisions that wait for the owner. Written
2026-11-21, before any code; it is a proposal until the owner picks the scope (see [Open decisions](#open-decisions)).
The current app is described in the [README](../README.md); the API's hosting in
[`personal-finance-manager-api/docs/deployment.md`](https://github.com/DamTchorzewski/personal-finance-manager-api/blob/main/docs/deployment.md).

## Where we start (2026-11-21)

| Part     | Today                                                                                              |
| -------- | -------------------------------------------------------------------------------------------------- |
| Web app  | React 18 + Vite 4, JavaScript, Redux Toolkit, MUI + Emotion + CSS modules, Chart.js, axios, npm     |
| Screens  | login, sign-up, transactions table, statistics (doughnut by category), USD/EUR table from NBP      |
| API      | Express 4, JavaScript, Joi, hand-written `swagger.json`, Firebase Admin, Cloud Run (min 0, max 2)   |
| Data     | `users/{uid}/transactions`: `type` `+`/`-`, fixed English categories, `sum` as a **string**, `date` as `{day, month, year}` strings, PLN only |
| Hosting  | GitHub Pages (`gh-pages`, no HTTP headers, SPA through `404.html`), Firebase Auth (e-mail, Google), demo in `localStorage` |
| Quality  | ESLint only; no TypeScript, no tests, no CI, no a11y check; two layouts switched by `react-media` |

What is worth keeping: Firebase Auth with the ID token verified on every request, the demo mode, Cloud Run on the free
tier, no secret anywhere. Everything else is replaced.

## Target stack

### Web app

| Concern        | Choice                                                                 | Why                                                                                      |
| -------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Build          | Vite (current major) + React 19 + TypeScript (strict)                  | a signed-in SPA needs no server rendering; fastest dev loop; static output                |
| Routing        | TanStack Router (file routes, typed search params)                     | filters and periods live in the URL (`?period=30d&account=…`), typed end to end           |
| Server state   | TanStack Query (+ persisted cache in IndexedDB)                        | caching, optimistic add/edit/delete, offline reading; replaces Redux + redux-persist       |
| Local state    | Zustand (UI preferences only)                                          | tiny; everything else is server state                                                     |
| Styling        | Tailwind CSS v4 + CSS variables as design tokens, shadcn/ui on Radix   | accessible primitives (dialog, popover, combobox), our own look, no MUI weight            |
| Motion         | Motion (`motion/react`) with `<MotionConfig reducedMotion="user">`     | layout transitions, number counters, shared-element sheets; one library, not GSAP + Motion |
| Charts         | Recharts 3 (shadcn charts), visx only for the Sankey and the calendar heatmap | themable with the tokens, accessible tables next to each chart                    |
| Forms          | React Hook Form + Zod                                                  | the same schemas as the API contract (below)                                              |
| API client     | generated from the API's OpenAPI by **orval**: typed fetch client, TanStack Query hooks, Zod schemas | the contract is written once (in the API) and the front end fails `typecheck` when it drifts |
| i18n           | Paraglide JS (compiled messages), Polish default, English second       | type-safe keys, tree-shaken, ICU plurals; all money and dates through `Intl`              |
| Icons, fonts   | Lucide; self-hosted variable font (proposal: Geist or Manrope) with tabular figures | standards: self-hosted WOFF2 subsets, no CDN                                  |
| PWA            | `vite-plugin-pwa` (install, offline read, app shortcuts)               | an app, not a client site: the offline decision goes to `docs/decisions.md`               |
| Tests          | Vitest (money math, forecast, parsers), Playwright + axe (light and dark), Firebase emulators | `standards/testing.md`, `accessibility.md`                                     |
| Tooling        | pnpm, Prettier, ESLint flat config, husky + commitlint, `.nvmrc`       | `standards/package-json.md`, `git.md`                                                     |

### API

| Concern     | Choice                                                                     | Why                                                                           |
| ----------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Runtime     | Node (current LTS) + TypeScript on Cloud Run, as today                     | the agreed hosting; free tier                                                 |
| Framework   | Hono + `@hono/zod-openapi`                                                 | routes declared with Zod schemas; **OpenAPI is generated from the code**, not hand-written (`standards/testing.md`) |
| Validation  | Zod (replaces Joi)                                                         | one schema language for the API and the generated client                      |
| Docs        | Scalar or Swagger UI on `/docs`, `openapi.json` on `/openapi.json`         | the contract the web app's orval reads                                        |
| Data        | Firestore through Firebase Admin, as today                                 | no new service                                                                |
| Auth        | Firebase ID token verified on every request (unchanged)                    | `standards/security.md`                                                       |
| Rates       | a rates module: NBP first, Frankfurter (ECB) second, cached in Firestore   | NBP answered "An error has occurred." on several endpoints during the check on 2026-11-21, so the app must not call it directly |
| Tests       | Vitest + the Firestore and Auth emulators; contract test of `openapi.json` | no real project in tests                                                      |
| Limits      | rate limit per user, body size limit, CORS allow-list                      | `standards/security.md`                                                       |

### Hosting (proposal: one change)

Keep Cloud Run, Firestore and Firebase Auth. **Move the web app from GitHub Pages to Firebase Hosting** in the same
Google project, with a rewrite of `/api/**` to the Cloud Run service:

- **Security headers** (CSP, HSTS, COOP, ...) are required by `standards/security.md` and GitHub Pages cannot send them;
  Firebase Hosting can (`firebase.json`, as in karcar and souler).
- **Same origin for the API**: no CORS, no preflight on every request, and the API address is no longer a build variable.
- **Google sign-in keeps working**: Firebase's sign-in helper lives on the Hosting domain, so the browsers' third-party
  storage partitioning does not break the pop-up or redirect flow (on `github.io` it is a different site).
- **Real SPA rewrites** instead of the `404.html` trick, preview channels for pull requests, instant rollback.
- Free: the Spark limits of Hosting (10 GB storage, 360 MB a day) are far above a small app.

The address becomes `<project>.web.app` or a custom domain (owner's choice). GitHub Pages then serves only a redirect
page. If the owner prefers to stay on Pages, the plan still works: the CSP goes into a `<meta>` tag and the other
headers are written down as not possible in `docs/decisions.md`.

### Two repositories, one contract

The API and the web app stay separate repositories (the agreed layout and names). `standards/testing.md` asks for
schemas shared by the API and its clients; here that is done by generation: the API owns the Zod schemas and publishes
`openapi.json`, the web app runs `orval` against a pinned copy of it (`src/api/openapi.json`, refreshed by
`pnpm api:sync`), so a changed field fails the web app's `typecheck` in CI. The alternative, merging both into one
`pnpm` monorepo with `packages/schemas`, is listed under [Open decisions](#open-decisions).

## Data model v2

Money is never a float: **integer minor units** (grosze, cents) plus an ISO 4217 code. Dates are ISO `YYYY-MM-DD`
(the day the money moved, no time zone), timestamps are UTC ISO strings shown in `Europe/Warsaw`.

```
users/{uid}                        profile: displayName, baseCurrency, locale, monthStartDay, theme, accentHue, widgets[]
users/{uid}/accounts/{id}          name, kind (cash | bank | savings | card | foreign), currency, openingBalanceMinor, archived
users/{uid}/categories/{id}        name, kind (expense | income), icon, colour, parentId?, archived
users/{uid}/transactions/{id}      accountId, kind (expense | income | transfer), amountMinor, currency,
                                   baseAmountMinor, rate { source: nbp-a | ecb | manual, date, value },
                                   categoryId, date, note, tags[], payee?, recurringId?, transferId?, createdAt, updatedAt
users/{uid}/budgets/{id}           categoryId, period (month), limitMinor, alertAt [0.8, 1.0], rollover
users/{uid}/goals/{id}             name, targetMinor, currency, targetDate?, accountId?, icon, colour
users/{uid}/recurring/{id}         template (as a transaction), rule (RRULE subset: monthly / weekly / yearly, day), nextDate, autoPost
users/{uid}/rules/{id}             match (note contains / payee equals / amount range), set (categoryId, tags), order
rates/{source}/days/{date}         the table of that day (NBP A, NBP C, ECB), written by the API's cache
```

- **The rate of the transaction's day is frozen** in the transaction (`rate`, `baseAmountMinor`), so a report from March
  does not change when the rates change. NBP has no table on weekends and holidays: the last earlier table is used,
  which is also how Polish accounting does it.
- **Migration**: a one-off script in the API repository reads `users/*/transactions` v1 and writes v2 (`sum` "86.40" →
  `amountMinor: 8640`, `currency: "PLN"`, the English category names → seeded category ids, `{day, month, year}` → ISO).
  It runs on the emulator first, then once on the project with the owner present; v1 documents are kept until the owner
  says they can go.

## Features

Everything below uses free services only: NBP (`api.nbp.pl`, no key, tables A and C, gold price), Frankfurter
(`api.frankfurter.dev`, ECB rates, CORS open), Nager.Date (`date.nager.at`, Polish public holidays). No paid API, no AI
service; the "smart" parts are local rules and statistics.

### Must (the first release)

| # | Feature                     | What the user gets                                                                                   |
| - | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| M1 | New design and layout      | phone first: bottom dock, sheets that slide up, thumb-reach actions; desktop: side rail + dashboard grid; light, dark, system |
| M2 | Accounts                   | several wallets (cash, bank, savings, card, foreign-currency), balance per account and in total       |
| M3 | Multi-currency             | enter a transaction in any currency; the base-currency value at the NBP rate of that day is stored    |
| M4 | Currency hub               | NBP table A (mid) and C (buy/sell), converter, 30/90/365-day chart, favourite currencies; ECB fallback with the source shown |
| M5 | Transactions 2.0           | fast add (one sheet, amount first, keyboard friendly), search, filters in the URL, edit and delete with undo, virtualised list |
| M6 | Own categories             | add, rename, recolour, icon, archive; the old ten are the seed                                       |
| M7 | Budgets                    | monthly limit per category, progress bars, alerts at 80 % and 100 % (in-app)                         |
| M8 | Dashboard                  | balance, this month's in/out, spending by category, budgets, recent, upcoming                         |
| M9 | Period switcher            | 7 d / 30 d / 90 d / year / custom, everywhere, in the URL                                            |
| M10 | CSV export and import     | export of any filtered list; import with a column-mapping preview and duplicate detection             |
| M11 | Demo mode                 | kept and richer: 12 months of believable data, all features, reset button, never touches the API     |
| M12 | Polish and English        | Polish by default; amounts, dates and plurals through `Intl`                                         |
| M13 | Quality bar               | WCAG 2.2 AA in both themes, Lighthouse targets, security headers, tests in CI (the standards)        |

### Should (the second release)

| #  | Feature                       | What the user gets                                                                                 |
| -- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| S1 | Recurring transactions        | rent, salary, subscriptions as rules; due dates moved off weekends and Polish holidays (Nager.Date) |
| S2 | Subscription detector         | finds repeating payments (same payee, similar amount, monthly) and offers to turn them into rules; "you pay 312 zł a month for 7 subscriptions" |
| S3 | Savings goals ("jars")        | target and date, "you need 420 zł a month", contributions, progress ring, finished-goal moment      |
| S4 | Categorisation rules          | "note contains Biedronka → Groceries"; suggestions learned from the user's own history (local)      |
| S5 | Monthly insights              | what changed against last month, the biggest categories, unusual spending (outliers), a printable report |
| S6 | Command palette (Ctrl+K)      | jump anywhere, run any action, and **quick add in plain words**: `kawa 14 zł wczoraj` → an expense of 14 PLN, Cafés, yesterday (a local parser, Polish and English) |
| S7 | Personalisation               | accent colour from one hue, dashboard widgets reorder and hide, base currency, density, greeting by time of day and name |
| S8 | Pay-day month                 | the budget month starts on the pay day (for example the 10th), not on the 1st                       |
| S9 | Privacy mode                  | one tap blurs every amount (on the bus, at work); a long press reveals one                          |
| S10 | PWA                          | install on the phone, offline reading, "add expense" shortcut on the home-screen icon               |
| S11 | Net worth over time          | accounts in all currencies converted at each day's rate; optional gold holding at the NBP gold price |

### Wow (the third release, pick some)

| #  | Feature                         | What the user gets                                                                                |
| -- | ------------------------------- | ------------------------------------------------------------------------------------------------- |
| W1 | Cash-flow forecast              | the balance line continued 30/90 days ahead from the recurring rules and the usual variable spend, with a confidence band |
| W2 | Safe to spend today             | one number: what is left for today after bills, goals and budgets until the next pay day          |
| W3 | Money flow (Sankey)             | income → accounts → categories in one animated picture                                            |
| W4 | Spending calendar               | a year heatmap of daily spending; tap a day to see it                                             |
| W5 | Travel mode                     | set the trip currency and budget, enter amounts in it, see PLN at the NBP sell rate (what a bank charges) next to the mid rate |
| W6 | What-if simulator               | "spend 20 % less on Food" → the goal is reached 3 months earlier                                  |
| W7 | Year in review                  | a story-style recap in December (biggest month, top category, goals reached), shareable as an image without amounts |
| W8 | Receipt scan (experiment)       | photo of a receipt read in the browser with Tesseract.js (no upload), amount and date suggested    |

Left out on purpose: bank connections (PSD2 aggregators are paid or need a licence), shared wallets between users (a
new permission model; a later decision), push notifications by e-mail or SMS (paid, and the weekly check must stay free).

## Design direction

**Mood:** calm, premium fintech: deep neutral surfaces, one confident accent, generous numbers. Inspiration only from
the owner's glass dashboard sample: frosted panels over a soft background, a floating dock, the period switcher, numbers
that count up, quiet charts. Its ATLAS branding and sample data are not used.

- **Layout.** Phone (320-767 px): one column, a floating bottom dock (Home, Transactions, Add, Budgets, More), the add
  button in the middle; sheets slide up from the bottom and close with a swipe or Escape. Tablet: two columns. Desktop
  (≥ 1024 px): a side rail, a 12-column dashboard of widgets, panels open on the right instead of covering the page.
- **Surfaces.** Glass only where it helps (dock, top bar, sheets) with a solid fallback under
  `prefers-reduced-transparency` and in forced colours; content cards are solid for contrast.
- **Numbers.** A variable font with tabular figures; the big balance is the hero of each screen; minus and plus are
  shown with a sign and a word, never by colour alone.
- **Colour.** Tokens in three layers (primitive → semantic → component); the accent is one hue the user can change, every
  pair checked for 4.5:1 in both themes (as in `portfolio-website-template`). Category colours from a palette that stays
  apart for colour-blind users.
- **Motion.** Short and physical: counters, the dock indicator sliding, list items settling, a sheet following the finger.
  Everything inside `prefers-reduced-motion: no-preference`; with `reduce` only fades.
- **Charts.** Each chart has a table view and a text summary for screen readers; tooltips work with the keyboard.

## What needs a designer (graphics and animation)

| Asset                                   | Kind                      | Notes                                                                 |
| --------------------------------------- | ------------------------- | --------------------------------------------------------------------- |
| Name and logo                           | brand                     | "Wallet" is generic; decide keep or rename before the icons            |
| App icon set                            | brand                     | PWA maskable icons, favicon, Apple touch icon, splash screens          |
| Sign-in hero                            | illustration or 3D render | a card or coins in the app's colours; light and dark versions          |
| Empty states (about 8)                  | illustrations             | no transactions, no budgets, no goals, nothing found, offline, error, 404, all caught up |
| Onboarding (3 screens)                  | illustrations             | accounts, budgets, goals                                               |
| Goal jar                                | **Rive** (state machine)  | coins drop in as a goal fills; the fill level is an input, so one file serves every goal |
| Success and goal-reached moments        | Rive or Lottie            | a check, a small burst; under 30 kB each                               |
| Year in review                          | animated story frames     | W7 only                                                                |

**A dedicated design chat is worth it**: brand (name, logo, icon set), the illustration style for the empty states, and
the Rive jar. Everything else (layout, tokens, UI motion) is done in code here. The design chat should start before
release 1 ends, so the icons and the sign-in hero land with it.

## Releases

Each step is one or more working branches with their own pull requests (`standards/git.md`); `develop` never deploys.

| Release | Web app                                                                 | API                                                       |
| ------- | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| 0. Foundations | pnpm, TypeScript, Vite, Tailwind v4 tokens, lint/format/husky/commitlint, Vitest, Playwright + axe, CI (level 3), Firebase Hosting config | TypeScript, Hono + zod-openapi, Vitest + emulators, CI, `/health` |
| 1. Core (Must) | shell, sign-in screens, demo adapter, dashboard, transactions, categories, accounts, budgets, currency hub, CSV, PL/EN | data model v2, accounts, categories, budgets, rates module with cache, migration script, generated OpenAPI |
| 2. Smart (Should) | recurring, detector, goals, rules, insights, command palette, personalisation, privacy mode, PWA, net worth | recurring, goals, rules endpoints; holiday calendar |
| 3. Wow  | forecast, safe-to-spend, Sankey, calendar, travel mode, what-if, year in review | forecast endpoint (or computed in the browser), report data |

The live app keeps working during the work: the old build stays on Pages until release 1 is on Firebase Hosting; the
API serves v1 and v2 side by side until the migration has run.

## Standards this follows

| Standard              | How                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `git.md`              | working branches from `develop`, work PR → `develop`, release PR → `main`, Conventional Commits   |
| `workflows.md`        | the app becomes a level 3 project: `ci.yml`, `deploy.yml`, `weekly.yml` (health of the site and `/api/health`) |
| `package-json.md`     | standard scripts (`format`, `lint`, `typecheck`, `test`, `test:e2e`, `check`, `build`, `health`), pnpm pinned, `author` |
| `accessibility.md`    | WCAG 2.2 AA, axe in light and dark, reduced motion, keyboard pass, `Intl`, Polish plurals        |
| `performance.md`      | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on the dashboard; charts and Motion loaded on demand          |
| `security.md`         | headers and CSP on Firebase Hosting, tokens verified on every request, Zod on the server, rate limit |
| `testing.md`          | unit tests next to the logic, e2e against the emulators, OpenAPI from the code                     |
| `env.md`              | `.env.example` with names only; the Firebase web config stays public and gets restricted to the site's origin |
| `project-readme.md`   | new README images after release 1 (`tools/readme-images`), Team section kept                      |
| `licenses.md`         | MIT stays: the web app is a team project (`S7venSurvivors-Wallet contributors`), the API is the owner's |

## Decisions (2026-11-21)

| # | Decision                 | The owner's answer                                                                 |
| - | ------------------------ | ---------------------------------------------------------------------------------- |
| 1 | Scope of release 1       | the Must list plus S6 (command palette) and S9 (privacy mode)                      |
| 2 | Hosting of the web app   | Firebase Hosting with `/api/**` rewritten to Cloud Run; the address (`.web.app` or a custom domain) is set by the owner later |
| 3 | Repositories             | two repositories, the client generated from the API's OpenAPI                      |
| 4 | Name and brand           | as recommended: a separate design chat for the name, logo, icons, illustrations and the Rive jar |
| 5 | Languages                | Polish and English                                                                 |
| 6 | Existing data            | stay in Firestore: the v1 → v2 migration runs on the live database                 |

## Open decisions

The questions as they were put to the owner; the answers are in the table above.

1. **Scope of release 1**: the Must list as it is, or with some Should items moved in (S6 command palette and S9 privacy
   mode are cheap).
2. **Hosting of the web app**: Firebase Hosting with `/api` on the same origin (recommended) or stay on GitHub Pages.
   With Firebase: `<project>.web.app` or a custom domain.
3. **Repositories**: two repositories with a generated client (recommended) or one monorepo.
4. **Name and brand**: keep "Wallet" or a new name; start the design chat for the logo, icons, illustrations and the Rive jar.
5. **Languages**: Polish and English (recommended) or Polish only.
6. **Existing data**: run the v1 → v2 migration on the live Firestore, or start the live database empty (nobody but the
   owner has used it so far, as far as the setup notes say).
