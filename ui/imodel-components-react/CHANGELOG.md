# Change Log - @itwin/imodel-components-react

This log was last generated on Wed, 09 Oct 2024 10:50:47 GMT and should not be manually modified.

## 4.17.1
Wed, 09 Oct 2024 10:50:47 GMT

_Version update only_

## 4.17.0
Thu, 19 Sep 2024 12:50:53 GMT

### Updates

- Deprecated component props in favor of type helper

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

- Fix mixed-decls Sass warnings.
- Added `trackContainerProps` property to `TimelineComponent`.

## 4.15.5
Wed, 24 Jul 2024 16:09:26 GMT

_Version update only_

## 4.15.4
Mon, 22 Jul 2024 21:27:52 GMT

_Version update only_

## 4.15.3
Mon, 15 Jul 2024 12:12:01 GMT

_Version update only_

## 4.15.2
Wed, 10 Jul 2024 11:54:56 GMT

_Version update only_

## 4.15.1
Tue, 09 Jul 2024 09:23:12 GMT

_Version update only_

## 4.15.0
Fri, 28 Jun 2024 09:09:37 GMT

_Version update only_

## 4.14.2
Mon, 22 Jul 2024 21:23:09 GMT

_Version update only_

## 4.14.1
Tue, 11 Jun 2024 15:58:29 GMT

_Version update only_

## 4.14.0
Thu, 06 Jun 2024 08:24:21 GMT

_Version update only_

## 4.13.4
Tue, 21 May 2024 08:21:34 GMT

_Version update only_

## 4.13.3
Fri, 17 May 2024 09:43:31 GMT

### Updates

- timeline.settings added to UiIModelComponents.json
- upgrade to TypeScript@5.3.3 and @itwin/build-tools@4.6.x

## 4.13.2
Wed, 08 May 2024 08:24:46 GMT

_Version update only_

## 4.13.1
Tue, 07 May 2024 15:01:46 GMT

_Version update only_

## 4.13.0
Tue, 07 May 2024 08:44:06 GMT

### Updates

- Deprecated all UI event classes.

## 4.12.0
Fri, 05 Apr 2024 09:55:35 GMT

_Version update only_

## 4.11.0
Thu, 21 Mar 2024 16:38:04 GMT

### Updates

- TimelinePausePlayArgs no longer extends GenericUiEventArgs
- Deprecate color picker components.
- Update styling of SolarTimeline component.
- Fix disposal of `unload` event listener in `ViewportComponent` to address a memory leak.
- Removed memoization for translated strings in components.

## 4.10.0
Mon, 26 Feb 2024 15:50:45 GMT

### Updates

- Fix timeline to keep fractional duration unchanged when total duration is changed.
- Use iTwinUI 3.x.

## 4.9.0
Tue, 06 Feb 2024 08:56:40 GMT

### Updates

- ignore appui-abstract eslint deprecation m

## 4.8.3
Tue, 30 Jan 2024 09:04:27 GMT

_Version update only_

## 4.8.2
Wed, 24 Jan 2024 12:37:04 GMT

_Version update only_

## 4.8.1
Thu, 11 Jan 2024 13:05:42 GMT

_Version update only_

## 4.8.0
Thu, 21 Dec 2023 14:08:43 GMT

_Version update only_

## 4.7.2
Wed, 20 Dec 2023 23:11:37 GMT

### Updates

- Revert Viewport creation delay from 0x0.

## 4.7.1
Thu, 07 Dec 2023 19:40:17 GMT

### Updates

- `ViewportComponent` will now wait to have positive space before creating iTwin.js viewport.

## 4.7.0
Fri, 01 Dec 2023 20:01:16 GMT

### Updates

- No longer consume deprecated appui-abstract types: getObjectClassName, SpecialKey
- Fix `TimelineComponent` `initialDuration` and `totalDuration` update timing issue.
- Remove additional `changeView` call on `ViewportComponent` mount.

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

_Version update only_

## 4.5.1
Fri, 08 Sep 2023 16:10:53 GMT

_Version update only_

## 4.5.0
Wed, 06 Sep 2023 17:29:22 GMT

_Version update only_

## 4.4.0
Tue, 15 Aug 2023 18:02:09 GMT

_Version update only_

## 4.3.0
Mon, 17 Jul 2023 10:16:20 GMT

### Updates

- Update sinon to 15.2.0 and @types/sinon to 10.0.15

## 4.2.0
Tue, 27 Jun 2023 14:50:22 GMT

### Updates

- Remove non-public API calls.
- Update `@itwin/itwinui-react` version to 2.11.6.

## 4.1.0
Mon, 29 May 2023 14:05:04 GMT

### Updates

- Refactor the logic to get the arrow tool tip to use the cubeNavigationRoutes.
- Change arrow-click rotation logic to allow rotation to rotated faces.

## 4.0.1
Fri, 19 May 2023 12:24:31 GMT

_Version update only_

## 4.0.0
Mon, 01 May 2023 13:32:16 GMT

### Updates

- Promote APIs in use by apps.
- Styling change: use larger arrows for the Navigation Cube.
- Using iTwinUI-variables.
- Update iTwinUI-react to v2.x.
- Clean dependencies.
- Refactor to use iTwinUI instead of deprecated core-react.
- Bump minimum of core packages to 3.7.0.
- peerDependency allow react: ^18.0.0.
- Clean SCSS.
- Remove components and interfaces that were deprecated in 2.x and 3.0.
- Update package.json dependencies and repo documentation.
- Remove webfont icons from components.

## 3.7.2
Wed, 12 Apr 2023 13:12:42 GMT

_Version update only_

## 3.7.1
Mon, 03 Apr 2023 15:15:37 GMT

_Version update only_

## 3.7.0
Wed, 29 Mar 2023 15:02:27 GMT

### Updates

- Fixed expected test case result.
- Fix large timeline menu displaying outside visible area
- Update Navigation Aids in line with current design goals.
- Update @deprecated comments

## 3.6.3
Mon, 27 Mar 2023 16:26:47 GMT

_Version update only_

## 3.6.2
Fri, 17 Mar 2023 17:52:32 GMT

_Version update only_

## 3.6.1
Fri, 24 Feb 2023 22:00:48 GMT

_Version update only_

## 3.6.0
Wed, 08 Feb 2023 14:58:40 GMT

### Updates

- Use EmptyLocalization for localization in tests to increase test performance

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
Thu, 15 Dec 2022 16:38:29 GMT

_Version update only_

## 3.5.0
Wed, 07 Dec 2022 19:12:37 GMT

### Updates

- Unpin classnames package

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
Fri, 28 Oct 2022 13:34:58 GMT

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

- Updated Node types declaration to support latest v16
- Fix/Remove skipped tests

## 3.3.5
Tue, 27 Sep 2022 11:50:59 GMT

_Version update only_

## 3.3.4
Thu, 08 Sep 2022 19:00:05 GMT

_Version update only_

## 3.3.3
Tue, 06 Sep 2022 20:54:19 GMT

_Version update only_

## 3.3.2
Thu, 01 Sep 2022 14:37:22 GMT

_Version update only_

## 3.3.1
Fri, 26 Aug 2022 15:40:02 GMT

_Version update only_

## 3.3.0
Thu, 18 Aug 2022 19:08:02 GMT

### Updates

- upgrade mocha to version 10.0.0
- Add ability to specify locale and format of Data and Time shown by timeline component.
- Navicube is now locked when Markup is active
- Ensure Timeline's current duration value is with valid range.
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
Wed, 13 Jul 2022 15:45:53 GMT

_Version update only_

## 3.2.4
Tue, 21 Jun 2022 18:06:33 GMT

_Version update only_

## 3.2.3
Fri, 17 Jun 2022 15:18:39 GMT

_Version update only_

## 3.2.2
Fri, 10 Jun 2022 16:11:37 GMT

_Version update only_

## 3.2.1
Tue, 07 Jun 2022 15:02:56 GMT

### Updates

- Remove fix height from ColorPicker dialog.

## 3.2.0
Fri, 20 May 2022 13:10:54 GMT

### Updates

- Fix for losing viewport content after clicking PW link

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

- Required updates based on @itwin/core-quantity format type definition related changes.
- Add pointer cursor for ColorPicker close button.
- whitespace change
- Replace use of Context menu in Timeline with DropdownMenu.
- Update to itwinui-css version "0.44.0".
- Update to @itwin/itwinui-react: 1.32.0
- Update to latest itwinui-react.

## 3.0.3
Fri, 25 Mar 2022 15:10:02 GMT

_Version update only_

## 3.0.2
Thu, 10 Mar 2022 21:18:13 GMT

_Version update only_

## 3.0.1
Thu, 24 Feb 2022 15:26:55 GMT

### Updates

- Avoid processing stale viewstates that reference closed imodels.

## 3.0.0
Mon, 24 Jan 2022 14:00:52 GMT

### Updates

- The Cartographic creation API now takes an interface as an argument with named properties. This will avoid callers mixing up the order of longitude, latitude, and height.
- Update colorpicker to support RGB input
- Upgrade target to ES2019 and deliver both a CommonJs and ESModule version of package
- rename to @itwin/imodel-components-react
- Replace usage of I18N with generic Localization interface.
- Remove deprecate QuantityFormatter methods
- Update snapshots
- tool.run and tool.parseAndRun are now async methods
- Deprecate obsolete code.
- Create empty frontstage and UiItemsProviders to populate it and update how ContentGroups are defined.
-  update immer to fix security warning
- Deprecate and promote apis
- Deprecate obsolete APIs. Publish beta APIs from last release.
- Upgraded itwinui-react to 1.16.2. Fixed editor sizes.
- Remove files generated by bad merge
- Update disabled styling for QuantityNumberInput.
- Allow widgets supplied by a UiItemsProvider to specify a default state of floating.
- Replace ColorPickerPanel with ColorPicker from itwinui-react
- Clean up css for status bar entries to avoid unwanted text wrapping
- Rename ui directories to match new package names.
- Deprecated Task/Workflow. Promoted AccuDraw UI to @beta. Added AccuDraw and NavigationAids learning docs.
- Created imodel-components folder & package and moved color, lineweight, navigationaids, quantity, timeline & viewport. Deprecated MessageSeverity in ui-core & added it ui-abstract. Added MessagePresenter interface to ui-abstract.
- Remove react 16 peer dependency.
- Remove itwinUi css overrides.
- UiFramework and UiIModelComponent initialize method no longer take localization argument, uses IModelApp.localization internally.
- Add the ability for an app to mark a specific date on the rail of a TimelineComponent.
- Update to latest types/react package
- Update ViewportComponent to function component that properly processes async method to get viewState.
- Lock down and update version numbers so docs will build.

