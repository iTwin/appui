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

<p align="center">A Bentley Systems internal React UI library.</p>

> Copyright © Bentley Systems, Incorporated. All rights reserved. See [LICENSE.md](./LICENSE.md) for license terms and full copyright notice.

[iTwin.js](http://www.itwinjs.org) is an open source platform for creating, querying, modifying, and displaying Infrastructure Digital Twins. The goal of AppUI is to provide easy to use, flexible UI components for the iTwin.js platform.

---

## About this Repository

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that holds the source code to multiple iTwin.js AppUI npm packages. It is built using [pnpm](https://pnpm.io/).

## Prerequisites

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/en/): an installation of the latest security patch of Node 20. The Node installation also includes the **npm** package manager.
- [pnpm](https://pnpm.io/): to install `npm install -g pnpm`
- [TypeScript](https://www.typescriptlang.org/)
- [Visual Studio Code](https://code.visualstudio.com/): repository structure is optimized for this editor

> See [supported platforms](https://www.itwinjs.org/learning/supportedplatforms/) for further information.

## Build Instructions

1. Clone repository (first time) with `git clone` or pull updates to the repository (subsequent times) with `git pull`
2. Install dependencies: `pnpm install`
3. Build source: `pnpm build`
4. Run tests: `pnpm test`

The above commands iterate and perform their action against each package in the monorepo.

> Note: It is a good idea to `pnpm install` after each `git pull` as dependencies may have changed.

---

## Contributing

If you have questions, comments, or wish to contribute to iTwin.js, see our [Contributing guide](./CONTRIBUTING.md).
