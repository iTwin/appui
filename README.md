<p align="center">
  <picture>
    <source
      media='(prefers-color-scheme: dark)'
      srcset='https://itwin.github.io/iTwinUI/logo-dark.svg'
    />
    <img
      src='https://itwin.github.io/iTwinUI/logo.svg'
      alt='iTwinUI logo'
    />
  </picture>
</p>

<p align="center">A Bentley Systems © internal React UI library.</p>

Copyright © Bentley Systems, Incorporated. All rights reserved. See [LICENSE.md](./LICENSE.md) for license terms and full copyright notice.

[iTwin.js](http://www.itwinjs.org) is an open source platform for creating, querying, modifying, and displaying Infrastructure Digital Twins. The goal of AppUI is to provide easy to use, flexible UI components for the iTwin.js platform.

---

## About this Repository

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that holds the source code to multiple iTwin.js AppUI npm packages. It is built using [Rush](http://rushjs.io/).

See [rush.json](./rush.json) for the complete list of packages.

Each package has its own **node_modules** directory that contains symbolic links to _common_ dependencies managed by Rush.

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

---

## Contributing

If you have questions, comments, or wish to contribute to iTwin.js, see our [Contributing guide](./CONTRIBUTING.md).
