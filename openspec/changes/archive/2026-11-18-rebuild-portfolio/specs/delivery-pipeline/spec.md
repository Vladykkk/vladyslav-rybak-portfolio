# Spec Delta

## Purpose

Defines how code changes are checked and reach production — consistent formatting and linting locally, automated checks on every pull request and on main, and automatic preview and production deployments.

## ADDED Requirements

### Requirement: Consistent formatting
The repository SHALL enforce one formatting style for all source files, including a fixed import order (React, then Next.js, then third-party, then `@/` aliases, then relative imports) and sorted utility class names.

#### Scenario: Unformatted file
- **WHEN** the format check runs on a file with unsorted imports
- **THEN** the check fails and names the file

### Requirement: Lint and type safety
The repository SHALL provide a lint command and a type-check command, and both MUST pass with zero errors on `main`. Linting MUST NOT report formatting issues already covered by the formatter.

#### Scenario: Type error introduced
- **WHEN** a change introduces a TypeScript type error
- **THEN** the type-check command exits non-zero

### Requirement: Pre-commit check
Committing SHALL automatically format and lint only the staged files, and the commit MUST be blocked if lint errors remain.

#### Scenario: Commit with a lint error
- **WHEN** the owner commits a staged file containing a lint error that cannot be auto-fixed
- **THEN** the commit is aborted with the lint output

### Requirement: CI checks
Every pull request (opened or updated) and every push to `main` SHALL run CI that installs dependencies from the lockfile, then runs lint, type-check and format check, on a pinned Node.js version. CI SHALL also be runnable manually.

#### Scenario: Pull request with failing lint
- **WHEN** a pull request contains a lint error
- **THEN** the CI check fails and is shown as failing on the pull request

#### Scenario: Lockfile drift
- **WHEN** `package.json` and the lockfile disagree
- **THEN** CI fails at the install step

### Requirement: Deployments
Pushes to `main` SHALL deploy to production automatically, and every pull request SHALL get its own preview deployment URL. A failing build MUST NOT replace the current production deployment.

#### Scenario: Pull request preview
- **WHEN** a pull request is opened
- **THEN** a unique preview URL is posted on the pull request

#### Scenario: Broken build on main
- **WHEN** a push to `main` fails to build
- **THEN** production keeps serving the previous successful deployment
