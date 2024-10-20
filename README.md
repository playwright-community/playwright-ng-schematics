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
