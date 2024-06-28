# NextVersion <!-- omit from toc -->

## @itwin/appui-react

### Deprecations

- Deprecated all APIs associated with `ConfigurableUiControl` class. [#888](https://github.com/iTwin/appui/pull/888)
  - `AccuDrawWidgetControl` class. Use `AccuDrawWidget` component instead.
  - `CubeNavigationAidControl` class. Use `@itwin/imodel-components-react#CubeNavigationAid` component instead.
  - `DrawingNavigationAidControl` class. Use `@itwin/imodel-components-react#DrawingNavigationAid` component instead.
  - `SheetNavigationAidControl` class. Use `SheetNavigationAid` component instead.
  - `StandardRotationNavigationAidControl` class. Use `StandardRotationNavigationAid` component instead.
  - `StatusBarWidgetComposerControl` class. Use `StatusBarComposer` component instead.
  - `IModelViewportControl` class and `IModelViewportControlOptions` interface. Use `@itwin/imodel-components-react#ViewportComponent` component instead.
    - // TODO: options, view overlay
  - `ViewportContentControl` class.
    - // TODO: navigation aid, view select changes
  - `FloatingContentControl` class. Use `UiItemsProvider` to provide a floating `Widget` instead. Additionally, use `ContentOverlay` component to display the active content indicator.
  - `FloatingViewportContent` component, `useFloatingViewport` hook, `FloatingViewportContentControl` class and related type `FloatingViewportContentProps`. Wrap `@itwin/imodel-components-react#ViewportComponent` component with a `ContentOverlay` instead.
  - `FloatingViewportContentWrapper` component and related props type `FloatingViewportContentWrapperProps`. Use `ContentOverlay` component to display the active content indicator instead.
  - Base classes `ConfigurableBase`, `ConfigurableUiElement`, `NavigationAidControl`, `ConfigurableUiControl`, `ContentControl`, `StatusBarWidgetControl`, `WidgetControl`, properties `WidgetDef.classId`, `WidgetDef.getWidgetControl`, `WidgetDef.widgetControl`, `UiFramework.controls`, and related types `FrameworkControls`, `ConfigurableCreateInfo`, `ConfigurableUiControlConstructor`, `ConfigurableUiControlType`, `SupportsViewSelectorChange`. Use React components returned by the control instead when defining content in a content group and see inline documentation for suggested replacements.
  - `activeContent`, `oldContent` properties of `ActiveContentChangedEventArgs` interface. Use `id` property to identify the activated and deactivated contents instead.
  - `getContentControl`,`getContentControlById`, `getContentControls`, `getContentNodes`, `getControlFromElement` methods of `ContentGroup` class. Use `contentPropsList` property instead.
  - `fillLayoutContainer` method and `rootSplit` getter of `ContentLayoutDef` class that are used internally only.
  - `applicationData`, `classId` properties of `ContentProps` interface. Use `content` property to specify a React node instead.
  - `addFloatingContentControl`, `contentSupportsCamera`, `dropFloatingContentControl`, `getActive`, `getActiveContentControl`, `isContent3dView`,`isContentDrawingView`, `isContentOrthographicView`, `isContentSheetView`, `isContentSpatialView`, `refreshActive`, `setActive` methods of `FrameworkContent`. See inline documentation for suggested replacements.
  - `ToolInformation`, `ToolUiProvider` classes, `activeToolInformation` property of `FrameworkFrontstages` interface without a replacement. TODO
  - `onContentControlActivatedEvent` property of `FrameworkFrontstages` interface. Use `FrameworkContent.onActiveContentChangedEvent` instead.
  - `SyncUiEventId.ContentControlActivated` enum value. Use `SyncUiEventId.ActiveContentChanged` instead.
  - `addFloatingContentControl`, `contentControls`, `dropFloatingContentControl`, `setActiveView`, `setActiveViewFromViewport`, of `FrontstageDef` class. See inline documentation for suggested replacements.
  - `StatusBarFieldId` type which is not used in AppUI packages.
  - `StatusBarProps` interface of a deprecated `StatusBar` component.
  - `ViewSelector.onViewSelectorChangedEvent` property. Use `onViewSelected` prop of `ViewSelector` component instead.

### Additions

- Added additional APIs to support `ConfigurableUiControl` deprecation in backwards compatible way. [#888](https://github.com/iTwin/appui/pull/888)
  - `id` property to `ActiveContentChangedEventArgs` interface to replace exiting React node properties.
  - `ContentOverlay` component to render the active content indicator in components outside of frontstage content group i.e. widgets.
  - `content` property to `ContentProps` interface to replace existing `classId` property.
  - `getActiveId`, `setActiveId` properties to `FrameworkContent` to replace existing control based APIs.
  - `onViewSelected` to `ViewSelectorProps` to replace the static event.

### Changes

- Bump `AccuDrawWidget`, `SheetNavigationAid`, `StandardRotationNavigationAid` components to `@public`. [#888](https://github.com/iTwin/appui/pull/888)
