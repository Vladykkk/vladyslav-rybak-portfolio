# Design

## Context

- Greenfield: `Vladykkk/vladyslav-rybak-portfolio` is empty apart from OpenSpec setup. Nothing is migrated from the old codebase except content facts and three images (`me.jpg`, two hackathon certificates from the old repo's `public/`).
- The old site is a Vite + React + SCSS + Framer Motion single page; its structure is not reused (see proposal.md — Why).
- All work content is under NDA or has no public links, so the page carries the story through text, numbers and owner-made diagrams (see `specs/portfolio-content`).
- Toolchain as of planning: Next.js 16.4, Tailwind CSS 4.3, shadcn CLI 4.23, ESLint 9/10 flat config, Prettier 3, husky 9, lint-staged 17.
- The owner's own setup guide (Notion: React + Vite + ESLint + Prettier + husky + GitHub Actions) is the baseline for tooling, adapted to Next.js in Decision 8.

## Goals / Non-Goals

**Goals:**
- A fully static single page that is cheap to keep current (edit one data file, push).
- Lighthouse 100 in all four categories, mobile and desktop (`specs/seo-metadata`).
- A repo clean enough to be pinned on GitHub as a code sample.

**Non-Goals:**
- Blog, CMS, multiple pages, or i18n (English only; Ukrainian can be added later if needed).
- Contact form, analytics, or any server-side runtime.
- Automated Lighthouse in CI (checked manually before release; revisit if regressions happen).
- Unit/E2E test suites — the page has no business logic; type-check, lint and the build cover the content contract. The one exception is a single `node --test` check for the derived years-of-experience calculation (it has a rounding rule).

## Decisions

### 1. Next.js App Router, fully static, server components by default
The page is one route (`/`) rendered at build time. Every section is a server component; the only client component is the theme toggle. Special routes use Next's file conventions: `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `icon.png`, `apple-icon.png`, and `not-found.tsx` (themed 404 rendered inside the root layout, so it gets the theme script and fonts for free).
- *Why*: zero runtime cost, best possible Lighthouse, and it matches the stack the owner claims.
- *Alternative*: keeping Vite + React with TS — rejected; it would not demonstrate Next.js, which LinkedIn leads with.

### 2. Content as one typed TypeScript module
`src/content/profile.ts` exports a single object checked with `satisfies Profile` (types in `src/content/types.ts`). Sections import from it; no section hardcodes copy. A missing required field becomes a type error, and `next build` type-checks, so the build fails naming the field (`specs/portfolio-content` — Single content source).
- Years of experience are computed from `careerStart` (August 2024) at build time, rounded to the nearest half year with halves rounding up, and shown without "+" ("2.5 years" at launch). Symmetric rounding means the value can also run up to 3 months ahead (e.g. 2 years 9 months shows as "3 years"); the owner accepted this.
- Content is sourced from both LinkedIn and the current CV; where they disagreed, the owner chose: title "Full Stack Engineer", team of 3 developers described as coordination (not a formal lead role), no delivery-speed figure, and no Trainee → Junior promotion claim (routine growth).
- *Alternative*: JSON/MDX + runtime schema validation (zod) — rejected; adds a dependency for what the type system already guarantees.

### 3. Layout: CSS Grid bento with named areas
shadcn's `Card` for every card (Decision 11) and one own `Section` wrapper. The hero bento uses `grid-template-areas` per breakpoint (4 columns ≥1024px, 2 columns ≥640px, 1 column below). Sections below the hero reuse the same card style for visual consistency.

```
 >=1024px                                   <640px
 +-----------------+--------+--------+       +----------+
 | identity        | years  | 3rd    |       | identity |
 +--------+--------+--------+--------+       | years    |
 | now    | stack           | cv/cta |       | 3rd      |
 +--------+-----------------+--------+       | now      |
                                             | stack    |
                                             | cv/cta   |
                                             +----------+
```

### 4. Theming without a dependency
Tailwind v4 `@custom-variant dark` keyed on the `.dark` class on `<html>` (shadcn's convention). A ~10-line inline script in `<head>` reads `localStorage` (wrapped in try/catch) or falls back to `prefers-color-scheme` and sets the class before first paint, so there is no flash. The toggle writes `localStorage` and the class. Colors are shadcn's CSS-variable tokens (`--background`, `--foreground`, `--primary`, `--muted`, …) defined once per theme with the owner's own values.
- *Alternative*: `next-themes` — fine, but it is a dependency for ~25 lines of code we fully control.

### 5. Motion: CSS-first, no animation library by default
Hover and entrance effects use CSS transitions/keyframes, all wrapped in `@media (prefers-reduced-motion: no-preference)`. Entrance animations must start from a visible state or use `animation-fill-mode` so text is present in the server HTML.
- *Why*: JS animation libraries that start elements at `opacity: 0` hide content until hydration, which breaks the "content visible without JS" scenario and costs LCP.
- *Alternative*: Framer Motion (`motion` package) — the owner knows it; add it only if a specific interaction (e.g. expanding a case study with a layout animation) needs it, with `initial={false}` for server-rendered content.

### 6. Navigation without JavaScript
A sticky top bar with name, section anchors and the theme toggle. Below 640px the anchors collapse into a native `<details>`/`<summary>` menu. Anchors use `scroll-margin-top` so headings are not hidden under the bar. External links use `target="_blank" rel="noopener noreferrer"`.

### 7. SEO assets
- Metadata via the root layout's `metadata` export, with `metadataBase` from one `siteUrl` constant.
- OG image generated at build by `opengraph-image.tsx` (`next/og`), so it always matches the current title.
- `Person` JSON-LD rendered as a `<script type="application/ld+json">` in the layout, built from `profile.ts`.
- `robots.ts` allows indexing only when `VERCEL_ENV === "production"`; otherwise it disallows everything. (Vercel also sends `X-Robots-Tag: noindex` on preview deployments by default; we don't rely on that alone.)
- Fonts via `next/font` (self-hosted, no layout shift); photo via `next/image` with explicit dimensions and `priority` in the hero.
- CV served from `public/cv.pdf`; certificates from `public/certificates/`.

### 8. Tooling: the owner's setup guide, adapted to Next.js

| Guide step | Adaptation |
|---|---|
| `npm create vite@latest` (React + TS + SWC) | `npx create-next-app@latest .` — TypeScript, ESLint, Tailwind, `src/`, App Router, alias `@/*` |
| `npm init @eslint/config` wizard | Skipped; create-next-app generates `eslint.config.mjs` with `core-web-vitals` + `typescript` |
| `reactRefresh.configs.vite`, `globals.browser`, `react/react-in-jsx-scope`, `quotes` rule | Dropped (Vite-only, covered by Next's config, or owned by Prettier) |
| `globalIgnores(["dist"])` | `.next`, `out`, `next-env.d.ts` |
| Prettier + `.prettierrc` + `.prettierignore` | Same; ignore also `.next` |
| `@trivago/prettier-plugin-sort-imports` `importOrder` | `^react(.*)$`, `^next(.*)$`, `<THIRD_PARTY_MODULES>`, `^@/(.*)$`, `^[./]` |
| `prettier-plugin-tailwindcss` | Same; MUST be last in `plugins`; add `"tailwindFunctions": ["cn", "cva"]` so classes inside shadcn's helpers are sorted |
| `eslint-config-prettier` (installed, never wired in guide) | Added last in `eslint.config.mjs` via `eslint-config-prettier/flat` |
| `eslint-plugin-tailwindcss@beta` | Latest (4.x supports Tailwind v4); dropped if it misfires on v4 classes or shadcn token classes (`bg-background`, …) — Prettier already sorts classes |
| husky + lint-staged (`prettier --write --ignore-unknown`) | Same, plus `eslint --fix` for `*.{ts,tsx}` |
| `ci.yml` | `on.pull_request.types` (guide had `type`), `actions/setup-node` with `node-version-file: .nvmrc` and npm cache, `npm ci` (guide had Yarn's `--immutable`), then `lint`, `typecheck` (`tsc --noEmit`), `format:check` (`prettier --check .`) |

No `next build` in CI: Vercel builds every pull request as a preview, and a failed build blocks that deployment.

### 9. Hosting: Vercel Git integration
Production branch `main`; previews for every PR. No `vercel.json` unless a header or redirect needs it. Default `*.vercel.app` domain until a custom domain is chosen (Open Questions).

### 10. Repository layout

```
src/
  app/        layout.tsx, page.tsx, not-found.tsx, globals.css,
              opengraph-image.tsx, sitemap.ts, robots.ts, icon.png, apple-icon.png
  components/ Section, Nav, ThemeToggle, sections/*
    ui/       card.tsx, badge.tsx, button.tsx   (shadcn sources, owned and editable)
  content/    profile.ts, types.ts
  lib/        utils.ts                          (shadcn's cn())
public/       me.jpg, cv.pdf, certificates/*
.github/workflows/ci.yml
components.json                                 (shadcn CLI config)
.nvmrc
```

### 11. UI primitives: shadcn/ui, with a custom theme
Use shadcn/ui's `Card` (bento and section cards), `Badge` (skill chips, "Open to remote") and `Button` (`asChild` around `<a>` for CV and contact links), plus its token system. Components are added with `npx shadcn@latest add` and live in `src/components/ui/` as owned source. Interactive components (Sheet, DropdownMenu, Dialog, Tooltip) are not added unless a spec requires them; the mobile nav stays a native `<details>` menu and dividers are plain borders.
- *Why*: ready, accessible primitives with no runtime styling engine; the owner already lists shadcn on the CV, so the repo demonstrates it; the token system gives the visual identity one place to live.
- *Alternatives*: hand-built primitives — more code for the same result; MUI — runtime styling and a strong default look, harder to keep at Lighthouse 100.
- *Constraint*: the default theme is never shipped as-is (`specs/portfolio-page` — Original visual identity). Tokens are customized before any section is built.

## Risks / Trade-offs

- [Case study wording discloses something covered by the NDA] → Owner reviews every case study against the contract before launch; the spec forbids screenshots, client names, internal metrics and architecture specifics.
- [Lighthouse 100 is fragile — one large image, font or third-party script drops it] → No third-party scripts; `next/font`, `next/image`, CSS-only motion; run Lighthouse on the preview URL before each merge that touches layout or assets.
- [`eslint-plugin-tailwindcss` lags Tailwind v4 features] → Treat it as optional; remove rather than disable rules piecemeal.
- [Site looks like every other shadcn template] → Custom palette, radius and typeface set as tokens in task 7.1, before sections are built; verified by the Theme review scenario.
- [Linked CV contradicts the site (title, team size)] → CV consistency requirement; the PDF text is checked whenever it is replaced.
- [Content drifts from LinkedIn again] → Single data file, derived years; updating both is one sitting.
- [Theme flash or hydration mismatch from the inline script] → `suppressHydrationWarning` on `<html>` only; verify first paint in both OS themes.
- [Old site still live and indexed after launch] → Archive the old repo and remove or redirect its deployment as part of the migration plan.

## Migration Plan

1. Build and deploy the new site on its `*.vercel.app` URL; verify specs and Lighthouse on production.
2. Optional: attach a custom domain in Vercel and update `siteUrl`.
3. Update the LinkedIn Featured link, and the GitHub bio ("Full Stack Engineer"); pin the new repo.
4. Take down or redirect the old deployment, then archive `Vladykkk/portfolio`.
5. Rollback: Vercel "Instant Rollback" to the previous production deployment; the old repo stays archived (read-only), not deleted.

## Open Questions

- **Custom domain**: stay on `*.vercel.app` or buy a domain.
- **Where the old site is deployed**: needed for migration step 4.
- **Visual identity specifics** (accent color, typeface): decided during the design task, optionally mocked in Figma first.
