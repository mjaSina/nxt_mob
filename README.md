# NXT Mob

A [Next.js](https://nextjs.org) mobile-first application built with **Ant Design** and **Tailwind CSS**.

## Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | 5.x |
| Ant Design | 6.3.0 |
| Tailwind CSS | 4.x |
| TanStack Query | 5.x |
| Axios | 1.x |
| ESLint | 9.x |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Changelog

### `63bf40b` — Initial Next.js 16 project with TypeScript, Tailwind CSS, and ESLint

- Scaffolded Next.js 16 project using `create-next-app`
- Configured **App Router** with `src/` directory structure
- Added **TypeScript** for type safety
- Integrated **Tailwind CSS 4** for utility-first styling
- Set up **ESLint 9** with `eslint-config-next`
- Included Geist font via `next/font`

### `30e6308` — Add Ant Design (antd) with AntdRegistry for SSR support

- Installed `antd@6.3.0`, `@ant-design/icons@6.1.0`, and `@ant-design/nextjs-registry@1.3.0`
- Wrapped the app with `AntdRegistry` in `layout.tsx` to ensure proper SSR style injection
- Ant Design components are now ready to use across the entire application

### `96883fc` — Add custom Tailwind theme tokens: colors, spacing, text sizes, and border radius

- Defined custom color palette: `primary`, `success`, `warning`, `danger`, `info` (each with light/dark variants)
- Added `neutral` grayscale from 50 to 900
- Created spacing tokens: `xs` (4px) through `3xl` (64px)
- Added extra text sizes: `2xs` (10px), `xs` (12px)
- Defined border radius tokens: `xs` (2px) through `full` (9999px)

### `aae920b` — Add Vazir font with @font-face and Tailwind font-vazir utility class

- Added Vazir font files (woff2) to `public/fonts/` with 5 weights (Thin, Light, Regular, Medium, Bold)
- Defined `@font-face` rules in `globals.css`
- Registered `--font-vazir` in `@theme inline` for Tailwind `font-vazir` class

### `c36aa33` — Replace fetch with Axios and add API base URL via environment variables

- Installed `axios` and created a shared Axios instance in `src/lib/axios.ts` with `baseURL` from `NEXT_PUBLIC_API_BASE_URL`
- Refactored `useApi` hook to use Axios instead of native `fetch` — removes manual `JSON.stringify`, `res.ok` checks, and `res.text()` parsing
- Added `.env.local` (development) and `.env.production` (production) for API base URL configuration (gitignored)

### Add login page with Server Action

- Created `/login` route with a login form using Ant Design components (`Input`, `Button`, `Card`, `Alert`)
- Form data is submitted via a **Server Action** (`loginAction`) instead of a client-side API call
- Used React 19's `useActionState` hook to manage form state, pending status, and server response
- Server action performs validation and returns success/error messages in Persian
- Button shows loading state while the action is in progress

### `f6852a0` — Add TanStack Query with SSR prefetch/hydration pattern and example page

- Installed `@tanstack/react-query` and `@tanstack/react-query-devtools`
- Created `QueryProvider` in `src/providers/` with default `staleTime: 60s`
- Added SSR example at `/examples/ssr-query` with prefetch + hydration

### Add proxy with auth guard and security headers

- Created `src/proxy.ts` (Next.js 16 replacement for `middleware.ts`) to handle network-level request interception
- **Auth Guard**: unauthenticated users are redirected to `/login` with a `callbackUrl` query param for post-login redirect
- **Public paths**: `/login`, `/register`, `/forgot-password` are accessible without a token
- **Logged-in redirect**: authenticated users visiting public paths (e.g. `/login`) are redirected to `/`
- **Security headers**: sets `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` on every response
- **Matcher**: excludes static assets (`_next/static`, `_next/image`, images, favicon) from proxy execution
