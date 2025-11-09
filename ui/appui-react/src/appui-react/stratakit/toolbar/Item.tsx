/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Item.scss";
import classnames from "classnames";
import * as React from "react";
import type { IconSpec } from "@itwin/core-react";
import { Icon as StrataKitIcon } from "@stratakit/foundations";
import { IconButton } from "@stratakit/bricks";
import { DropdownMenu } from "@stratakit/structures";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import { useConditionalProp } from "../../hooks/useConditionalProp.js";
import {
  getTypedValue,
  SvgLoader,
  useIconSpecValue,
} from "@itwin/core-react/internal";

interface ItemProps extends Partial<React.ComponentProps<typeof IconButton>> {
  item: ToolbarItem;
}

/** @internal */
export const Item = React.forwardRef<HTMLButtonElement, ItemProps>(
  function Item(props, forwardedRef) {
    const { item, ...rest } = props;
    const label = useConditionalProp(item.label);
    const isActiveCondition = useConditionalProp(item.isActiveCondition);
    const isDisabled = useConditionalProp(item.isDisabled);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const iconSpec = useConditionalProp(item.icon);

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const active = isActiveCondition ?? item.isActive;
    return (
      <IconButton
        variant="ghost"
        icon={<Icon iconNode={item.iconNode} iconSpec={iconSpec} />}
        label={label ?? ""}
        disabled={isDisabled}
        active={active}
        data-item-id={item.id}
        ref={forwardedRef}
        {...rest}
      />
    );
  }
);

interface IconProps {
  iconNode?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
}

function Icon(props: IconProps) {
  const { iconNode, iconSpec } = props;

  const iconElement = React.useMemo(() => {
    if (!iconNode) return undefined;
    if (!React.isValidElement(iconNode)) return undefined;
    return iconNode;
  }, [iconNode]);

  const iconSpecValue = useIconSpecValue(iconSpec);
  const typedValue = getTypedValue(iconSpecValue);
  const iconSpecElement = React.useMemo(() => {
    if (typedValue.type === "css-icon") {
      return <i className={classnames("icon", typedValue.iconName)} />;
    }
    if (typedValue.type === "svg-loader") {
      return <SvgLoader src={typedValue.src} />;
    }
    if (React.isValidElement(typedValue.node)) {
      return typedValue.node;
    }
    return <>{typedValue.node}</>;
  }, [typedValue]);
  return (
    <StrataKitIcon
      className={classnames("uifw-stratakit-toolbar-item_icon", {
        "uifw-css-icon": typedValue.type === "css-icon",
        "uifw-svg-loader": typedValue.type === "svg-loader",
      })}
      size="large"
      render={iconElement ?? iconSpecElement}
    />
  );
}

interface MenuItemProps
  extends Partial<React.ComponentProps<typeof DropdownMenu.CheckboxItem>> {
  item: ToolbarItem;
}

/** @internal */
export function MenuItem(props: MenuItemProps) {
  const { item, ...rest } = props;
  const label = useConditionalProp(item.label);
  const isActiveCondition = useConditionalProp(item.isActiveCondition);
  const isDisabled = useConditionalProp(item.isDisabled);
  const isHidden = useConditionalProp(item.isHidden);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const active = isActiveCondition ?? item.isActive;

  if (isHidden) return undefined;
  return (
    <DropdownMenu.CheckboxItem
      name={item.id}
      label={label}
      disabled={isDisabled}
      checked={active}
      {...rest}
    />
  );
}
