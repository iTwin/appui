/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Widget */

import * as React from "react";

import { ActionItemInsertSpec, GroupItemInsertSpec, PluginUiManager, ToolbarItemInsertSpec, ToolbarItemType, ConditionalDisplayType } from "@bentley/ui-abstract";
import { Orientation } from "@bentley/ui-core";
import { Direction, ToolbarPanelAlignment } from "@bentley/ui-ninezone";

import { WidgetDef, ToolbarWidgetProps } from "./WidgetDef";
import { CommandItemDef } from "../shared/CommandItemDef";
import { ItemList } from "../shared/ItemMap";
import { Toolbar } from "../toolbar/Toolbar";
import { ItemDefBase, BaseItemState } from "../shared/ItemDefBase";
import { GroupItemDef } from "../toolbar/GroupItem";
import { ConditionalItemDef } from "../shared/ConditionalItemDef";
import { AnyItemDef } from "../shared/AnyItemDef";

/** A Toolbar Widget normally displayed in the top left & top right zones in the 9-Zone Layout system.
 * @public
 */
export class ToolbarWidgetDefBase extends WidgetDef {
  public horizontalDirection: Direction;
  public verticalDirection: Direction;

  public horizontalPanelAlignment: ToolbarPanelAlignment;
  public verticalPanelAlignment: ToolbarPanelAlignment;

  public horizontalItems?: ItemList;
  public verticalItems?: ItemList;
  protected _cachedHorizontalItems?: ItemList;
  protected _cachedVerticalItems?: ItemList;
  private _toolbarBaseName = "";

  constructor(def: ToolbarWidgetProps) {
    super(def);

    this.horizontalDirection = (def.horizontalDirection !== undefined) ? def.horizontalDirection : Direction.Bottom;
    this.verticalDirection = (def.verticalDirection !== undefined) ? def.verticalDirection : Direction.Right;

    this.horizontalPanelAlignment = ToolbarPanelAlignment.Start;
    this.verticalPanelAlignment = ToolbarPanelAlignment.Start;

    this.horizontalItems = def.horizontalItems;
    this.verticalItems = def.verticalItems;
  }

  public set widgetBaseName(baseName: string) {
    this._toolbarBaseName = baseName;
  }
  public get widgetBaseName() {
    return this._toolbarBaseName;
  }

  private createItemDefFromInsertSpec(spec: ToolbarItemInsertSpec): ItemDefBase | undefined {
    let itemDef: ItemDefBase | undefined;

    // istanbul ignore else
    if (ToolbarItemType.ActionButton === spec.itemType) {
      const actionSpec = spec as ActionItemInsertSpec;
      itemDef = new CommandItemDef({
        commandId: actionSpec.itemId,
        iconSpec: actionSpec.icon,
        label: actionSpec.label,
        execute: actionSpec.execute,
        badgeType: actionSpec.badge,
      });
    } else if (ToolbarItemType.GroupButton === spec.itemType) {
      const groupSpec = spec as GroupItemInsertSpec;
      const childItems: AnyItemDef[] = [];
      groupSpec.items.forEach((childSpec: ToolbarItemInsertSpec) => {
        const childItem = this.createItemDefFromInsertSpec(childSpec) as AnyItemDef;
        if (childItem)
          childItems.push(childItem);
      });
      itemDef = new GroupItemDef({
        groupId: groupSpec.itemId,
        iconSpec: groupSpec.icon,
        label: groupSpec.label,
        badgeType: groupSpec.badge,
        items: childItems,
      });
    }

    // If conditional display options are defined set up item def with necessary stateFunc and stateSyncIds
    // istanbul ignore else
    if (itemDef) {
      // istanbul ignore else
      if (spec.condition && spec.condition.testFunc && spec.condition.syncEventIds.length > 0) {
        if (spec.condition.type === ConditionalDisplayType.Visibility) {
          itemDef.stateFunc = (state: Readonly<BaseItemState>): BaseItemState => {
            return spec.condition!.testFunc() ? { ...state, isVisible: true } : { ...state, isVisible: false };
          };
        } else {
          itemDef.stateFunc = (state: Readonly<BaseItemState>): BaseItemState => {
            return spec.condition!.testFunc() ? { ...state, isEnabled: true } : { ...state, isEnabled: false };
          };
        }
        itemDef.stateSyncIds = spec.condition.syncEventIds;
      }
    }

    return itemDef;
  }

  private insertItemDefAtLocation(item: ItemDefBase, itemList: ItemList | ItemDefBase[], parentGroupId: string | undefined, insertAtStart: boolean): void {
    // istanbul ignore else
    if (!parentGroupId) {
      if (insertAtStart)
        itemList.splice(0, 0, item);
      else
        itemList.push(item);
      return;
    }

    // see if the parentGroupId is contained in the current or nested item list.
    itemList.forEach((siblingItem: ItemDefBase) => {
      // istanbul ignore else
      if (siblingItem instanceof ConditionalItemDef) {
        this.insertItemDefAtLocation(item, siblingItem.items, parentGroupId, insertAtStart);
        siblingItem.resolveItems(true);
        return;
      }
      // istanbul ignore else
      if (siblingItem instanceof GroupItemDef) {
        this.insertItemDefAtLocation(item, siblingItem.items, parentGroupId === siblingItem.id ? undefined : parentGroupId, insertAtStart);
        siblingItem.resolveItems(true);
        return;
      }
    });
  }

  /** Ensure all containers are duplicated so new items can be inserted while preserving the original Groups */
  private mergeItems(originalItems: AnyItemDef[]): AnyItemDef[] {
    const mergedItemList: AnyItemDef[] = [];

    originalItems.forEach((item: AnyItemDef) => {
      if (item instanceof GroupItemDef) {
        mergedItemList.push(this.copyGroupItemDef(item));
      } else {
        mergedItemList.push(item);
      }
    });
    return mergedItemList;
  }

  private copyConditionalItemDef(originalItem: ConditionalItemDef): ConditionalItemDef {
    // Istanbul ignore next
    let newConditionalItemDef = new ConditionalItemDef({ conditionalId: originalItem.id, items: [] });
    // copy data from original object
    newConditionalItemDef = Object.assign(newConditionalItemDef, originalItem);
    // generate new list of child items
    newConditionalItemDef.items = this.mergeItems(originalItem.items);
    newConditionalItemDef.resolveItems(true);
    return newConditionalItemDef;
  }

  private copyGroupItemDef(originalGroup: GroupItemDef): GroupItemDef {
    // Istanbul ignore next
    let newGroupItemDef = new GroupItemDef({ groupId: originalGroup.id, items: [], direction: originalGroup.direction, itemsInColumn: originalGroup.itemsInColumn });
    // copy data from original object
    newGroupItemDef = Object.assign(newGroupItemDef, originalGroup);
    // generate new list of child items
    newGroupItemDef.items = this.mergeItems(originalGroup.items);
    newGroupItemDef.resolveItems(true);
    return newGroupItemDef;
  }

  /** Create a Merged ItemList leaving the original ItemList untouched. */
  // Istanbul ignore next
  protected createMergedItemList(originalItemList: ItemList | undefined, insertSpecs: ToolbarItemInsertSpec[], insertAtStart = false) {
    // initially just copy original list and add new items to it.
    const mergedItemList = new ItemList();
    // istanbul ignore else
    if (originalItemList) {
      originalItemList.items.forEach((item: ItemDefBase) => {
        if (item instanceof ConditionalItemDef) {
          mergedItemList.addItem(this.copyConditionalItemDef(item));
        } else if (item instanceof GroupItemDef) {
          mergedItemList.addItem(this.copyGroupItemDef(item));
        } else {
          mergedItemList.addItem(item);
        }
      });
    }

    insertSpecs.forEach((spec: ToolbarItemInsertSpec) => {
      const itemToInsert = this.createItemDefFromInsertSpec(spec);
      // istanbul ignore else
      if (itemToInsert) {

        this.insertItemDefAtLocation(itemToInsert, mergedItemList, spec.parentToolGroupId, insertAtStart);
      }
    });
    return mergedItemList;
  }

  protected createCachedHorizontalItemList(toolbarId: string): void {
    const insertSpecs = PluginUiManager.getToolbarItems(toolbarId);
    // istanbul ignore else
    if (insertSpecs && insertSpecs.length > 0) {
      // hacky way, but I don't want to modify public api to pass this in
      const insertAtStart = (-1 !== this.widgetBaseName.search("NavigationWidget")); // use insert before on horizontal toolbar of Navigation Widget.

      this._cachedHorizontalItems = this.createMergedItemList(this.horizontalItems, insertSpecs, insertAtStart);
    }
  }

  protected createCachedVerticalItemList(toolbarId: string): void {
    const insertSpecs = PluginUiManager.getToolbarItems(toolbarId);
    // istanbul ignore else
    if (insertSpecs && insertSpecs.length > 0) {
      this._cachedVerticalItems = this.createMergedItemList(this.verticalItems, insertSpecs);
    }
  }

  public generateMergedItemLists(): void {
    this._cachedHorizontalItems = undefined;
    this._cachedVerticalItems = undefined;

    // istanbul ignore else
    if (PluginUiManager.hasRegisteredProviders) {
      this.createCachedHorizontalItemList(`${this.widgetBaseName}-horizontal`);
      this.createCachedVerticalItemList(`${this.widgetBaseName}-vertical`);
    }
  }

  public renderHorizontalToolbar(): React.ReactNode {
    const toolbarItems = this._cachedHorizontalItems ? this._cachedHorizontalItems : this.horizontalItems;
    if (toolbarItems && toolbarItems.items.length) {
      return (
        <Toolbar
          toolbarId={`${this.widgetBaseName}-horizontal`}
          orientation={Orientation.Horizontal}
          expandsTo={this.horizontalDirection}
          panelAlignment={this.horizontalPanelAlignment}
          items={toolbarItems}
        />
      );
    }

    return null;
  }

  public renderVerticalToolbar(): React.ReactNode {
    const toolbarItems = this._cachedVerticalItems ? this._cachedVerticalItems : this.verticalItems;
    if (toolbarItems && toolbarItems.items.length) {
      return (
        <Toolbar
          toolbarId={`${this.widgetBaseName}-vertical`}
          orientation={Orientation.Vertical}
          expandsTo={this.verticalDirection}
          panelAlignment={this.verticalPanelAlignment}
          items={toolbarItems}
        />
      );
    }

    return null;
  }
}
