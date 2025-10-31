/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { IconSpec } from "@itwin/core-react";
import { Icon as CoreIcon } from "@itwin/core-react";
import { IconButton } from "@stratakit/bricks";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import { useConditionalProp } from "../../hooks/useConditionalProp.js";
import { DropdownMenu } from "@stratakit/structures";

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

    return (
      <IconButton
        icon={<Icon iconNode={item.iconNode} iconSpec={iconSpec} />}
        label={label ?? ""}
        variant="ghost"
        disabled={isDisabled}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        active={isActiveCondition ?? item.isActive}
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
    if (React.isValidElement(iconNode)) return iconNode;
    return <>{iconNode}</>;
  }, [iconNode]);
  return (
    iconElement ?? (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <CoreIcon iconSpec={iconSpec} />
    )
  );
}

interface MenuItemProps
  extends Partial<React.ComponentProps<typeof DropdownMenu.Item>> {
  item: ToolbarItem;
}

/** @internal */
export function MenuItem(props: MenuItemProps) {
  const { item, ...rest } = props;
  const label = useConditionalProp(item.label);
  return <DropdownMenu.Item label={label} {...rest} />;
}
