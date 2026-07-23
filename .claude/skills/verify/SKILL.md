---
name: verify
description: How to build, run, and drive this app to verify changes
---

# Verifying changes in finance-b

- Build check: `npm run build` (Vite + tsc; a >500 kB chunk warning is pre-existing and expected).
- Run: `npm run dev` — Vite dev server at http://localhost:5174 (port set in vite.config.ts). Hot reload works for TSX and CSS.
- The app auto-authenticates with mock data (MSW in `src/mocks/`), so pages under `Layout` load directly, e.g. http://localhost:5174/calculator — no login step needed.
- Drive the UI with the Chrome browser tools (claude-in-chrome); screenshot the page as evidence.
- i18n: switch languages via the flag dropdown in the top-right header (EN/ES/FR/ET). Language persists in localStorage key `selectedLanguage` — switch back to English when done. Missing translation keys render as the raw key string, so check labels visually.
