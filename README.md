﻿# AppUI

Copyright © Bentley Systems, Incorporated. All rights reserved. See [LICENSE.md](./LICENSE.md) for license terms and full copyright notice.

[iTwin.js](http://www.itwinjs.org) is an open source platform for creating, querying, modifying, and displaying Infrastructure Digital Twins.

If you have questions, or wish to contribute to iTwin.js, see our [Contributing guide](./CONTRIBUTING.md).

## About this Repository

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that holds the source code to multiple iTwin.js AppUI npm packages. It is built using [Rush](http://rushjs.io/).

See [rush.json](./rush.json) for the complete list of packages.

Each package has its own **node_modules** directory that contains symbolic links to *common* dependencies managed by Rush.

## Prerequisites

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/en/): an installation of the latest security patch of Node 18. The Node installation also includes the **npm** package manager.
- [Rush](https://github.com/Microsoft/web-build-tools/wiki/Rush): to install `npm install -g @microsoft/rush`
- [TypeScript](https://www.typescriptlang.org/): this is listed as a devDependency, so if you're building it from source, you will get it with `rush install`.
- [Visual Studio Code](https://code.visualstudio.com/): an optional dependency, but the repository structure is optimized for its use

> See [supported platforms](https://www.itwinjs.org/learning/supportedplatforms/) for further information.

## Build Instructions

1. Clone repository (first time) with `git clone` or pull updates to the repository (subsequent times) with `git pull`
2. Install dependencies: `rush install`
    - Check variant version with: `rush install --variant core-3x` (see [variant](#itwinjs-core-3x-compatibility) for clarifications)
3. Clean: `rush clean`
4. Rebuild source: `rush rebuild`
5. Run tests: `rush cover`

The `-v` option for `rush` is short for `--verbose` which results in a more verbose command.

The above commands iterate and perform their action against each package in the monorepo.

For incremental builds, the `rush build` command can be used to only build packages that have changes versus `rush rebuild` which always rebuilds all packages.

> Note: It is a good idea to `rush install` after each `git pull` as dependencies may have changed.

## Source Code Edit Workflow

1. Make source code changes on a new Git branch
2. Ensure unit tests pass when run locally: `rush cover`
3. Ensure linting passes when run locally: `rush lint`
4. Locally commit changes: `git commit` (or use the Visual Studio Code user interface)
5. Repeat steps 1-4 until ready to push changes
6. Check for API signature changes: `rush extract-api`. This will update the signature files, located in `common/api`. **Note:** before doing this, first do the following:
    - Be sure that your branch is up to date with the target branch (i.e. `git merge origin/master`)
    - Cleanup your build output: `rush clean`
    - Rebuild the project: `rush build`
7. Review any diffs to the API signature files in the `common/api` directory to ensure they are compatible with the intended release of the package.
    - If any differences are in packages not modified on this branch, revert the changes before committing.
8. Add changelog entry (which could potentially cover several commits): `rush change`
9. Follow prompts to enter a change description or press ENTER if the change does not warrant a changelog entry. If multiple packages have changed, multiple sets of prompts will be presented. If the changes are only to non-published packages (like **display-test-app**), then `rush change` will indicate that a changelog entry is not needed.
10. Completing the `rush change` prompts will cause new changelog entry JSON files to be created.
11. Add and commit the changelog JSON files and any API signature updates.
12. Publish changes on the branch and open a pull request.

If using the command line, steps 8 through 11 above can be completed in one step by running `rushchange.bat` from the root directory.
Only use `rushchange.bat` if none of the changes require a changelog entry.
> Note: The CI build will break if changes are pushed without running `rush change` and `rush extract-api` (if the API was changed). The fix will be to complete steps 6 through 11.

Here is a sample [changelog](https://github.com/microsoft/rushstack/blob/master/apps/rush/CHANGELOG.md) to demonstrate the level of detail expected.

## Updating dependencies/devDependencies on packages within the monorepo

The version numbers of internal dependencies should not be manually edited.
These will be automatically updated by the overall *version bump* workflow.
Note that the packages are published by CI builds only.

## Updating dependencies/devDependencies on packages external to monorepo

Use these instructions to update dependencies and devDependencies on external packages (ones that live outside of this monorepo).

1. Edit the appropriate `package.json` file to update the semantic version range
2. Run `rush check` to make sure that you are specifying consistent versions across the repository
3. Run `rush update` to make sure the newer version of the module specified in #1 is installed

**Note:** Also see the [variant info](#external-dependencies-check).

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

## Other NPM Scripts

1. Build TypeDoc documentation for all packages: `rush docs`
2. Build TypeDoc documentation for a single package: `cd ui\core-react` and then `npm run docs`
