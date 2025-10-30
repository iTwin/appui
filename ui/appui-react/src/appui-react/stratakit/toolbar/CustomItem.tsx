/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";
import type { ToolbarCustomItem } from "../../toolbar/ToolbarItem.js";
import { Item } from "./Item.js";
import { Popover } from "@itwin/itwinui-react";

interface CustomItemProps {
  item: ToolbarCustomItem;
}

/** @internal */
export const CustomItem = React.forwardRef<HTMLButtonElement, CustomItemProps>(
  function CustomItem(props, forwardedRef) {
    const { item } = props;
    const [visible, setVisible] = React.useState(false);
    return (
      <Popover
        content={item.panelContent}
        applyBackground
        visible={visible}
        onVisibleChange={setVisible}
        style={{
          padding: "var(--stratakit-space-x1)",
        }}
        middleware={{
          offset: 4,
        }}
      >
        <Toolbar.Item
          render={<Item item={item} />}
          data-has-popover-open={visible ? true : undefined} // TODO: patch iTwinUI Popover usage with StrataKit trigger
          ref={forwardedRef}
        />
      </Popover>
    );
  }
);
