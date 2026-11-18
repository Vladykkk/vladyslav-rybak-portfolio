# Spec Delta

## MODIFIED Requirements

### Requirement: Current professional identity
The page SHALL present the owner's name, the title "Full Stack Engineer", location (Lviv, Ukraine) and availability for remote roles. The page MUST NOT describe the owner as a "UI designer", "Web Designer" or as learning their core stack or searching for a first job.

#### Scenario: Visitor reads the hero
- **WHEN** a visitor opens the page
- **THEN** the hero shows name, "Full Stack Engineer", location and an "open to remote roles" indicator

### Requirement: Experience entries
Each role SHALL show company, title, employment type, work mode (remote or on-site), location, start date and end date or "Present", and each position's duration in whole years and months, counting both the start and end month. Consecutive roles at one company SHALL be grouped under that company with each title and its own dates.

#### Scenario: Two positions at one company
- **WHEN** the Insiders entry is rendered
- **THEN** it shows "Trainee Frontend Developer" (Aug 2024 – Dec 2024, 5m) and "Junior Frontend Developer" (Dec 2024 – Jul 2025, 8m) under one Insiders heading

#### Scenario: Current role
- **WHEN** the Future Wealth Group entry is rendered
- **THEN** it shows "Full Stack Engineer", full-time, remote, Switzerland, Jul 2025 – Present

#### Scenario: Duration of the current position
- **GIVEN** the current position started in July 2025
- **WHEN** the site is built in November 2026
- **THEN** the position's duration reads "1y 5m"
