# seo-metadata Specification

## Purpose

Defines how the portfolio presents itself to search engines, social link previews and quality audits, so a shared link looks professional and the site itself demonstrates the performance and SEO standard the owner claims.

## Requirements

### Requirement: Page metadata
The page SHALL have a title of the form "Vladyslav Rybak — Full Stack Engineer", a meta description summarizing role and stack, a canonical URL, and `lang="en"`.

#### Scenario: Search result
- **WHEN** a search engine indexes the page
- **THEN** it finds the specified title, a description under 160 characters, and a canonical URL pointing to the production domain

### Requirement: Link previews
The page SHALL provide Open Graph and Twitter card metadata with title, description, canonical URL and a 1200×630 preview image that shows the owner's name and title.

#### Scenario: Link pasted into a chat
- **WHEN** the production URL is pasted into LinkedIn, Slack or Telegram
- **THEN** the preview shows the image, title and description

### Requirement: Structured data
The page SHALL include `Person` structured data with name, job title, current employer, location, and profile links (LinkedIn, GitHub), and it SHALL pass schema validation.

#### Scenario: Rich results test
- **WHEN** the production URL is checked with a structured data validator
- **THEN** a valid `Person` entity is detected with no errors

### Requirement: Crawl files
The site SHALL serve a `robots.txt` that allows indexing of production and a `sitemap.xml` listing the page. Preview deployments MUST NOT be indexable.

#### Scenario: Production crawl
- **WHEN** a crawler requests `/robots.txt` and `/sitemap.xml` on the production domain
- **THEN** both are returned, and the sitemap lists the canonical page URL

#### Scenario: Preview deployment
- **WHEN** a crawler visits a pull-request preview URL
- **THEN** the response tells it not to index the page

### Requirement: Lighthouse quality bar
The production page SHALL score 100 in Lighthouse Performance, Accessibility, Best Practices and SEO on both mobile and desktop presets.

#### Scenario: Release audit
- **WHEN** Lighthouse runs against the production URL with the mobile preset
- **THEN** all four categories score 100

### Requirement: Favicon and app icons
The site SHALL provide a favicon and an Apple touch icon in the owner's visual identity.

#### Scenario: Browser tab
- **WHEN** the page is open in a browser tab
- **THEN** the tab shows the site's own icon, not a framework default
