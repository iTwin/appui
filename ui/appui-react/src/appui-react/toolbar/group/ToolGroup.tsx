/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./ToolGroup.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Surface } from "@itwin/itwinui-react";
import { ActionItem } from "./ActionItem";
import { GroupItem } from "./GroupItem";
import { CustomItem } from "./CustomItem";
import { OverflowButton } from "./OverflowButton";
import { useOverflow } from "./useOverflow";

/** @internal */
interface ToolGroupProps extends CommonProps {
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}

/** @internal */
export function ToolGroup(props: ToolGroupProps) {
  const childrenArray = React.Children.toArray(props.children);
  const [containerRef, componentRef, visibleCount, renderOverflow] =
    useOverflow(childrenArray, props.orientation ?? "horizontal");
  const children = childrenArray.slice(0, visibleCount);
  const overflown = childrenArray.slice(visibleCount);
  return (
    <div
      className={classnames(
        "uifw-toolbar-group-toolGroup_container",
        `uifw-${props.orientation}`
      )}
      ref={containerRef}
    >
      <Surface
        className={classnames(
          "uifw-toolbar-group-toolGroup",
          `uifw-${props.orientation}`,
          props.className
        )}
        style={props.style}
        ref={componentRef}
      >
        {children}
        {renderOverflow && <OverflowButton>{overflown}</OverflowButton>}
      </Surface>
    </div>
  );
}

ToolGroup.ActionItem = ActionItem;
ToolGroup.GroupItem = GroupItem;
ToolGroup.CustomItem = CustomItem;
