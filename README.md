# MedAlert — Automated Tests (LumeStack QA Challenge)

This repository contains the end-to-end automated test suite for **MedAlert**, built as part of the **LumeStack QA technical challenge**. Tests are written with [Playwright](https://playwright.dev/) and organized by project (e.g., `nurse`, `doctor`, `patient`).

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) installed (LTS version recommended)
- The MedAlert application running (e.g., `localhost:3000`)

## 🚀 Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <folder-name>
npm install
```

Install the browsers used by Playwright:

```bash
npx playwright install
```

> This command downloads the Chromium, Firefox, and WebKit binaries required to run the tests.

## ▶️ Running the tests

### Run all tests (headless mode — default)

```bash
npx playwright test
```

Runs every test across all configured projects, without visually opening the browser.

### Run in UI mode (interactive interface)

```bash
npx playwright test --ui
```

Opens a graphical interface where you can select, run, and debug individual tests, watch each step, inspect the DOM, and use time-travel debugging.

### Run in debug mode

```bash
npx playwright test --debug
```

Runs the tests step by step, pausing on each action, with the Playwright Inspector open to inspect selectors and page state.

To debug a specific test file:

```bash
npx playwright test tests/file-name.spec.ts --debug
```

### Run a single test

By file name:

```bash
npx playwright test tests/file-name.spec.ts
```

By test title (using `-g`, for "grep"):

```bash
npx playwright test -g "test name"
```

Example:

```bash
npx playwright test -g "Add vitalSign"
```

### Run tests for a specific project

Tests are organized by project (defined in `playwright.config.ts`, e.g., `nurse`, `doctor`, `patient`):

```bash
npx playwright test --project=nurse
```

## 📋 Listing tests

To list all available tests without running them:

```bash
npx playwright test --list
```

To list the tests of a specific project:

```bash
npx playwright test --project=nurse --list
```

## 📊 Viewing the report

After execution, Playwright generates an HTML report. To open it:

```bash
npx playwright show-report
```

This opens the report in the default browser, with details for each test (steps, screenshots, videos, and traces on failure, when configured).

## 🗂 Basic project structure

```
tests/
  ├── *.nurse.spec.ts     → tests for the nurse profile
  ├── *.doctor.spec.ts    → tests for the doctor profile
  └── *.patient.spec.ts   → tests for the patient profile
utils/                    → helper functions (dates, alerts, table helpers)
fixtures/                 → test data and authentication fixtures
playwright.config.ts      → projects, timeouts, and reporter configuration
```

## 🔧 Useful commands (summary)

| Action | Command |
|---|---|
| Run all tests | `npx playwright test` |
| Run in UI mode | `npx playwright test --ui` |
| Run in debug mode | `npx playwright test --debug` |
| Run a specific test (file) | `npx playwright test tests/file.spec.ts` |
| Run a specific test (by name) | `npx playwright test -g "test name"` |
| Run tests for a project | `npx playwright test --project=project-name` |
| List all tests | `npx playwright test --list` |
| List tests for a project | `npx playwright test --project=project-name --list` |
| View the latest report | `npx playwright show-report` |
