/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import * as React from "react";
import type { StatusBarItem } from "../statusbar/StatusBarItem";
import { StatusBarSection } from "../statusbar/StatusBarItem";
import { StatusBarItemUtilities } from "../statusbar/StatusBarItemUtilities";
import { SectionsStatusField } from "../statusfields/SectionsField";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import type { UiItemsProvider } from "./UiItemsProvider";
import { ToolbarItems } from "../tools/ToolbarItems";

/**
 * Defines what tools to include from the provider. If any tools in the horizontal or vertical group are
 * specified then only those tools will be provided to stage.
 * @public
 */
export interface DefaultContentTools {
  horizontal?: {
    clearSelection?: boolean;
    clearDisplayOverrides?: boolean;
    /** if group then group button is shown to allow user to hide by element, category, model */
    hide?: "group" | "element";
    /** if group then group button is shown to allow user to isolate by element, category, model */
    isolate?: "group" | "element";
    /** only element is currently support for emphasize */
    emphasize?: "element";
  };
  vertical?: {
    selectElement?: boolean;
    measureGroup?: boolean;
    sectionGroup?: boolean;
  };
}

function getGroupPriority(potentialId: any, defaultValue: number) {
  if (undefined === potentialId) return defaultValue;

  if (typeof potentialId === "number") {
    return potentialId;
  }

  return defaultValue;
}

/** Provides standard content manipulation items.
 * @public
 */
export class StandardContentToolsUiItemsProvider implements UiItemsProvider {
  public get id(): string {
    return "appui-react:StandardContentToolsUiItemsProvider";
  }

  constructor(private defaultContextTools?: DefaultContentTools) {}

  /** @deprecated in 4.17.0. Property of a deprecated interface {@link UiItemsProvider.provideToolbarItems}. */
  public provideToolbarItems(
    _stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation,
    stageAppData?: any
  ): ToolbarItem[] {
    const allItems = getAllToolbarItems(this.defaultContextTools, stageAppData);
    return allItems.filter(
      (item) =>
        item.layouts?.standard?.usage === toolbarUsage &&
        item.layouts?.standard?.orientation === toolbarOrientation
    );
  }

  public getToolbarItems(): readonly ToolbarItem[] {
    return getAllToolbarItems(this.defaultContextTools, undefined);
  }

  /** @deprecated in 4.17.0. Property of a deprecated interface {@link UiItemsProvider.provideStatusBarItems}. */
  public provideStatusBarItems(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    return this.getStatusBarItems() as StatusBarItem[];
  }

  public getStatusBarItems(): readonly StatusBarItem[] {
    const statusBarItems: StatusBarItem[] = [];

    // if the sectionGroup tools are to be shown then we want the status field added to allow clearing or manipulation the section
    if (this.defaultContextTools?.vertical?.sectionGroup) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "uifw.Sections",
          section: StatusBarSection.Center,
          itemPriority: 20,
          content: <SectionsStatusField hideWhenUnused />,
        })
      );
    }

    return statusBarItems;
  }
}

// Extracted due to discontinued `stageAppData` usage, until `provideToolbarItems` is removed.
function getAllToolbarItems(
  defaultContextTools?: DefaultContentTools,
  stageAppData?: any
): ToolbarItem[] {
  const items: ToolbarItem[] = [];
  const clearSelectionGroupPriority = getGroupPriority(
    stageAppData?.defaultContentTools?.horizontal?.clearSelectionGroupPriority,
    10
  );
  const overridesGroupPriority = getGroupPriority(
    stageAppData?.defaultContentTools?.horizontal?.overridesGroupPriority,
    20
  );

  const horizontal = {
    standard: {
      usage: ToolbarUsage.ContentManipulation,
      orientation: ToolbarOrientation.Horizontal,
    },
  };
  if (
    !defaultContextTools ||
    !defaultContextTools.horizontal ||
    defaultContextTools.horizontal.clearSelection
  )
    items.push(
      ToolbarItems.createClearSelection({
        itemPriority: 10,
        groupPriority: clearSelectionGroupPriority,
        layouts: horizontal,
      })
    );

  if (
    !defaultContextTools ||
    !defaultContextTools.horizontal ||
    defaultContextTools.horizontal.clearDisplayOverrides
  )
    items.push(
      ToolbarItems.createClearHideIsolateEmphasizeElements({
        itemPriority: 20,
        groupPriority: overridesGroupPriority,
        layouts: horizontal,
      })
    );

  if (
    !defaultContextTools ||
    !defaultContextTools.horizontal ||
    defaultContextTools.horizontal.hide
  ) {
    if (defaultContextTools?.horizontal?.hide === "group")
      items.push(
        ToolbarItems.createHideSectionGroup({
          itemPriority: 30,
          groupPriority: overridesGroupPriority,
          layouts: horizontal,
        })
      );
    else
      items.push(
        ToolbarItems.createHideElements({
          itemPriority: 30,
          groupPriority: overridesGroupPriority,
          layouts: horizontal,
        })
      );
  }

  if (
    !defaultContextTools ||
    !defaultContextTools.horizontal ||
    defaultContextTools.horizontal.isolate
  ) {
    if (defaultContextTools?.horizontal?.isolate === "group")
      items.push(
        ToolbarItems.createIsolateSelectionGroup({
          itemPriority: 40,
          groupPriority: overridesGroupPriority,
          layouts: horizontal,
        })
      );
    else
      items.push(
        ToolbarItems.createIsolateElements({
          itemPriority: 40,
          groupPriority: overridesGroupPriority,
          layouts: horizontal,
        })
      );
  }

  if (
    !defaultContextTools ||
    !defaultContextTools.horizontal ||
    defaultContextTools.horizontal.emphasize
  ) {
    items.push(
      ToolbarItems.createEmphasizeElements({
        itemPriority: 50,
        groupPriority: overridesGroupPriority,
        layouts: horizontal,
      })
    );
  }

  const vertical = {
    standard: {
      usage: ToolbarUsage.ContentManipulation,
      orientation: ToolbarOrientation.Vertical,
    },
  };
  const selectElementGroupPriority = getGroupPriority(
    stageAppData?.defaultContentTools?.vertical?.selectElementGroupPriority,
    10
  );
  const measureGroupPriority = getGroupPriority(
    stageAppData?.defaultContentTools?.vertical?.measureGroupPriority,
    10
  );
  const selectionGroupPriority = getGroupPriority(
    stageAppData?.defaultContentTools?.vertical?.selectionGroupPriority,
    10
  );

  if (
    !defaultContextTools ||
    !defaultContextTools.vertical ||
    defaultContextTools.vertical.selectElement
  )
    items.push(
      ToolbarItems.createSelectElement({
        itemPriority: 10,
        groupPriority: selectElementGroupPriority,
        layouts: vertical,
      })
    );

  if (
    !defaultContextTools ||
    !defaultContextTools.vertical ||
    defaultContextTools.vertical.measureGroup
  )
    items.push(
      ToolbarItems.createMeasureGroup({
        itemPriority: 20,
        groupPriority: measureGroupPriority,
        layouts: vertical,
      })
    );

  if (
    !defaultContextTools ||
    !defaultContextTools.vertical ||
    defaultContextTools.vertical.sectionGroup
  ) {
    items.push(
      ToolbarItems.createSectionGroup({
        itemPriority: 30,
        groupPriority: selectionGroupPriority,
        layouts: vertical,
      })
    );
  }
  return items;
}
