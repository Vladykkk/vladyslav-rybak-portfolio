# Design

## Context

The page is a single statically rendered Next.js route. Its constraints come from the existing specs: no theme flash, content visible before JavaScript, WCAG 2.2 AA in both themes, reduced motion respected, and a palette, radius and typeface that differ from the component library's defaults. The achievements claim 100 in Lighthouse, so the hero must not delay Largest Contentful Paint. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Every new effect is CSS-only or a native browser feature, so it costs no JavaScript and degrades to the final state.
- Remove the client component behind the Experience section.

**Non-Goals:**
- A bottom "dock" navigation like one of the references; the sticky header already reaches every section.
- Rotating taglines, marquees or other continuous motion (WCAG 2.2.2 would require a pause control).
- Changing the OG image, metadata or JSON-LD.

## Decisions

**Layout frame.** The column is `max-w-4xl` with `border-x` rails on both `main` and the header's `nav`. Dividers are a hatched strip (`repeating-linear-gradient`) whose `::before` draws the top and bottom lines at `100vw`; `body { overflow-x: clip }` stops those lines adding a horizontal scrollbar. `max-w-3xl` was tried in planning, but it leaves the Experience case-study text too narrow.

**Hero entrance is transform-only.** Hero blocks rise with `translate` and a stagger delay, but no opacity fade, so the LCP element is painted at full opacity on first frame. Below-the-fold content fades as well, because it does not affect LCP.

**Scroll reveal and reading progress use scroll-driven animations.** `animation-timeline: view()` drives the section reveal (range `entry 0%` to `entry 8rem`, so tall sections are not left half-transparent), and `scroll(root)` drives the progress line. Both sit inside `@supports` and `prefers-reduced-motion: no-preference`. Without support the sections are simply visible and the progress line keeps `scale: 0 1` and stays hidden. An IntersectionObserver was rejected: it needs JavaScript and an initial hidden state, which breaks "content visible before JavaScript".

**Theme switch uses the View Transitions API.** The toggle sets `--vt-x` and `--vt-y` to the button's centre (from its bounding box, so keyboard activation works too) and wraps the class flip in `document.startViewTransition`; CSS grows `::view-transition-new(root)` with a `clip-path: circle()`. Without the API, or under reduced motion, the theme flips instantly. When the target theme matches `prefers-color-scheme`, the toggle removes the stored value instead of saving it. The existing pre-paint theme script is unchanged.

**Phone navigation is a link row, not a menu.** Below `md` the header gets a second row with the five section links, in place of the old `<details>` dropdown, which did not close after a tap, on Esc or on an outside tap. A popover-based menu was considered, but it still needs a script to close after a tap (fragment navigation does not dismiss it) and keeps the links behind an extra tap. The row uses shadcn's existing `scroll-fade-x` utility (scroll-driven edge fades, static fades as a fallback) instead of a custom one; its reveal distance is cut to `2rem` because the row scrolls only ~70px. A thin, border-coloured scrollbar stays as the baseline cue (overlay on phones). Links use an inset focus ring because the row clips overflow. The anchor offset moves from per-section `scroll-mt` to `html { scroll-padding-top }`: `6.5rem` below `md` for the taller header, `3.5rem` above.

**Experience uses native `<details>`.** Each case study is a `<details>`; the first is `open`. The chevron sits before the label and rotates, and there are no headings inside `<summary>`. A `disclosure` Tailwind utility animates `::details-content` with `interpolate-size: allow-keywords`, a `block-size` transition and a discrete `content-visibility` transition. It is not applied to every `<details>`, because its `contain: layout` would clip the nav's absolutely positioned mobile menu. Browsers without `interpolate-size` open instantly. Keeping the old tree was rejected because it hid content and needed a client component; a custom button accordion was rejected because `<details>` gives keyboard support and find-in-page for free.

**Durations are computed at build time.** `formatDuration(position, now)` counts both the start and end month and formats as `Ny Mm`. Like `yearsOfExperience`, the open-ended duration is fixed at build time.

**Local time is the only new client component.** `LocalTime` reads the clock through `useSyncExternalStore` with a 10-second interval; its server snapshot is `null`, so the static HTML shows the time-zone name and hydration does not mismatch.

**Tokens and type.** Hanken Grotesk and JetBrains Mono load via `next/font/google` as CSS variables. The palette is a cool neutral built from oklch with the existing teal primary; the radius drops to `0.375rem`. All of these differ from shadcn's defaults (neutral gray, Geist, `0.625rem`).

## Risks / Trade-offs

- [Scroll-driven animations and `interpolate-size` are not in every browser] → Both are progressive: content is visible, and disclosures open instantly.
- [Durations and years go stale between deploys] → Same accepted trade-off as years of experience; the scheduled or next deploy refreshes them.
- [Collapsed case studies may not be found by find-in-page in every browser] → Their text is in the HTML for indexing, and the first case study is open by default.
- [Muted text on the new palette could fall under AA] → Muted foregrounds are set at oklch L 0.48 (light) and 0.70 (dark); verify with an automated audit in both themes before merging.
- [A browser extension adding attributes causes hydration warnings in dev] → Not caused by this change; production is unaffected.

## Migration Plan

Ship as one deploy; there is no data migration. Roll back by reverting the commit.
