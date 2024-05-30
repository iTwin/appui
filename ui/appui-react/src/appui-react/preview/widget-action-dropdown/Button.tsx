/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { MenuItem } from "@itwin/itwinui-react";
import { WidgetActionDropdownContext } from "./MoreButton";
import { TabBarButton } from "../../layout/widget/Button";

interface ActionButtonProps {
  title?: string;
  icon: React.JSX.Element;
  onClick?: () => void;
  menuProps?: React.ComponentProps<typeof MenuItem>;
  buttonProps?: React.ComponentProps<typeof TabBarButton>;
}

/** @internal */
export function ActionButton(props: ActionButtonProps) {
  const dropdownContext = React.useContext(WidgetActionDropdownContext);
  if (dropdownContext !== undefined) {
    return (
      <MenuItem
        icon={props.icon}
        onClick={() => {
          props.onClick?.();
          dropdownContext.onClose();
        }}
        {...props.menuProps}
      >
        {props.title}
      </MenuItem>
    );
  }
  return (
    <TabBarButton
      onClick={props.onClick}
      title={props.title}
      {...props.buttonProps}
    >
      {props.icon}
    </TabBarButton>
  );
}
