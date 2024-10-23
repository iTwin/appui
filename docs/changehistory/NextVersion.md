# NextVersion <!-- omit from toc -->

Table of contents:

- [Drop support for iTwin.js 3.x](#drop-support-for-itwinjs-3x)
- [Drop support for React 17.x](#drop-support-for-react-17x)
- [Drop support for iTwinUI 2.x](#drop-support-for-itwinui-2x)
- [Restrict access to `@internal` APIs](#restrict-access-to-internal-apis)
- [Drop CommonJS modules](#drop-commonjs-modules)
- [Style sheet changes](#style-sheet-changes)
- [@itwin/appui-react](#itwinappui-react)
  - [Removals](#removals)
  - [Additions](#additions)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions-1)
- [@itwin/core-react](#itwincore-react)
  - [Changes](#changes-1)

## Drop support for iTwin.js 3.x

iTwin.js 3.x is in the end-of-life phase as described in the [version support policy](https://www.itwinjs.org/learning/api-support-policies/#version-support-status).

iTwin.js peer dependency ranges have been updated to exclude version `^3.7.0`. [#1050](https://github.com/iTwin/appui/pull/1050)

Application consumers of AppUI should upgrade to the latest [iTwin.js 4.x](https://www.itwinjs.org/changehistory/) version. Packages that depend on AppUI should update to the minimum required iTwin.js 4.x version.

Support for newer versions of iTwin.js will be added in future AppUI releases.

## Drop support for React 17.x

React peer dependency ranges have been updated to exclude version `^17.0.0`. [#1054](https://github.com/iTwin/appui/pull/1054)

Application consumers of AppUI should upgrade to the latest [React 18.x](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) version. Packages that depend on AppUI should update to the minimum required React 18.x version.

Support for newer versions of React will be added in future AppUI releases.

## Drop support for iTwinUI 2.x

iTwinUI 2.x is in the end-of-life phase as described in the [version support policy](https://github.com/iTwin/iTwinUI/wiki/Support-policy#version-support-status).

AppUI packages will no longer support the iTwinUI 2.x version out of the box. Previously, AppUI would install both iTwinUI 2.x and iTwinUI 3.x to set up both versions when using the `ThemeManager` or popout windows. [#1058](https://github.com/iTwin/appui/pull/1058)

Application consumers of AppUI should upgrade to the latest [iTwinUI 3.x](https://github.com/iTwin/iTwinUI/releases) version. Packages that depend on AppUI should update to the minimum required iTwinUI 3.x version.

Applications that want to continue using iTwinUI 2.x in AppUI must be wrapped with the `ThemeProvider` from iTwinUI 2.x.
Additionally, to use iTwinUI 2.x in child windows and popout widgets, applications can use the newly introduced `childWindow` prop to wrap the content of child windows. For example:

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

Support for newer versions of iTwinUI will be added in future AppUI releases.

## Restrict access to `@internal` APIs

AppUI packages now correctly define an `exports` field in their `package.json` files to prevent consumers from importing the `@internal` APIs directly from submodules. [#1048](https://github.com/iTwin/appui/pull/1048)

This change might break consumers that rely on importing APIs directly from unsupported submodules. Currently supported export paths:

- Main barrel file, i.e. `@itwin/appui-react`
- `package.json` subpath, i.e. `@itwin/appui-react/package.json`
- All SCSS files, i.e. `@itwin/core-react/lib/core-react/_typography.scss`. SCSS files are exported using the [`sass` custom condition](https://sass-lang.com/documentation/js-api/classes/nodepackageimporter/) and are available until the next major version to facilitate the AppUI 5.0 adoption. SCSS exports will be removed in the next major version.

To fix the issue, consumers should update their import paths to use the supported export paths. For example:

```tsx
// Before
import { Widget } from "@itwin/appui-react/lib/esm/appui-react/widgets/Widget";

// After
import { Widget } from "@itwin/appui-react";
```

SCSS imports and variables should be replaced with iTwinUI CSS variables:

```scss
// Before
@import "~@itwin/core-react/lib/cjs/core-react/style/themecolors";

.component {
  background-color: $buic-background-1;
}

// After
.component {
  background-color: var(--iui-color-background);
}
```

Additionally, all `@internal` API exports are removed from the barrel file, as consumers should never use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)

> [!CAUTION]
> There are still a number of `@internal` APIs that are exported with their related public types, such as class methods, fields, or namespace functions. These should never be used directly and are subject to change without notice.

If the currently used API is not exported from the barrel file and there is no reasonable replacement, please [file an issue](https://github.com/iTwin/appui/issues/new/choose) and describe your use case.

## Drop CommonJS modules

Support for CommonJS modules has been removed from all AppUI packages. [#1081](https://github.com/iTwin/appui/pull/1081)

To facilitate the migration, the `exports` field has been updated to support legacy `cjs` and `esm` import paths in SCSS files. For example, `@import "@itwin/core-react/lib/cjs/core-react/base/base.scss"` will continue to work correctly by resolving to `@import "@itwin/core-react/lib/core-react/base/base.scss"`. However, consumers should avoid importing deprecated SCSS partial files, as these will be removed in the next major version.

Additionally, file extensions are provided in import declarations, which are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)

## Style sheet changes

- Replaced internal usage of `--buic` CSS variables and `$buic` SCSS variables with [iTwinUI CSS variables](https://itwinui.bentley.com/docs/variables). [#1079](https://github.com/iTwin/appui/pull/1079)

## @itwin/appui-react

### Removals

- Removed the `FrameworkChildWindows.useCreateRoot` method, which existed solely to prevent runtime warnings when using `React 18.x`. Consumers should remove usages of `useCreateRoot` when upgrading. [#1054](https://github.com/iTwin/appui/pull/1054)
- Removed the [activateDroppedTab](https://github.com/iTwin/appui/discussions/679) preview feature, as the behavior of the preview feature is now enabled by default. Additionally, a widget tab's drag-and-drop logic is updated to activate the dropped tab only if it was active when the drag interaction was initiated. It is safe for consumers to remove the preview feature from their `PreviewFeaturesProvider`. [#1071](https://github.com/iTwin/appui/pull/1071)
- Removed the [newToolbars](https://github.com/iTwin/appui/discussions/924) preview feature, as the behavior of the preview feature is now enabled by default. It is safe for consumers to remove the preview feature from their `PreviewFeaturesProvider`. [#1072](https://github.com/iTwin/appui/pull/1072)

### Additions

- Added the `childWindow` prop to the `ConfigurableUiContent` component, allowing consumers to provide a wrapper component for child windows and popout widgets. [#1058](https://github.com/iTwin/appui/pull/1058)
- The `StatusBarPopover` component now accepts all props that are accepted by the `Popover` component from `@itwin/itwinui-react`. [#1068](https://github.com/iTwin/appui/pull/1068)

### Changes

- Updated `MessageManager.addMessage` and `MessageManager.outputMessage` to ignore already active messages displayed to the user. This API is used by various tools indirectly via `IModelApp.notifications.outputMessage` when `AppNotificationManager` is set up. This change should prevent the same message from being displayed multiple times unnecessarily. [#1042](https://github.com/iTwin/appui/pull/1042)
- Popout widgets are now displayed in a flow layout to match the layout of floating, stage panel, and popout widgets when `reparentPopoutWidgets` is enabled. [#1049](https://github.com/iTwin/appui/pull/1049)
- Use React portal instead of creating a separate element tree for each child window. [#1062](https://github.com/iTwin/appui/pull/1062)
- Removed incorrect usage of the internal `IModelApp.renderSystem.options.displaySolarShadows` check from `useSolarDataProvider`. The `wantShadows` property of the viewport display style is used instead. [#1066](https://github.com/iTwin/appui/pull/1066)
- Updated the styling of the `BackstageAppButton` and `NestedFrontstageAppButton` components to match the updated toolbars. [#1078](https://github.com/iTwin/appui/pull/1078)
- The new toolbars will now handle snap opacity mode when it is enabled. [#1082](https://github.com/iTwin/appui/pull/1082)

## @itwin/components-react

### Deprecations

- Deprecated the `FavoritePropertiesRenderer.renderFavorites` method in favor of an overload that doesn't take the `createRoot` function as an argument. [#1054](https://github.com/iTwin/appui/pull/1054)

### Additions

- Added the `IMergingPropertyDataProvider` interface, which combines any number of `IPropertyDataProvider` instances, and added the `createMergedPropertyDataProvider` factory function that creates an `IMergingPropertyDataProvider` instance. [#1040](https://github.com/iTwin/appui/pull/1040)

## @itwin/core-react

### Changes

- Removed the `resize-observer-polyfill` dependency because `ResizeObserver` is well supported by modern browsers, eliminating the need for a polyfill. [#1045](https://github.com/iTwin/appui/pull/1045)
