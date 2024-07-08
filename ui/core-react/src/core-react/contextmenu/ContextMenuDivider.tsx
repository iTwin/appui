/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContextMenu
 */

import * as React from "react";
import classnames from "classnames";
import type { CommonProps } from "../utils/Props";

/* eslint-disable deprecation/deprecation */

/** Menu Divider for [[ContextMenu]]. Inserts a line between items, used for list item grouping.
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/components-react#ContextMenu.Divider} component instead.
 */
export class ContextMenuDivider extends React.PureComponent<CommonProps> {
  public override render(): React.ReactElement {
    const { className, ...props } = this.props;
    return (
      <div
        {...props}
        data-testid="core-context-menu-divider"
        className={classnames("core-context-menu-divider", className)}
      />
    );
  }
}
