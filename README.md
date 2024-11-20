# Playwright Angular Schematic

![NPM Version](https://img.shields.io/npm/v/playwright-ng-schematics)
![Playwright version](https://img.shields.io/npm/v/playwright?label=Playwright)

Adds [Playwright Test](https://playwright.dev/) to your Angular project 

## Installation

Run the following to add Playwright to your Angular project
```bash
ng add playwright-ng-schematics
```

Once installed, you can run the tests
```bash
npm run e2e
```

## Usage

### Run tests

You can also use the Angular CLI `ng` to run your tests
```bash
ng e2e
```

You can use almost the same command-line interface options that exist for Playwright (see [Playwright Docs](https://playwright.dev/docs/test-cli) or use `ng e2e --help`), such as UI mode
```bash
ng e2e --ui
# or
npm run e2e -- --ui
```

To specify particular test files, usually done like this `npx playwright test tests/todo-page/ tests/landing-page/`, you have to prepend the `--files` argument.
```bash
ng e2e --files tests/todo-page/ --files tests/landing-page/
```
The `-c` option is used to choose an Angular configuration. If you also want to specify a Playwright configuration, use `--config` instead.

### Start an Angular development server

If a `devServerTarget` option is specified, the builder will launch an Angular server and will automatically set the `PLAYWRIGHT_TEST_BASE_URL` environment variable.

```json title="angular.json"
        "e2e": {
          "builder": "playwright-ng-schematics:playwright",
          "options": {
            "devServerTarget": "my-app:serve",
            "ui": true
          },
          "configurations": {
            "production": {
              "devServerTarget": "my-app:serve:production"
            }
          }
        }
```

You still can make use of Playwright's `baseURL` option and mix it with `PLAYWRIGHT_TEST_BASE_URL` env variable.  
The example below shows projects using `PLAYWRIGHT_TEST_BASE_URL` (set by `devServerTarget`) or another base URL.

```ts title="playwright.config.ts"
  // ...
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: process.env['PLAYWRIGHT_TEST_BASE_URL'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], baseURL: 'http://example.com' },
    },
  ]
```

### Create a test file

Create a new empty test
```bash
ng generate playwright-ng-schematics:e2e "<TestName>"
```

## Migrate from Protractor

Read the [Migrating from Protractor](https://playwright.dev/docs/protractor) guide on the official Playwright website.

## Contribute

- Small, incremental changes are easier to review.
- Conventional Commits. NO EMOJI

## License

This project is licensed under an Apache-2.0 license.
