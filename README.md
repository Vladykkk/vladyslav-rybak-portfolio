# Vladyslav Rybak — Portfolio

Personal portfolio of Vladyslav Rybak, Full Stack Engineer. A single, fully static page built with Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui, deployed on Vercel.

## Local setup

Requires Node.js 26 (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script                 | What it does                              |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start the dev server                      |
| `npm run build`        | Production build (also type-checks)       |
| `npm start`            | Serve the production build                |
| `npm run lint`         | ESLint                                    |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit` |
| `npm run format`       | Format everything with Prettier           |
| `npm run format:check` | Check formatting without writing          |
| `npm test`             | Run the `node --test` checks in `src/lib` |

A pre-commit hook (husky + lint-staged) formats and lints staged files. CI runs lint, typecheck, format check and tests on every pull request and push to `main`.

## How to update your profile

All content lives in [`src/content/profile.ts`](src/content/profile.ts); no layout code needs to change.

- **New role or position**: add it to `roles` (newest company first, positions oldest first). Omit `end` for the current position and it shows as "Present".
- **Skills, achievements, education, languages, contact**: edit the matching field. TypeScript (`satisfies Profile`) makes the build fail if a required field is missing.
- **Years of experience** is calculated from `careerStart` at build time, so you don't need to edit it.
- **CV**: replace `public/cv.pdf`. Before merging, check that it states "Full Stack Engineer" and a team of 3 developers, matching the page.
- **Site URL**: change `siteUrl` in `src/lib/site.ts` when a custom domain is attached.

Case studies must stay NDA-safe: no screenshots, client names, internal metrics or internal architecture details.
