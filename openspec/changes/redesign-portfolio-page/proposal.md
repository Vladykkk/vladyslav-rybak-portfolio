# Proposal

## Why

The bento-grid page reads as flat and static: a grid of equal cards with little motion, and the Experience career tree hides most of the work behind a click-to-reveal side panel. The owner wants a calmer, more crafted look in the style of minimal engineer portfolios (single column, hairline structure, small precise details) with smoother motion, and an Experience section that shows every role at a glance.

## What Changes

- **BREAKING (spec)**: Replace the bento overview hero with a profile overview: grid-pattern cover, overlapping portrait, name and title, a list of profile facts (current role, location, live local time, email, remote availability), a three-figure stats strip (years of experience, current company), the top stack and CV / GitHub / LinkedIn actions.
- Lay the page out as one centered column bounded by hairline rails, with full-bleed hatched dividers between sections and section titles that show a count where it helps (Experience, Skills, Achievements).
- Replace the mobile "Menu" dropdown with a row of section links under the header bar: every section one tap away, sideways scrolling with edge fades when the row does not fit, and anchor jumps that clear the taller header.
- Restyle About (bio with an education and languages side column), Skills (hairline grid of groups), Achievements (dated rows) and Contact (statement over the grid pattern), and add a footer with a back-to-top link.
- **BREAKING (spec)**: Replace the Experience career tree with a timeline: one row per company (location, work mode and a current-role marker), its positions newest first with employment type, period and duration, then the summary, highlights and case studies. Case studies are native disclosures, the first one open; all of their text is in the server-rendered HTML.
- Add motion, all CSS-driven and off under reduced motion: staggered hero entrance, scroll-linked section reveals, a reading-progress line under the header, a circular reveal when switching theme, and a slide when a case study opens or closes. Browsers without support show the final state.
- Theme toggle: choosing the theme the OS already uses clears the saved override, so the page follows the OS again.
- Switch typefaces to Hanken Grotesk (text) and JetBrains Mono (labels and meta), with a cool neutral palette, the existing teal accent and a smaller corner radius.
- Content: Insiders highlights become one line each (the short titles only labelled tree branches); the profile gains a time zone and a decorative coordinates caption.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `portfolio-page`: section order names the new hero; the bento overview requirement is replaced by a profile overview; responsive layout describes the single column; themes add the OS-matching reset; restrained motion covers the new scroll-linked and transition effects; navigation adds the phone link row; the Experience career tree is replaced by an Experience timeline.
- `portfolio-content`: the identity requirement no longer refers to a "first visible card"; experience entries add a per-position duration.

## Impact

- Code: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/nav.tsx`, `src/components/section.tsx`, `src/components/theme-toggle.tsx`, `src/components/local-time.tsx` (new), every file in `src/components/sections/`; `src/components/sections/experience-tree.tsx` is removed.
- Content model: `src/content/types.ts` and `src/content/profile.ts` (`timeZone`, `coordinates`, `highlights` as strings).
- Library: `src/lib/experience.ts` gains `formatDuration`, covered in `src/lib/experience.test.ts`.
- Dependencies: none added; fonts load through `next/font/google`.
- Not changed: SEO metadata, JSON-LD, the OG image layout, the not-found page (it picks up the new tokens), and the delivery pipeline.
