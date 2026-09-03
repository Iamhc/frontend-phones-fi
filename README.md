# frontend-phones-fi

# Finlet — EMI Shop Frontend

React + Vite + Tailwind frontend for the Finlet EMI shopping demo — a
Snapmint-style product page where every EMI plan is backed by a partner
mutual fund.

Backend repo (required to run this): https://github.com/Iamhc/backend-fi

## Stack

- React 18 + React Router
- Vite
- Tailwind CSS

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
```

This expects the backend API running on **http://localhost:4000** — clone and
start [backend-fi](https://github.com/Iamhc/backend-fi) first (`npm install && npm start`
there). The Vite dev server proxies `/api/*` requests to `:4000` (see
`vite.config.js`).

If the backend isn't running, the home page will show:
> Couldn't load products. Is the API server running on port 4000?

## Production build

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally on :4173
```

For a production deploy, point the built `dist/` at a static host and make
sure `/api/*` requests are proxied or CORS'd to wherever the backend is
actually deployed (see `src/lib/api.js` — it calls relative `/api/...` paths).

## Project structure

```
src/
  pages/
    Home.jsx           # product grid, fetches GET /api/products
    ProductPage.jsx     # product detail, fetches GET /api/products/:slug
  components/
    Header.jsx
    ProductCard.jsx
    VariantPicker.jsx   # storage + colour selection
    EmiPlanCard.jsx     # selectable EMI plan option
  lib/
    api.js              # fetch client (listProducts, getProduct, checkout)
    format.js            # INR currency formatting
```

## Routes

- `/` — product grid
- `/products/:slug` — product detail (e.g. `/products/iphone-17-pro`)

## Data flow

Nothing is hardcoded — `Home.jsx` and `ProductPage.jsx` fetch from the API on
mount via `src/lib/api.js`, and the "Proceed" button posts the selected
`variantId` + `emiPlanId` to `POST /api/checkout` for confirmation.

## Notes

- Currency formatting assumes INR (`Intl.NumberFormat('en-IN', ...)`).
- Design tokens (colors, fonts) live in `tailwind.config.js`.
