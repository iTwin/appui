/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import { AbstractConditionalItemProps, OnItemExecutedFunc } from "@bentley/ui-abstract";

import { ItemList, ItemMap } from "./ItemMap";
import { ItemDefBase, BaseItemState } from "./ItemDefBase";
import { SyncUiEventArgs } from "../syncui/SyncUiEventDispatcher";
import { ActionButtonItemDef } from "./ActionButtonItemDef";
import { ConditionalItemProps } from "./ConditionalItemProps";
import { ItemDefFactory } from "./ItemDefFactory";
import { AnyItemDef } from "./AnyItemDef";

/** An Item that conditionally renders other items based on UiSync events.
 * @beta
 */
export class ConditionalItemDef extends ItemDefBase {
  private static _sId = 0;
  public static conditionalIdPrefix = "Conditional-";
  public conditionalId: string;
  public items: AnyItemDef[];
  private _itemList!: ItemList;
  private _itemMap!: ItemMap;

  constructor(props: ConditionalItemProps) {
    super(props);

    if (props.conditionalId)
      this.conditionalId = props.conditionalId;
    else {
      ConditionalItemDef._sId++;
      this.conditionalId = ConditionalItemDef.conditionalIdPrefix + ConditionalItemDef._sId;
    }

    this.items = props.items;
  }

  /** @internal */
  public static constructFromAbstractItemProps(abstractItemProps: AbstractConditionalItemProps, onItemExecuted?: OnItemExecutedFunc): ConditionalItemDef {
    const items = ItemDefFactory.createItemListForGroupItem(abstractItemProps.items, onItemExecuted);
    const itemProps: ConditionalItemProps = {
      conditionalId: abstractItemProps.conditionalId,
      items,
    };

    return new ConditionalItemDef(itemProps);
  }

  public get id(): string {
    return this.conditionalId;
  }

  public resolveItems(force?: boolean): void {
    if (this._itemList && !force)
      return;

    this._itemList = new ItemList();
    this._itemMap = new ItemMap();

    this.items.forEach((item: AnyItemDef) => {
      const id: string = item.id;
      this._itemList.addItem(item);
      this._itemMap.set(id, item);
    });
  }

  public handleSyncUiEvent(args: SyncUiEventArgs): boolean {
    let refreshState = false;

    this.resolveItems();

    // istanbul ignore else
    if (this.stateSyncIds && this.stateSyncIds.length > 0) {
      refreshState = this.stateSyncIds.some((value: string): boolean => args.eventIds.has(value));

      // istanbul ignore else
      if (refreshState) {
        // istanbul ignore else
        if (this.stateFunc) {
          const oldState: BaseItemState = { isVisible: this.isVisible, isEnabled: this.isEnabled };
          const newState = this.stateFunc(oldState);

          if (newState.isVisible !== undefined && this.isVisible !== newState.isVisible) {
            this.isVisible = newState.isVisible;
            this._updateChildIsVisible(this.isVisible);
          }

          if (newState.isEnabled !== undefined && this.isEnabled !== newState.isEnabled) {
            this.isEnabled = newState.isEnabled;
            this._updateChildIsEnabled(this.isEnabled);
          }
        }
      }
    }

    return refreshState;
  }

  private _updateChildIsVisible(isVisible: boolean) {
    this._itemList.items.forEach((item: ItemDefBase) => {
      item.isVisible = isVisible;
    });
  }

  private _updateChildIsEnabled(isEnabled: boolean) {
    this._itemList.items.forEach((item: ItemDefBase) => {
      item.isEnabled = isEnabled;
    });
  }

  public getVisibleItems(): ActionButtonItemDef[] {
    this.resolveItems();
    const visibleItems = new Array<ActionButtonItemDef>();
    this._itemList.items.forEach((item: ItemDefBase) => {
      if (item.isVisible && item instanceof ActionButtonItemDef)
        visibleItems.push(item);
    });
    return visibleItems;
  }

}
