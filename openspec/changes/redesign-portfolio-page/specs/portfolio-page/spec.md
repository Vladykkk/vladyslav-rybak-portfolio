# Spec Delta

## MODIFIED Requirements

### Requirement: Section order
The page SHALL render, in order: Hero (profile overview), About, Experience (with case studies), Skills, Achievements, Contact, followed by a footer. Each section SHALL have a stable anchor so it can be linked to directly.

#### Scenario: Deep link to a section
- **WHEN** a visitor opens the page URL with the Experience anchor
- **THEN** the page scrolls to the Experience section

#### Scenario: Back to top
- **WHEN** a visitor activates the footer's back-to-top link
- **THEN** the page scrolls to the hero

### Requirement: Responsive layout
The page SHALL be laid out as one centered column bounded by hairline rails, with full-width hatched dividers between sections. Multi-column blocks inside the column SHALL collapse to a single column on mobile, with no horizontal scrolling at any viewport width from 320px up.

#### Scenario: Phone width
- **WHEN** the page is viewed at 360px width
- **THEN** multi-column blocks stack in one column, text is readable without zoom, and the page does not scroll horizontally

#### Scenario: Wide desktop
- **WHEN** the page is viewed at 2560px width
- **THEN** content stays in the centered column and the section dividers' lines span the full viewport width without a horizontal scrollbar

### Requirement: Light and dark themes
The page SHALL support light and dark themes, following the operating system preference by default, with a visible toggle that overrides it and persists across visits. Switching to the theme the OS currently uses SHALL clear the override. The page MUST NOT flash the wrong theme on load.

#### Scenario: System preference
- **WHEN** a first-time visitor's OS is set to dark mode
- **THEN** the page renders in the dark theme from the first paint

#### Scenario: Manual override
- **WHEN** a visitor switches to light theme and reloads
- **THEN** the page renders in the light theme

#### Scenario: Returning to the OS theme
- **GIVEN** a visitor's OS is set to light mode and they switched the page to dark
- **WHEN** they switch the page back to light
- **THEN** no override is stored, and the page follows the OS if it later changes to dark

### Requirement: Restrained motion
Animations SHALL be limited to entrance, scroll-linked reveal, reading progress, theme switch, disclosure and hover effects that do not delay reading content. Where a browser does not support an effect, content SHALL appear in its final state. All animations SHALL be disabled when the visitor has requested reduced motion; edge fades that only hint that a row scrolls are not motion and stay enabled.

#### Scenario: Reduced motion
- **WHEN** a visitor's OS has "reduce motion" enabled
- **THEN** content appears without entrance, scroll, theme-switch or disclosure animations

#### Scenario: Content not gated by animation
- **WHEN** JavaScript has not yet loaded
- **THEN** all text content is already visible in the page, apart from collapsed case-study details, which are present in the HTML

#### Scenario: Unsupported scroll-linked animation
- **WHEN** the browser does not support scroll-driven animations
- **THEN** every section is fully visible without scrolling into view first, and no reading-progress line is shown

### Requirement: Navigation
The page SHALL provide navigation to every section that works with mouse, touch and keyboard, and external links SHALL open in a new tab with safe link attributes.

#### Scenario: Keyboard user
- **WHEN** a visitor tabs through the page
- **THEN** every link and control receives a visible focus indicator in a logical order

#### Scenario: External link
- **WHEN** a visitor activates the LinkedIn link
- **THEN** LinkedIn opens in a new tab and the opened page has no access to the portfolio window

#### Scenario: Phone navigation
- **WHEN** the page is viewed at 360px width
- **THEN** every section link is shown in the sticky header without opening a menu, in a row that scrolls sideways when it does not fit, with a fade on each edge that has more links beyond it

#### Scenario: Section not hidden under the header
- **WHEN** a visitor activates a section link at any width
- **THEN** the page scrolls so the section title is fully visible below the sticky header

## REMOVED Requirements

### Requirement: Bento overview
**Reason**: The hero is no longer a grid of cards; it is replaced by the "Profile overview" requirement, which keeps the same above-the-fold content.
**Migration**: None for visitors. The same facts (identity, remote availability, years of experience, current company, top stack, CV and contact actions) remain in the hero.

### Requirement: Experience career tree
**Reason**: The tree showed one detail at a time and hid most of the work behind interaction. It is replaced by the "Experience timeline" requirement, which shows every role at once.
**Migration**: None for visitors. All role, position, highlight and case-study content remains on the page; case studies are opened individually instead of picked from the tree.

## ADDED Requirements

### Requirement: Profile overview
The hero SHALL show, without scrolling on a 1440×900 desktop viewport: portrait, name, title, current position and company, location, the owner's current local time, email, remote availability, years of experience, top stack, and CV, GitHub and LinkedIn actions.

#### Scenario: Ten-second scan
- **WHEN** a visitor opens the page on a 1440×900 viewport
- **THEN** every item listed above is visible above the fold

#### Scenario: Local time before JavaScript
- **WHEN** JavaScript has not yet loaded
- **THEN** the local-time line shows the owner's time zone name instead of a time

#### Scenario: Local time after load
- **WHEN** the page has loaded
- **THEN** the local-time line shows the current time in the owner's time zone and keeps it current while the page stays open

### Requirement: Experience timeline
The Experience section SHALL show every role without interaction: company, location, work mode, a marker on the current role, and each position newest first with employment type, period and duration, then the role's summary and highlights. Case studies SHALL be keyboard-operable disclosures whose full text is in the server-rendered HTML; the current role's first case study SHALL be open by default.

#### Scenario: Before JavaScript loads
- **WHEN** JavaScript has not yet loaded
- **THEN** every role, position, summary and highlight is visible, the first case study is expanded, and the other case studies are collapsed with their text present in the HTML

#### Scenario: Opening a case study by keyboard
- **WHEN** a visitor focuses a collapsed case study's title and presses Enter or Space
- **THEN** the case study expands, and pressing it again collapses it

#### Scenario: Current role marker
- **WHEN** the Future Wealth Group entry is rendered
- **THEN** it carries a visual current-role marker with an equivalent text alternative for screen readers, and the Insiders entry does not
