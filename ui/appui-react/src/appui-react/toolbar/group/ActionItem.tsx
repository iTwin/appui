/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./ActionItem.scss";
import * as React from "react";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { BadgeUtilities, type CommonProps, Icon } from "@itwin/core-react";
import { IconButton } from "@itwin/itwinui-react";
import type { ToolbarActionItem } from "../ToolbarItem";

/** @internal */
export interface ActionItemProps extends CommonProps {
  item: ToolbarActionItem;
}

/** @internal */
export function ActionItem(props: ActionItemProps) {
  const { item } = props;
  const label = ConditionalStringValue.getValue(item.label); // TODO: useConditionalStringValue
  const description = ConditionalStringValue.getValue(item.description);
  const isDisabled = ConditionalBooleanValue.getValue(item.isDisabled);
  return (
    <IconButton
      className={props.className}
      disabled={isDisabled}
      isActive={item.isActive}
      label={
        <>
          {label}
          <br />
          {description}
        </>
      }
      style={props.style}
      onClick={() => item.execute()}
    >
      <Icon iconSpec={item.icon} />
      <Badge badge={item.badge} />
    </IconButton>
  );
}

function Badge({ badge }: Pick<ToolbarActionItem, "badge">) {
  const badgeRenderer = BadgeUtilities.getComponentForBadgeType(badge);
  return (
    <div className="uifw-toolbar-group-actionItem_badge">{badgeRenderer}</div>
  );
}
