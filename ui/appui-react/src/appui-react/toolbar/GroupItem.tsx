/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type {
  ConditionalStringValue,
  OnItemExecutedFunc,
  StringGetter,
} from "@itwin/appui-abstract";
import { ActionButtonItemDef } from "../shared/ActionButtonItemDef";
import type { AnyItemDef } from "../shared/AnyItemDef";
import type { GroupItemProps } from "../shared/GroupItemProps";
import type { ItemDefBase } from "../shared/ItemDefBase";
import { ItemList, ItemMap } from "../shared/ItemMap";
import { PropsHelper } from "../utils/PropsHelper";
import type { ToolbarItemUtilities } from "./ToolbarItemUtilities";

/* eslint-disable deprecation/deprecation */

/** An Item that opens a group of items.
 * @public
 * @deprecated in 4.15.0. Use {@link ToolbarItemUtilities.createGroupItem} instead.
 */
export class GroupItemDef extends ActionButtonItemDef {
  private static _sId = 0;
  public static groupIdPrefix = "Group-";

  public groupId: string;
  public itemsInColumn: number;
  public items: AnyItemDef[];
  public defaultActiveItemId?: string;

  /** @internal */
  public overflow: boolean = false;

  private _itemList!: ItemList;
  private _itemMap!: ItemMap;
  private _panelLabel: string | StringGetter | ConditionalStringValue = "";

  constructor(
    groupItemProps: GroupItemProps,
    onItemExecuted?: OnItemExecutedFunc
  ) {
    super(groupItemProps, onItemExecuted);

    this.groupId =
      groupItemProps.groupId !== undefined ? groupItemProps.groupId : "";
    if (groupItemProps.groupId) this.groupId = groupItemProps.groupId;
    else {
      GroupItemDef._sId++;
      this.groupId = GroupItemDef.groupIdPrefix + GroupItemDef._sId;
    }

    this.itemsInColumn =
      groupItemProps.itemsInColumn !== undefined
        ? groupItemProps.itemsInColumn
        : 7;
    this._panelLabel = PropsHelper.getStringSpec(
      groupItemProps.panelLabel,
      groupItemProps.panelLabelKey
    );
    this.items = groupItemProps.items;
    this.defaultActiveItemId = groupItemProps.defaultActiveItemId;
  }

  public get id(): string {
    return this.groupId;
  }

  /** Get the panelLabel string */
  public get panelLabel(): string {
    return PropsHelper.getStringFromSpec(this._panelLabel);
  }

  /** Set the panelLabel.
   * @param v A string or a function to get the string.
   */
  public setPanelLabel(v: string | StringGetter | ConditionalStringValue) {
    this._panelLabel = v;
  }

  public resolveItems(force?: boolean): void {
    if (this._itemList && !force) return;

    this._itemList = new ItemList();
    this._itemMap = new ItemMap();

    this.items.map((item: AnyItemDef) => {
      const id: string = item.id;
      this._itemList.addItem(item);
      this._itemMap.set(id, item);
    });
  }

  public getItemById(id: string): ItemDefBase | undefined {
    return this._itemMap.get(id);
  }

  public getItemByIndex(index: number): ItemDefBase | undefined {
    return this._itemList.items[index];
  }

  public get itemCount(): number {
    return this._itemList.items.length;
  }

  public override execute(): void {}
}
