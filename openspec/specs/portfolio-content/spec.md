# portfolio-content Specification

## Purpose

Defines what profile content the portfolio presents — identity, experience, case studies, skills, achievements, education, languages and contact — and the accuracy and NDA-safety rules that content must satisfy.

## Requirements

### Requirement: Single content source
All profile content SHALL come from one structured content source in the repository, so that updating the profile means editing data only, without changing page layout code.

#### Scenario: Adding a new role
- **WHEN** the owner adds a new role entry to the content source and rebuilds
- **THEN** the new role appears in the Experience section without any layout code change

#### Scenario: Missing required field
- **WHEN** a content entry omits a required field (for example a role without a start date)
- **THEN** the build fails with an error naming the entry and field

### Requirement: Current professional identity
The page SHALL present the owner's name, the title "Full Stack Engineer", location (Lviv, Ukraine) and availability for remote roles. The page MUST NOT describe the owner as a "UI designer", "Web Designer" or as learning their core stack or searching for a first job.

#### Scenario: Visitor reads the hero
- **WHEN** a visitor opens the page
- **THEN** the first visible card shows name, "Full Stack Engineer", location and an "open to remote roles" indicator

### Requirement: Derived years of experience
Any "years of experience" figure SHALL be calculated from a configured career start date at build time, never hardcoded, rounded to the nearest half year with halves rounding up, and displayed without a "+" suffix.

#### Scenario: Value at launch
- **GIVEN** the career start date is August 2024
- **WHEN** the site is built in November 2026 (27 months)
- **THEN** the page shows "2.5 years"

#### Scenario: Time passes
- **GIVEN** the career start date is fixed in the content source
- **WHEN** the site is rebuilt a year later
- **THEN** the displayed years of experience has increased by one without a content edit

### Requirement: Experience entries
Each role SHALL show company, title, employment type, work mode (remote or on-site), location, start date and end date or "Present". Consecutive roles at one company SHALL be grouped under that company with each title and its own dates.

#### Scenario: Two positions at one company
- **WHEN** the Insiders entry is rendered
- **THEN** it shows "Trainee Frontend Developer" (Aug 2024 – Dec 2024) and "Junior Frontend Developer" (Dec 2024 – Jul 2025) under one Insiders heading

#### Scenario: Current role
- **WHEN** the Future Wealth Group entry is rendered
- **THEN** it shows "Full Stack Engineer", full-time, remote, Switzerland, Jul 2025 – Present

### Requirement: Case studies without links
Work under NDA SHALL be presented as written case studies with context, the owner's role, what was built, technologies, and outcome. Case studies MUST NOT include screenshots of the product, client or partner names, internal metrics (including team performance figures such as delivery speed), business data, or details of internal architecture beyond the generic system type.

#### Scenario: Future Wealth Group case study
- **WHEN** the current role is rendered
- **THEN** it states that the owner coordinates a team of 3 developers to keep work on track (code reviews, coding standards, team communication framework), without claiming a formal lead role
- **AND** it includes case studies covering the internal business platform (CRM) together with its access control (RBAC, JWT-based authentication and two-factor authentication) as one case study, self-hosted CI/CD with Docker and NGINX, and SEO-focused landing pages
- **AND** it contains no product screenshot, client name, or internal metric

#### Scenario: Concise earlier role
- **WHEN** the Insiders entry is rendered
- **THEN** it is summarized in no more than three highlights: Angular → React migration of a document-processing CRM; mentoring 2–4 developers and running technical interviews; client apps built from scratch in Next.js and Tailwind (for example a fitness app with multi-step forms, charts and i18n) scoring 95+ in Lighthouse

#### Scenario: Visual for a case study
- **WHEN** a case study needs a visual
- **THEN** it uses an owner-made diagram (for example an auth or CI/CD flow) or a technology strip, not a product image

### Requirement: Grouped skills
Skills SHALL be presented in named groups: Core, Frameworks & Libraries, UI, State & Forms, Payments & CMS, DevOps & Tooling, Databases, AI & Productivity. Every skill listed on the page SHALL belong to exactly one group.

#### Scenario: Backend and DevOps skills visible
- **WHEN** a visitor views the skills
- **THEN** backend (Node.js, Express, Nest.js), DevOps (Docker, NGINX, GitHub Actions) and database (PostgreSQL, MongoDB) skills are visible alongside frontend skills

#### Scenario: AI tooling visible
- **WHEN** a visitor views the skills
- **THEN** an AI & Productivity group lists Cursor, Claude Code, Codex and Gemini

### Requirement: Achievements
The page SHALL list achievements as standalone items, including: 3rd place at BEST::HACKath0n Lviv (May 2023), participation in Hackathon INT20H by BEST Kyiv (Feb 2023), mentoring 2–4 developers and running technical interviews, leading the Angular → React migration, and landing pages scoring 100 in all Lighthouse categories. The Trainee → Junior promotion is shown only through the Insiders position dates, not as an achievement or highlight.

#### Scenario: Hackathon placement shown
- **WHEN** the BEST::HACKath0n Lviv achievement is rendered
- **THEN** it states "3rd place" explicitly and links to the certificate

### Requirement: Education and languages
The page SHALL show education as a Bachelor's degree in Information Technology, Lviv Polytechnic National University, 2023–2026, and languages: English (B2, Upper-Intermediate) and Ukrainian (native).

#### Scenario: Visitor checks education
- **WHEN** a visitor looks for education
- **THEN** the degree, field, university and years are shown

#### Scenario: Visitor checks languages
- **WHEN** a visitor looks for language skills
- **THEN** English (B2) and Ukrainian (native) are listed

### Requirement: Contact and CV
The page SHALL offer contact via an email link, a LinkedIn link and a GitHub link, plus a download of the owner's current CV as a PDF. The page MUST NOT show a phone number and MUST NOT contain a contact form.

#### Scenario: Recruiter wants to reach out
- **WHEN** a visitor activates the email link
- **THEN** their mail client opens addressed to the owner

#### Scenario: Recruiter wants the CV
- **WHEN** a visitor activates the CV link
- **THEN** the PDF opens or downloads from the site's own domain

### Requirement: CV consistency
The linked CV SHALL state the same current title ("Full Stack Engineer") and team size (3 developers) as the page, and the page MUST NOT be published with a CV that contradicts it.

#### Scenario: CV replaced
- **WHEN** the owner replaces the CV file
- **THEN** its text is checked to show "Full Stack Engineer" as the current title and a team of 3 developers before the change is merged

### Requirement: Outdated content excluded
The page MUST NOT include the 2023 projects (Water Quality Map, first landing page) or the Instagram link.

#### Scenario: Visitor scans the page
- **WHEN** a visitor scrolls the whole page
- **THEN** none of the removed projects or the Instagram link appear
