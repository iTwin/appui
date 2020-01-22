/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import * as React from "react";
import { BadgeType, StringGetter } from "@bentley/ui-abstract";
import { PropsHelper } from "../utils/PropsHelper";
import { ItemProps } from "./ItemProps";

/** Base state for any 'stateful' React component
 * @public
 */
export interface BaseItemState {
  isVisible?: boolean;        // Default - true
  isEnabled?: boolean;        // Default - true
  isActive?: boolean;         // Default - false
  isPressed?: boolean;        // Default - false
}

/** The base class for Items.
 * @public
 */
export abstract class ItemDefBase {
  private _label: string | StringGetter = "";
  private _tooltip: string | StringGetter = "";
  private _description: string | StringGetter = "";

  public isVisible: boolean = true;
  public isEnabled: boolean = true;
  public isPressed: boolean = false;
  public isActive: boolean = false;
  public applicationData?: any;

  /** @deprecated - use badgeType instead */
  public betaBadge: boolean = false;
  public badgeType?: BadgeType;

  public stateFunc?: (state: Readonly<BaseItemState>) => BaseItemState;
  public stateSyncIds: string[] = [];

  public iconSpec?: string | React.ReactNode;
  public iconElement?: React.ReactNode;

  public static initializeDef(me: ItemDefBase, itemProps: ItemProps): void {

    me.isVisible = (itemProps.isVisible !== undefined) ? itemProps.isVisible : true;
    me.isEnabled = (itemProps.isEnabled !== undefined) ? itemProps.isEnabled : true;
    me.isPressed = (itemProps.isPressed !== undefined) ? itemProps.isPressed : false;
    me.isActive = (itemProps.isActive !== undefined) ? itemProps.isActive : false;

    me.betaBadge = (itemProps.betaBadge !== undefined) ? itemProps.betaBadge : false;   // tslint:disable-line: deprecation
    me.badgeType = itemProps.badgeType;

    if (itemProps.applicationData !== undefined)
      me.applicationData = itemProps.applicationData;
    if (itemProps.iconSpec)
      me.iconSpec = itemProps.iconSpec;

    me._label = PropsHelper.getStringSpec(itemProps.label, itemProps.labelKey);
    me._tooltip = PropsHelper.getStringSpec(itemProps.tooltip, itemProps.tooltipKey);
    me._description = PropsHelper.getStringSpec(itemProps.description, itemProps.descriptionKey);

    if (itemProps.stateFunc)
      me.stateFunc = itemProps.stateFunc;

    if (itemProps.stateSyncIds)
      me.stateSyncIds = itemProps.stateSyncIds.map((value) => value.toLowerCase());
  }

  constructor(itemProps: ItemProps) {
    ItemDefBase.initializeDef(this, itemProps);
  }

  public get trayId() { return undefined; }
  public abstract get id(): string;

  /** Get the label string */
  public get label(): string {
    return PropsHelper.getStringFromSpec(this._label);
  }

  /** Set the label.
   * @param v A string or a function to get the string.
   */
  public setLabel(v: string | StringGetter) {
    this._label = v;
  }

  /** Get the tooltip string */
  public get tooltip(): string {
    return PropsHelper.getStringFromSpec(this._tooltip);
  }

  /** Set the tooltip.
   * @param v A string or a function to get the string.
   */
  public setTooltip(v: string | StringGetter) {
    this._tooltip = v;
  }

  /** Get the description string */
  public get description(): string {
    return PropsHelper.getStringFromSpec(this._description);
  }

  /** Set the description.
   * @param v A string or a function to get the string.
   */
  public setDescription(v: string | StringGetter) {
    this._description = v;
  }
}
