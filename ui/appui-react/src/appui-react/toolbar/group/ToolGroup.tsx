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
import { ButtonGroup, Surface } from "@itwin/itwinui-react";
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
  const className = classnames(
    "uifw-toolbar-group-toolGroup",
    `uifw-${props.orientation}`,
    props.className
  );
  const childrenArray = React.Children.toArray(props.children);
  const [containerRef, componentRef, visibleCount, renderOverflow] =
    useOverflow(childrenArray, props.orientation ?? "horizontal");
  const visibleChildren = childrenArray.slice(0, visibleCount);
  const overflown = childrenArray.slice(visibleCount);
  return (
    <div
      className={classnames(
        "uifw-toolbar-group-toolGroup_container",
        `uifw-${props.orientation}`
      )}
      ref={containerRef}
    >
      <Surface className={className} style={props.style}>
        <ButtonGroup orientation={props.orientation} ref={componentRef}>
          {visibleChildren}
          {/* TODO: iTwinUI overflow logic is still running layout effects and re-rendering w/ fewer items if rendered conditionally */}
          {renderOverflow && <OverflowButton>{overflown}</OverflowButton>}
        </ButtonGroup>
      </Surface>
    </div>
  );
}

ToolGroup.ActionItem = ActionItem;
ToolGroup.GroupItem = GroupItem;
ToolGroup.CustomItem = CustomItem;
