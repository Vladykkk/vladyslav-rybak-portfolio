# Tasks

## 1. Project scaffold

- [x] 1.1 Run `npx create-next-app@latest .` in the repo root (TypeScript, ESLint, Tailwind, `src/`, App Router, alias `@/*`); verify `npm run dev` serves the default page at `http://localhost:3000`
- [x] 1.2 Add `.nvmrc` with Node 26 and `"engines": { "node": "26.x" }` in `package.json`; verify `node -v` matches inside the project with `nvm use`
- [x] 1.3 Remove create-next-app demo content (default page markup, demo SVGs in `public/`) and set a placeholder page; verify `npm run build` succeeds and `public/` holds no framework demo assets
- [x] 1.4 Run `npx shadcn@latest init` (Next.js, Tailwind v4, CSS variables on); verify `components.json` and `src/lib/utils.ts` (`cn()`) exist and `npm run build` still succeeds

## 2. Formatting and linting

- [x] 2.1 Install Prettier (exact version), `@trivago/prettier-plugin-sort-imports` and `prettier-plugin-tailwindcss`; create `.prettierrc` with `importOrder` [`^react(.*)$`, `^next(.*)$`, `<THIRD_PARTY_MODULES>`, `^@/(.*)$`, `^[./]`], separation and specifier sorting on, Tailwind plugin last, `"tailwindFunctions": ["cn", "cva"]`; create `.prettierignore` (`.next`, `out`, `build`, `coverage`); verify `npx prettier . --check` passes after one `--write`
- [x] 2.2 Extend the generated `eslint.config.mjs`: ignores `.next`, `out`, `next-env.d.ts`; add `eslint-plugin-tailwindcss` recommended flat config; add `eslint-config-prettier/flat` last; verify `npm run lint` exits 0 and a deliberately misformatted file produces no ESLint formatting errors
- [x] 2.3 Add scripts `lint`, `typecheck` (`tsc --noEmit`), `format` (`prettier --write .`), `format:check` (`prettier --check .`); verify each runs and exits 0 on a clean tree, and that `typecheck` exits non-zero on a deliberate type error

## 3. Pre-commit hook

- [x] 3.1 Install husky and lint-staged, run `npx husky init`, set `.husky/pre-commit` to `npx lint-staged`; configure lint-staged with `"*.{ts,tsx}": "eslint --fix"` and `"**/*": "prettier --write --ignore-unknown"`; verify a commit containing an unfixable lint error is aborted and a commit with only formatting issues succeeds with the file reformatted

## 4. CI

- [ ] 4.1 Create `.github/workflows/ci.yml`: triggers `workflow_dispatch`, `pull_request` (`types: [opened, synchronize]`), `push` to `main`; steps `actions/checkout@v4`, `actions/setup-node@v4` (`node-version-file: .nvmrc`, `cache: npm`), `npm ci`, `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm test`; verify by opening a PR with a lint error (check fails) and then fixing it (check passes)

## 5. Deployment

- [ ] 5.1 Push the scaffold to `main` and import the repo into Vercel (production branch `main`); verify the `*.vercel.app` production URL serves the placeholder page
- [ ] 5.2 Open a test PR; verify Vercel posts a unique preview URL on it and the preview response carries `X-Robots-Tag: noindex`

## 6. Content model

- [x] 6.1 Define `src/content/types.ts` (identity, career start, roles grouped by company with positions, case studies, skill groups, achievements, education, languages, contact, CV path) per `specs/portfolio-content`; verify `npm run typecheck` passes
- [x] 6.2 Write `src/content/profile.ts` with `satisfies Profile`, filled from LinkedIn and the current CV: `careerStart` August 2024; Future Wealth Group (Full Stack Engineer, full-time, remote, Switzerland, Jul 2025 – Present; coordinates a team of 3 developers — code reviews, coding standards, communication framework) with case studies for the internal CRM (including RBAC, JWT auth and 2FA), self-hosted CI/CD with Docker and NGINX, and SEO landing pages (Lighthouse 100), no delivery-speed figure; Insiders (Trainee Aug–Dec 2024, Junior Dec 2024 – Jul 2025) with the three highlights from `specs/portfolio-content`; eight skill groups incl. AI & Productivity (Cursor, Claude Code, Codex, Gemini); achievements; Bachelor's in Information Technology, Lviv Polytechnic National University, 2023–2026; English B2 / Ukrainian native; email, LinkedIn, GitHub; verify removing a required field (e.g. a role's start date) makes `npm run build` fail naming that field
- [x] 6.3 Implement the years-of-experience helper (from `careerStart`, nearest half year, halves round up) with one `node --test` check: Aug 2024 → Oct 2026 = 2, → Nov 2026 = 2.5 (exact halfway), → May 2027 = 3; add an `npm test` script; verify `npm test` passes
- [ ] 6.4 Review every case study against the NDA rules in `specs/portfolio-content` (no screenshots, client names, internal metrics, or internal architecture); verify by owner sign-off recorded in the PR description
- [x] 6.5 Write `README.md` covering what the project is, local setup, scripts, and "how to update your profile" (edit `profile.ts`, replace `public/cv.pdf`); verify the documented commands run as written

## 7. Visual system and primitives

- [x] 7.1 Choose the visual identity (accent color, typeface, radius, spacing scale), optionally mocked in Figma first; set it as shadcn's light and dark tokens in `globals.css` and load the typeface with `next/font`; verify both themes pass WCAG AA contrast for text and accent on card backgrounds, and that palette, radius and typeface each differ from shadcn's defaults
- [x] 7.2 Implement theming: `@custom-variant dark` on the `.dark` class, inline head script (OS preference fallback, `localStorage` in try/catch), `ThemeToggle` client component; verify no wrong-theme flash on hard reload in both OS settings and that the manual choice persists across reloads
- [x] 7.3 Add shadcn `card`, `badge` and `button` via `npx shadcn@latest add`; build the own `Section` wrapper (section anchors, `scroll-margin-top`) and CSS-only motion helpers wrapped in `prefers-reduced-motion: no-preference`; verify with reduced motion enabled that nothing animates, and with JS disabled that all text is visible
- [x] 7.4 Build `Nav`: sticky bar with name, section anchors, theme toggle; below 640px anchors collapse into a `<details>` menu; external links use `target="_blank" rel="noopener noreferrer"`; verify full keyboard operation with visible focus and that every anchor scrolls to its section

## 8. Page sections

- [x] 8.1 Add assets: `public/me.jpg`, `public/certificates/*` (from the old repo), `public/cv.pdf` (owner's CV updated to "Full Stack Engineer" and a team of 3 developers); verify each URL loads from the dev server and the CV text matches the page's title and team size
- [x] 8.2 Build the Hero bento (identity with remote availability, years, current company, top stack, hackathon 3rd place, CV/contact CTA) with `grid-template-areas` for 4/2/1 columns and the photo via `next/image` with `priority`; verify all cards are above the fold at 1440×900 and stack in one column at 360px without horizontal scroll
- [x] 8.3 Build About (short current bio, education, languages); verify the text contains none of "UI designer", "Web Designer", "learning React", "searching a job"
- [x] 8.4 Build Experience with company grouping and case-study cards (diagram or technology strip, no product images); verify Insiders shows both positions with their own dates under one heading and Future Wealth Group shows "Present"
- [x] 8.5 Build Skills as eight named groups using shadcn `Badge`; verify every skill renders exactly once and backend, DevOps, database and AI & Productivity groups are present
- [x] 8.6 Build Achievements, with the BEST::HACKath0n Lviv item stating "3rd place" and linking its certificate; verify all achievements from the spec render
- [x] 8.7 Build Contact with email (`mailto:`), LinkedIn, GitHub and CV links only; verify there is no phone number, no form and no Instagram link anywhere on the page
- [x] 8.8 Build `src/app/not-found.tsx` with a short message and a shadcn `Button` link back to `/`; verify `curl -I <url>/does-not-exist` returns `404` and the page renders in both themes with a working home link

## 9. SEO and metadata

- [x] 9.1 Add `siteUrl` constant and root `metadata` (title "Vladyslav Rybak — Full Stack Engineer", description under 160 characters, canonical, `metadataBase`, Open Graph, Twitter card) and `lang="en"`; verify the rendered `<head>` contains each tag
- [ ] 9.2 Add `opengraph-image.tsx` (1200×630, name and title from `profile.ts`); verify `/opengraph-image` returns a 1200×630 PNG and a pasted preview URL shows it in a link-preview debugger
- [ ] 9.3 Render `Person` JSON-LD from `profile.ts` (name, job title, employer, location, LinkedIn, GitHub); verify a structured data validator reports a valid `Person` with no errors
- [ ] 9.4 Add `sitemap.ts` and `robots.ts` (allow only when `VERCEL_ENV === "production"`); verify production serves both and a preview's `robots.txt` disallows all
- [x] 9.5 Add `icon.png` and `apple-icon.png` in the new identity; verify the browser tab shows the custom icon

## 10. Release checks

- [ ] 10.1 Run Lighthouse (mobile and desktop) against the production URL; verify 100 in Performance, Accessibility, Best Practices and SEO, and fix any regression before continuing
- [ ] 10.2 Run an automated accessibility audit (e.g. axe) in both themes; verify zero contrast and heading-order violations
- [ ] 10.3 Walk the page at 320px, 360px, 768px and 1440px in both themes with reduced motion on and off; verify no horizontal scroll, all sections reachable from Nav, and no tutorial-era visuals present

## Workflow follow-up

- Update the LinkedIn Featured link to the new site, and the GitHub bio to "Full Stack Engineer"; pin `vladyslav-rybak-portfolio` on the GitHub profile.
- Take down or redirect the old site's deployment, then archive `Vladykkk/portfolio` (archive, not delete).
- Optionally attach a custom domain in Vercel and update `siteUrl`.
- Archive this change after the release checks pass.
