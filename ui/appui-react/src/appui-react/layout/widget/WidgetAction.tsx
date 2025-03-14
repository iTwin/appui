/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { MenuItem } from "@itwin/itwinui-react";
import { WidgetActionDropdownContext } from "../../preview/widget-action-dropdown/MoreButton.js";
import { TabBarButton } from "./Button.js";
import type { WidgetActions } from "./WidgetActions.js";

interface WidgetActionProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  icon: React.JSX.Element;
  onClick?: () => void;
}

/** A widget action rendered in a widget title bar.
 * Should be used in {@link WidgetActions} component.
 * @alpha
 */
export function WidgetAction(props: WidgetActionProps) {
  const { label, icon, onClick, ...rest } = props;
  const dropdownContext = React.useContext(WidgetActionDropdownContext);
  if (dropdownContext !== undefined) {
    return (
      <MenuItem
        startIcon={icon}
        onClick={() => {
          onClick?.();
          dropdownContext.onClose();
        }}
        {...rest}
      >
        {label}
      </MenuItem>
    );
  }
  return (
    <TabBarButton onClick={onClick} label={label} {...rest}>
      {icon}
    </TabBarButton>
  );
}
