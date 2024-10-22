# NextVersion <!-- omit from toc -->

Table of contents:

- [Drop support for iTwin.js 3.x](#drop-support-for-itwinjs-3x)
- [Drop support for React 17.x](#drop-support-for-react-17x)
- [Drop support for iTwinUI 2.x](#drop-support-for-itwinui-2x)
- [Add `exports` field to `package.json`](#add-exports-field-to-packagejson)
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

## Drop support for iTwin.js 3.x

**iTwin.js 3.x** is in end-of-life phase as described in [version support status](https://www.itwinjs.org/learning/api-support-policies/#version-support-status).

iTwin.js peer dependency ranges are updated to exclude the `^3.7.0` version. [#1050](https://github.com/iTwin/appui/pull/1050)

Application consumers of **AppUI** should upgrade to the latest [iTwin.js 4.x](https://www.itwinjs.org/changehistory/) version. Packages that depend on AppUI should update to the minimal required **iTwin.js 4.x** version.

Support for newer versions of **iTwin.js** will be added in future AppUI releases.

## Drop support for React 17.x

React peer dependency ranges are updated to exclude the `^17.0.0` version. [#1054](https://github.com/iTwin/appui/pull/1054)

Application consumers of **AppUI** should upgrade to the latest [React 18.x](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) version. Packages that depend on AppUI should update to the minimal required **React 18.x** version.

Support for newer versions of **React** will be added in future AppUI releases.

## Drop support for iTwinUI 2.x

**iTwinUI 2.x** is in end-of-life phase as described in [version support status](https://www.itwinjs.org/learning/api-support-policies/#version-support-status).

AppUI packages will no longer support iTwinUI 2.x version out of the box. Previously AppUI would install both **iTwinUI 2.x** and **iTwinUI 3.x** to setup both versions when using the `ThemeManager` or popout windows. [#1058](https://github.com/iTwin/appui/pull/1058)

Application consumers of **AppUI** should upgrade to the latest [iTwinUI 3.x](https://github.com/iTwin/iTwinUI/releases) version. Packages that depend on AppUI should update to the minimal required **iTwinUI 3.x** version.

For rare cases, to continue using **iTwinUI 2.x** in AppUI, applications need to be wrapped with `ThemeProvider` from **iTwinUI 2.x**.
Additionally, to use **iTwinUI 2.x** in the child windows and popout widgets applications can use the newly introduced `childWindow` prop to wrap the content of child windows. For example:

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

Support for newer versions of **iTwinUI** will be added in future AppUI releases.

## Add `exports` field to `package.json`

AppUI packages now include an `exports` field in its `package.json` file to prevent consumers from importing the `@internal` APIs directly from submodules. [#1048](https://github.com/iTwin/appui/pull/1048)

This change might break consumers that rely on importing APIs directly from unsupported submodules i.e. `@itwin/appui-react/lib/esm/appui-react`. Currently supported export paths:

- Main barrel file i.e. `@itwin/appui-react`
- `package.json` subpath i.e. `@itwin/appui-react/package.json`
- All SCSS files i.e. `@itwin/core-react/lib/core-react/_typography.scss`. SCSS files are are exported by using [`sass` custom condition](https://sass-lang.com/documentation/js-api/classes/nodepackageimporter/) and are available until the next major version to facilitate the **AppUI 5.0** adoption. SCSS exports will be removed in the next major version.

To fix the issue, consumers should update their import paths to use the supported export paths. For example:

```tsx
// Before
import { Widget } from "@itwin/appui-react/lib/esm/appui-react/widgets/Widget";

// After
import { Widget } from "@itwin/appui-react";
```

SCSS imports and variables should be replaced with the iTwinUI CSS variables:

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

For all other cases, if the currently used API is not exported from the barrel file and there is no reasonable replacement, please [file an issue](https://github.com/iTwin/appui/issues/new/choose) and describe your use case.

## @itwin/appui-react

### Removals

- Removed `FrameworkChildWindows.useCreateRoot` method which existed solely to prevent runtime warnings when using `React 18.x`. Consumers should remove usages of `useCreateRoot` when upgrading. [#1054](https://github.com/iTwin/appui/pull/1054)
- Removed [activateDroppedTab](https://github.com/iTwin/appui/discussions/679) preview feature, since the behavior of the preview feature is now enabled by default. Additionally, a widget tab's drag-and-drop logic is updated to activate the dropped tab only if it was active when the drag interaction was initiated. It is safe for consumers to remove the preview feature from their `PreviewFeaturesProvider`. [#1071](https://github.com/iTwin/appui/pull/1071)
- Removed [newToolbars](https://github.com/iTwin/appui/discussions/924) preview feature, since the behavior of the preview feature is now enabled by default. It is safe for consumers to remove the preview feature from their `PreviewFeaturesProvider`. [#1072](https://github.com/iTwin/appui/pull/1072)

### Additions

- Added `childWindow` prop to `ConfigurableUiContent` component which allows consumers to provide a wrapper component for child windows and popout widgets. [#1058](https://github.com/iTwin/appui/pull/1058)
- `StatusBarPopover` component now accepts all props that are accepted by `Popover` component from `@itwin/itwinui-react`. [#1068](https://github.com/iTwin/appui/pull/1068)

### Changes

- Updated `MessageManager.addMessage` and `MessageManager.outputMessage` to ignore already active messages displayed to the user. This API is used by various tools indirectly via `IModelApp.notifications.outputMessage` when `AppNotificationManager` is set up. This change should prevent the same message from being displayed multiple times unnecessarily. [#1042](https://github.com/iTwin/appui/pull/1042)
- Popout widgets are now displayed in flow layout to match the layout of floating, stage panel and popout widgets when `reparentPopoutWidgets` is enabled. [#1049](https://github.com/iTwin/appui/pull/1049)
- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)
- Use React portal instead of creating a separate element tree for each child window. [#1062](https://github.com/iTwin/appui/pull/1062)
- Removed incorrect usage of internal `IModelApp.renderSystem.options.displaySolarShadows` check from 'useSolarDataProvider'. `wantShadows` property of viewport display style is used instead. [#1066](https://github.com/iTwin/appui/pull/1066)
- Updated the styling of `BackstageAppButton` and `NestedFrontstageAppButton` components to match the updated toolbars. [#1078](https://github.com/iTwin/appui/pull/1078)

## @itwin/components-react

### Deprecations

- Deprecated `FavoritePropertiesRenderer.renderFavorites` method in favor of an overload that doesn't take the `createRoot` function as an argument. [#1054](https://github.com/iTwin/appui/pull/1054)

### Additions

- Added `IMergingPropertyDataProvider` interface which combines any number of `IPropertyDataProvider` instances and added `createMergedPropertyDataProvider` factory function that creates `IMergingPropertyDataProvider` instance. [#1040](https://github.com/iTwin/appui/pull/1040)

### Changes

- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Update `FilterBuilder` UI according to UX team's new specification. [#1059] (https://github.com/iTwin/appui/pull/1059)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)

## @itwin/core-react

### Changes

- Removed the `resize-observer-polyfill` dependency because `ResizeObserver` is well supported by modern browsers, eliminating the need for a polyfill. [#1045](https://github.com/iTwin/appui/pull/1045)
- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)

## @itwin/imodel-components-react

### Changes

- Provide file extensions in import declarations that are [mandatory for ES modules](https://nodejs.org/api/esm.html#mandatory-file-extensions). [#1056](https://github.com/iTwin/appui/pull/1056)
- Removed all `@internal` API exports from the barrel file. Consumers should not use `@internal` APIs directly. [#1060](https://github.com/iTwin/appui/pull/1060)
