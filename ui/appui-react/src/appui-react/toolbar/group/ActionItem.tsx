/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./ActionItem.scss";
import * as React from "react";
import { BadgeUtilities, type CommonProps, Icon } from "@itwin/core-react";
import { IconButton } from "@itwin/itwinui-react";
import type { ToolbarActionItem } from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { ToolGroupOverflowContext } from "./OverflowButton";

/** @internal */
export interface ActionItemProps extends CommonProps {
  item: ToolbarActionItem;
}

/** @internal */
export function ActionItem(props: ActionItemProps) {
  const { item } = props;
  const label = useConditionalValue(item.label);
  const description = useConditionalValue(item.description);
  const isDisabled = useConditionalValue(item.isDisabled);
  const isHidden = useConditionalValue(item.isHidden);
  const iconSpec = useConditionalValue(item.icon);
  const toolGroupOverflow = React.useContext(ToolGroupOverflowContext);

  if (isHidden) return null;
  return (
    <IconButton
      className={props.className}
      styleType="borderless"
      disabled={isDisabled}
      isActive={item.isActive}
      label={<ItemLabel label={label} description={description} />}
      style={props.style}
      onClick={() => {
        toolGroupOverflow?.close();
        item.execute();
      }}
    >
      <Icon iconSpec={iconSpec} />
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

interface ItemLabelProps {
  label?: string;
  description?: string;
}

/** @internal */
export function ItemLabel({ label, description }: ItemLabelProps) {
  return (
    <>
      {label}
      <br />
      {description}
    </>
  );
}
