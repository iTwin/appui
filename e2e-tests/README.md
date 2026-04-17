# iTwin.js UI end-to-end tests

This package contains end-to-end tests of iTwin.js UI framework.

## Running the tests

The end-to-end tests on CI are running in a docker container to avoid platform specific inconsistencies. Run the tests in Docker environment:

```sh
pnpm test:e2e
```

> _Note:_ This requires [Docker](https://www.docker.com/) to be running on your machine.

Pass additional arguments to playwright to run specific tests or update the snapshots:

```sh
pnpm test:e2e widget.test.ts --update-snapshots
```

To see the generated report on a host:

```sh
pnpm exec playwright show-report
```

## Running the tests locally

Browsers need to be installed for playwright to work correctly before the tests can be run.

```sh
pnpm exec playwright install
```

The tests are running against a test application which needs to be started before running the tests.

1. Start the web server of a `test-app`:

```sh
pnpm app
```

2. Run the tests:

```sh
cd e2e-tests
pnpm exec playwright test
```

> _Suggested:_ use a VSCode extension `ms-playwright.playwright` to run the tests locally.
