# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)
  - [Changes](#changes-1)
  - [Fixes](#fixes-1)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations-1)

## @itwin/appui-react

### Deprecations

- Deprecated all APIs associated with `ConfigurableUiControl` class. It is recommended for applications to continue using `classId` to specify content via content control APIs until all tools and UI elements that are used with that specific content control are refactored. [#888](https://github.com/iTwin/appui/pull/888)

  - `AccuDrawWidgetControl` class. Use `AccuDrawWidget` component instead.
  - `CubeNavigationAidControl` class. Use `@itwin/imodel-components-react#CubeNavigationAid` component instead.
  - `DrawingNavigationAidControl` class. Use `@itwin/imodel-components-react#DrawingNavigationAid` component instead.
  - `SheetNavigationAidControl` class. Use `SheetNavigationAid` component instead.
  - `StandardRotationNavigationAidControl` class. Use `StandardRotationNavigationAid` component instead.
  - `StatusBarWidgetComposerControl` class. Use `StatusBarComposer` component instead.
  - `IModelViewportControl` class and `IModelViewportControlOptions` interface and `ViewOverlayProps.featureOptions` property. Use `@itwin/imodel-components-react#ViewportComponent` component instead.

    `IModelViewportControlOptions` previously specified through `applicationData` property of `ContentProps` interface can be passed as props to `ViewportComponent` component.

    ```tsx
    // Before
    const content = {
      id: `viewport-1`,
      classId: IModelViewportControl,
      applicationData: {
        viewState: UiFramework.getDefaultViewState,
        iModelConnection: UiFramework.getIModelConnection,
      },
    } satisfies ContentProps;

    // After
    function ViewportContent() {
      const [iModel] = React.useState(UiFramework.getIModelConnection());
      const [viewState] = React.useState(UiFramework.getDefaultViewState());
      return <ViewportComponent viewState={viewState} imodel={iModel} />;
    }

    const content = {
      id: `viewport-1`,
      classId: "",
      content: <ViewportContent />,
    } satisfies ContentProps;
    ```

    `DefaultViewOverlay` previously configured through `IModelViewportControlOptions` can be rendered as a sibling of `ViewportComponent` component. Configuration specified through `applicationData.featureOptions.defaultViewOverlay` can be passed as props to `DefaultViewOverlay` component.

    ```tsx
    // Before
    const content = {
      id: `viewport-1`,
      classId: IModelViewportControl,
      applicationData: {
        featureOptions: {
          defaultViewOverlay: {
            enableScheduleAnimationViewOverlay: true,
          },
        },
      },
    } satisfies ContentProps;

    // After
    function ViewportContent() {
      const [viewport, setViewport] = React.useState<ScreenViewport>();

      return (
        <>
          <ViewportComponent viewportRef={(v) => setViewport(v)} />
          {viewport && (
            <DefaultViewOverlay viewport={viewport} scheduleAnimation={true} />
          )}
        </>
      );
    }

    const content = {
      id: `viewport-1`,
      classId: "",
      content: <ViewportContent />,
    } satisfies ContentProps;
    ```

    To replicate `IModelViewportControlOptions.supplyViewOverlay` behavior you could use a render prop:

    ```tsx
    // Before
    const content = {
      id: `viewport-1`,
      classId: IModelViewportControl,
      applicationData: {
        supplyViewOverlay: () => <>Custom view overlay</>,
      },
    } satisfies ContentProps;

    // After
    function ViewportContent(props: {
      renderViewOverlay?: (viewport: ScreenViewport) => React.ReactNode;
    }) {
      const [viewport, setViewport] = React.useState<ScreenViewport>();
      return (
        <>
          <ViewportComponent viewportRef={(v) => setViewport(v)} />
          {viewport && props.renderViewOverlay?.(viewport)}
        </>
      );
    }

    const content = {
      id: `viewport-1`,
      classId: "",
      content: (
        <ViewportContent renderViewOverlay={() => <>Custom view overlay</>} />
      ),
    } satisfies ContentProps;
    ```

  - `ConfigurableUiContentProps.viewOverlay` property. Components used in `ContentProps.content` should control view overlay visibility.
  - `ViewportContentControl` class. `NavigationAidHost` component used this class to render navigation aid specific to activated content control and would handle view selection changes. `NavigationAidHost` is updated to render a default navigation aid depending on the active viewport view when content control is not used (`ContentProps.classId` is set to an empty string). If a custom navigation aid is needed, applications can provide a custom component via `navigationAid` prop of `ViewToolWidgetComposer` or `navigationAidHost` prop of `NavigationWidgetComposer` components.
  - `FloatingContentControl` class. Use `UiItemsProvider` to provide a floating `Widget` instead. Additionally, use `ContentOverlay` component to display the active content indicator.
  - `FloatingViewportContent` component, `useFloatingViewport` hook, `FloatingViewportContentControl` class and related type `FloatingViewportContentProps`. Wrap `@itwin/imodel-components-react#ViewportComponent` component with a `ContentOverlay` instead.
  - `FloatingViewportContentWrapper` component and related props type `FloatingViewportContentWrapperProps`. Use `ContentOverlay` component to display the active content indicator instead.
  - Base classes `ConfigurableBase`, `ConfigurableUiElement`, `NavigationAidControl`, `ConfigurableUiControl`, `ContentControl`, `StatusBarWidgetControl`, `WidgetControl`, properties `WidgetDef.classId`, `WidgetDef.getWidgetControl`, `WidgetDef.widgetControl`, `UiFramework.controls`, and related types `FrameworkControls`, `ConfigurableCreateInfo`, `ConfigurableUiControlConstructor`, `ConfigurableUiControlType`, `SupportsViewSelectorChange`. Use React components returned by the control instead when defining content in a content group and see inline documentation for suggested replacements.
  - `activeContent`, `oldContent` properties of `ActiveContentChangedEventArgs` interface. Use `id` property to identify the activated and deactivated contents instead.
  - `getContentControl`,`getContentControlById`, `getContentControls`, `getContentNodes`, `getControlFromElement` methods of `ContentGroup` class. Use `contentPropsList` property instead.
  - `fillLayoutContainer` method and `rootSplit` getter of `ContentLayoutDef` class that are used internally only.
  - `applicationData`, `classId` properties of `ContentProps` interface. Use `content` property to specify a React node instead.
  - `addFloatingContentControl`, `contentSupportsCamera`, `dropFloatingContentControl`, `getActive`, `getActiveContentControl`, `isContent3dView`,`isContentDrawingView`, `isContentOrthographicView`, `isContentSheetView`, `isContentSpatialView`, `refreshActive`, `setActive` methods of `FrameworkContent`. See inline documentation for suggested replacements.
  - `ToolInformation`, `ToolUiProvider` classes, `activeToolInformation` property of `FrameworkFrontstages` interface without a replacement. New APIs will be added in the future based on submitted use-cases. For simple scenarios, use `IModelApp.toolAdmin` APIs instead.
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
  - `solarTimeline`, `analysisTimeline`, `scheduleAnimation` props to `DefaultViewOverlay` component to replace existing `applicationData.featureOptions.defaultViewOverlay` property.
  - `navigationAid` prop to `ViewToolWidgetComposer` to override the default navigation aid.
- Added `LocalStateStorage`, `SettingsManager` classes, `UiStateStorageStatus` enum and `UiStateStorage`, `UiStateStorageResult`, `RectangleProps`, `SizeProps`, `SettingsTabEntry`, `SettingsTabsProvider` interfaces previously accessible from `@itwin/core-react` package. [#901](https://github.com/iTwin/appui/pull/901)

### Changes

- Bump `AccuDrawWidget`, `SheetNavigationAid`, `StandardRotationNavigationAid` components to `@public`. [#888](https://github.com/iTwin/appui/pull/888)

### Fixes

- Fixed `AccuDrawInputField` to correctly specify keyboard event modifiers in `UiFramework.keyboardShortcuts.processKey()`. [#894](https://github.com/iTwin/appui/pull/894)

## @itwin/components-react

### Additions

- Added `CheckBoxState`, `Orientation`, `TimeFormat` enums and `LocalizationProvider` component previously accessible from `@itwin/core-react` package. [#901](https://github.com/iTwin/appui/pull/901)

### Changes

- Property grid array items' description will be shown next to the index when the items are non-primitive. [#890](https://github.com/iTwin/appui/pull/890)

### Fixes

- Fixed `activeMatchIndex` not working correctly on adjacent matches in `HighlightedText`. [#898](https://github.com/iTwin/appui/pull/898)

## @itwin/core-react

### Deprecations

- Deprecated all remaining APIs of `@itwin/core-react` package. `@itwin/core-react` package is now considered deprecated and usage of this package should be avoided. Existing APIs will continue to work as expected as described in [API deprecation policy](https://www.itwinjs.org/learning/api-support-policies/#api-deprecation-policy). Package will be removed entirely with `AppUI 6.0` version release. [#901](https://github.com/iTwin/appui/pull/901)

  - `CheckBoxState`, `Orientation`, `TimeFormat` enums and `LocalizationProvider` component are now accessible from `@itwin/components-react` package.
  - `LocalStateStorage`, `SettingsManager` classes, `UiStateStorageStatus` enum and `UiStateStorage`, `UiStateStorageResult`, `RectangleProps`, `SizeProps`, `SettingsTabEntry`, `SettingsTabsProvider` interfaces are now accessible from `@itwin/appui-react` package.
  - `UiStateEntry` class. Use `UiStateStorage` APIs instead.
  - `AutoSuggest` component and related types `AutoSuggestProps`, `AutoSuggestData`, `AsyncGetAutoSuggestDataFunc`, `GetAutoSuggestDataFunc`. Use [iTwinUI](https://itwinui.bentley.com) components instead. I.e. [ComboBox](https://itwinui.bentley.com/docs/combobox) can be used in most cases by providing a custom `filterFunction` in order to hide a dropdown menu via `dropdownMenuProps.style` and handling of input value via `inputProps.onChange`. Alternatively, please [upvote an existing](https://github.com/iTwin/iTwinUI/issues) or file a new [feature request](https://github.com/iTwin/iTwinUI/issues/new/choose) if additional customization is needed.
  - `ContextMenu`, `ContextMenuItem`, `ContextSubMenu`, `ContextMenuDivider`, `GlobalContextMenu`, `PopupContextMenu` components, `ContextMenuDirection` enum and related types `ContextMenuProps`, `ContextMenuItemProps`, `ContextSubMenuProps`, `GlobalContextMenuProps`, `PopupContextMenuProps`. Use [iTwinUI DropdownMenu](https://itwinui.bentley.com/docs/dropdownmenu) component instead. In most cases, you will need to control visibility manually via `visible` prop. Additionally, if you need to position the menu i.e. based on the current mouse position, you can create a hidden target for the `DropdownMenu`.

    ```tsx
    <DropdownMenu
      visible={true}
      // ...
    >
      <div
        style={{
          visibility: "hidden",
          position: "absolute",
          left: 50,
          top: 200,
        }}
      />
    </DropdownMenu>
    ```

  - `ConditionalIconItem` class
    - TODO: should be just `React.ReactNode`
  - `Icon` component, `IconProps`, `IconSpec` type.
    - TODO: `IconSpec` should be `React.ReactNode`
  - `NodeCheckboxRenderer`, `NodeCheckboxRenderProps` types. Types are inlined in the component props definition. For advanced use-cases use `React.ComponentProps` type helper instead.
  - `RenderPropsArgs` interface. Props of a deprecated component `ElementResizeObserver`.
  - `SettingsContainer` component and props type `SettingsContainerProps`. Component is used internally by `SettingsModalFrontstage`. Use [iTwinUI](https://itwinui.bentley.com) components to build a custom solution instead or file a [feature request](https://github.com/iTwin/appui/issues/new/choose).
  - `UiCore` class. It is recommended for applications to continue using `UiCore` initializer until the package is removed entirely to avoid unexpected behavior in dependencies.
  - `useCrossOriginPopup` hook. Without a replacement, build a custom solution instead.
  - `useSaveBeforeActivatingNewSettingsTab`, `useSaveBeforeClosingSettingsContainer` hooks. Use `SettingsManager` APIs instead.
