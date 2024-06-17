/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { ScreenViewport } from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import {
  useProximityToMouse,
  useWidgetOpacityContext,
  WidgetElementSet,
  WidgetOpacityContext,
} from "@itwin/core-react";
import type { ViewClassFullNameChangedEventArgs } from "@itwin/imodel-components-react";
import { ViewportComponentEvents } from "@itwin/imodel-components-react";
import * as React from "react";
import type {
  ContentControl,
  ContentControlActivatedEventArgs,
} from "../content/ContentControl";
import { NavigationArea } from "../layout/widget/NavigationArea";
import type { NavigationAidControl } from "../navigationaids/NavigationAidControl";
import { UiFramework } from "../UiFramework";
import { ProcessDetector } from "@itwin/core-bentley";

function createNavigationAidControl(
  // eslint-disable-next-line deprecation/deprecation
  activeContentControl: ContentControl | undefined,
  navigationAidId: string,
  activeViewport: ScreenViewport | undefined
  // eslint-disable-next-line deprecation/deprecation
): NavigationAidControl | undefined {
  if (
    !activeContentControl ||
    !navigationAidId ||
    activeViewport !== activeContentControl.viewport
  )
    return undefined;

  const viewport = activeContentControl.viewport;
  const imodel = viewport ? viewport.iModel : UiFramework.getIModelConnection();
  // eslint-disable-next-line deprecation/deprecation
  const navigationAidControl = UiFramework.controls.create(
    navigationAidId,
    navigationAidId,
    { imodel, viewport }
    // eslint-disable-next-line deprecation/deprecation
  ) as NavigationAidControl;

  navigationAidControl.initialize();
  return navigationAidControl;
}

/** Properties for the [[NavigationAidHost]] React component
 * @public
 */
export interface NavigationAidHostProps {
  /** Navigation Aid Host minimum width. Defaults to "64px". */
  minWidth?: string;
  /** Navigation Aid Host minimum height. Defaults to "64px". */
  minHeight?: string;
}

/**
 * NavigationAidHost is a component that hosts a NavigationAid that is specific to the active content control.
 * @public
 */
export function NavigationAidHost(props: NavigationAidHostProps) {
  const [activeContentControl, setActiveContentControl] = React.useState(() =>
    // eslint-disable-next-line deprecation/deprecation
    UiFramework.content.getActiveContentControl()
  );
  const [activeContentViewport, setActiveContentViewport] = React.useState(
    () => activeContentControl?.viewport
  );
  const [navigationAidId, setNavigationAidId] = React.useState(() =>
    activeContentControl ? activeContentControl.navigationAidControl : ""
  );

  React.useEffect(() => {
    // eslint-disable-next-line deprecation/deprecation
    return UiFramework.frontstages.onContentControlActivatedEvent.addListener(
      (
        args: ContentControlActivatedEventArgs // eslint-disable-line deprecation/deprecation
      ) => {
        setActiveContentControl(args.activeContentControl);
        setActiveContentViewport(args.activeContentControl.viewport);
        setNavigationAidId(args.activeContentControl.navigationAidControl);
      }
    );
  }, []);

  const [activeViewClass, setActiveViewClass] = React.useState(() => {
    // eslint-disable-next-line deprecation/deprecation
    const content = UiFramework.content.getActiveContentControl();
    if (content && content.viewport) return content.viewport.view.classFullName;
    return "";
  });

  React.useEffect(() => {
    return ViewportComponentEvents.onViewClassFullNameChangedEvent.addListener(
      (
        args: ViewClassFullNameChangedEventArgs // eslint-disable-line deprecation/deprecation
      ) => {
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

  const ref = React.useRef<HTMLDivElement>(null);

  const isInitialMount = React.useRef(true);
  const { onElementRef, proximityScale } = useWidgetOpacityContext();

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onElementRef(ref);
    }
  }, [onElementRef]);

  const divStyle: React.CSSProperties = {
    minWidth: props.minWidth ? props.minWidth : "64px",
    minHeight: props.minHeight ? props.minHeight : "64px",
  };

  if (
    (UiFramework.visibility.useProximityOpacity || // eslint-disable-line deprecation/deprecation
      UiFramework.visibility.snapWidgetOpacity) &&
    !ProcessDetector.isMobileBrowser
  ) {
    const navigationAidOpacity = 0.3 * proximityScale + 0.7;
    divStyle.opacity = `${navigationAidOpacity}`;
  }

  return (
    <div style={divStyle} ref={ref}>
      {navigationAidControl && navigationAidControl.reactNode}
    </div>
  );
}

/** Properties for the [[NavigationWidgetComposer]] React components
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface NavigationWidgetComposerProps extends CommonProps {
  /** Optional Horizontal Toolbar */
  horizontalToolbar?: React.ReactNode;
  /** Optional Vertical Toolbar */
  verticalToolbar?: React.ReactNode;
  /** Optional Navigation Aid host. If not specified a default host is provided which will use registered Navigation Aids and the active content control to determine which if any Navigation Aid to display. */
  navigationAidHost?: React.ReactNode;
  /** If true no navigation aid will be shown. Defaults to false. */
  hideNavigationAid?: boolean;
}

/**
 * Component that Composes a NavigationWidget typically using toolbars generated via [[ToolbarComposer]] class. The Navigation widget is shown in the top right of the content area
 * and typically holds tools to visually navigate, orient, and zoom to specific content.
 * @public
 */
export function NavigationWidgetComposer(props: NavigationWidgetComposerProps) {
  const {
    navigationAidHost,
    horizontalToolbar,
    verticalToolbar,
    hideNavigationAid,
    ...otherProps
  } = props;
  const [elementSet] = React.useState(new WidgetElementSet());
  const handleChildRef = React.useCallback(
    (elementRef: React.RefObject<Element>) => {
      elementSet.add(elementRef);
    },
    [elementSet]
  );
  const proximityScale = useProximityToMouse(
    elementSet,
    UiFramework.visibility.snapWidgetOpacity
  );

  const navigationAid = hideNavigationAid
    ? undefined
    : navigationAidHost ?? <NavigationAidHost />;

  return (
    <WidgetOpacityContext.Provider
      value={{
        onElementRef: handleChildRef,
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
