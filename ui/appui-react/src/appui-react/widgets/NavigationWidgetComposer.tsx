/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import * as React from "react";
import { ProcessDetector } from "@itwin/core-bentley";
import {
  DrawingViewState,
  OrthographicViewState,
  type ScreenViewport,
  SheetViewState,
  SpatialViewState,
} from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import {
  useProximityToMouse,
  useWidgetOpacityContext,
  WidgetElementSet,
  WidgetOpacityContext,
} from "@itwin/core-react/internal";
import {
  CubeNavigationAid,
  DrawingNavigationAid,
  ViewportComponentEvents,
} from "@itwin/imodel-components-react";
import type { ContentControl } from "../content/ContentControl.js";
import { NavigationArea } from "../layout/widget/NavigationArea.js";
import type { NavigationAidControl } from "../navigationaids/NavigationAidControl.js";
import { UiFramework } from "../UiFramework.js";
import { useActiveViewport } from "../hooks/useActiveViewport.js";
import { ViewUtilities } from "../utils/ViewUtilities.js";
import { SheetNavigationAid } from "../navigationaids/SheetNavigationAid.js";

function createNavigationAidControl(
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  activeContentControl: ContentControl | undefined,
  navigationAidId: string,
  activeViewport: ScreenViewport | undefined
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): NavigationAidControl | undefined {
  if (
    !activeContentControl ||
    !navigationAidId ||
    activeViewport !== activeContentControl.viewport
  )
    return undefined;

  const viewport = activeContentControl.viewport;
  const imodel = viewport ? viewport.iModel : UiFramework.getIModelConnection();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const navigationAidControl = UiFramework.controls.create(
    navigationAidId,
    navigationAidId,
    { imodel, viewport }
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ) as NavigationAidControl;

  navigationAidControl.initialize();
  return navigationAidControl;
}

/** Properties for the [[NavigationAidHost]] React component
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof NavigationAidHost>`
 */
export interface NavigationAidHostProps {
  /** Navigation Aid Host minimum width. Defaults to "64px". */
  minWidth?: string;
  /** Navigation Aid Host minimum height. Defaults to "64px". */
  minHeight?: string;
}

/** Component that is used as a default navigation aid.
 * Uses registered navigation aids and the active content control to determine if or which navigation aid to display.
 * If an active content is defined without a content control (`classId` is set to an empty string) renders a default navigation aid based on an active viewport view state.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function NavigationAidHost(props: NavigationAidHostProps) {
  const [activeContentControl, setActiveContentControl] = React.useState(() =>
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    UiFramework.content.getActiveContentControl()
  );
  const [activeContentViewport, setActiveContentViewport] = React.useState(
    () => activeContentControl?.viewport
  );
  const [navigationAidId, setNavigationAidId] = React.useState(() =>
    activeContentControl ? activeContentControl.navigationAidControl : ""
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return UiFramework.frontstages.onContentControlActivatedEvent.addListener(
      (args) => {
        setActiveContentControl(args.activeContentControl);
        setActiveContentViewport(args.activeContentControl.viewport);
        setNavigationAidId(args.activeContentControl.navigationAidControl);
      }
    );
  }, []);
  React.useEffect(() => {
    return UiFramework.content.onActiveContentChangedEvent.addListener(
      (args) => {
        const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
        if (!frontstageDef) return;

        const contentGroup = frontstageDef.contentGroup;
        if (!contentGroup) return;

        const content = contentGroup.contentPropsList.find(
          (contentProps) => contentProps.id === args.id
        );
        if (!content?.content) return;

        // Content w/o a control is activated - reset the navigation.
        setActiveContentControl(undefined);
        setActiveContentViewport(undefined);
        setNavigationAidId("");
      }
    );
  }, []);

  const [activeViewClass, setActiveViewClass] = React.useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const content = UiFramework.content.getActiveContentControl();
    if (content && content.viewport) return content.viewport.view.classFullName;
    return "";
  });

  React.useEffect(() => {
    return ViewportComponentEvents.onViewClassFullNameChangedEvent.addListener(
      (args) => {
        setActiveViewClass(args.newName);
      }
    );
  }, [activeViewClass]);

  const navigationAidControl = React.useMemo(
    () =>
      createNavigationAidControl(
        activeContentControl,
        navigationAidId,
        activeContentViewport
      ),
    [activeContentControl, navigationAidId, activeContentViewport]
  );
  const { ref, proximityScale } = useWidgetOpacityContext<HTMLDivElement>();

  const divStyle: React.CSSProperties = {
    minWidth: props.minWidth ? props.minWidth : "64px",
    minHeight: props.minHeight ? props.minHeight : "64px",
  };

  if (
    (UiFramework.visibility.useProximityOpacity || // eslint-disable-line @typescript-eslint/no-deprecated
      UiFramework.visibility.snapWidgetOpacity) &&
    !ProcessDetector.isMobileBrowser
  ) {
    const navigationAidOpacity = 0.3 * proximityScale + 0.7;
    divStyle.opacity = `${navigationAidOpacity}`;
  }

  const navigationAid = activeContentControl ? (
    navigationAidControl?.reactNode
  ) : (
    <DefaultNavigationAid />
  );
  return (
    <div style={divStyle} ref={ref}>
      {navigationAid}
    </div>
  );
}

function DefaultNavigationAid() {
  const viewport = useActiveViewport();
  if (!viewport) return null;

  const className = ViewUtilities.getBisBaseClass(viewport.view.classFullName);
  switch (className) {
    case SheetViewState.className:
      return <SheetNavigationAid iModelConnection={viewport.iModel} />;
    case DrawingViewState.className:
      return (
        <DrawingNavigationAid
          iModelConnection={viewport.iModel}
          viewport={viewport}
        />
      );
    case SpatialViewState.className:
    case OrthographicViewState.className:
      return (
        <CubeNavigationAid
          iModelConnection={viewport.iModel}
          viewport={viewport}
        />
      );
  }

  return null;
}

/** Properties for the [[NavigationWidgetComposer]] React components
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof NavigationWidgetComposer>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface NavigationWidgetComposerProps extends CommonProps {
  /** Optional horizontal toolbar */
  horizontalToolbar?: React.ReactNode;
  /** Optional vertical toolbar */
  verticalToolbar?: React.ReactNode;
  /** Optional navigation aid to override the default {@link NavigationAidHost}. */
  navigationAidHost?: React.ReactNode;
  /** If true no navigation aid will be shown. Defaults to `false`. */
  hideNavigationAid?: boolean;
}

/**
 * Component that Composes a NavigationWidget typically using toolbars generated via [[ToolbarComposer]] class. The Navigation widget is shown in the top right of the content area
 * and typically holds tools to visually navigate, orient, and zoom to specific content.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function NavigationWidgetComposer(props: NavigationWidgetComposerProps) {
  const {
    navigationAidHost,
    horizontalToolbar,
    verticalToolbar,
    hideNavigationAid,
    ...otherProps
  } = props;
  const [elementSet] = React.useState(new WidgetElementSet());
  const proximityScale = useProximityToMouse(
    elementSet,
    UiFramework.visibility.snapWidgetOpacity
  );

  const navigationAid = hideNavigationAid
    ? undefined
    : navigationAidHost ?? <NavigationAidHost />;

  const addRef = React.useCallback<
    React.ContextType<typeof WidgetOpacityContext>["addRef"]
  >(
    (ref) => {
      elementSet.add(ref);
    },
    [elementSet]
  );
  const removeRef = React.useCallback<
    React.ContextType<typeof WidgetOpacityContext>["removeRef"]
  >(
    (ref) => {
      elementSet.delete(ref);
    },
    [elementSet]
  );
  return (
    <WidgetOpacityContext.Provider
      value={{
        addRef,
        removeRef,
        proximityScale,
      }}
    >
      <NavigationArea
        navigationAid={navigationAid}
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
        {...otherProps}
        onMouseEnter={UiFramework.visibility.handleWidgetMouseEnter}
      />
    </WidgetOpacityContext.Provider>
  );
}
