/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import * as React from "react";
import type {
  AbstractMenuItemProps,
  StringGetter,
} from "@itwin/appui-abstract";
import { ConditionalBooleanValue, UiError } from "@itwin/appui-abstract";
import type { BadgeType, IconProps, IconSpec } from "@itwin/core-react";
import { ContextMenuItem, ContextSubMenu } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";
import type { ActionButtonItemDef } from "./ActionButtonItemDef";
import { CommandItemDef } from "./CommandItemDef";
import { ItemDefBase } from "./ItemDefBase";
import type { CommandItemProps } from "./ItemProps";
import type { ConditionalStringValue } from "./ConditionalValue";

/** Properties for context menu items.
 * @public
 */
export interface CursorMenuItemProps extends IconProps {
  /** The id for the menu item. */
  id: string;
  /** The item to execute when this item is invoked. Either 'item' or 'submenu' must be specified.
   * @deprecated in 4.15.0. Use properties of this object instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  item?: CommandItemProps;
  /** Function to execute. */
  execute?: () => any;
  /** Nested array of item props. Either 'item' or 'submenu' must be specified. */
  submenu?: CursorMenuItemProps[];
  /** Icon to display on right side of the menu item.
   * Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id.
   */
  iconRight?: string | ConditionalStringValue;

  // #region "ItemProps" properties previously extended from deprecated type.

  /** if true component will be hidden - defaults to false */
  isHidden?: boolean | ConditionalBooleanValue;
  /** if true component will be disabled - defaults to false */
  isDisabled?: boolean | ConditionalBooleanValue;
  /** if set, component will be considered "active" an will display an "active stripe" - defaults to false */
  isActive?: boolean;
  /** if set, component will be considered selected but will NOT display an "active stripe" - defaults to false. Typically used by buttons that toggle between two states. */
  isPressed?: boolean;
  /** can be used by application to store miscellaneous data. */
  applicationData?: any;
  /** Badge to be overlaid on the item. */
  badgeType?: BadgeType;
  /** abstract icon definition, used when create itemDef from abstract item (ie. MenuItem) */
  icon?: IconSpec;

  /** if set, it is used to explicitly set the label shown by a component. */
  label?: string | StringGetter | ConditionalStringValue;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if label is not explicitly set. */
  labelKey?: string;

  /** if set, it is used to explicitly set the description shown by a component. */
  description?: string | StringGetter | ConditionalStringValue;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if description is not explicitly set. */
  descriptionKey?: string;
  /** used to explicitly set the tooltip shown by a component. */
  tooltip?: string | StringGetter | ConditionalStringValue;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if label is not explicitly set. */
  tooltipKey?: string;

  // #endregion "ItemProps"
}

/* eslint-disable deprecation/deprecation */

/** Menu Item Properties
 * @public
 * @deprecated in 4.11.0. Please use {@link CursorMenuItemProps}.
 */
export type MenuItemProps = AbstractMenuItemProps;

/** Menu Item
 * @alpha
 * @deprecated in 4.15.0. Used in a deprecated class {@link MenuItemHelpers}.
 */
export class MenuItem extends ItemDefBase {
  private _id = "";
  private _actionItem?: ActionButtonItemDef;
  private _submenu: MenuItem[];
  private _onSelection?: () => void;
  private _execute?: () => void;

  /** onSelection is an optional parameter typically supplied to allow menu parent to close context menu when a menu item is selected. */
  constructor(props: CursorMenuItemProps, onSelection?: () => void) {
    super(props);

    this._id = props.id;
    this._submenu = new Array<MenuItem>();
    this._onSelection = onSelection;

    if (props.item) {
      this._actionItem = new CommandItemDef(props.item);

      // Copy over icon, label & badgeType from the item
      if (!this.iconSpec) this.iconSpec = this._actionItem.iconSpec;
      if (!this.label) this.setLabel(this._actionItem.label);
      if (!this.badgeType) this.badgeType = this._actionItem.badgeType;
      if (!this.isDisabled) this.isDisabled = this._actionItem.isDisabled;
    } else if (props.execute) {
      this._execute = props.execute;
    } else if (props.submenu) {
      props.submenu.forEach((childProps: CursorMenuItemProps) => {
        const childItem = new MenuItem(childProps, onSelection);
        this._submenu.push(childItem);
      });
    } else {
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        `Either 'item', 'execute' or 'submenu' must be specified for '${props.id}'.`
      );
    }

    this.iconRightSpec = props.iconRight;
  }

  public get id(): string {
    return this._id;
  }

  public get submenu(): MenuItem[] {
    return this._submenu;
  }

  public get actionItem(): ActionButtonItemDef | undefined {
    return this._actionItem;
  }

  public iconRightSpec?: IconSpec;

  public itemPicked(): void {
    setTimeout(() => {
      if (this._actionItem) this._actionItem.execute();
      else if (this._execute) this._execute();
    });

    if (this._onSelection) this._onSelection();
  }
}

/** Menu Item helper methods
 * @alpha
 * @deprecated in 4.15.0. Use {@link @itwin/core-react#ContextMenuItem} and {@link @itwin/core-react#ContextSubMenu} components.
 */
export class MenuItemHelpers {
  public static createMenuItems(
    itemPropsList: CursorMenuItemProps[],
    onSelection?: () => void
  ): MenuItem[] {
    const menuItems = new Array<MenuItem>();
    itemPropsList.forEach((itemProps: CursorMenuItemProps) => {
      menuItems.push(new MenuItem(itemProps, onSelection));
    });
    return menuItems;
  }

  public static createMenuItemNodes(itemList: MenuItem[]): React.ReactNode[] {
    const itemNodes: React.ReactNode[] = [];

    itemList.forEach((item: MenuItem, index: number) => {
      const reactItem = this.createMenuItemNode(item, index);
      if (reactItem) itemNodes.push(reactItem);
    });

    return itemNodes;
  }

  private static createMenuItemNode(
    item: MenuItem,
    index: number
  ): React.ReactNode {
    let node: React.ReactNode = null;
    const label = item.label;
    const iconSpec = item.iconSpec;
    const iconRightSpec = item.iconRightSpec;
    const badgeType = item.badgeType;
    const isDisabled: boolean = ConditionalBooleanValue.getValue(
      item.isDisabled
    );

    if (item.actionItem) {
      const sel = () => item.itemPicked();
      node = (
        <ContextMenuItem
          key={index}
          onSelect={sel}
          icon={iconSpec}
          iconRight={iconRightSpec}
          badgeType={badgeType}
          disabled={isDisabled}
        >
          {label}
        </ContextMenuItem>
      );
    } else {
      if (item.submenu && item.submenu.length > 0) {
        const items = this.createMenuItemNodes(item.submenu);

        node = (
          <ContextSubMenu
            key={index}
            icon={iconSpec}
            label={label}
            badgeType={badgeType}
            disabled={isDisabled}
          >
            {items}
          </ContextSubMenu>
        );
      }
    }

    return node;
  }
}
