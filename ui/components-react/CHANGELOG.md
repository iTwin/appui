# Change Log - @itwin/components-react

## 5.11.2

### Patch Changes

- @itwin/core-react@5.11.2

## 5.11.1

### Patch Changes

- @itwin/core-react@5.11.1

## 5.11.0

### Patch Changes

- @itwin/core-react@5.11.0

## 5.10.1

### Patch Changes

- @itwin/core-react@5.10.1

## 5.10.0

### Patch Changes

- @itwin/core-react@5.10.0

## 5.9.1

### Patch Changes

- @itwin/core-react@5.9.1

## 5.9.0

### Patch Changes

- @itwin/core-react@5.9.0

## 5.8.0

### Patch Changes

- @itwin/core-react@5.8.0

## 5.7.0

### Minor Changes

- fd58c9f: Updated the `editors` prop of `EditorsRegistryProvider` component. You can now either supply a list of editors or provide a function that customizes the current list of editors, allowing full control over the final set of editors.

  ```tsx
  // New editors are higher priority than existing ones.
  <EditorsRegistryProvider editors={(editors) => [...newEditors, ...editors]} />

  // New editors are lower priority than existing ones.
  <EditorsRegistryProvider editors={(editors) => [...editors, ...newEditors]} />

  // Filter the editors.
  <EditorsRegistryProvider
    editors={(editors) =>
      editors.filter((e) =>
        e.applies(
          {
            type: "bool",
          },
          undefined
        )
      )
    }
  />
  ```

### Patch Changes

- @itwin/core-react@5.7.0

## 5.6.0

### Patch Changes

- a4b74f9: Fix potential infinite recursion in dispose methods of `TreeEventHandler` and `FilteringPropertyDataProvider` classes.
  - @itwin/core-react@5.6.0

## 5.5.0

### Minor Changes

- c619667: Deprecated `dispose` method of `FilteringPropertyDataProvider` and `TreeEventHandler` classes which is defined in now deprecated `IDisposable` interface from `@itwin/core-bentley` package.

  In version `5.2`, TypeScript [introduced](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management) `Disposable` type and `using` declarations (from the upcoming [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) feature in ECMAScript).

  Consumers should use `Symbol.dispose` instead, which is polyfilled by the AppUI package.

  ```ts
  // Before #1
  const handler = new TreeEventHandler();
  handler.dispose();

  // Before #2 when using `using` utility from `@itwin/core-bentley`
  using(new TreeEventHandler(), (handler) => {
    // Do something with handler, it'll get disposed when the callback returns
  });

  // After
  using handler = new TreeEventHandler();
  // Do something with handler, it'll get disposed when it goes out of scope
  ```

- c619667: Updated peer dependencies to support iTwin.js core v5 packages.
- a69108d: Added ability to opt in to using new editors system in `FilterBuilder` component. [#1288](https://github.com/iTwin/appui/pull/1288)

  ```tsx
  return (
    <FilterBuilder
      {...props}
      ruleValueRenderer={React.useCallback(
        (valueProps) => (
          <PropertyFilterBuilderRuleValue {...valueProps} editorSystem="new" />
        ),
        []
      )}
    />
  );
  ```

  Added ability to render status message in `EditorRenderer`.

  ```tsx
  return <EditorRenderer {...props} statusMessage="Negative status message" />;
  ```

  ```tsx
  return (
    <EditorRenderer
      {...props}
      statusMessage={
        <StatusMessage status="positive">Custom status message</StatusMessage>
      }
    />
  );
  ```

### Patch Changes

- Updated dependencies [c619667]
  - @itwin/core-react@5.5.0

## 5.4.0

Thu, 17 Apr 2025 09:55:41 GMT

### Updates

- `useCommittableValue`: Avoid invoking `commit` if value is the same as the initial.
- Added new system for rendering property value editor components.

## 5.3.1

Thu, 20 Mar 2025 11:10:28 GMT

_Version update only_

## 5.3.0

Fri, 14 Mar 2025 17:37:48 GMT

_Version update only_

## 5.2.0

Thu, 27 Feb 2025 08:07:36 GMT

### Updates

- Fix an issue which prevented tabbing through editor containers.

## 5.1.0

Thu, 30 Jan 2025 09:15:23 GMT

### Updates

- cSpell fixes

## 5.0.5

Tue, 21 Jan 2025 11:38:58 GMT

_Version update only_

## 5.0.4

Fri, 17 Jan 2025 14:12:03 GMT

### Updates

- Fixed `module 'lodash' does not provide an export named...` error when running in Node.js.

## 5.0.3

Fri, 17 Jan 2025 11:42:02 GMT

_Version update only_

## 5.0.2

Thu, 16 Jan 2025 12:04:12 GMT

### Updates

- Use import attributes for json imports.

## 5.0.1

Wed, 15 Jan 2025 11:47:00 GMT

_Version update only_

## 5.0.0

Mon, 16 Dec 2024 11:43:27 GMT

### Updates

- Add MergingPropertyDataProvider which combines multiple property data providers into a single one.
- Removed some references on @bentley/icons-generic
- Remove `@itwin/core-geometry` usage from `@itwin/components-react`
- Drop support for CommonJS modules.
- Drop support for iTwin.js 3.x.
- Drop support for React 17.x.
- Remove `@internal` API exports from the barrel file.
- Move @itwin/itwinui-react to peerDependencies.
- Added a callback to `VirtualizedPropertyGrid` which determines which editors should always be visible
- Update FilterBuilder UI according to UX team's new specs
- Provide file extension in import declarations.
- Add `exports` field to `package.json`.
- Replaced SCSS `@import` rules with `@use` rules.
- Replace buic variables with iTwinUI CSS variables.

## 4.17.6

Wed, 20 Nov 2024 14:27:46 GMT

_Version update only_

## 4.17.5

Thu, 14 Nov 2024 08:22:04 GMT

_Version update only_

## 4.17.4

Fri, 08 Nov 2024 14:41:23 GMT

_Version update only_

## 4.17.3

Wed, 06 Nov 2024 09:04:20 GMT

_Version update only_

## 4.17.2

Wed, 30 Oct 2024 14:46:15 GMT

### Updates

- Fixed `pw:` links handling in property grid.

## 4.17.1

Wed, 09 Oct 2024 10:50:47 GMT

### Updates

- Update FilterBuilder UI according to UX team's new specs

## 4.17.0

Thu, 19 Sep 2024 12:50:53 GMT

### Updates

- Deprecated component props in favor of type helper
- Add support for allowing last rule to be deleted in FilterBuilder

## 4.16.5

Tue, 10 Sep 2024 16:40:46 GMT

_Version update only_

## 4.16.4

Wed, 04 Sep 2024 08:10:19 GMT

_Version update only_

## 4.16.3

Tue, 03 Sep 2024 14:32:22 GMT

_Version update only_

## 4.16.2

Wed, 28 Aug 2024 06:32:12 GMT

_Version update only_

## 4.16.1

Fri, 16 Aug 2024 08:18:14 GMT

_Version update only_

## 4.16.0

Wed, 07 Aug 2024 12:38:32 GMT

### Updates

- React to `@itwin/core-react` deprecations.
- Added support for new BadgeKind type in components.
- Fix mixed-decls Sass warnings.
- Updated `EditorContainer` to not commit value when `Escape` is pressed or value was not changed.
- Property grid: Show array items' description next to the index when the items are non-primitive.
- Fixed `activeMatchIndex` not working correctly on adjacent matches in `HighlightedText`.
- Fixed `EditorContainer` trying to commit updated value twice when tab is pressed.
- Updated `VirtualizedPropertyGrid` to automatically close property editors when data changes.

## 4.15.5

Wed, 24 Jul 2024 16:09:26 GMT

_Version update only_

## 4.15.4

Mon, 22 Jul 2024 21:27:52 GMT

_Version update only_

## 4.15.3

Mon, 15 Jul 2024 12:12:00 GMT

_Version update only_

## 4.15.2

Wed, 10 Jul 2024 11:54:56 GMT

_Version update only_

## 4.15.1

Tue, 09 Jul 2024 09:23:12 GMT

_Version update only_

## 4.15.0

Fri, 28 Jun 2024 09:09:37 GMT

### Updates

- `PropertyFilterBuilder`: Allow adding custom item for PropertyFilterBuilderActions
- Portal editors to the same container used to portal other components.

## 4.14.2

Mon, 22 Jul 2024 21:23:09 GMT

_Version update only_

## 4.14.1

Tue, 11 Jun 2024 15:58:29 GMT

_Version update only_

## 4.14.0

Thu, 06 Jun 2024 08:24:21 GMT

### Updates

- Deprecated `DoublePropertyValueRenderer` and `NavigationPropertyValueRenderer`
- Update `VirtualizedPropertyGrid` and `UrlPropertyValueRenderer` to open links with `pw` scheme in a new window.
- Update PropertyGrid to allow browser context menu and user selection.

## 4.13.4

Tue, 21 May 2024 08:21:34 GMT

_Version update only_

## 4.13.3

Fri, 17 May 2024 09:43:31 GMT

### Updates

- upgrade to TypeScript@5.3.3 and @itwin/build-tools@4.6.x

## 4.13.2

Wed, 08 May 2024 08:24:46 GMT

_Version update only_

## 4.13.1

Tue, 07 May 2024 15:01:46 GMT

### Updates

- Fixed `VirtualizedPropertyGrid` not rendering primitive property display value and instead always trying to convert raw value into string.

## 4.13.0

Tue, 07 May 2024 08:44:06 GMT

### Updates

- Convert EditorContainer to function component.
- Clipped node content when it does not fit in `VirtualizedPropertyGrid`.
- Updated `TreeSelectionManager` to not start a drag operation when only one node is selected.
- Fixed spacing between categories in `VirtualizedPropertyGrid`.

## 4.12.0

Fri, 05 Apr 2024 09:55:35 GMT

### Updates

- Added note to `PropertyFilterRuleOperator` that `Like` operator should be handled as a contains operator.

## 4.11.0

Thu, 21 Mar 2024 16:38:04 GMT

### Patches

- Added custom property renderer support for non-primitive properties in `VirtualizedPropertyGrid`.

### Updates

- Deprecate useProximityOpacity visibility setting.
- Deprecate date picker components.
- Removed memoization for translated strings in components.

## 4.10.0

Mon, 26 Feb 2024 15:50:45 GMT

### Updates

- `ControlledTree`: add ability to select multiple nodes using `CMD` key + mouse click.
- Use iTwinUI 3.x.

## 4.9.0

Tue, 06 Feb 2024 08:56:40 GMT

### Patches

- Show loading spinner in subsequent loads if delay threshold is reached VirtualizedPropertyGrid

### Updates

- ignore appui-abstract eslint deprecation m
- `PropertyFilterBuilder`: Added `Between` and `Not between` operators.
- Added `useControlledTreeEventsHandler` hook that replaces now deprecated `useTreeEventsHandler`.
- Polish UI for FilterBuilder

## 4.8.3

Tue, 30 Jan 2024 09:04:27 GMT

_Version update only_

## 4.8.2

Wed, 24 Jan 2024 12:37:03 GMT

_Version update only_

## 4.8.1

Thu, 11 Jan 2024 13:05:42 GMT

_Version update only_

## 4.8.0

Thu, 21 Dec 2023 14:08:42 GMT

### Patches

- Add ability to remove all items in PropertyFilterBuilderActions.
- Ensure correct initial property orientation in `PropertyGrid`

## 4.7.2

Wed, 20 Dec 2023 23:11:37 GMT

_Version update only_

## 4.7.1

Thu, 07 Dec 2023 19:40:17 GMT

### Minor changes

- Reset operator when property of rule item is changed in FilterBuilderState.

### Updates

- Set filterText to lowercase in constructors of filterers.

## 4.7.0

Fri, 01 Dec 2023 20:01:16 GMT

### Minor changes

- Add support for double-clicking tree nodes.

### Patches

- Fix bug where multiline value renderer would not support certain properties.

### Updates

- No longer consume deprecated appui-abstract types: getObjectClassName, SpecialKey; use icon path directly instead of IconSpecUtilities
- Fixed `useAsyncValue` hook to work in React 18 strict mode.

## 4.6.3

Wed, 25 Oct 2023 09:39:22 GMT

_Version update only_

## 4.6.2

Tue, 17 Oct 2023 19:16:23 GMT

_Version update only_

## 4.6.1

Thu, 12 Oct 2023 16:59:20 GMT

_Version update only_

## 4.6.0

Wed, 04 Oct 2023 18:05:34 GMT

### Updates

- Fix `useTreeModel` missing tree model changes that happen after render until `useTreeModel` subscribes to `TreeModelSource.onModelChanged` event.

## 4.5.1

Fri, 08 Sep 2023 16:10:53 GMT

_Version update only_

## 4.5.0

Wed, 06 Sep 2023 17:29:22 GMT

### Updates

- `usePropertyFilterBuilder`: Added ability to build filter without showing errors.
- Fixed `TreeNodeLoader` adding loaded nodes to model when `loadNode` observable is unsubscribed before nodes request is completed.
- Remove `require` call in `TypeConverterManager`.
- Improved `Toolbar` and `ToolbarWithOverflow` documentation regarding orientation.
- Bump `rxjs` dependency to `7.8.1`.
- `ControlledTree`: Fixed range selection over nodes that are not loaded causing browser to hang.

## 4.4.0

Tue, 15 Aug 2023 18:02:09 GMT

### Updates

- Add `PropertyFilterBuilderRenderer`, `PropertyFilterBuilderRendererProps`, `defaultPropertyFilterBuilderRuleValidator`, `UsePropertyFilterBuilderProps`, `UsePropertyFilterBuilderResult`, `usePropertyFilterBuilder`, marked as beta. Promote `isPropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRule`, `PropertyFilterBuilderRuleGroup`, `PropertyFilterBuilderRuleGroupItem`, `PropertyFilterBuilderState` to beta.
- `PropertyFilterBuilder`: clear rule values when operator changes.
- `PropertyFilterBuilder`: Fix bug where user can't change rule group operator.
- Promote `PropertyFilterBuilderRuleOperatorProps`, `PropertyFilterBuilderRuleValueProps`, `PropertyFilterBuilderRuleValue` to beta, create interface `PropertyFilterBuilderRuleValueRendererProps` which extends `PropertyFilterBuilderRuleValueProps`, pass `PropertyFilterRuleOperator` to custom `PropertyFilterBuilderRuleValue` renderer.

## 4.3.0

Mon, 17 Jul 2023 10:16:20 GMT

### Updates

- Update sinon to 15.2.0 and @types/sinon to 10.0.15
- Added `useControlledTreeLayoutStorage` and `useVirtualizedPropertyGridLayoutStorage` hooks

## 4.2.0

Tue, 27 Jun 2023 14:50:22 GMT

### Updates

- `PropertyFilterBuilder`: Make `contains` default operator for string and text properties.
- `PropertyFilterBuilder`: Delete button will clear rule instead of removing it when there is only one rule left in the rule group.
- Promoted `TreeNodeContent` and `TreeNodeIcon` to `public`.
- ControlledTree: Improved context menu support by exposing `onContextMenu` callback through `TreeNodeRendererProps`.
- `PropertyFilterBuilder`: Set focus on property selector on `+ Rule` and `+ Rule Group` buttons click.
- `PropertyFilterBuilder`: Allow filtering when there are empty filter rules.
- Remove non-public API calls.
- `VirtualizedPropertyGrid`: Improved property layout to make sure action buttons does not overflow on small screens.
- Update `@itwin/itwinui-react` version to 2.11.6.

## 4.1.0

Mon, 29 May 2023 14:05:04 GMT

### Updates

- Fix a bug where `MultilineTextPropertyValueRenderer` doesn't show "See less" and "See more" buttons
- Fix tree flickering without keeping the horizontal scrollbar

## 4.0.1

Fri, 19 May 2023 12:24:31 GMT

_Version update only_

## 4.0.0

Mon, 01 May 2023 13:32:16 GMT

### Updates

- Added ability to disable selector in `SelectableContent`
- VirtualizedPropertyGrid: Fixed non-primitive property expander style.
- Fix property value overflow.
- Using iTwinUI-variables.
- Update iTwinUI-react to v2.x.
- Deprecate Toolbar components.
- Fixed `useDebouncedAsyncValue` to re-throw errors in React render loop in case provided promise is rejected. Also affects `usePropertyData` and `usePropertyGridModelSource` hooks.
- Promote 'ControlledTree' related APIs from 'internal' to 'public'.
- Clean dependencies.
- Refactor to use iTwinUI instead of deprecated core-react.
- Remove deprecated components.
- Bump minimum of core packages to 3.7.0.
- peerDependency allow react: ^18.0.0.
- Update typings for React18.
- Clean SCSS.
- `SimplePropertyDataProvider` correctly updates when used in `VirtualizedPropertyGridWithDataProvider`
- Support React18 in FavoritePropertiesRenderer.
- Update package.json dependencies and repo documentation.
- Remove webfont icons from components.

## 3.7.2

Wed, 12 Apr 2023 13:12:42 GMT

_Version update only_

## 3.7.1

Mon, 03 Apr 2023 15:15:36 GMT

_Version update only_

## 3.7.0

Wed, 29 Mar 2023 15:02:27 GMT

### Updates

- Update @deprecated comments.

## 3.6.3

Mon, 27 Mar 2023 16:26:47 GMT

_Version update only_

## 3.6.2

Fri, 17 Mar 2023 17:52:32 GMT

_Version update only_

## 3.6.1

Fri, 24 Feb 2023 22:00:48 GMT

### Updates

- Update `@itwin/itwinui-icons-react` dependency to version `^1.15`

## 3.6.0

Wed, 08 Feb 2023 14:58:39 GMT

### Updates

- Use EmptyLocalization for localization in tests to increase test performance
- API promotion
- API promotion
- Fixed rule rendering in 'PropertyFilterBuilder' component to not render symbol '0' with 'IS TRUE' operator.
- `PropertyFilterBuilder`: Do not show rule group operator if there are less than 2 rules
- Replace inline require with a top-level import
- Fixed 'FilteringInput' placeholder text localization

## 3.5.6

Fri, 24 Feb 2023 16:02:47 GMT

_Version update only_

## 3.5.5

Thu, 26 Jan 2023 22:53:27 GMT

_Version update only_

## 3.5.4

Wed, 18 Jan 2023 15:27:15 GMT

_Version update only_

## 3.5.3

Fri, 13 Jan 2023 17:23:07 GMT

_Version update only_

## 3.5.2

Wed, 11 Jan 2023 16:46:30 GMT

_Version update only_

## 3.5.1

Thu, 15 Dec 2022 16:38:28 GMT

_Version update only_

## 3.5.0

Wed, 07 Dec 2022 19:12:36 GMT

### Updates

- Enabled virtualization in FilterBuilder property selector
- Add ability to disable property selection in `PropertyFilterBuilder` component
- Deprecating Table related components
- Unpin classnames package
- `ControlledTree`: Add ability to mark nodes as not selectable
- Use --buic-toolbar-opacity to set the opacity of toolbar items.

## 3.4.7

Wed, 30 Nov 2022 14:28:19 GMT

_Version update only_

## 3.4.6

Tue, 22 Nov 2022 14:24:19 GMT

_Version update only_

## 3.4.5

Thu, 17 Nov 2022 21:32:50 GMT

_Version update only_

## 3.4.4

Thu, 10 Nov 2022 19:32:17 GMT

_Version update only_

## 3.4.3

Fri, 28 Oct 2022 13:34:57 GMT

_Version update only_

## 3.4.2

Mon, 24 Oct 2022 13:23:45 GMT

_Version update only_

## 3.4.1

Mon, 17 Oct 2022 20:06:51 GMT

_Version update only_

## 3.4.0

Thu, 13 Oct 2022 20:24:47 GMT

### Updates

- Fixed svg rendering when svg is provided as xml
- Updated Node types declaration to support latest v16
- Table: fix rows reloading when table is scrolled to the middle
- Fix/Remove skipped tests
- `MutableTreeModel`: Accept initial `TreeModel` in the constructor.

## 3.3.5

Tue, 27 Sep 2022 11:50:59 GMT

_Version update only_

## 3.3.4

Thu, 08 Sep 2022 19:00:04 GMT

_Version update only_

## 3.3.3

Tue, 06 Sep 2022 20:54:19 GMT

_Version update only_

## 3.3.2

Thu, 01 Sep 2022 14:37:22 GMT

_Version update only_

## 3.3.1

Fri, 26 Aug 2022 15:40:02 GMT

### Updates

- Updated desktop toolbar width and height to 40px

## 3.3.0

Thu, 18 Aug 2022 19:08:02 GMT

### Updates

- upgrade mocha to version 10.0.0
- Add ability to specify locale and format of Data and Time shown by timeline component.
- Add children to render inside the node
- Added 'PropertyFilterBuilder' component for building complex filters using properties list
- Add support for undefined value in TypeConverter.
- Avoid creating "NaN" string in numeric type converters.
- Changed FloatTypeConverter and IntTypeConverter 'convertFromString' method to return 'undefined' if string is no a number.
- Fix processing of widget container dragging to empty panel.
- Update iTwinUI-react to 1.38.1

## 3.2.9

Fri, 26 Aug 2022 14:21:40 GMT

_Version update only_

## 3.2.8

Tue, 09 Aug 2022 15:52:41 GMT

_Version update only_

## 3.2.7

Mon, 01 Aug 2022 13:36:56 GMT

_Version update only_

## 3.2.6

Fri, 15 Jul 2022 19:04:43 GMT

_Version update only_

## 3.2.5

Wed, 13 Jul 2022 15:45:52 GMT

_Version update only_

## 3.2.4

Tue, 21 Jun 2022 18:06:33 GMT

_Version update only_

## 3.2.3

Fri, 17 Jun 2022 15:18:39 GMT

_Version update only_

## 3.2.2

Fri, 10 Jun 2022 16:11:36 GMT

### Updates

- Fix `useTreeModel` returning stale model for the given model source

## 3.2.1

Tue, 07 Jun 2022 15:02:56 GMT

_Version update only_

## 3.2.0

Fri, 20 May 2022 13:10:54 GMT

### Updates

- Add ability to pass parameters to UiItemsManager when loading items provider to specify what stages allow the provider to supply items.
- Update UI to new UX design to allow only 2 sections of widgets per panel.

## 3.1.3

Fri, 15 Apr 2022 13:49:25 GMT

_Version update only_

## 3.1.2

Wed, 06 Apr 2022 22:27:56 GMT

_Version update only_

## 3.1.1

Thu, 31 Mar 2022 15:55:48 GMT

_Version update only_

## 3.1.0

Tue, 29 Mar 2022 20:53:47 GMT

### Updates

- Add data attributes to identify item and its UI provider.
- Update to itwinui-css version "0.44.0".
- Update to @itwin/itwinui-react: 1.32.0
- Update to latest itwinui-react.

## 3.0.3

Fri, 25 Mar 2022 15:10:01 GMT

_Version update only_

## 3.0.2

Thu, 10 Mar 2022 21:18:13 GMT

_Version update only_

## 3.0.1

Thu, 24 Feb 2022 15:26:55 GMT

### Updates

- Use ToolbarAutoHidePopupContext to monitor widgets' autoHidden state.

## 3.0.0

Mon, 24 Jan 2022 14:00:52 GMT

### Updates

- Upgrade target to ES2019 and deliver both a CommonJs and ESModule version of package
- Update CustomNumberEditor to use size='small' itwinUi style.
- rename to @itwin/components-react
- remove ClientRequestContext and its subclasses
- Removed SignIn component
- Replace usage of I18N with generic Localization interface.
- Update snapshots
- Renamed an iModel's parent container to iTwin
- Support for TypeDoc v0.22.7. Fix various broken docs links.
- Refactored part of AccuDraw UI & Providing AccuDraw UI documentation
- Create empty frontstage and UiItemsProviders to populate it and update how ContentGroups are defined.
- Add missing public/beta types to the barrel file.
- Updated recommendation for using Breadcrumbs from itwinui-react instead of deprecated Breadcrumb
- Change `ControlledTree` to take `TreeModel` instead of `VisibleTreeNodes`.
- Replace `useVisibleTreeNodes` with `useTreeModel` since consumers don't need to create `VisibleTreeNodes` anymore.
- Rename `ControlledTreeProps.treeEvents` to `eventsHandler`.
- Make `width` and `height` required props for `ControlledTree` and `TreeRenderer`.
- Clean up deprecated Tree and Drag & Drop related APIs
- Clean up deprecated FilteringInput and PropertyGrid props
- Make `width` and `height` props required for `VirtualizedPropertyGrid` and `VirtualizedPropertyGridWithDataProvider`
- Update CustomNumberEditor resetting of bad values.
- update immer to fix security warning
- Deprecated Breadcrumb component
- Deprecate and promote apis
- Deprecate Table component.
- Deprecate obsolete APIs. Publish beta APIs from last release.
- Export BeDragDropContext
- Upgraded itwinui-react to 1.16.2. Fixed editor sizes.
- Remove files generated by bad merge
- Make ToolbarPopupContext public so user can call closePanel from their popup panels.
- Update props on iTwinUi-react Select so it works properly in auto-sized floating widgets.
- Deprecated HorizontalTabs in ui-core. Removed older deprecated items. Updated NextVersion.md.
- Update to latest itwinui-react
- Clean up css for status bar entries to avoid unwanted text wrapping.
- Incorporating iTwinUI-CSS and iTwinUI-React into iModel.js
- iTwinUI-react Table demo
- Moved iTwinUI style overrides to ui-core from ui-framework
- Rename ui directories to match new package names.
- Remove native key handling in React editor components because it's not longer needed with React 17.
- Add prop that prevents popup button panel from unmounting when closed.
- Promote property grid related APIs
- Update to React 17.
- Created imodel-components folder & package and moved color, lineweight, navigationaids, quantity, timeline & viewport. Deprecated MessageSeverity in ui-core & added it ui-abstract. Added MessagePresenter interface to ui-abstract.
- Remove react 16 peer dependency.
- Remove itwinUi css overrides.
- UiFramework and UiIModelComponent initialize method no longer take localization argument, uses IModelApp.localization internally.
- Replaced ui-core Slider with one from iTwinUi-react.
- Update to latest types/react package
- Skip test causing CI job failures
- Lock down and update version numbers so docs will build.

## 2.19.28

Wed, 12 Jan 2022 14:52:38 GMT

_Version update only_

## 2.19.27

Wed, 05 Jan 2022 20:07:20 GMT

_Version update only_

## 2.19.26

Wed, 08 Dec 2021 20:54:53 GMT

_Version update only_

## 2.19.25

Fri, 03 Dec 2021 20:05:49 GMT

_Version update only_

## 2.19.24

Mon, 29 Nov 2021 18:44:31 GMT

_Version update only_

## 2.19.23

Mon, 22 Nov 2021 20:41:40 GMT

_Version update only_

## 2.19.22

Wed, 17 Nov 2021 01:23:26 GMT

_Version update only_

## 2.19.21

Wed, 10 Nov 2021 10:58:24 GMT

_Version update only_

## 2.19.20

Fri, 29 Oct 2021 16:14:22 GMT

_Version update only_

## 2.19.19

Mon, 25 Oct 2021 16:16:25 GMT

_Version update only_

## 2.19.18

Thu, 21 Oct 2021 20:59:44 GMT

_Version update only_

## 2.19.17

Thu, 14 Oct 2021 21:19:43 GMT

_Version update only_

## 2.19.16

Mon, 11 Oct 2021 17:37:46 GMT

_Version update only_

## 2.19.15

Fri, 08 Oct 2021 16:44:23 GMT

_Version update only_

## 2.19.14

Fri, 01 Oct 2021 13:07:03 GMT

_Version update only_

## 2.19.13

Tue, 21 Sep 2021 21:06:40 GMT

### Updates

- 'PropertyValueRendererManager': use merged MergedPropertyValueRenderer before looking for typename specific renderer if property is merged.

## 2.19.12

Wed, 15 Sep 2021 18:06:47 GMT

### Updates

- `TreeRenderer`: Fix last call to `scrollToNode` being repeated on each render.

## 2.19.11

Thu, 09 Sep 2021 21:04:58 GMT

_Version update only_

## 2.19.10

Wed, 08 Sep 2021 14:36:01 GMT

_Version update only_

## 2.19.9

Wed, 25 Aug 2021 15:36:01 GMT

_Version update only_

## 2.19.8

Mon, 23 Aug 2021 13:23:13 GMT

_Version update only_

## 2.19.7

Fri, 20 Aug 2021 17:47:22 GMT

_Version update only_

## 2.19.6

Tue, 17 Aug 2021 20:34:29 GMT

_Version update only_

## 2.19.5

Fri, 13 Aug 2021 21:48:09 GMT

_Version update only_

## 2.19.4

Thu, 12 Aug 2021 13:09:26 GMT

_Version update only_

## 2.19.3

Wed, 04 Aug 2021 20:29:34 GMT

_Version update only_

## 2.19.2

Tue, 03 Aug 2021 18:26:23 GMT

_Version update only_

## 2.19.1

Thu, 29 Jul 2021 20:01:11 GMT

### Updates

- `ControlledTree`: Fix tree background not being rendered.

## 2.19.0

Mon, 26 Jul 2021 12:21:25 GMT

### Updates

- remove internal barrel-import usage
- Stop delivering pseudo-localized strings
- Add window "beforeUnload" event listener to ensure viewport is dropped from ViewManager.
- `MutableTreeModel`: `removeChild` method now accepts child index for the second parameter.
- Workaround for react-data-grid blank grid after scroll and update
- Add option prop to set time zone offset for date and time display in the TimelineComponent.

## 2.18.4

Tue, 10 Aug 2021 19:35:13 GMT

_Version update only_

## 2.18.3

Wed, 28 Jul 2021 17:16:30 GMT

### Updates

- Fixed scrolling in Table component

## 2.18.2

Mon, 26 Jul 2021 16:18:31 GMT

### Updates

- `ControlledTree`: Fix tree background not being rendered.
- Workaround for react-data-grid blank grid after scroll and update

## 2.18.1

Fri, 16 Jul 2021 17:45:09 GMT

_Version update only_

## 2.18.0

Fri, 09 Jul 2021 18:11:24 GMT

### Updates

- Update table to pass HtmlDivElement to ElementResizeObserver.
- Add QuantityNumberInput that looks like NumberInput but works with Quantities and active unit system.
- `TreeRenderer`: Add ability to explicitly specify component's width and height.
- `VirtualizedPropertyGrid`: Add ability to explicitly specify component's width and height.
- `ControlledTree`: Accept and forward size props to `TreeRenderer`.
- Clean up timeline and fix test coverage.
- Add props to the TimelineComponent that will allow apps to pass a set of items to be prefixed, appended, or to replace the context menu entries.

## 2.17.3

Mon, 26 Jul 2021 16:08:36 GMT

### Updates

- Workaround for react-data-grid blank grid after scroll and update

## 2.17.2

Thu, 08 Jul 2021 15:23:00 GMT

_Version update only_

## 2.17.1

Fri, 02 Jul 2021 15:38:31 GMT

_Version update only_

## 2.17.0

Mon, 28 Jun 2021 16:20:11 GMT

### Updates

- Allow style to be passed to weight picker.
- Fix array and struct property contents not being rendered in property grid when the properties have `hideCompositePropertyLabel` flag.
- Added `mergedCellsCount` property to `CellItem`. It is used for determining width of the cell.
- Added `overflow` property for `react-grid-Cell__value` element. `zIndex` is set in `TableCellContent` style property. These updates are necessary for rendering merged cells in `Table` component.
- Updated `Table` component so that it would be possible to merge cells in it
- Update scss to remove use of slash for division to avoid SASS deprecation warnings.
- Public in-use APIs
- Refactor TimelineComponent to remove experimental milestones feature.
- `TreeRenderer`: Fix tree nodes being loaded repeatedly in some cases.
- `VirtualizedPropertyGrid`: Remove top and bottom padding.
- `VirtualizedPropertyGridWithDataProvider`: Fix loading animation overflowing its parent container.

## 2.16.10

Thu, 22 Jul 2021 20:23:45 GMT

### Updates

- Workaround for react-data-grid blank grid after scroll and update

## 2.16.9

Tue, 06 Jul 2021 22:08:34 GMT

_Version update only_

## 2.16.8

Fri, 02 Jul 2021 17:40:46 GMT

_Version update only_

## 2.16.7

Mon, 28 Jun 2021 18:13:04 GMT

_Version update only_

## 2.16.6

Mon, 28 Jun 2021 13:12:55 GMT

_Version update only_

## 2.16.5

Fri, 25 Jun 2021 16:03:01 GMT

_Version update only_

## 2.16.4

Wed, 23 Jun 2021 17:09:07 GMT

_Version update only_

## 2.16.3

Wed, 16 Jun 2021 20:29:32 GMT

_Version update only_

## 2.16.2

Thu, 03 Jun 2021 18:08:11 GMT

_Version update only_

## 2.16.1

Thu, 27 May 2021 20:04:22 GMT

_Version update only_

## 2.16.0

Mon, 24 May 2021 15:58:39 GMT

### Updates

- Add support for child popup windows.
- Add ability to not render array/struct property label in virtualized property grid
- Add support for custom property category renderers.
- Improved Multi-Value column filtering in the Table component
- Move `VirtualizedPropertyGrid` related types from @alpha to @beta.
- Fixed getting distinct values when Table rows are updated
- Update to latest classnames package

## 2.15.6

Wed, 26 May 2021 15:55:19 GMT

_Version update only_

## 2.15.5

Thu, 20 May 2021 15:06:26 GMT

### Updates

- Fixed getting distinct values when Table rows are updated

## 2.15.4

Tue, 18 May 2021 21:59:07 GMT

_Version update only_

## 2.15.3

Mon, 17 May 2021 13:31:38 GMT

_Version update only_

## 2.15.2

Wed, 12 May 2021 18:08:13 GMT

_Version update only_

## 2.15.1

Wed, 05 May 2021 13:18:31 GMT

_Version update only_

## 2.15.0

Fri, 30 Apr 2021 12:36:58 GMT

### Updates

- Update to use UiSettingsStorage.
- Fix color picker hue display in DR by removing webkit prefix. Adjust max slider value.
- 'TreeModel': Fixed 'changeNodeId' to set new id on TreeModelNode
- 'TreeNodeLoader': Changed nodes loading to avoid removing subtrees of existing expanded nodes
- Added ability to track rendered nodes in ControlledTree
- Fix number editor so it can process Enter key and call OnCommit processing.
- Fix compatibility issue when multiple versions of `rxjs` are in use.
- Fix a crash when clicking on a `ControlledTree` node when the tree contains placeholder nodes and using `SelectionMode.Multiple`

## 2.14.4

Thu, 22 Apr 2021 21:07:33 GMT

_Version update only_

## 2.14.3

Thu, 15 Apr 2021 15:13:16 GMT

_Version update only_

## 2.14.2

Thu, 08 Apr 2021 14:30:09 GMT

_Version update only_

## 2.14.1

Mon, 05 Apr 2021 16:28:00 GMT

_Version update only_

## 2.14.0

Fri, 02 Apr 2021 13:18:42 GMT

### Updates

- Lower coverage to 99.98 to avoid CI breaks.
- Added handling for windows which don't open.
- Added `UrlPropertyValueRenderer` renders values for properties of `StandardTypeNames.URL` type as URLs without looking at the value
- Deprecated `onPropertyLinkClick` prop used by `VirtualizedPropertyGridWithDataProvider` and `PropertyGrid`. Behavior of clicks on `PropertyRecord` links should be customized by assigning the `links` attribute.
- update FormatPanel to ensure state was not set on unmounted component.
- Fix bug in TimelineComponent's componentDidUpdate method that caused and infinite loop.
- Support for AccuDraw Ui Settings
- `TreeModelSource`: Fix `onModelChanged` event sometimes listing same node id multiple times.
- Improved ui-components test coverage to 100%
- `TreeModel`: Expose `getChildOffset` method.
- `MutableTreeModel`: Add `moveNode` method.
- Better support for Escape key to Home position

## 2.13.0

Tue, 09 Mar 2021 20:28:13 GMT

### Updates

- Updates to use new QuantityParserResult
- Upgrade react-resize-detector to avoid lodash security vulnerability
- Fixed broken double angle bracket link syntax
- Fix solar timeline component so that sunTime is properly set for project location.
- Add ui-components for displaying and editing FormatProps that are used to Format and Parse Quantities.
- Updated to use TypeScript 4.1
- Add a captureClicks prop to ColorPickerPopup that will stop propagation of click events from the popup.
- `MutableTreeModel`: Add `changeNodeId` method.
- `MutableTreeModel`: Allow `undefined` child count in `setNumChildren`.
- begin rename project from iModel.js to iTwin.js

## 2.12.3

Mon, 08 Mar 2021 15:32:00 GMT

_Version update only_

## 2.12.2

Wed, 03 Mar 2021 18:48:53 GMT

_Version update only_

## 2.12.1

Tue, 23 Feb 2021 20:54:45 GMT

_Version update only_

## 2.12.0

Thu, 18 Feb 2021 22:10:13 GMT

### Updates

- UI 'pickers' that use Popup component with fixed content should set closeOnNestedPopupOutsideClick prop.
- Consider string values starting with `pw:\` or `pw://` to be URLs without checking the rest of the string.
- `ControlledTree`: Fix calling `scrollToNode` too early triggering an assertion error.
- Update TimelineComponent.tsx to properly respond to changed props.

## 2.11.2

Thu, 18 Feb 2021 02:50:59 GMT

_Version update only_

## 2.11.1

Thu, 04 Feb 2021 17:22:41 GMT

_Version update only_

## 2.11.0

Thu, 28 Jan 2021 13:39:27 GMT

### Updates

- Update components that support providing refs via React.forwardRef to work better with document generation.
- Add 'showCaret' prop to ColorPickers that show a popup. The caret icon will face up or down depending of popup state.
- Updates due to quantity unit system changes.
- Lock react-select to 3.1.0 and @types/react-select to 3.0.26 until we can fi
- Created new `CategoryPropertyDataFilterer` which allows us to filter `PropertyCategory` and get matches count.
- Updated FilteringDataProvider, now it filters not only PropertyRecords, but PropertyCategories also.
- Updated `VirtualizedPropertyGrid` to pass through `HighlightedPropertyProps` and highlight `PropertyCategory` matches.
- Implemented `CategoryPropertyDataFilterer` in `presentation-test-app` -> `PropertiesWidget`
- Updated filterers to return type of the filtered item, so now `VirtualizedPropertyGrid` can distinguish what types of items need to be highlighted. This feature was implemented in `presentation-test-app` -> `PropertiesWidget`
- Update `NavigationPropertyTypeConverter` to handle navigation properties represented by `InstanceKey`
- Added ui-core learning docs content and added Notification.md, Style.md & Tooltip.md ui-core learning doc files.
- Fix test warnings.
- Update to latest react-dnd version.
- Always clone the ViewState for a ViewportComponent to avoid attaching the same ViewState to multiple viewPorts.

## 2.10.3

Fri, 08 Jan 2021 18:34:03 GMT

_Version update only_

## 2.10.2

Fri, 08 Jan 2021 14:52:02 GMT

_Version update only_

## 2.10.1

Tue, 22 Dec 2020 00:53:38 GMT

_Version update only_

## 2.10.0

Fri, 18 Dec 2020 18:24:01 GMT

### Updates

- Add support for onClose function in ColorPickerPopupProps. This allows color value from popup to be used by caller.
- Added matchesCount attribute to [[PropertyDataFilterResult]] to optionally tell how many matches there were in a [[PropertyRecord]]. Matches in label and value are separated.
- Added match counting functionality to [[FilteringPropertyDataProvider]]. The returned [[FilteredPropertyData]] now has total matches count and a function get information about a match at specific index.
- Added highlightedRecordProps to [[VirtualizedPropertyGridProps]] to allow highlighting specific parts of rendered PropertyRecords.
- Updated [[FilteringInput]] component. Component's `filteringInProgress` prop was deprecated and new `status` property was introduced. This allows rendering the component in any state, including `filtering finished`, without having to cycle through other states first.
- fix but in ParsedInput control where formatted text was not updating if underlying parsed value did not change.
- Refactor DialogItem and Property interfaces to make them easier to use.
- Added support for decimal point in Table numeric filter
- Enable pointer events in Toolbar items container."
- Fix issue where entries in ButtonGroup would not properly disable/enable.

## 2.9.9

Sun, 13 Dec 2020 19:00:03 GMT

_Version update only_

## 2.9.8

Fri, 11 Dec 2020 02:57:36 GMT

_Version update only_

## 2.9.7

Wed, 09 Dec 2020 20:58:23 GMT

_Version update only_

## 2.9.6

Mon, 07 Dec 2020 18:40:48 GMT

_Version update only_

## 2.9.5

Sat, 05 Dec 2020 01:55:56 GMT

_Version update only_

## 2.9.4

Wed, 02 Dec 2020 20:55:40 GMT

_Version update only_

## 2.9.3

Mon, 23 Nov 2020 20:57:56 GMT

_Version update only_

## 2.9.2

Mon, 23 Nov 2020 15:33:50 GMT

_Version update only_

## 2.9.1

Thu, 19 Nov 2020 17:03:42 GMT

### Updates

- Fix calendar logic to avoid duplicate day numbers when day light saving ends, producing a 25hr day.
- Revert width change to EnumEditor component instead set width to auto only for docked tool settings.

## 2.9.0

Wed, 18 Nov 2020 16:01:50 GMT

### Updates

- Added ParsedInput and QuantityInput controls used to parse and format numeric values.
- remove bogus "code" entries.
- Fix styling issue.
- Added FrameworkUiAdmin.showReactCard
- Change Editor components to process native keyboard events instead of synthetic ones.
- Added MessagePopup - Displays Toast & Sticky messages without a StatusBar
- Update EditorContainer tests in attempt to fix sporadic test failures.

## 2.8.1

Tue, 03 Nov 2020 00:33:56 GMT

_Version update only_

## 2.8.0

Fri, 23 Oct 2020 17:04:02 GMT

### Updates

- Add Date/Time TypeEditor
- Fixed initial processing of scrollToRow in Table component
- Preventing setState call warning in TimelineComponent unit test
- Update all editors to be controlled components.
- PropertyGrid: Fix component not updating on data provider change
- Added jsdoc ESLint rule for UI packages

## 2.7.6

Wed, 11 Nov 2020 16:28:23 GMT

_Version update only_

## 2.7.5

Fri, 23 Oct 2020 16:23:51 GMT

_Version update only_

## 2.7.4

Mon, 19 Oct 2020 17:57:02 GMT

_Version update only_

## 2.7.3

Wed, 14 Oct 2020 17:00:59 GMT

_Version update only_

## 2.7.2

Tue, 13 Oct 2020 18:20:39 GMT

_Version update only_

## 2.7.1

Thu, 08 Oct 2020 13:04:35 GMT

_Version update only_

## 2.7.0

Fri, 02 Oct 2020 18:03:32 GMT

### Updates

- Update boolean type editors to allow component to be disabled.
- Add support for a DatePicker control.
- Update editor to use fixed focus trap.
- Added Table cell editor activation via keyboard when using row selection. Added Tree cell editor activation via keyboard.
- Fixed react-axe initialization. Improved ui-components test coverage.
- Table cell editing via keyboard
- Add multiline text property support to property grid.
- TreeRenderer: Add ability to scroll to a specific node

## 2.6.5

Sat, 26 Sep 2020 16:06:34 GMT

_Version update only_

## 2.6.4

Tue, 22 Sep 2020 17:40:07 GMT

_Version update only_

## 2.6.3

Mon, 21 Sep 2020 14:47:10 GMT

_Version update only_

## 2.6.2

Mon, 21 Sep 2020 13:07:44 GMT

_Version update only_

## 2.6.1

Fri, 18 Sep 2020 13:15:09 GMT

_Version update only_

## 2.6.0

Thu, 17 Sep 2020 13:16:12 GMT

### Updates

- Moved ESLint configuration to a plugin
- Addressed ESLint warnings in UI packages. Fixed react-set-state-usage rule. Allowing PascalCase for functions in UI packages for React function component names.
- Implemented filtering property data provider and display value, label, composite filters.
- Added new alpha VirtualizedPropertyGrid component which virtualizes rendering of properties for better performance and gives more customizability and control.
- SplitButton popupPosition & buttonType props support
- Add event processing for apps to send messages to the UI components.
- Add ThemedEnumEditor for DialogItems and ToolSettings, using the ThemedSelect component.

## 2.5.5

Wed, 02 Sep 2020 17:42:23 GMT

### Updates

- Update rxjs dependency version to `^6.6.2`

## 2.5.4

Fri, 28 Aug 2020 15:34:15 GMT

_Version update only_

## 2.5.3

Wed, 26 Aug 2020 11:46:00 GMT

_Version update only_

## 2.5.2

Tue, 25 Aug 2020 22:09:08 GMT

_Version update only_

## 2.5.1

Mon, 24 Aug 2020 18:13:04 GMT

_Version update only_

## 2.5.0

Thu, 20 Aug 2020 20:57:10 GMT

### Updates

- Fixed updating focus when Tabs activeIndex updated. More a11y issues.
- Fix styling of toolbar overflow popup.
- Update EnumerationChoicesInfo to use Promise so enum choices can be defined asynchronously.
- Add ColorPickerPopup and ColorPickerPanel and test for them.
- Added eslint-plugin-jsx-a11y devDependency and made first pass at adding a11y roles
- Added react-axe and resolved some a11y issues
- Moved SpecialKey & FunctionKey enums to ui-abstract & started using them throughout UI packages
- lock down @types/react version at 16.9.43 to prevent build error from csstype dependency
- Added Table component keyboard row selection. Miscellaneous a11y fixes.
- Switch to ESLint
- Tree keyboard node selection & expansion

## 2.4.2

Fri, 14 Aug 2020 16:34:09 GMT

_Version update only_

## 2.4.1

Fri, 07 Aug 2020 19:57:43 GMT

_Version update only_

## 2.4.0

Tue, 28 Jul 2020 16:26:24 GMT

### Updates

- Map Layer UX
- Add color picker dialog.
- Changed toolbar opacity processing to affect all components in widget.
- Add ImageCheckBoxEditor.
- Set border prop on ImageCheckBox when use in the editor
- Use 'Double' type converter for point components. Also add possibility to supply custom components' converter for `Point2dTypeConverter` and `Point3dTypeConverter`.
- Use Tooltip and Popup for timeline and toolbars.

## 2.3.3

Thu, 23 Jul 2020 12:57:15 GMT

_Version update only_

## 2.3.2

Tue, 14 Jul 2020 23:50:36 GMT

_Version update only_

## 2.3.1

Mon, 13 Jul 2020 18:50:14 GMT

_Version update only_

## 2.3.0

Fri, 10 Jul 2020 17:23:14 GMT

### Updates

- geometry clip containment
- Fix ToolbarWithOverflow to honor ToolbarOpacitySetting.Defaults
- Accessibility: Improved focus borders & indicators
- Use DelayedSpined in ControlledTree.
- Add support for nested property categories
- Show tooltips for property values when rendering PropertyRecords
- Changing SelectableContent component to use ThemedSelect in place of a pure HTML select element

## 2.2.1

Tue, 07 Jul 2020 14:44:52 GMT

_Version update only_

## 2.2.0

Fri, 19 Jun 2020 14:10:03 GMT

### Updates

- Qualified the CSS class names for the face names in Cube Navigation Aid
- Hiding viewport logo and acsTriad in DrawingNavigationAid viewport
- Added property editors for multi-line text, slider and numeric input/spinner.
- Added support for popup with multiple editors
- Specify the props that can be passed to ThemedSelect instead of just allowing all of the react-select props.
- Added ViewStateProp & support for obtaining ViewState from function in ViewportComponent and IModelViewportControl

## 2.1.0

Thu, 28 May 2020 22:48:59 GMT

### Updates

- Fix toolbar overflow panel display.
- Update to only show group separators if toolbar is not transparent.
- Fix toolbar error when scaling up UI.
- Property grid horizontal layout updated according to UX requirements.
- Fixed Table filter renderers after react-select version upgrade
- Support for striped rows in Table
- Added ability for apps to display Favorite properties in Element Tooltip & Card at Cursor
- Darken node descriptions in controlled tree
- Center align ControlledTree error message
- ControlledTree: Grow virtualized nodes' container width to fit the widest node and do not shrink it to avoid horizontal scrollbar appearing/disappearing
- Update version of react-select for ThemedSelect in ui-core.
- ControlledTree: Fix horizontal scrollbar appearing when tree component size changes even though nodes don't exceed width of the tree
- Only show badges on toolbar buttons if toolbar background is not transparent.

## 2.0.0

Wed, 06 May 2020 13:17:49 GMT

### Updates

- Prefer panelNode over buttonNode when using customToolbarItem.
- Add support for groupPriority for ToolbarItems. If specified then a group separator is shown when the priority changes.
- Add tilde to sass imports
- Qualified .label & .message CSS classes. Removed .cell CSS class usage. Fixed cell editor sizes.
- Fixed Navigation cube jagged edges on iOS
- Added new type of ImageSourceType "webfont-icon" which allows to load custom font-family icons by providing {className}:{iconName} format image value. It defaults to core-icon if value does not match this format.
- Fix parsing of 0 (zero) value in CustomNumberEditor
- Fix bug where toolbar buttons did not show expand arrow on custom button when not in 'DragInteraction' mode. Fix display of key-in browser 1.0 UI.
- Fix ordering of button items in overflow in Navigation Widget.
- Ensure ui-abstract is listed as peer dependency and not just a dev dependency.
- Fix documentation tag
- Fix issue where resizing toolbar too small would make it disappear and it would not return even when window was resized.
- Fix bug 292829 where toolbar border displayed when all items are hidden.
- Fixed ReactResizeDetector usage after upgrade. Converted Toggle component to function. Hover/pressed styling in 2.0 Toolbar.
- Update GroupButton definition to use ReadonlyArray for child items.
- Ui 2.0 - Blur the toolbar item background
- Moved the CubeNavigationAid & DrawingNavigationAid to ui-components package
- Increased size of Navigation cube arrow touch targets for mobile
- Clean up deprecated APIs
- Clean up some ControlledTree-related APIs
- Clone TreeNodeItem when creating TreeModelNode to avoid immer freezing it
- Made React functional component specifications consistent across UI packages
- For consistency add reactNode getters/setters and deprecate use of reactElement.
- Upgrade to Rush 5.23.2
- Copied filter renderers from react-data-grid-addons to ui-components to prevent security error
- Fixed Table column filtering when backspacing to empty
- Ui 2.0 - Toolbar display changes
- Updated Toolbar colors/opacity for Ui 2.0
- Add ToolbarWithOverflow.
- Promoted some @beta to @public in Ui packages & ToolAssistance for 2.0 release.
- Fixes to Toggle onBlur handling & ControlledTree error message position
- Change `TreeNodeItem` and `PropertyData` labels to be PropertyRecords
- In source documentation. Some learning docs & API changes.
- PropertyGrid, Table, Tree & Viewport Learning docs for ui-components
- Fixed ControlledTree TreeModel clearing. Fixed TreeRenderer to rerender list when size callback changes.
- Update CustomNumberEditor to handle onBlur. This will update the value when the user clicks in another field in the dialog and the field loses focus.
- Move react to peerDependencies.
- Learning documentation for ui-core
- TOC for UI 2.0 Docs, @alpha to @beta, Components Examples
- Started ui-components Learning doc section
- Fixed children node loading from TreeDataProviderRaw and TreeDataProviderPromise
- Add a new `SelectableContent` component
- Changed IPropertyValueRenderer.render() to be synchronous
- UI: Toggle Component - only use animation on value change
- Fix iOS Safari high CPU of enum button group.
- Fix nodes loading to correctly handle and load ImmediatelyLoadedTreeNodeItem
- Fix SparseArray, SparseTree and MutableTreeModel to be properly modified by immer
- Update auto-generated dialog items to work with the Tool Settings Bar.
- Moved Property classes and interfaces to ui-abstract package.
- Moved Checkbox, Radio, Select, Toggle, Slider & AutoSuggest into their own category
- Update to ensure tooltip for timeline uses z-index for tooltips.
- Update to ensure tooltip for timeline uses z-index for tooltips.
- Defaulting to IModelApp.i18n in UI packages and cascading initialize() calls
- Minor styling changes
- Remove support for the iModel.js module system by no longer delivering modules.
- iModel write API development

## 1.14.1

Wed, 22 Apr 2020 19:04:00 GMT

_Version update only_

## 1.14.0

Tue, 31 Mar 2020 15:44:19 GMT

_Version update only_

## 1.13.0

Wed, 04 Mar 2020 16:16:31 GMT

### Updates

- Fix iOS Safari high CPU of enum button group.

## 1.12.0

Wed, 12 Feb 2020 17:45:50 GMT

### Updates

- iModel write API development
- Upgraded icons-generic-webfont to ^1.0.0
- Added type converter for composite primitive value
- Changed onNodeLoaded event to nodeLoadHandler in NodeLoader. Fixed node loading scheduling to avoid making multiple requests at the same time
- Pass tree model changes to onModelChange event
- Separate label and labelDefinition in PropertyData and TreeNodeItem
- Property grid border fix.

## 1.11.0

Wed, 22 Jan 2020 19:24:12 GMT

### Updates

- Remove the @types/linkify-it as a real dependency and make it a devDependency.
- Allow TreeNodeItem and PropertyData label to be represented as PropertyRecord
- Upgrade to TypeScript 3.7.2.

## 1.10.0

Tue, 07 Jan 2020 19:44:01 GMT

### Updates

- Fix styling issue in property grid when actionButtonRenders are not defined.
- Fixed lgtm issues in UI folders
- Update code to up code coverage to avoid CI failures on Linux machines.
- Added Action Buttons for properties
- Attempt to fix sporadic failing solartimeline test.
- Fix bug in timeline component when view only has an analysis animation without dates.
- Update timeline test to use fake timers to see if that resolved sporadic failures on CI builds.

## 1.9.0

Tue, 10 Dec 2019 18:08:56 GMT

### Updates

- Update sunrise/sunset calculation
- Update solar timeline test
- Made detecting links have stricter rules. Links have to start with a schema or `www.`.
- Fix solar timeline timezone bug.
- Added a tooltip component.
- No longer accessing this.state or this.props in setState updater - flagged by lgtm report
- Changed SignIn & SignOut buttons to large. Fixed Dialog component resizing. Reduced default minimum size of Dialog component.
- Update sinon version.
- Added documentation to ControlledTree API and changes release tags to beta
- Added node editing support in ControlledTree
- Changes ControlledTree events to pass TreeNodeItem instead of nodeId
- Added 'removeChild', 'insertChild', 'getChildOffset' methods to MutableTreeModel
- Moved ControlledTree node highlighting to TreeRenderer
- Use exhaustive-deps linter rule.
- Truncate property grid group title.
- Rename array length property label to be less ambiguous
- Solar timeline date/time offset fix.
- Start arrays at `1` when rendering array property items
- Removed unused React state variables. Removed unsupported setState calls from render() methods.
- Code cleanup based on code analysis report from lgtm.

## 1.8.0

Fri, 22 Nov 2019 14:03:34 GMT

### Updates

- Update Icon package version
- Responsive logic in Property Grid to switch to Vertical orientation when too narrow
- Added StatusBarComposer, StatusBarItem, StatusBarManager and StatusBarItemsManager
- Added Table cell context menu support
- Added Tree Node.tsx export to ui-components package
- Added tslint-react-hooks to UI packages
- Change componentDidUpdate to call \_setDuration instead of setState directly. This will make sure the onChange handler is called.
- Refactor ControlledTree custom hooks to use useEffectSkipFirst
- Separated TreeModelSource and TreeNodeLoader. Added highlighting support to ControlledTree.
- Added node icon rendering to ControlledTree
- Fix node content sometimes not being re-rendered when editor state changed very quickly
- Add componentDidUpdate() to the TimelineComponent, updating currentDuration after the app changes the state of initialDuration.

## 1.7.0

Fri, 01 Nov 2019 13:28:37 GMT

### Updates

- Add ability to have Table provide top visible row feedback
- Made PropertyGrid categories keep the collapsed state when data is refreshed.
- Added New badge for UI items
- Added Table column filtering support
- Added initial ui-abstract package setup
- Added UiAdmin with support for displaying Menus and Toolbars at a location
- Added DataProvider getter on TreeModelSource
- Fix tree attempting to highlight empty text in nodes
- Fix tree no re-rendering delay loaded nodes after reload
- Added initial implementation of ControlledTree

## 1.6.0

Wed, 09 Oct 2019 20:28:42 GMT

### Updates

- Clear internal row/column selection data when number or rows change in Table. Add definitions for platform MeasureTools.
- Allow width defined in ColumnDescription to be passed into <Table> component to set initial column width.
- Added AutoSuggest component and improved KeyinBrowser component
- Focus EnumButtonGroupEditor without scrolling.

## 1.5.0

Mon, 30 Sep 2019 22:28:48 GMT

### Updates

- AccuDraw Popup Editors. Improved editor sizes. Editor Params improvements.
- Initial Accudraw Ui components - Buttons, ContextMenus, Calculator, Editors. IconInput in ui-core.
- Added ability to automatically expand non primitive properties
- Ability to Scroll to Table row via scrollToRow Prop
- Add alwaysMinimized prop to TimelineComponent.
- Tool Assistance changes per UX Design
- Update the tree (empty data) be more descriptive and generic.
- In the Model/Category/Spatial trees, center the error message
- Upgrade to TypeScript 3.6.2
- Fixed signature of BreadcrumbTreeUtils.aliasNodeListToTableDataProvider for consistent extract-api treatment
- Tree: Clear page caches when reloading tree data
- this.props.viewportRef(this.\_vp); callback moved to the end of async componentDidMount(); Additional check if (!this.\_mounted) after await

## 1.4.0

Tue, 10 Sep 2019 12:09:49 GMT

### Updates

- Using Checkbox component in BooleanEditor. Cleaned up cell editor positioning.
- Updated inputs and button padding for iModel.js. Fixed Popup colors & z-index.
- Color picker had incorrect styling after focus trap added.
- Added support for content view minSize properties
- Added support for ProjectWise Explorer links.
- Added a new component for the Poc, an icon picker.
- Addressed some warnings introduced with React 16.9
- Timeline: added display for times
- Fixed bug in style of the weight picker popup

## 1.3.0

Tue, 13 Aug 2019 20:25:53 GMT

### Updates

- Update to use latest icon library
- Added CursorPrompt, improved Pointer messages
- Explicitly set margin for button groups to avoid bleed over from BWC styles.
- After canceling (clearing) search, set focus back to input field.
- Skip failing test until UI team can investigate
- Updated generic icon package
- Fix DateTime type converters
- Improve point type converters to handle points defined as `number[]` or `{x,y}` or `{x,y,z}`
- Change floating point converter to round-off numbers up to 2 decimal places
- Fixed property grid tests.
- Fixed OnPropertyLinkClick event handler assignment for nested properties in PropertyGrid. Fixed OnPropertyLinkClick signature for PropertyGrid.
- Added onPropertyLinkClick handler property for PropertyGrid with default behavior to open url links in the new tab or open email client if it is an email link. Wrote tests for it.
- Update FilteringInput to use updated search box design from UX.
- Added SelectionMode.None to the default SelectionHandler.
- Tree: Fix children not loaded when parent is reloaded due to other page loads after children request
- Update to latest icon package version.

## 1.2.0

Wed, 24 Jul 2019 11:47:26 GMT

### Updates

- Tree: Add `bulkCheckboxActionsDisabled` prop.
- Tree: Update visual styles.
- Table: Update visual styles.
- PropertyView: Update visual styles.

## 1.1.0

Mon, 01 Jul 2019 19:04:29 GMT

### Updates

- Tree: Fix an issue with multiSelection where shift-selecting nodes would not select anything.
- Tree: Add ability to check or uncheck multiple selected nodes' checkboxes all at once.
- BeInspireTree: Fix an issue with calling `updateNodesCheckboxes()` while handling `ModelLoaded` event
- Tree: Correct TreeProps.checkboxInfo documentation.
- Allow Line Weight to be selected via Up/Down arrow keys once popup is open.
- Updated react-data-grid import statement
- Added prefixes to Dialog & ContextMenu positioning CSS classes
- Removed missing group descriptions
- Call filterClear when the user enters an empty search string and clicks Search.
- Added autoFocus to the FilteringInput component.
- Remove inner focus outline that is only displayed in Firefox.
- Update WeightPicker.
- Removed 4 dangerouslySetInnerHtml usages to help with Security audit; 3 remain on purpose.
- Save & Restore View Layouts
- Update to TypeScript 3.5
- Temporarily lowered ui-components coverage thresholds
- BeInspireTree: Fix an issue with delay-loaded child nodes sometimes being assigned to expired node objects.
- Tree: Fix child node checkbox events affecting parent node's checkbox state
- ui-component unit tests. NumericInput strict=true default.

## 1.0.0

Mon, 03 Jun 2019 18:09:39 GMT

### Updates

- Update to use parse error message from callback.
- Added UI Logger & UiError usage & improved i18n calls
- Added Overflow button support
- Define `extendedData` in `TreeNodeItem` and `RowItem` as a key-value pairs structure. We're about to expose this structure to external consumers and don't want them to set `extendedData` to some primitive value. Instead, consumers should put key-value pairs with keys unique enough to not overwrite others' values.
- Update CustomNumberEditor to show InputFieldMessage when unable to parse quantity.
- Release tag cleanup and ui-framework unit tests
- Updated UI package release tags for 1.0 release.
- Fixed release tag warnings in UI packages
- Add alpha level support for solar timeline
- Added property selection to the property grid component on right click
- Update Tree API. Allow onCheckboxClick callback to receive multiple checkbox state changes.
- Tree: Fix node placeholder offset
- Added ViewSelectorChangedEvent

## 0.191.0

Mon, 13 May 2019 15:52:05 GMT

### Updates

- Update to latest version of icon library.
- @beta tags for Toolbar. More React.PureComponent usage. Added constructors to prevent deprecated warnings. Coverage minimum thresholds.
- Add support for a view overlay component. This will provide ability to show animation timeline control in viewport.
- Update Timeline interfaces.
- Update CSS for ColorSwatch.
- Add Unit test for ColorEditor and ColorPickerButton
- Added CommonProps to many component Props in ui-core & ui-components
- Added 'Register' link back to SignIn component. Added ExternalIModel test widget. Made AppBackstage in ui-test-app Redux connected again.
- Added missing package prefix to some CSS class names in ui-core, ui-components & ui-framework
- Reverted CubeNavigationAid changes
- Added viewport synchronization for 2d drawing navigation aid
- Added local snapshot support to ui-test-app. Added specialized div components to ui-core.
- Fix broken links
- Fix failing CustomNumberPropertyEditor test
- Add WeightEditor line weight type editor.
- Add components to show and select a line weight.
- Put sourcemap in npm package.
- Locked react-data-grid at 6.0.1 and @types/react-data-grid at 4.0.2
- Improve default rotate point for navigation cube
- Fix to SignIn constructor in ui-components
- Added SignIn presentational component to ui-components. Removed --ignoreMissingTags extract-api option.
- Require React & React-dom 16.8
- remove IModelApp subclasses
- Added ViewportDialog in ui-test-app, ui-core/ContributeGuidelines.md. TSLint rules in ui-core for no-default-export & completed-docs. @beta release tags.
- Update icons-generic-webfont version to latest available.
- Clean up WeightPickerButton test code.
- Introduce timeline animation interfaces.
- Move timeline components from ui-test-app to ui-components package
- Added release tags to ui-framework, ui-components and ui-core.
- Property Grid: Show loading spinner only after half a second delay
- Fix indefinite Tree component rendering when used with `checkboxInfo` prop
- Tree: Fix nodes not being re-rendered in some async workflows
- Fix tree being marked as dirty when selected nodes predicate changes, but returns the same results (actual selection doesn't change)
- Add Tree.getLoadedNode(nodeId) function
- Add ability to set tooltips on tree node checkboxes
- Unit tests and fixed ColorEditor alignment
- Upgrade TypeDoc dependency to 0.14.2
- Added test coverage for ViewportComponent

## 0.190.0

Thu, 14 Mar 2019 14:26:49 GMT

### Updates

- Add ColorEditor to list of available Type Editors
- Cleaned up index.scss for variables & mixins in ui-core and added classes.scss that generates CSS
- Add SaturationPicker for use with ColorType editor.
- Add Transparency slider component.

## 0.189.0

Wed, 06 Mar 2019 15:41:22 GMT

### Updates

- UI documentation fixes
- Added ToggleEditor. Support for defaultTool in Frontstage. Fixed BooleanEditor sizing.
- Added 100% test coverage for Breadcrumb/BreadcrumbDetails
- Use new buildIModelJsBuild script
- Remove unneeded typedoc plugin dependency
- Added EnumEditor & BooleanEditor type editors
- Minor UI Color Theme changes
- Support for including CSS files in published UI packages
- Updated type editors to support updated PropertyRecord. Moved setFocus to props in type editors..
- Removed dependency on BWC. Parts of BWC copied into ui-core in preparation for theming support.
- Added ToggleEditor. Support for defaultTool in Frontstage.
- Save BUILD_SEMVER to globally accessible map
- Change setImmediate to setTimeout. Fixed cube rotation issue.
- Added ItemStyle and ItemStyle provider.
- CellItem and TreeNodeItem now have the same style property.
- Added TableCell and TableCellContent React components.
- Changed table css class names.
- Changed CellItem interface property - 'alignment' type to be a restricted string instead of an enum.
- Cleanup of DefaultToolSetting provider and EnumButtonGroup editor
- Add EnumButtonGroupEditor.
- Primitive property value renderers now render links specified in property records.
- Renamed class names that start with "ui-components-" to start with just "components-"
- Added IImageLoader, ImageRenderer and TreeImageLoader.
- Added showIcons and imageLoader props to Tree component.
- Added a property to provide rowHeight value or function that calculates it.
- Tree now accepts one checkbox prop object instead of multiple props.
- Tree now accepts one cell editing prop object instead of multiple props.
- Split tree node label and description rendering into a separate component - TreeNodeContent.
- Added an ability to show node descriptions in the Tree component via showDescriptions property.
- Fix tree failing to load nodes in special cases
- Added support for UI color themes
- Add a way to specify checkbox states asynchronously in Tree component
- Breadcrumb fixes
- Add a way to specify custom Tree checkbox renderer
- Update to use newer generic-icons-webfont package.
- upgrade to TypeScript 3.2.2
- WIP: ViewportComponent unit tests. Removed imodeljs-clients-backend dependency from ui-framework

## 0.188.0

Wed, 16 Jan 2019 16:36:09 GMT

_Version update only_

## 0.187.0

Tue, 15 Jan 2019 15:18:59 GMT

### Updates

- Add a separate PropertyGrid prop to tell if properties should be hoverable
- Add ability to assign context menu for properties in PropertyGrid

## 0.186.0

Mon, 14 Jan 2019 23:09:10 GMT

### Updates

- Property pane does not show struct or array info anymore

## 0.185.0

Fri, 11 Jan 2019 18:29:00 GMT

_Version update only_

## 0.184.0

Thu, 10 Jan 2019 22:46:17 GMT

### Updates

- Renamed PropertyDataProvider to IPropertyDataProvider.
- Add ui-component root to avoid relative file conflicts in bundles.
- Handle custom row and cell item styling in Table component
- Fix double and navigation property value renderers to not append ".0" to values in certain cases

## 0.183.0

Mon, 07 Jan 2019 21:49:21 GMT

_Version update only_

## 0.182.0

Mon, 07 Jan 2019 13:31:34 GMT

_Version update only_

## 0.181.0

Fri, 04 Jan 2019 13:02:40 GMT

_Version update only_

## 0.180.0

Wed, 02 Jan 2019 15:18:23 GMT

### Updates

- Changed property pane css.
- Changed how vertical PropertyPane looks.
- Fix BeInspireTree's render suspension not being consistent in some cases
- Added optional viewState prop to ViewportComponent

## 0.179.0

Wed, 19 Dec 2018 18:26:14 GMT

### Updates

- Added Tests, updated Table, fixed breadcrumb mutability issues
- Added DragDrop tests, added component withDragDrop HOC tests
- Synchronizing navigation aids with view definition changes
- Simplified property pane tooltips and improved Property Pane performance.
- Simplified struct and array tooltips in Table component.
- Fix BeInspireTree's event listening functions to handle array inputs
- Fix BeInspireTree's muting events with allowed number of triggers
- Cache BeInspireTree.visible() result for better performance
- Optimize BeInspireTree.selectBetween
- Avoid loading PropertyGrid data for intermediate data changes
- Avoid loading TableView data for intermediate column / row changes
- Allow property converters and renderers to return result either sync or async
- Fix tree node loosing its children when collapsed while children are being loaded
- Fix tree not showing data after changing data provider while another data provider is being loaded
- Show loading spinner in the Tree while root nodes are being loaded

## 0.178.0

Thu, 13 Dec 2018 22:06:10 GMT

_Version update only_

## 0.177.0

Wed, 12 Dec 2018 17:21:32 GMT

### Updates

- Added a merged property value renderer.
- Set BeInspireTreeNode's payload as possibly `undefined`
- Fix Tree component to handle data provider change before the first update
- Handle shift-selecting not loaded tree nodes
- Fix tree checkbox-related props
- Improved speed & smoothness of CubeNavigationAid. Made class names unique to fix documentation. UI Tree doc fixes.

## 0.176.0

Mon, 10 Dec 2018 21:19:45 GMT

_Version update only_

## 0.175.0

Mon, 10 Dec 2018 17:08:55 GMT

_Version update only_

## 0.174.0

Mon, 10 Dec 2018 13:24:09 GMT

### Updates

- Added Tests, updated Table, fixed breadcrumb mutability issues
- Tree now accepts propertyValueRendererManager as a property.
- PrimitivePropertyValueRenderer now accepts context and can render tree properties.
- TreeNodeItem now accepts an additional optional property - typename.
- TreeNode can now render asynchronously.

## 0.173.0

Thu, 06 Dec 2018 22:03:29 GMT

### Updates

- Added fillZone property to the Widget
- Fixed initial & return layout of Frontstage. Styling of scrollbar in Chrome.
- Custom imodelJs noDirectImport lint rule implemented, noDuplicateImport lint rule turned on.

## 0.172.0

Tue, 04 Dec 2018 17:24:39 GMT

### Updates

- Changed index file name to match package name, eliminate subdirectory index files, decrease usage of default exports, change imports to use other packages' index file.

## 0.171.0

Mon, 03 Dec 2018 18:52:58 GMT

### Updates

- Added tests to Breadcrumb, updated Table and fixed Table Resize issues.
- Added property value renderers for double and navigation primitive types.
- Added specialized property value renderers for nonprimitive types when their container is a table.
- Refactored PropertyRenderer into smaller pieces and added isSelectable and indentation prop
- Changed the way PropertyCategoryBlock looks.
- Enabled table to contain popups and dialog and slightly cleaned up it's CSS.
- Removed ConfigurableUiManager.addFrontstageDef and other unused/old methods and components
- Implement pagination in Tree component

## 0.170.0

Mon, 26 Nov 2018 19:38:42 GMT

### Updates

- Added property value renderers for double and navigation primitive types.
- Added specialized property value renderers for nonprimitive types when their container is a table.
- Refactored PropertyRenderer into smaller pieces and added isSelectable and indentation prop
- Changed the way PropertyCategoryBlock looks.
- Enabled table to contain popups and dialog and slightly cleaned up it's CSS.

## 0.169.0

Tue, 20 Nov 2018 16:17:15 GMT

### Updates

- Virtualized nodes' rendering in the Tree component

## 0.168.0

Sat, 17 Nov 2018 14:20:11 GMT

_Version update only_

## 0.167.0

Fri, 16 Nov 2018 21:45:44 GMT

### Updates

- Fixed some content control sizing issues
- Added Tree cell editing
- Added ShowHide in Common package, implemented ShowHide for Table columns.
- Tree cell editing unit tests
- Fix tree nodes loosing their state when ITreeDataProvider.onTreeNodeChanged is called
- ui-framework unit tests & docs

## 0.166.0

Mon, 12 Nov 2018 16:42:10 GMT

_Version update only_

## 0.165.0

Mon, 12 Nov 2018 15:47:00 GMT

_Version update only_

## 0.164.0

Thu, 08 Nov 2018 17:59:21 GMT

### Updates

- Deprecated dev-cors-proxy-server and use of it.
- Fix: Do not start search if input field is empty
- Use strongly typed enums for identifying keyboard keys
- PropertyGrid property editing and unit tests
- Updated to TypeScript 3.1
- Refactored Tree component to improve its performance
- Refactored Breadcrumb and added tests
- Zone & Widget initial state, more ui-core unit tests, cleaned up ui-framework index.ts files.

## 0.163.0

Wed, 31 Oct 2018 20:55:37 GMT

### Updates

- Fixed breadcrumb component test
- Added JSX specification for Frontstage, Zone & Widget
- Fixed ui-framework unit test

## 0.162.0

Wed, 24 Oct 2018 19:20:07 GMT

### Updates

- Tooltips, ToolAdmin.activeToolChanged support, SheetNavigationAid/SheetsModalFrontstage improvements.
- Ui Documentation
- Vertical PropertyGrid layout improvements. PropertyGrid background color. Setting the widget state.
- Changed Horizontal PropertyGrid css to use grid instead of table display and modified subComponents accordingly.
- Fixed property selection.
- Added an ability to resize label/value in PropertyRenderer.
- SelectablePropertyBlock now controls label/value ratio for every property in a category.
- Fixed PropertyList to use the right key.
- Updated types from any to more specific one in TypeConverters.
- Primitive property record value now can not be undefined.
- TextEditor now accepts property defined as string instead of PropertyRecord.
- Added a manager that allows registering custom property value renderers.
- Added default renderers for Primitive, Array and Struct properties.
- Custom property value renderer manager can now be provided to Table and Pane. Without it they use default property renderers.

## 0.161.0

Fri, 19 Oct 2018 13:04:14 GMT

_Version update only_

## 0.160.0

Wed, 17 Oct 2018 18:18:38 GMT

_Version update only_

## 0.159.0

Tue, 16 Oct 2018 14:09:09 GMT

_Version update only_

## 0.158.0

Mon, 15 Oct 2018 19:36:09 GMT

_Version update only_

## 0.157.0

Sun, 14 Oct 2018 17:20:06 GMT

### Updates

- Fixing scripts for linux

## 0.156.0

Fri, 12 Oct 2018 23:00:10 GMT

### Updates

- Initial release
