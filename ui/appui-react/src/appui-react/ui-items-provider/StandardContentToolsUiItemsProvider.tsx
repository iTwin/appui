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

/**
 * @beta
 */
export class StandardContentToolsUiItemsProvider implements UiItemsProvider {
  public get id(): string {
    return "appui-react:StandardContentToolsUiItemsProvider";
  }

  constructor(private defaultContextTools?: DefaultContentTools) {}

  public provideToolbarItems(
    _stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation,
    stageAppData?: any
  ): ToolbarItem[] {
    const items: ToolbarItem[] = [];

    if (
      toolbarUsage === ToolbarUsage.ContentManipulation &&
      toolbarOrientation === ToolbarOrientation.Horizontal
    ) {
      const clearSelectionGroupPriority = getGroupPriority(
        stageAppData?.defaultContentTools?.horizontal
          ?.clearSelectionGroupPriority,
        10
      );
      const overridesGroupPriority = getGroupPriority(
        stageAppData?.defaultContentTools?.horizontal?.overridesGroupPriority,
        20
      );

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.horizontal ||
        this.defaultContextTools.horizontal.clearSelection
      )
        items.push(
          ToolbarItems.createClearSelection({
            itemPriority: 10,
            groupPriority: clearSelectionGroupPriority,
          })
        );

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.horizontal ||
        this.defaultContextTools.horizontal.clearDisplayOverrides
      )
        items.push(
          ToolbarItems.createClearHideIsolateEmphasizeElements({
            itemPriority: 20,
            groupPriority: overridesGroupPriority,
          })
        );

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.horizontal ||
        this.defaultContextTools.horizontal.hide
      ) {
        if (this.defaultContextTools?.horizontal?.hide === "group")
          items.push(
            ToolbarItems.createHideSectionGroup({
              itemPriority: 30,
              groupPriority: overridesGroupPriority,
            })
          );
        else
          items.push(
            ToolbarItems.createHideElements({
              itemPriority: 30,
              groupPriority: overridesGroupPriority,
            })
          );
      }

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.horizontal ||
        this.defaultContextTools.horizontal.isolate
      ) {
        if (this.defaultContextTools?.horizontal?.isolate === "group")
          items.push(
            ToolbarItems.createIsolateSelectionGroup({
              itemPriority: 40,
              groupPriority: overridesGroupPriority,
            })
          );
        else
          items.push(
            ToolbarItems.createIsolateElements({
              itemPriority: 40,
              groupPriority: overridesGroupPriority,
            })
          );
      }

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.horizontal ||
        this.defaultContextTools.horizontal.emphasize
      ) {
        items.push(
          ToolbarItems.createEmphasizeElements({
            itemPriority: 50,
            groupPriority: overridesGroupPriority,
          })
        );
      }
    } else if (
      toolbarUsage === ToolbarUsage.ContentManipulation &&
      toolbarOrientation === ToolbarOrientation.Vertical
    ) {
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
        !this.defaultContextTools ||
        !this.defaultContextTools.vertical ||
        this.defaultContextTools.vertical.selectElement
      )
        items.push(
          ToolbarItems.createSelectElement({
            itemPriority: 10,
            groupPriority: selectElementGroupPriority,
          })
        );

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.vertical ||
        this.defaultContextTools.vertical.measureGroup
      )
        items.push(
          ToolbarItems.createMeasureGroup({
            itemPriority: 20,
            groupPriority: measureGroupPriority,
          })
        );

      if (
        !this.defaultContextTools ||
        !this.defaultContextTools.vertical ||
        this.defaultContextTools.vertical.sectionGroup
      ) {
        items.push(
          ToolbarItems.createSectionGroup({
            itemPriority: 30,
            groupPriority: selectionGroupPriority,
          })
        );
      }
    }
    return items;
  }

  public provideStatusBarItems(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    const statusBarItems: StatusBarItem[] = [];

    // if the sectionGroup tools are to be shown then we want the status field added to allow clearing or manipulation the section
    if (this.defaultContextTools?.vertical?.sectionGroup) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem(
          "uifw.Sections",
          StatusBarSection.Center,
          20,
          <SectionsStatusField hideWhenUnused />
        )
      );
    }

    return statusBarItems;
  }
}
