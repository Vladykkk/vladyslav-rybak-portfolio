# Tasks

## 1. Tokens, type and frame

- [x] 1.1 Replace Space Grotesk with Hanken Grotesk and JetBrains Mono via `next/font/google` in `src/app/layout.tsx`, mapped to `--font-sans`, `--font-heading` and `--font-mono`; verify `npm run build` succeeds and computed `font-family` on `body` is Hanken Grotesk
- [x] 1.2 Set the cool-neutral oklch palette, teal primary and `--radius: 0.375rem` for both themes in `src/app/globals.css`, and drop the `bento` utility; verify both themes render and no `bento` class remains (`grep -r bento src` is empty)
- [x] 1.3 Add the `hatch` and `blueprint` utilities, `Divider` in `src/components/section.tsx` (hatched strip with full-width lines, `before:border-border`) and `body { overflow-x: clip }`; verify at desktop width that the divider lines span the viewport in border colour and the page has no horizontal scrollbar
- [x] 1.4 Wrap `main` and the header `nav` in a `max-w-4xl` column with `border-x` rails, add a `count` superscript to `Section`, and add the footer with a back-to-top link in `src/app/page.tsx`; verify the section order and anchors match the "Section order" requirement
- [x] 1.5 Replace the mobile `<details>` menu with a section-link row below `md` (shadcn `scroll-fade-x`, `--scroll-fade-reveal: 2rem`, thin scrollbar, inset focus ring) and move the anchor offset to `html { scroll-padding-top: 6.5rem }` (`3.5rem` from `md`); verify at 360px that the edge fades follow the scroll position and that tapping a link leaves the section title visible below the header

## 2. Hero and static sections

- [x] 2.1 Add `timeZone` and `coordinates` to `Profile` and `profile.ts`; verify `npm run typecheck` passes
- [x] 2.2 Add `src/components/local-time.tsx` (`useSyncExternalStore`, server snapshot `null`); verify the static HTML (`curl localhost:3000`) shows "Europe/Kyiv" and the loaded page shows a time like "19:31 EET local time"
- [x] 2.3 Rebuild `hero.tsx`: grid cover with title and coordinates, overlapping portrait (`relative z-10`, so the grid does not paint over it), name and title, facts list, stats strip, top stack and CV / GitHub / LinkedIn actions; verify in the browser that the portrait sits above the grid
- [ ] 2.4 Verify the "Profile overview → Ten-second scan" scenario: at a 1440×900 viewport, every hero item is visible above the fold
- [x] 2.5 Restyle About (bio + education/languages column), Skills (hairline `gap-px` grid), Achievements (dated rows with certificate links) and Contact (statement over the grid pattern); verify each renders in both themes

## 3. Motion

- [x] 3.1 Add `animate-rise` (transform-only, staggered through `--i`) to the hero blocks; verify the hero is fully opaque on first paint
- [x] 3.2 Add the `reveal` utility (`animation-timeline: view()`, range `entry 0%`–`entry 8rem`) to section titles and bodies, and the `scroll-progress` line under the header (`scroll(root)`), both behind `@supports` and `prefers-reduced-motion: no-preference`; verify sections fade in on scroll and the line grows with scroll in Chrome
- [ ] 3.3 Verify the "Unsupported scroll-linked animation" scenario in a browser without scroll-driven animations (or with them disabled): every section is visible and there is no progress line
- [x] 3.4 Add the circular view-transition theme switch, centred on the toggle, and clear the stored theme when the target matches the OS preference in `theme-toggle.tsx`; verify the reveal plays on click and `localStorage.theme` is absent after switching back to the OS theme
- [ ] 3.5 Verify the "Reduced motion" scenario with OS reduce-motion on: no entrance, reveal, progress, theme or disclosure animation runs, and all content is visible

## 4. Experience timeline

- [x] 4.1 Add `formatDuration` (counting both end months) to `src/lib/experience.ts` with tests in `experience.test.ts` for 5m, 1y and an open-ended 1y 5m; verify `npm test` passes
- [x] 4.2 Change `Role.highlights` to `string[]` and update the Insiders highlights in `profile.ts`; verify `npm run typecheck` passes
- [x] 4.3 Replace the career tree with the timeline in `experience.tsx` (company row with current marker and sr-only text, positions newest first with type, period and duration, summary, highlights, `<details>` case studies with the first open) and delete `experience-tree.tsx`; verify no import of `experience-tree` remains and the section renders as in the "Experience timeline" requirement
- [x] 4.4 Add the `disclosure` utility (animates `::details-content`) scoped to the case studies; verify a case study slides open on click and the mobile nav menu still opens unclipped
- [ ] 4.5 Verify "Opening a case study by keyboard": Tab to a collapsed case study, press Enter and Space, and confirm it opens and closes with a visible focus ring

## 5. Integration checks

- [x] 5.1 Run `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`; verify all exit 0 with no lint warnings
- [x] 5.2 Check a 390px-wide viewport: hero, experience and contact stack in one column with no horizontal scroll
- [ ] 5.3 Run an automated accessibility audit (e.g. Lighthouse or axe) in both themes; verify no contrast or heading-order violations
- [ ] 5.4 Run Lighthouse on a production build (`npm run build && npm start`); verify Performance, Accessibility, Best Practices and SEO are each 100, as the achievements claim

## Workflow follow-up

- When archiving, update the `## Purpose` of `openspec/specs/portfolio-page/spec.md`: it still says "single bento-grid page", which the archive does not rewrite.
- Archive the change once the open verification tasks pass, then run `openspec validate --specs` to confirm the merged specs.
