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
import { ButtonGroup } from "@itwin/itwinui-react";
import { ActionItem } from "./ActionItem";
import { Toolbar } from "./Toolbar";
import { GroupItem } from "./GroupItem";

/** @internal */
export interface ToolGroupProps extends CommonProps {
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}

/** @internal */
export function ToolGroup(props: ToolGroupProps) {
  const className = classnames("uifw-toolbar-group-toolGroup", props.className);
  return (
    <ButtonGroup
      className={className}
      orientation={props.orientation}
      style={props.style}
    >
      {props.children}
    </ButtonGroup>
  );
}

ToolGroup.Toolbar = Toolbar;
ToolGroup.ActionItem = ActionItem;
ToolGroup.GroupItem = GroupItem;
