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
