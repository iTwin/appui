/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { Icon } from "@itwin/core-react";
import { IconButton } from "@itwin/itwinui-react";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import { useConditionalProp } from "../../hooks/useConditionalProp.js";
import { Badge } from "./Badge.js";
import { ToolbarContext, ToolbarItemContext } from "./Toolbar.js";
import { useSafeContext } from "../../hooks/useSafeContext.js";
import { Separator } from "./Separator.js";

interface ItemProps extends Partial<React.ComponentProps<typeof IconButton>> {
  item: ToolbarItem;
}

/** @internal */
export const Item = React.forwardRef<HTMLButtonElement, ItemProps>(
  function Item(props, ref) {
    const { item, ...other } = props;
    const { renderSeparator } = useSafeContext(ToolbarItemContext);
    const label = useConditionalProp(item.label);
    const isActiveCondition = useConditionalProp(item.isActiveCondition);
    const isDisabled = useConditionalProp(item.isDisabled);
    const isHidden = useConditionalProp(item.isHidden);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const iconSpec = useConditionalProp(item.icon);
    const labelProps = useLabelProps();

    return (
      <>
        {isHidden ? undefined : (
          <IconButton
            styleType="borderless"
            disabled={isDisabled}
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            isActive={isActiveCondition ?? item.isActive}
            label={label}
            labelProps={labelProps}
            style={props.style}
            ref={ref}
            data-item-id={item.id}
            {...other}
          >
            {item.iconNode ?? (
              /* eslint-disable-next-line @typescript-eslint/no-deprecated */
              <Icon iconSpec={iconSpec} />
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Badge badge={item.badge} badgeKind={item.badgeKind} />
            {props.children}
          </IconButton>
        )}
        {renderSeparator && <Separator />}
      </>
    );
  }
);

/** @internal */
export function useLabelProps() {
  const { popoverOpen, expandsTo } = useSafeContext(ToolbarContext);
  const [internalVisible, setInternalVisible] = React.useState(false);
  const visible = popoverOpen ? false : internalVisible;
  return {
    placement: expandsTo,
    visible,
    onVisibleChange: setInternalVisible,
  } as const;
}
