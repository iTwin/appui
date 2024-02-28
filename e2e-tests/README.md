# iTwin.js UI end-to-end tests

This package contains end-to-end tests of iTwin.js UI framework.

## Running the tests

The end-to-end tests on CI are running in a docker container to avoid platform specific inconsistencies. Run the tests in Docker environment:

```sh
npm run test:e2e
```

Pass additional arguments to run specific tests or update the snapshots:

```sh
npm run test:e2e -- widget.test.ts --update-snapshots
```

> _Note:_ This requires [Docker](https://www.docker.com/) to be running on your machine.

## Running the tests locally

Browsers need to be installed for playwright to work correctly before the tests can be run.

```sh
npx playwright install
```

The tests are running against a test application which needs to be started before running the tests.

1. Start a web server of a standalone appui-test-app:

```sh
cd .\test-apps\appui-test-app\standalone\
npm run start:webserver
```

2. Run the tests: `npx playwright test`
   - To update component snapshots for visual testing: `npx playwright test --update-snapshots`

> _Suggested:_ use a VSCode extension `ms-playwright.playwright` to run the tests locally.
