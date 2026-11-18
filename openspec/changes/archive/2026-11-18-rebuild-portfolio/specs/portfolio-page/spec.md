# Spec Delta

## Purpose

Defines how the portfolio renders as a single bento-grid page — section order, responsive layout, theming, motion, navigation and accessibility — so the profile can be scanned quickly on any device.

## ADDED Requirements

### Requirement: Section order
The page SHALL render, in order: Hero (bento overview), About, Experience (with case studies), Skills, Achievements, Contact. Each section SHALL have a stable anchor so it can be linked to directly.

#### Scenario: Deep link to a section
- **WHEN** a visitor opens the page URL with the Experience anchor
- **THEN** the page scrolls to the Experience section

### Requirement: Bento overview
The hero SHALL be a grid of cards that together show, without scrolling on a 1440×900 desktop viewport: identity (name, title, location, remote availability), years of experience, current company, top stack, the hackathon 3rd place, and a CV/contact call to action.

#### Scenario: Ten-second scan
- **WHEN** a visitor opens the page on a 1440×900 viewport
- **THEN** all overview cards listed above are visible above the fold

### Requirement: Responsive layout
The layout SHALL adapt from a multi-column grid on desktop to a single column on mobile, with no horizontal scrolling at any viewport width from 320px up.

#### Scenario: Phone width
- **WHEN** the page is viewed at 360px width
- **THEN** cards stack in one column, text is readable without zoom, and the page does not scroll horizontally

### Requirement: Light and dark themes
The page SHALL support light and dark themes, following the operating system preference by default, with a visible toggle that overrides it and persists across visits. The page MUST NOT flash the wrong theme on load.

#### Scenario: System preference
- **WHEN** a first-time visitor's OS is set to dark mode
- **THEN** the page renders in the dark theme from the first paint

#### Scenario: Manual override
- **WHEN** a visitor switches to light theme and reloads
- **THEN** the page renders in the light theme

### Requirement: Restrained motion
Animations SHALL be limited to entrance and hover effects that do not delay reading content, and SHALL be disabled when the visitor has requested reduced motion.

#### Scenario: Reduced motion
- **WHEN** a visitor's OS has "reduce motion" enabled
- **THEN** content appears without entrance or scroll animations

#### Scenario: Content not gated by animation
- **WHEN** JavaScript has not yet loaded
- **THEN** all text content is already visible in the page

### Requirement: Navigation
The page SHALL provide navigation to every section that works with mouse, touch and keyboard, and external links SHALL open in a new tab with safe link attributes.

#### Scenario: Keyboard user
- **WHEN** a visitor tabs through the page
- **THEN** every link and control receives a visible focus indicator in a logical order

#### Scenario: External link
- **WHEN** a visitor activates the LinkedIn link
- **THEN** LinkedIn opens in a new tab and the opened page has no access to the portfolio window

### Requirement: Accessibility baseline
The page SHALL meet WCAG 2.2 AA for color contrast in both themes, use one `h1` and a logical heading order, provide text alternatives for meaningful images, and be fully operable by keyboard.

#### Scenario: Contrast check
- **WHEN** an automated accessibility audit runs against both themes
- **THEN** it reports no contrast or heading-order violations

### Requirement: Not-found page
Any URL that does not match a page SHALL return HTTP status 404 and render a not-found page in the site's own visual identity and current theme, with a link back to the home page.

#### Scenario: Mistyped URL
- **WHEN** a visitor opens a path that does not exist
- **THEN** the response status is 404
- **AND** the page uses the site's theme and offers a link to the home page

### Requirement: Original visual identity
The page MUST NOT reuse visuals from the previous tutorial-based site (parallax planets, mountains, stars, sun, animated phone outline, custom cursor). Its color palette, corner radius and typeface MUST differ from any UI component library's default theme.

#### Scenario: Asset review
- **WHEN** the published assets are reviewed
- **THEN** none of the previous tutorial images or effects are present

#### Scenario: Theme review
- **WHEN** the page's theme tokens are compared with the component library's default theme
- **THEN** the palette, radius and typeface each differ from the defaults
