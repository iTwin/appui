/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import * as React from "react";
import type { AbstractMenuItemProps } from "@itwin/appui-abstract";
import { ConditionalBooleanValue, UiError } from "@itwin/appui-abstract";
import type { IconSpec } from "@itwin/core-react";
import { ContextMenuItem, ContextSubMenu } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";
import type { ActionButtonItemDef } from "./ActionButtonItemDef";
import { CommandItemDef } from "./CommandItemDef";
import { ItemDefBase } from "./ItemDefBase";
import type { CommandItemProps, ItemProps } from "./ItemProps";
import type { ConditionalStringValue } from "./ConditionalValue";

/** Menu Item Properties
 * @public
 * @deprecated in 4.11.x. Please use {@link CursorMenuItemProps}.
 */
export type MenuItemProps = AbstractMenuItemProps;

/**
 * Properties for context menu items.
 * @public
 */
export interface CursorMenuItemProps extends ItemProps {
  /** The id for the menu item. */
  id: string;
  /** The item to execute when this item is invoked. Either 'item' or 'submenu' must be specified. */
  item?: CommandItemProps;
  /** Nested array of item props. Either 'item' or 'submenu' must be specified. */
  submenu?: CursorMenuItemProps[];
  /** Icon to display on right side of the menu item.
   * Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id.
   */
  iconRight?: string | ConditionalStringValue;
}

/** Menu Item
 * @alpha
 */
export class MenuItem extends ItemDefBase {
  private _id = "";
  private _actionItem?: ActionButtonItemDef;
  private _submenu: MenuItem[];
  private _onSelection?: () => void;

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
    } else if (props.submenu) {
      props.submenu.forEach((childProps: CursorMenuItemProps) => {
        const childItem = new MenuItem(childProps, onSelection);
        this._submenu.push(childItem);
      });
    } else {
      // eslint-disable-next-line deprecation/deprecation
      throw new UiError(
        UiFramework.loggerCategory(this),
        `Either 'item' or 'submenu' must be specified for '${props.id}'.`
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
    });

    if (this._onSelection) this._onSelection();
  }
}

/** Menu Item helper methods
 * @alpha
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
