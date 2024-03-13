/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Item.scss";
import * as React from "react";
import { Icon } from "@itwin/core-react";
import { IconButton } from "@itwin/itwinui-react";
import type { ToolbarItem } from "../ToolbarItem";
import { useConditionalValue } from "../../hooks/useConditionalValue";
import { Badge } from "./Badge";
import { ToolbarContext } from "./Toolbar";
import { assert } from "@itwin/core-bentley";

/** @internal */
export interface ItemProps
  extends Partial<React.ComponentProps<typeof IconButton>> {
  item: ToolbarItem;
}

/** @internal */
export const Item = React.forwardRef<HTMLButtonElement, ItemProps>(
  function Item(props, ref) {
    const { item, ...other } = props;
    const label = useConditionalValue(item.label);
    const description = useConditionalValue(item.description);
    const isDisabled = useConditionalValue(item.isDisabled);
    const isHidden = useConditionalValue(item.isHidden);
    const iconSpec = useConditionalValue(item.icon);
    const labelProps = useLabelProps();

    if (isHidden) return null;
    return (
      <IconButton
        className={props.className}
        styleType="borderless"
        disabled={isDisabled}
        isActive={item.isActive}
        label={<Label label={label} description={description} />}
        labelProps={labelProps}
        style={props.style}
        ref={ref}
        {...other}
      >
        <Icon iconSpec={iconSpec} />
        <Badge badge={item.badge} />
        {props.children}
      </IconButton>
    );
  }
);

interface LabelProps {
  label?: string;
  description?: string;
}

function Label({ label, description }: LabelProps) {
  return (
    <>
      {label}
      <br />
      {description}
    </>
  );
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
  const placement = useExpandsTo();
  return {
    className: "uifw-toolbar-group-item_label",
    placement,
  } as const;
}
