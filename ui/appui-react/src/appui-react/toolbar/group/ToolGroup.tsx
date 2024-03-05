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
  return (
    <Surface className={className} style={props.style}>
      <ButtonGroup
        orientation={props.orientation}
        overflowButton={(overflowStart) => {
          const children = React.Children.toArray(props.children);
          const overflowChildren = children.slice(overflowStart);
          return <OverflowButton>{overflowChildren}</OverflowButton>;
        }}
      >
        {props.children}
      </ButtonGroup>
    </Surface>
  );
}

ToolGroup.ActionItem = ActionItem;
ToolGroup.GroupItem = GroupItem;
ToolGroup.CustomItem = CustomItem;
