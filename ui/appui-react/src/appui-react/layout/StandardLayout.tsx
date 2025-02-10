/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./StandardLayout.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { useLayout } from "./base/LayoutStore.js";
import { useContentAlwaysMaxSize } from "../preview/content-always-max-size/useContentAlwaysMaxSize.js";
import { useMaximizedPanelLayout } from "../preview/enable-maximized-widget/useMaximizedWidget.js";
import { useHorizontalPanelAlignment } from "../preview/horizontal-panel-alignment/useHorizontalPanelAlignment.js";
import { usePanelsAutoCollapse } from "./widget-panels/usePanelsAutoCollapse.js";
import type { PanelSide } from "./widget-panels/PanelTypes.js";
import { ConfigurableUiContext } from "../configurableui/ConfigurableUiContent.js";
import { useRefs } from "@itwin/core-react/internal";

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface StandardLayoutProps extends CommonProps {
  /** Main content area of the application (i.e. viewport) that will change bounds based on panel pinned state. */
  children?: React.ReactNode;
  /** Component that displays center content (i.e. toolbars). Content is always bound by widget panels. */
  centerContent?: React.ReactNode;
  toolSettings?: React.ReactNode;
  statusBar?: React.ReactNode;
  topPanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

/** Component that displays widgets in a standard layout.
 * @internal
 */
export function StandardLayout(props: StandardLayoutProps) {
  const { contentElementRef } = React.useContext(ConfigurableUiContext);
  const pinned = usePinnedPanels();
  const appContentRef = usePanelsAutoCollapse<HTMLDivElement>();
  const refs = useRefs(contentElementRef, appContentRef);
  const className = classnames("nz-standardLayout", pinned, props.className);
  const contentAlwaysMaxSize = useContentAlwaysMaxSize();
  return (
    <div className={className} style={props.style}>
      <div
        className={classnames("nz-appContent", contentAlwaysMaxSize)}
        ref={refs}
      >
        {props.children}
      </div>
      <div className="nz-centerContent">{props.centerContent}</div>
      <Panel side="left">{props.leftPanel}</Panel>
      <Panel side="right">{props.rightPanel}</Panel>
      <Panel side="top">{props.topPanel}</Panel>
      <Panel side="bottom">{props.bottomPanel}</Panel>
      <div className="nz-toolSettings">{props.toolSettings}</div>
      <div className="nz-statusBar">{props.statusBar}</div>
    </div>
  );
}

interface PanelProps {
  side: PanelSide;
}

function Panel({ children, side }: React.PropsWithChildren<PanelProps>) {
  const maximizedWidget = useMaximizedPanelLayout(side);
  const horizontalAlignment = useHorizontalPanelAlignment(side);
  const className = classnames(
    `nz-standardLayout_${side}Panel`,
    maximizedWidget,
    horizontalAlignment.classNames
  );
  return (
    <div className={className} {...horizontalAlignment.attributes}>
      {children}
    </div>
  );
}

function usePinnedPanels() {
  const leftPinned = useLayout((state) => state.panels.left.pinned);
  const rightPinned = useLayout((state) => state.panels.right.pinned);
  const topPinned = useLayout((state) => state.panels.top.pinned);
  const bottomPinned = useLayout((state) => state.panels.bottom.pinned);
  return {
    "nz-pinned-left": leftPinned,
    "nz-pinned-right": rightPinned,
    "nz-pinned-top": topPinned,
    "nz-pinned-bottom": bottomPinned,
  };
}
