/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type * as React from "react";
import { ActionButtonItemDef } from "./ActionButtonItemDef";
import type { CustomItemProps } from "./CustomItemProps";

/** An Item that renders a React component.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export class CustomItemDef extends ActionButtonItemDef {
  private static _sId = 0;
  public static customIdPrefix = "Custom-";
  public customId: string;
  public popupPanelNode?: React.ReactNode;

  constructor(props: CustomItemProps) {
    super(props);

    if (props.customId) this.customId = props.customId;
    else {
      CustomItemDef._sId++;
      this.customId = CustomItemDef.customIdPrefix + CustomItemDef._sId;
    }

    this.popupPanelNode = props.popupPanelNode;
  }

  public get id(): string {
    return this.customId;
  }
}
