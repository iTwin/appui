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

## Contributing

## Getting started

1. Install dependencies using `rush install`.
2. Run build using `rush rebuild`.
3. While in the desired packages' folder, run `npm start` to enter build in watch mode for easy validation along the `test-apps` or `storybook` (see [Testing options](#testing-options)).
4. In a new terminal, `cd` into `test-apps/appui-test-app/standalone` and run `npm run start:webserver`.

---

## Commands

### Ensure unit tests pass when run locally

`rush cover`

> Each packages will generate a detailed coverage HTML report which can be accessed in `ui/[package]/lib/cjs/test/coverage/lcov-report/index.html`. Ensure integration tests pass: See [the related Readme](./e2e-tests/README.md)

### Ensure linting passes when run locally

`rush lint` / `rush lint:fix`

### Ensure prettier passes when run locally

`rush prettier` / `rush prettier:fix`

---

## Checking and documenting changes

**Please note that checking and documenting changes prior to PR submission is mandatory**

### Check for API signature changes

`rush extract-api`

This will update the signature files, located in `common/api`. **Note:** before doing this, first do the following:

- Cleanup your build output: `rush clean`
- Rebuild the project: `rush build`

Review any diffs to the API signature files in the `common/api` directory to ensure they are compatible with the intended release of the package.

If any differences are in packages not modified on this branch, revert the changes before committing.

### Add changelog entry

`rush change`

Follow prompts to enter a change description or press ENTER if the change does not warrant a changelog entry. If multiple packages have changed, multiple sets of prompts will be presented. If the changes are only to non-published packages (like the **test-apps**), then `rush change` will indicate that a changelog entry is not needed.

Completing the `rush change` prompts will cause new changelog entry JSON files to be created.

If using the command line, this process can be completed in one step by running `rushchange.bat` from the root directory.
**Only use `rushchange.bat` if none of the changes require a changelog entry.**

> Note: The CI build will break if changes are pushed without running `rush change` and `rush extract-api` (if the API was changed).

Here is a sample [changelog](https://github.com/microsoft/rushstack/blob/master/apps/rush/CHANGELOG.md) to demonstrate the level of detail expected.

---

## Contributing guidelines

AppUI contains a large amount of legacy code. As such we are in the process of standardizing, reorganizing, and optimizing our codebase.

Before contributing to AppUI please consult [the iTwinUI styling guide](https://github.com/iTwin/iTwinUI/blob/main/STYLEGUIDE.md) for all syntax conventions.

### Application architecture

Our `ui` folder contains all our packages which are organized as following:

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

Please follow these conventions when contributing to AppUI

- Be sure that your branch is up to date with the master branch (i.e. `git merge origin/master`)
- All components should import a single SCSS file with a matching name, e.g. `Message.tsx` importing `Message.scss`. SCSS files should be siblings of their relative component files
- We are planning to migrate to CSS modules. Until then, minimize potential class name clashes by following this formula:

  [abbr. of package name] + [folders] + [component]

  Package name abbreviations:

  - @itwin/appui-react - uifw
  - @itwin/components-react - components
  - @itwin/core-react - core
  - @itwin/imodel-components-react - icr

For example, when working on `MessageCenterField` component under `status-bar/fields` directory in `@itwin/appui-react` one would use `”uifw-statusBar-fields-dialog”`

---

## Contributor License Agreement (CLA)

A [Contribution License Agreement with Bentley](https://gist.github.com/imodeljs-admin/9a071844d3a8d420092b5cf360e978ca) must be signed before your contributions will be accepted. Upon opening a pull request, you will be prompted to use [cla-assistant](https://cla-assistant.io/) for a one-time acceptance applicable for all Bentley projects.
You can read more about [Contributor License Agreements](https://en.wikipedia.org/wiki/Contributor_License_Agreement) on Wikipedia.

> All submissions go through a review process from our developers using GitHub. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

---

## Testing options

The repository is set up to allow 2 different ways of testing changes with manual interactions.

### Test apps

In the `test-apps` folder there are 2 apps that can be used to test changes to the packages in this repository. Each app can be run with `npm start` from the app's folder.

Most of the features should be the same in both apps as they are both being configured by the `appui-test-providers` package. New features should be added through this package.

The apps are:

- `standalone` is an iTwin.js application that is using IPC and is useful for testing with local `.bim` files that are on your machine. [See Readme for more info](./test-apps/appui-test-app/standalone/README.md)

- `connected` is working with the iTwin Platform and requires log in, it is useful for testing with iModels that are on the iTwin Platform. [See Readme for more info](./test-apps/appui-test-app/connected/README.md)

> Note: `standalone` is used by the [end-to-end tests](./e2e-tests/README.md).

### Storybook

There is a [storybook](https://storybook.js.org/) that can be used to test changes to the packages in this repository. The storybook can be run with `npm start` from `docs/storybook` folder, and will be accessible at `http://localhost:3000/`.

Storybook is deployed with each PR build and can be accessed through the **Storybook preview** link in the PR checks. (Direct link: `https://itwin.github.io/appui/[PR_NUMBER]`) So adding stories for a feature facilitates PR reviews.

It is also deployed with master and can be accessed through this URL: <https://itwin.github.io/appui/storybook>

---

### Updating dependencies/devDependencies on packages within the monorepo

The version numbers of internal dependencies should not be manually edited.
These will be automatically updated by the overall _version bump_ workflow.
Note that the packages are published by CI builds only.

### Updating dependencies/devDependencies on packages external to monorepo

Use these instructions to update dependencies and devDependencies on external packages (ones that live outside of this monorepo).

1. Edit the appropriate `package.json` file to update the semantic version range
2. Run `rush check` to make sure that you are specifying consistent versions across the repository
3. Run `rush update` to make sure the newer version of the module specified in #1 is installed

**Note:** Also see the [variant info](#external-dependencies-check).

---

## iTwin.js core 3.x compatibility

AppUI 4.0 version must keep compatibility with iTwin.js core version ^3.7.0 to facilitate migration, in order to do so, a rush variant has been created.

### Validating code for the variant

Once we are clear with the changes we have, it is a good idea to validate that they work as expected in the variant test app, this will also be done in the CI pipeline.

Simply replace step 2 of the [Build Instructions](#build-instructions) with:

- Install dependencies: `rush install --variant core-3x`

and follow the same instructions for the build and coverage steps.

### External dependencies check

The external dependencies must be updated in this variant with the following commands.

1. Run `rush check --variant core-3x`
2. Run `rush update --variant core-3x`

### Other NPM scripts

1. Build TypeDoc documentation for all packages: `rush docs`
2. Build TypeDoc documentation for a single package: `cd ui\core-react` and then `npm run docs`

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
