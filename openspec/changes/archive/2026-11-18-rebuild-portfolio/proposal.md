# Proposal

## Why

The current portfolio (repo `Vladykkk/portfolio`, built in 2023) presents a job-seeking beginner who is "now learning React and TypeScript", while the owner is a Full Stack Engineer with commercial experience who coordinates a team of 3 developers. It is also a GitHub fork of a public tutorial project (`safak/animated-portfolio`), written in plain JavaScript, which contradicts the TypeScript / Next.js profile shown on LinkedIn. Because current commercial work is under NDA and earlier client work has no public links, the portfolio itself is the only code a recruiter can inspect, so it must both tell the current story accurately and prove the skills it claims.

## What Changes

- New, original repository (`Vladykkk/vladyslav-rybak-portfolio`) replaces the forked one; the old repo is archived once the new site is live.
- Rebuilt on Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.
- Full redesign as a bento-grid single page with the owner's own visual identity, light and dark themes, restrained motion.
- UI primitives (Card, Badge, Button) and the color-token system come from shadcn/ui, with a custom theme rather than the library default.
- Positioning changes from "Web Developer and UI designer" to "Full Stack Engineer", with an "open to remote roles" signal.
- New Experience section with NDA-safe case studies (Future Wealth Group in depth, Insiders concise) — replaces the "Featured Works" project demos.
- New Achievements section (hackathon 3rd place, mentoring and technical interviews, Angular → React migration, Lighthouse 100 landing pages).
- Skills regrouped (Core, Frameworks, UI, State & forms, Payments & CMS, DevOps & tooling, Databases, AI & Productivity) instead of a flat 7-item frontend list.
- Education and languages added; downloadable up-to-date CV added.
- Contact reduced to email, LinkedIn and GitHub links. **BREAKING** (vs. old site): the contact form (EmailJS) and the public phone number are removed.
- Removed: 2023 projects (Water Quality Map, first landing page), tutorial visuals (parallax planets, mountains, stars, animated phone SVG), custom cursor, Instagram link.
- New technical SEO baseline: metadata, Open Graph image, sitemap, robots, `Person` structured data, Lighthouse 100 target.
- New delivery pipeline: Prettier, ESLint, pre-commit hook, GitHub Actions CI, Vercel production and preview deployments.

## Capabilities

### New Capabilities
- `portfolio-content`: The single source of profile content (identity, experience and case studies, skills, achievements, education, languages, contact, CV) and the rules it must follow — accuracy against the owner's current profile and NDA-safe disclosure.
- `portfolio-page`: The rendered single page — bento-grid sections and their order, responsive behavior, light/dark theming, motion, and accessibility.
- `seo-metadata`: How the page presents itself to search engines and link previews — metadata, Open Graph image, sitemap, robots, structured data, and the Lighthouse quality bar.
- `delivery-pipeline`: How changes reach production — local formatting and lint checks, pre-commit hook, CI checks on pull requests and `main`, and Vercel production/preview deployments.

### Modified Capabilities
<!-- None: the repository has no existing specs. -->

## Impact

- **Repositories**: new code lives in `Vladykkk/vladyslav-rybak-portfolio` (currently empty). `Vladykkk/portfolio` is not modified by this change apart from being archived after launch.
- **Dependencies**: next, react, react-dom, typescript, tailwindcss (motion is CSS-first; an animation library is added only if a specific interaction needs it — see design.md); shadcn/ui component sources copied into the repo by its CLI, which adds radix-ui, class-variance-authority, clsx, tailwind-merge, lucide-react and tw-animate-css; dev: eslint (+ eslint-config-next, eslint-config-prettier, eslint-plugin-tailwindcss), prettier (+ @trivago/prettier-plugin-sort-imports, prettier-plugin-tailwindcss), husky, lint-staged. `@emailjs/browser`, `framer-motion` and `sass` are dropped.
- **Systems**: Vercel project connected to the GitHub repo; GitHub Actions workflow; optional custom domain.
- **Assets carried over**: `me.jpg` (profile photo) and the two hackathon certificate images. Owner supplies the current CV as a PDF, updated to match the site's title (Full Stack Engineer) and team size (3 developers).
- **Profile consistency**: GitHub bio ("front-end developer") should be updated to match the new positioning, and the new repo pinned on the GitHub profile (manual, outside the codebase).
