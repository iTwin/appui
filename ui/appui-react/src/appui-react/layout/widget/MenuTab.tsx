/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./MenuTab.scss";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { SvgCheckmark } from "@itwin/itwinui-icons-react";
import { MenuItem } from "@itwin/itwinui-react";
import { useTabInteractions } from "./Tab.js";
import { useActiveTabId } from "./Widget.js";
import { WidgetOverflowContext } from "./Overflow.js";
import { ShowWidgetIconContext } from "../base/NineZone.js";
import { useLayout } from "../base/LayoutStore.js";
import { TabIdContext } from "./ContentRenderer.js";

interface WidgetMenuTabProps {
  badge?: React.ReactNode;
  icon?: React.ReactElement;
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
  return (
    <MenuItem
      role="menuitemcheckbox"
      ref={ref}
      title={label}
      startIcon={showWidgetIcon ? props.icon : undefined}
      endIcon={active ? <SvgCheckmark /> : <></>}
      aria-checked={active}
      isSelected={active}
      aria-selected={undefined} // Keep styling provided by isSelected, but handle checked state via aria-checked
    >
      {props.badge && (
        <div className="nz-widget-menuTab_badge">{props.badge}</div>
      )}
      {label}
    </MenuItem>
  );
}
