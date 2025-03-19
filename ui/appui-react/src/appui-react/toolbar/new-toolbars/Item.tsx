/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Item.scss";
import * as React from "react";
import classnames from "classnames";
import { assert } from "@itwin/core-bentley";
import { Icon } from "@itwin/core-react";
import { IconButton } from "@itwin/itwinui-react";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import { useConditionalProp } from "../../hooks/useConditionalProp.js";
import { Badge } from "./Badge.js";
import { ToolbarContext } from "./Toolbar.js";

/** @internal */
export interface ItemProps
  extends Partial<React.ComponentProps<typeof IconButton>> {
  item: ToolbarItem;
}

/** @internal */
export const Item = React.forwardRef<HTMLButtonElement, ItemProps>(
  function Item(props, ref) {
    const { item, iconProps, ...other } = props;
    const label = useConditionalProp(item.label);
    const isDisabled = useConditionalProp(item.isDisabled);
    const isHidden = useConditionalProp(item.isHidden);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const iconSpec = useConditionalProp(item.icon);
    const labelProps = useLabelProps();
    const modifiedIconProps = iconPropsWithCustomClass(iconProps);

    if (isHidden) return null;
    return (
      <IconButton
        className={classnames("uifw-toolbar-item-button", props.className)}
        styleType="borderless"
        disabled={isDisabled}
        isActive={item.isActive}
        label={label}
        labelProps={labelProps}
        style={props.style}
        ref={ref}
        iconProps={modifiedIconProps}
        {...other}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        {item.iconNode ?? <Icon iconSpec={iconSpec} />}
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Badge badge={item.badge} badgeKind={item.badgeKind} />
        {props.children}
      </IconButton>
    );
  }
);

/** @internal */
export function iconPropsWithCustomClass(
  iconProps?: React.ComponentProps<"span">
) {
  if (!iconProps) {
    return { className: "uifw-toolbar-item-button-icon" };
  }

  const { className, ...otherIconProps } = iconProps;
  return {
    className: classnames("uifw-toolbar-item-button-icon", className),
    ...otherIconProps,
  };
}

/** @internal */
export function useExpandsTo() {
  const context = React.useContext(ToolbarContext);
  assert(!!context);

  const { expandsTo } = context;
  return expandsTo;
}

/** @internal */
export function useLabelProps() {
  const context = React.useContext(ToolbarContext);
  const [internalVisible, setInternalVisible] = React.useState(false);
  const visible = context?.popoverOpen ? false : internalVisible;
  const placement = useExpandsTo();
  return {
    placement,
    visible,
    onVisibleChange: setInternalVisible,
  } as const;
}
