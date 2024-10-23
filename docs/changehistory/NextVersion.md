# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Removals](#removals)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions-1)
  - [Changes](#changes-1)
- [@itwin/core-react](#itwincore-react)
  - [Changes](#changes-2)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Changes](#changes-3)

## @itwin/appui-react

### Removals

- Removed `FrameworkChildWindows.useCreateRoot` method which existed solely to prevent runtime warnings when using `React 18.x`. Consumers should remove usages of `useCreateRoot` when upgrading. [#1054](https://github.com/iTwin/appui/pull/1054)
- Removed [activateDroppedTab](https://github.com/iTwin/appui/discussions/679) preview feature, since the behavior of the preview feature is now enabled by default. Additionally, a widget tab's drag-and-drop logic is updated to activate the dropped tab only if it was active when the drag interaction was initiated. It is safe for consumers to remove the preview feature from their `PreviewFeaturesProvider`. [#1071](https://github.com/iTwin/appui/pull/1071)
- Removed [newToolbars](https://github.com/iTwin/appui/discussions/924) preview feature, since the behavior of the preview feature is now enabled by default. It is safe for consumers to remove the preview feature from their `PreviewFeaturesProvider`. [#1072](https://github.com/iTwin/appui/pull/1072)

### Additions

- Added `childWindow` prop to `ConfigurableUiContent` component which allows consumers to provide a wrapper component for child windows and popout widgets. [#1058](https://github.com/iTwin/appui/pull/1058)

  ```tsx
  import { ThemeProvider } from "@itwin/itwinui-react-v2";

  function ChildWindow(props: React.PropsWithChildren<{}>) {
    // Wrap content of child windows with `ThemeProvider` from iTwinUI 2.x
    return <ThemeProvider>{props.children}</ThemeProvider>;
  }

  function App() {
    return <ConfigurableUiContent childWindow={ChildWindow} />;
  }
  ```

- `StatusBarPopover` component now accepts all props that are accepted by `Popover` component from `@itwin/itwinui-react`. [#1068](https://github.com/iTwin/appui/pull/1068)

### Changes

- Updated `MessageManager.addMessage` and `MessageManager.outputMessage` to ignore already active messages displayed to the user. This API is used by various tools indirectly via `IModelApp.notifications.outputMessage` when `AppNotificationManager` is set up. This change should prevent the same message from being displayed multiple times unnecessarily. [#1042](https://github.com/iTwin/appui/pull/1042)
- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)
- Popout widgets are now displayed in flow layout to match the layout of floating, stage panel and popout widgets when `reparentPopoutWidgets` is enabled. [#1049](https://github.com/iTwin/appui/pull/1049)
- Drop support for [iTwin.js 3.x](https://www.itwinjs.org/v3/) [^2]. [#1050](https://github.com/iTwin/appui/pull/1050)
- Drop support for [React 17.x](https://react.dev/versions#react-17) [^3]. [#1054](https://github.com/iTwin/appui/pull/1054)
- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Drop support for [iTwinUI 2.x](https://itwinui.bentley.com/docs#versioning). [#1058](https://github.com/iTwin/appui/pull/1058)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)
- Use React portal instead of creating a separate element tree for each child window. [#1062](https://github.com/iTwin/appui/pull/1062)
- Removed incorrect usage of internal `IModelApp.renderSystem.options.displaySolarShadows` check from 'useSolarDataProvider'. `wantShadows` property of viewport display style is used instead. [#1066](https://github.com/iTwin/appui/pull/1066)
- Updated the styling of `BackstageAppButton` and `NestedFrontstageAppButton` components to match the updated toolbars. [#1078](https://github.com/iTwin/appui/pull/1078)
- Replaced usage of `--buic` CSS variables and `$buic` SCSS variables with [iTwinUI CSS variables](https://itwinui.bentley.com/docs/variables). [#1079](https://github.com/iTwin/appui/pull/1079)
- The new toolbars will now handle snap opacity mode when enabled. [#1082](https://github.com/iTwin/appui/pull/1082)

## @itwin/components-react

### Deprecations

- Deprecated `FavoritePropertiesRenderer.renderFavorites` method in favor of an overload that doesn't take the `createRoot` function as an argument. [#1054](https://github.com/iTwin/appui/pull/1054)

### Additions

- Added `IMergingPropertyDataProvider` interface which combines any number of `IPropertyDataProvider` instances and added `createMergedPropertyDataProvider` factory function that creates `IMergingPropertyDataProvider` instance. [#1040](https://github.com/iTwin/appui/pull/1040)

### Changes

- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)
- Drop support for [iTwin.js 3.x](https://www.itwinjs.org/v3/) [^2]. [#1050](https://github.com/iTwin/appui/pull/1050)
- Drop support for [React 17.x](https://react.dev/versions#react-17) [^3]. [#1054](https://github.com/iTwin/appui/pull/1054)
- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Update `FilterBuilder` UI according to UX team's new specification. [#1059] (https://github.com/iTwin/appui/pull/1059)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)
- Replaced usage of `--buic` CSS variables and `$buic` SCSS variables with [iTwinUI CSS variables](https://itwinui.bentley.com/docs/variables). [#1079](https://github.com/iTwin/appui/pull/1079)

## @itwin/core-react

### Changes

- Removed the `resize-observer-polyfill` dependency because `ResizeObserver` is well supported by modern browsers, eliminating the need for a polyfill. [#1045](https://github.com/iTwin/appui/pull/1045)
- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)
- Drop support for [iTwin.js 3.x](https://www.itwinjs.org/v3/) [^2]. [#1050](https://github.com/iTwin/appui/pull/1050)
- Drop support for [React 17.x](https://react.dev/versions#react-17) [^3]. [#1054](https://github.com/iTwin/appui/pull/1054)
- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)
- Replaced usage of `--buic` CSS variables and `$buic` SCSS variables with [iTwinUI CSS variables](https://itwinui.bentley.com/docs/variables). [#1079](https://github.com/iTwin/appui/pull/1079)

## @itwin/imodel-components-react

### Changes

- Added `exports` field to `package.json` to prevent importing of `@internal` APIs [^1]. [#1048](https://github.com/iTwin/appui/pull/1048)
- Drop support for [iTwin.js 3.x](https://www.itwinjs.org/v3/) [^2]. [#1050](https://github.com/iTwin/appui/pull/1050)
- Drop support for [React 17.x](https://react.dev/versions#react-17) [^3]. [#1054](https://github.com/iTwin/appui/pull/1054)
- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)
- Replaced usage of `--buic` CSS variables and `$buic` SCSS variables with [iTwinUI CSS variables](https://itwinui.bentley.com/docs/variables). [#1079](https://github.com/iTwin/appui/pull/1079)

[^1]: This change might break consumers that rely on importing `@internal` APIs directly from unsupported submodules i.e. `@itwin/appui-react/lib/esm/appui-react`. Currently supported export paths: main entry point (i.e. `@itwin/appui-react`), `package.json` subpath (i.e. `@itwin/appui-react/package.json`). Additional export paths are available until next major version to facilitate the **AppUI 5.0** adoption: ESM submodule (i.e. `@itwin/appui-react/esm`), CJS submodule (i.e. `@itwin/appui-react/cjs`), all SCSS files are exported by using `sass` custom condition (i.e. `@itwin/core-react/lib/cjs/core-react/typography`).
[^2]: **iTwin.js 3.x** is in end-of-life phase as described in [version support status](https://www.itwinjs.org/learning/api-support-policies/#version-support-status). Consumers of **AppUI 5.0** should upgrade to latest **iTwin.js 4.x** version. Support for newer versions of **iTwin.js** will be added in future AppUI releases.
[^3]: Consumers should upgrade to latest [React 18.x](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) version. Support for newer versions of **React** will be added in future AppUI releases.
