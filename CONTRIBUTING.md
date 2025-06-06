# Contributing to AppUI

Welcome, and thank you for your interest in contributing to AppUI!

The goal of this document is to provide a high-level overview of how you can get involved.

We welcome contributions, large or small, including:

- Bug fixes
- New features
- Documentation corrections or additions
- Example code snippets
- Sample data

Have a question?
Rather than opening an issue, first check [the Github discussions page](https://github.com/iTwin/itwinjs-core/discussions). Additionally, feel free to contribute via [GitHub issues](https://github.com/iTwin/itwinjs-core/labels/discussion) using the `discussion` label.

Thank you for taking the time to contribute to open source and making great projects like iTwin.js possible!

## Contributing guidelines

### Application architecture

Our `ui` folder contains all our packages which are organized as such:

- `appui-react` should contain exclusively layouts. These are the largest and most complicated components in AppUI.
- `components-react` should contain exclusively widgets: smaller components that are used inside `appui-react`. Ideally should largely be combinations of iTwinUI components.
- `core-react` is marked to be decrepit at some point. Currently, it houses the smallest components inside AppUI. Ideally, all of these components would be replaced with the latest iTwinUI components and the entire `core-react` could be deleted. Do not use these components if possible.
- `imodel-components-react` contains components and APIs that facilitate integration with an [iTwin.js library](https://www.itwinjs.org/).

### Common issues to solve

Common fixes we are looking to solve include, but are not limited to:

- Replacing `@itwin/core-react` components with iTwinUI components
- Removing snapshot testing from unit tests
- Migrating to functional from class based React Components

### Conventions

Please follow these conventions when contributing to AppUI:

- Consult [the iTwinUI styling guide](https://github.com/iTwin/iTwinUI/blob/main/STYLEGUIDE.md) for all syntax conventions.
- Be sure that your branch is up to date with the master branch (i.e. `git merge origin/master`)
- All components should import a single SCSS file with a matching name, e.g. `Message.tsx` importing `Message.scss`. SCSS files should be siblings of their relative component files
- We are planning to migrate to CSS modules. Until then, minimize potential class name clashes by following this formula:

  [abbr. of package name] + [folders] + [component]

  Package name abbreviations:

  - @itwin/appui-react - uifw
  - @itwin/components-react - components
  - @itwin/core-react - core
  - @itwin/imodel-components-react - icr

For example, when working on `MessageCenterField` component under `status-bar/fields` directory in `@itwin/appui-react` one would use `”uifw-statusBar-fields-messageCenterField”`

### Contributor License Agreement (CLA)

A [Contribution License Agreement with Bentley](https://gist.github.com/imodeljs-admin/9a071844d3a8d420092b5cf360e978ca) must be signed before your contributions will be accepted. Upon opening a pull request, you will be prompted to use [cla-assistant](https://cla-assistant.io/) for a one-time acceptance applicable for all Bentley projects.
You can read more about [Contributor License Agreements](https://en.wikipedia.org/wiki/Contributor_License_Agreement) on Wikipedia.

> All submissions go through a review process from our developers using GitHub. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

## Getting started

1. Install dependencies using `pnpm install`.
2. Run build using `pnpm build`.
3. While in the desired packages' folder, run `npm start` to enter build in watch mode for easy validation along the `test-app` or `storybook` (see [Testing options](#testing-options)).
4. In a new terminal, `cd` into `apps/test-app` and run `npm run start:webserver`.

## Commands

### Ensure unit tests pass when run locally

`pnpm cover`

> Each packages will generate a detailed coverage HTML report which can be accessed in `ui/[package]/lib/test/coverage/lcov-report/index.html`. Ensure integration tests pass: See [the related Readme](./e2e-tests/README.md)

### Ensure linting passes when run locally

`pnpm lint`

### Ensure prettier passes when run locally

`pnpm prettier` / `pnpm prettier:fix`

## Checking and documenting changes

**Please note that checking and documenting changes prior to PR submission is mandatory**

### Check for API signature changes

`pnpm extract-api`

This will update the signature files, located in `common/api`. **Note:** before doing this, first do the following:

- Cleanup your build output: `pnpm clean`
- Rebuild the project: `pnpm build`

Review any diffs to the API signature files in the `common/api` directory to ensure they are compatible with the intended release of the package.

If any differences are in packages not modified on this branch, revert the changes before committing.

> Note: The CI build will break if changes are pushed without running `pnpm extract-api` (if the API was changed).

### Add changelog entry

`pnpm changeset`

Follow the prompts to enter changesets from which the changelog is generated. [See README.md for more info](./.changeset/README.md)

---

## Testing options

The repository is set up to allow 2 different ways of testing changes with manual interactions.

### Test app

In the `apps/test-app` directory there is a test app that can be used to test changes to the packages in this repository. The `test-app` is an iTwin.js application that allows you to open both local `.bim` files and remote iModels from the iTwin Hub. [See README.md for more info](./apps/test-app/README.md)

The `apps/test-providers` package currently used by the `test-app` should eventually be merged into the `test-app`.

> Note: `test-app` is used by the [end-to-end tests](./e2e-tests/README.md).

### Storybook

There is a [storybook](https://storybook.js.org/) that can be used to test changes to the packages in this repository. The storybook can be run with `npm start` from `docs/storybook` folder, and will be accessible at `http://localhost:3000/`.

Storybook is deployed with each PR build and can be accessed through the **Storybook preview** link in the PR checks. (Direct link: `https://itwin.github.io/appui/[PR_NUMBER]`) So adding stories for a feature facilitates PR reviews.

It is also deployed with master and can be accessed through this URL: <https://itwin.github.io/appui/storybook>

---

## Reporting issues

Have you identified a reproducible problem in iTwin.js AppUI?
Have a feature request?
We want to hear about it!
Here's how you can make reporting your issue as effective as possible:

### Look for an existing issue

Before you create a new issue, please search [open issues](https://github.com/iTwin/appui/issues) to see if the issue or feature request has already been filed.

If you find that your issue already exists, please add relevant comments and your [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments).
Use a reaction in place of a "+1" comment:

- 👍 - upvote
- 👎 - downvote

If you cannot find an existing issue that describes your bug or feature, create a new issue using the guidelines below.

### Writing good bug reports and feature requests

Please File a single issue per problem and feature request.

Refrain from adding your issue as a comment to an existing issue unless it's for the identical input. Many issues look similar, but have different causes.

Please include the following information with each issue:

- A short description of the issue with a clear title
- Versions of relevant iTwin.js core and AppUI packages
- Minimal steps to reproduce the issue or a code snippet that demonstrates the issue
- What you expected to see, versus what you actually saw
- Images that help explain the issue
- Any relevant error messages, logs, or other details
- Impact of the issue
- Use the [`bug`](https://github.com/iTwin/appui/labels/bug) or [`enhancement`](https://github.com/iTwin/appui/labels/enhancement) label to identify the type of issue you are filing

Please follow your issue and be responsive, as our developers might need more information! The more information you can provide, the more likely someone will be successful reproducing the issue and finding a fix!
