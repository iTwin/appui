# Guidelines for Contributing to iTwin.js UI Source Code

Copyright © Bentley Systems, Incorporated. All rights reserved. See LICENSE.md for license terms and full copyright notice.

## Description

In order to maintain consistency in the iTwin.js UI source code, please abide by the following guidelines for classes and React components.

## Guidelines

- Include a copyright notice at the top of **all** TypeScript and CSS/Sass files. The copyright notice comment should be similar to the following:

```typescript
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
```

- Document **all** exported classes, interfaces, enums, types, etc.
- Add release tags (`@public`, `@beta`, `@alpha` or `@internal`) to all exported classes, interfaces, enums, types, etc. For more information on release tags, see [Release Tags](https://www.itwinjs.org/learning/guidelines/release-tags-guidelines/).
- In addition, it’s preferable that all \*Props interface members and component public methods be documented. You can put `@internal` on React lifecycle and render methods.
- Add a,

  ```ts
  /** @packageDocumentation
   * @module xyz
   */
  ```

  comment to the top of the TypeScript file for the documentation module. An existing documentation module will often be appropriate to use. However, if you need to add a documentation module, see additional guidelines below. Example of `@module` comment:

  ```ts
  /** @packageDocumentation
   * @module Button
   */
  ```

- Use the theme colors (e.g. $buic-text-color, $buic-background-control, $buic-background-widget, etc.). These are located in `appui/ui/core-react/src/core-react/style/themecolors.scss`. Please do **not** use $uicore-text-color, $uicore-black, $uicore-white, $uicore-gray\*, etc.)
- Include an appropriate prefix on CSS class names to prevent class name clashes (e.g. `uifw-` in appui-react, `core-` in core-react, `components-` in components-react)
- Add an export for the component to the barrel file of the package (e.g. appui-react.ts, components-react.ts, core-react.ts). Example:

```typescript
export * from "./core-react/badge/Badge";
```

- Localize all strings to be seen by the user and use `useTranslation` hook to get the localized string. Please do **not** use hard-coded strings. The translatable strings should be in a JSON file in the `src/{package-name}/{Package}.json` of the repository. Example:

```json
{
  . . .
  "dialog": {
    "ok": "OK",
    . . .
  }
}
```

```typescript
buttonText = useTranslation("dialog.ok");
```

- Run `npm run extract-api` to update the `*api.md` file for the package
- Write unit tests for the new component or class. The tests should cover as many code statements, branches, functions and lines as possible (100% is the goal). To run the tests, run `npm run test` or `rush test`. To run coverage, run `npm run cover`. To see the coverage report, open the report from one of the following directories in your browser:
  - appui/ui/appui-react/lib/test/coverage/lcov-report/index.html
  - appui/ui/components-react/lib/test/coverage/lcov-report/index.html
  - appui/ui/core-react/lib/test/coverage/lcov-report/index.html
  - appui/ui/imodel-components-react/lib/test/coverage/lcov-report/index.html

## New Documentation Module

If the component’s documentation @module is new, please follow these guidelines:

- Add a `@docs-group-description` comment to the barrel file of the package. Example:

```js
/**
 * @docs-group-description Button
 * Classes for working with various Buttons.
 */
```

Note: The following steps are in [itwinjs-core](https://github.com/itwin/itwinjs-core) repository, NOT in the appui repository:

- Add the module to the itwinjs-core/docs/ui/reference/leftNav.md file in alphabetical order. Example:

```md
- [Button]($core:Button)
```

- Add the module to the appropriate `index.md` in the Learning section (e.g. itwinjs-core/docs/ui/learning/components/index.md or itwinjs-core/docs/ui/learning/core/index.md). Example:

```md
- [Button](./Button.md)
```

- Add a markdown file in the same folder as the `index.md` above (e.g. itwinjs-core/docs/ui/learning/components/Timeline.md)
- Add learning content and an example usage to the new markdown file
