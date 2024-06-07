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
import { Icon } from "@itwin/core-react";
import { useTabInteractions } from "./Tab";
import { useActiveTabId } from "./Widget";
import { WidgetOverflowContext } from "./Overflow";
import { ShowWidgetIconContext } from "../base/NineZone";
import { useLayout } from "../base/LayoutStore";
import { TabIdContext } from "./ContentRenderer";

/** @internal */
// eslint-disable-next-line deprecation/deprecation
export interface WidgetMenuTabProps extends CommonProps {
  badge?: React.ReactNode;
}

/** @internal */
export function WidgetMenuTab(props: WidgetMenuTabProps) {
  const id = React.useContext(TabIdContext);
  const overflowContext = React.useContext(WidgetOverflowContext);
  const showWidgetIcon = React.useContext(ShowWidgetIconContext);
  assert(!!id);

  const { label, iconSpec } = useLayout((state) => {
    const tab = state.tabs[id];
    return {
      label: tab.label,
      iconSpec: tab.iconSpec,
    };
  }, true);
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
      {showWidgetIcon && (
        <div className="nz-icon">
          {iconSpec && <Icon iconSpec={iconSpec} />}
        </div>
      )}
      <span>{label}</span>
      <div className={classnames("nz-checkmark", !active && "nz-hidden")} />
    </div>
  );
}
