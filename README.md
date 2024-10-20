# Playwright Angular Schematic

![NPM Version](https://img.shields.io/npm/v/playwright-ng-schematics)
![Playwright version](https://img.shields.io/npm/v/playwright?label=Playwright)

Adds [Playwright Test](https://playwright.dev/) to your Angular project 

## Add Playwright to your Angular project

```bash
ng add playwright-ng-schematics
```

Once installed, you can run the tests
```bash
npm run e2e
```

## Run tests
You can also use `ng` to run your tests
```bash
ng e2e
```

Some command-line interface options are available; such as UI mode
```bash
ng e2e --ui
```

For a list of accepted arguments, use `ng e2e --help`. If you need more options and control on the CLI, the best solution is to use `npx playwright test` directly.

### Run an Angular dev server
If a `devServerTarget` option is specified, the builder will launch an Angular server and will set `PLAYWRIGHT_TEST_BASE_URL` environment variable automatically.

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
The example below has projects using `PLAYWRIGHT_TEST_BASE_URL` (set by `devServerTarget`) or other base URL.

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

## Create a test file

Create a new empty test
```bash
ng generate playwright-ng-schematics:e2e "<TestName>"
```

## Migrate from Protractor

Read the [Migrating from Protractor](https://playwright.dev/docs/protractor) guide from Playwright official website.

## Contribute

- Small, incremental changes are easier to review.
- Conventional Commits. NO EMOJI

## License
This project is licensed under an Apache-2.0 license.
