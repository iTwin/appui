/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./MenuTab.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { CommonProps } from "@itwin/core-react";
import { useTabInteractions } from "./Tab.js";
import { useActiveTabId } from "./Widget.js";
import { WidgetOverflowContext } from "./Overflow.js";
import { ShowWidgetIconContext } from "../base/NineZone.js";
import { useLayout } from "../base/LayoutStore.js";
import { TabIdContext } from "./ContentRenderer.js";

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface WidgetMenuTabProps extends CommonProps {
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

/** @internal */
export function WidgetMenuTab(props: WidgetMenuTabProps) {
  const id = React.useContext(TabIdContext);
  const overflowContext = React.useContext(WidgetOverflowContext);
  const showWidgetIcon = React.useContext(ShowWidgetIconContext);
  assert(!!id);

  const label = useLayout((state) => {
    const tab = state.tabs[id];
    return tab.label;
  });
  assert(!!overflowContext);
  const closeOverflow = React.useCallback(() => {
    overflowContext.close();
  }, [overflowContext]);
  const ref = useTabInteractions({
    onDragStart: closeOverflow,
    onClick: closeOverflow,
    onDoubleClick: closeOverflow,
  });
  const activeTabId = useActiveTabId();
  const active = activeTabId === id;
  const className = classnames(
    "nz-widget-menuTab",
    !showWidgetIcon && "nz-no-icon",
    props.className
  );
  return (
    <div className={className} ref={ref} title={label}>
      {props.badge && <div className="nz-badge">{props.badge}</div>}
      {showWidgetIcon && <div className="nz-icon">{props.icon}</div>}
      <span>{label}</span>
      <div className={classnames("nz-checkmark", !active && "nz-hidden")} />
    </div>
  );
}
