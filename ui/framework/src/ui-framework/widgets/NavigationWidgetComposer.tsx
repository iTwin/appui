/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { ScreenViewport } from "@bentley/imodeljs-frontend";
import { ViewClassFullNameChangedEventArgs, ViewportComponentEvents } from "@bentley/ui-components";
import { CommonProps, useProximityToMouse } from "@bentley/ui-core";
import { NavigationArea } from "@bentley/ui-ninezone";
import { ConfigurableUiManager } from "../configurableui/ConfigurableUiManager";
import { ContentControl, ContentControlActivatedEventArgs } from "../content/ContentControl";
import { ContentViewManager } from "../content/ContentViewManager";
import { FrontstageManager } from "../frontstage/FrontstageManager";
import { useFrameworkVersion } from "../hooks/useFrameworkVersion";
import { NavigationAidControl } from "../navigationaids/NavigationAidControl";
import { UiFramework } from "../UiFramework";
import { UiShowHideManager } from "../utils/UiShowHideManager";

function createNavigationAidControl(activeContentControl: ContentControl | undefined, navigationAidId: string, activeViewport: ScreenViewport | undefined): NavigationAidControl | undefined {
  // istanbul ignore else
  if (!activeContentControl || !navigationAidId || (activeViewport !== activeContentControl.viewport))
    return undefined;

  const viewport = activeContentControl.viewport;
  const imodel = viewport ? viewport.iModel : UiFramework.getIModelConnection();
  const navigationAidControl = ConfigurableUiManager.createControl(navigationAidId, navigationAidId, { imodel, viewport }) as NavigationAidControl;

  navigationAidControl.initialize();
  return navigationAidControl;
}

/** Properties for the [[NavigationAidHost]] React component
 * @beta
 */
export interface NavigationAidHostProps {
  // defaults to "64px"
  minWidth?: string;
  // defaults to "64px"
  minHeight?: string;
}

/**
 * NavigationAidHost is a component that hosts a NavigationAid that is specific to the active content control.
 * @beta
 */
export function NavigationAidHost(props: NavigationAidHostProps) {
  const [activeContentControl, setActiveContentControl] = React.useState(() => ContentViewManager.getActiveContentControl());
  const [activeContentViewport, setActiveContentViewport] = React.useState(() => activeContentControl?.viewport);
  const [navigationAidId, setNavigationAidId] = React.useState(() => activeContentControl ? activeContentControl.navigationAidControl : "");

  React.useEffect(() => {
    const handleContentControlActivated = (args: ContentControlActivatedEventArgs) => {
      setActiveContentControl(args.activeContentControl);
      setActiveContentViewport(args.activeContentControl.viewport);
      setNavigationAidId(args.activeContentControl.navigationAidControl);
    };

    FrontstageManager.onContentControlActivatedEvent.addListener(handleContentControlActivated);
    return () => {
      FrontstageManager.onContentControlActivatedEvent.removeListener(handleContentControlActivated);
    };
  }, []);

  const [activeViewClass, setActiveViewClass] = React.useState(() => {
    const content = ContentViewManager.getActiveContentControl();
    if (content && content.viewport)
      return content.viewport.view.classFullName;
    return "";
  });

  React.useEffect(() => {
    const handleViewClassFullNameChange = (args: ViewClassFullNameChangedEventArgs) => {
      setActiveViewClass(args.newName);
    };

    ViewportComponentEvents.onViewClassFullNameChangedEvent.addListener(handleViewClassFullNameChange);
    return () => {
      ViewportComponentEvents.onViewClassFullNameChangedEvent.removeListener(handleViewClassFullNameChange);
    };
  }, [activeViewClass]);

  const navigationAidControl = React.useMemo(() => createNavigationAidControl(activeContentControl, navigationAidId, activeContentViewport), [activeContentControl, navigationAidId, activeContentViewport]);

  const ref = React.useRef<HTMLDivElement>(null);
  const proximity = useProximityToMouse(ref);
  const divStyle: React.CSSProperties = {
    minWidth: props.minWidth ? props.minWidth : "64px",
    minHeight: props.minHeight ? props.minHeight : "64px",
  };

  if ("1" !== useFrameworkVersion() && UiShowHideManager.useProximityOpacity && !UiFramework.isMobile()) {
    const threshold = 100;
    const scale = ((proximity < threshold) ? threshold - proximity : 0) / threshold;
    const navigationAidOpacity = (0.30 * scale) + 0.70;

    divStyle.opacity = `${navigationAidOpacity}`;
  }

  return (
    <div style={divStyle} ref={ref}>
      {navigationAidControl && navigationAidControl.reactNode}
    </div>
  );
}

/** Properties for the [[NavigationWidgetComposer]] React components
 * @beta
 */
export interface NavigationWidgetComposerProps extends CommonProps {
  /** Optional Horizontal Toolbar */
  horizontalToolbar?: React.ReactNode;
  /** Optional Vertical Toolbar */
  verticalToolbar?: React.ReactNode;
  /** Optional Navigation Aid host. If not specified a default host is provided which will use registered Navigation Aids and the active content control to determine which if any Navigation Aid to display. */
  navigationAidHost?: React.ReactNode;
}

/**
 * Component that Composes a NavigationWidget typically using toolbars generated via [[ToolbarComposer]] class. The Navigation widget is shown in the top right of the content area
 * and typically holds tools to visually navigate, orient, and zoom to specific content.
 * @beta
 */
export function NavigationWidgetComposer(props: NavigationWidgetComposerProps) {
  const { navigationAidHost, horizontalToolbar, verticalToolbar, ...otherProps } = props;
  return (
    <NavigationArea
      navigationAid={navigationAidHost ? navigationAidHost : <NavigationAidHost />}
      horizontalToolbar={horizontalToolbar}
      verticalToolbar={verticalToolbar}
      {...otherProps}
      onMouseEnter={UiShowHideManager.handleWidgetMouseEnter}
    />
  );
}
