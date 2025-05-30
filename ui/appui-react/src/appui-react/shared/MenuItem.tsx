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
import type { BadgeType, CommonProps, IconSpec } from "@itwin/core-react";
import type { BadgeKind } from "@itwin/core-react/internal";
import { ContextMenuItem, ContextSubMenu } from "@itwin/core-react";
import { UiFramework } from "../UiFramework.js";
import type { ActionButtonItemDef } from "./ActionButtonItemDef.js";
import { CommandItemDef } from "./CommandItemDef.js";
import { ItemDefBase } from "./ItemDefBase.js";
import type { CommandItemProps } from "./ItemProps.js";
import type { ConditionalStringValue } from "./ConditionalValue.js";

/** Properties for context menu items.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface CursorMenuItemProps extends CommonProps {
  /** The id for the menu item. */
  id: string;
  /** Icon to display. */
  iconNode?: React.ReactNode;
  /** Icon to display.
   * @deprecated in 4.16.0. Use {@link CursorMenuItemProps.iconNode} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
  /** The item to execute when this item is invoked. Either 'item', 'submenu' or `execute` must be specified.
   * @deprecated in 4.15.0. Use properties of this object instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  item?: CommandItemProps;
  /** Function to execute. */
  execute?: () => any;
  /** Nested array of item props. Either 'item', 'submenu' or 'execute' must be specified. */
  submenu?: CursorMenuItemProps[];
  /** Icon to display on right side of the menu item.
   * Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id.
   * @deprecated in 5.4.0. Use {@link CursorMenuItemProps.iconRightNode} instead.
   */
  iconRight?: string | ConditionalStringValue;
  /** Icon to display on right side of the menu item. */
  iconRightNode?: React.ReactNode;

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
  /** Badge to be overlaid on the item.
   * @deprecated in 4.16.0. Use `badgeKind` property instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  badgeType?: BadgeType;
  /** Specifies the kind of badge, if any, to be overlaid on the item. */
  badgeKind?: BadgeKind;
  /** Abstract icon definition. Used when creating itemDef from abstract item (ie. MenuItem).
   * @deprecated in 4.16.0. Use {@link CursorMenuItemProps.iconNode} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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

/* eslint-disable @typescript-eslint/no-deprecated */

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
      if (!this.label) this.setLabel(this._actionItem.label);
      if (!this.badgeType) this.badgeType = this._actionItem.badgeType;
      if (!this.badgeKind) this.badgeKind = this._actionItem.badgeKind;
      if (!this.isDisabled) this.isDisabled = this._actionItem.isDisabled;
    } else if (props.execute) {
      this._execute = props.execute;
    } else if (props.submenu) {
      props.submenu.forEach((childProps) => {
        const childItem = new MenuItem(childProps, onSelection);
        this._submenu.push(childItem);
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      throw new UiError(
        UiFramework.loggerCategory("MenuItem"),
        `Either 'item', 'execute' or 'submenu' must be specified for '${props.id}'.`
      );
    }

    this.iconSpec = props.iconNode ?? props.icon ?? this._actionItem?.iconSpec;
    this.iconRightSpec = props.iconRightNode ?? props.iconRight;
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
    itemPropsList.forEach((itemProps) => {
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
    const label = item.label;
    const iconSpec = item.iconSpec;
    const iconRightSpec = item.iconRightSpec;
    const badgeType = item.badgeType;
    const badgeKind = item.badgeKind;
    const isDisabled: boolean = ConditionalBooleanValue.getValue(
      item.isDisabled
    );

    if (item.submenu && item.submenu.length > 0) {
      const items = this.createMenuItemNodes(item.submenu);

      return (
        <ContextSubMenu
          key={index}
          icon={iconSpec}
          label={label}
          badgeType={badgeType}
          badgeKind={badgeKind}
          disabled={isDisabled}
        >
          {items}
        </ContextSubMenu>
      );
    }

    return (
      <ContextMenuItem
        key={index}
        onSelect={() => item.itemPicked()}
        icon={iconSpec}
        iconRight={iconRightSpec}
        badgeType={badgeType}
        badgeKind={badgeKind}
        disabled={isDisabled}
      >
        {label}
      </ContextMenuItem>
    );
  }
}
