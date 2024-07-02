# NextVersion <!-- omit from toc -->

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
  - `solarTimeline`, `analysisTimeline`, `scheduleAnimation` props to `DefaultViewOverlay` component to replace existing `applicationData.featureOptions.defaultViewOverlay` property.
  - `navigationAid` prop to `ViewToolWidgetComposer` to override the default navigation aid.

### Changes

- Bump `AccuDrawWidget`, `SheetNavigationAid`, `StandardRotationNavigationAid` components to `@public`. [#888](https://github.com/iTwin/appui/pull/888)
