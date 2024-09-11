/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import type { ToolbarItem } from "../toolbar/ToolbarItem";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import { ToolbarItems } from "../tools/ToolbarItems";
import type { UiItemsProvider } from "./UiItemsProvider";

/**
 * Defines what tools to include from the provider. If any tools in the horizontal or vertical group are
 * specified then only those tools will be provided to stage.
 * @public
 */
export interface DefaultNavigationTools {
  horizontal?: {
    rotateView?: boolean;
    panView?: boolean;
    fitView?: boolean;
    windowArea?: boolean;
    viewUndoRedo?: boolean;
  };
  vertical?: {
    walk?: boolean;
    toggleCamera?: boolean;
    setupWalkCamera?: boolean;
  };
}

/** Provide standard view navigation items.
 * @public
 */
export class StandardNavigationToolsUiItemsProvider implements UiItemsProvider {
  public get id(): string {
    return "appui-react:StandardNavigationToolsUiItemsProvider";
  }

  constructor(private defaultNavigationTools?: DefaultNavigationTools) {}

  /** @deprecated in 4.17.0. Property of a deprecated interface {@link UiItemsProvider.provideToolbarItems}. */
  public provideToolbarItems(
    _stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation,
    _stageAppData?: any
  ): ToolbarItem[] {
    return this.getToolbarItems().filter(
      (item) =>
        item.layouts?.standard?.orientation === toolbarOrientation &&
        item.layouts?.standard?.usage === toolbarUsage
    );
  }

  public getToolbarItems(): readonly ToolbarItem[] {
    const items: ToolbarItem[] = [];
    const horizontal = {
      standard: {
        orientation: ToolbarOrientation.Horizontal,
        usage: ToolbarUsage.ViewNavigation,
      },
    };
    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.horizontal ||
      this.defaultNavigationTools.horizontal.rotateView
    )
      items.push(
        ToolbarItems.createRotateView({
          itemPriority: 10,
          layouts: horizontal,
        })
      );

    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.horizontal ||
      this.defaultNavigationTools.horizontal.panView
    )
      items.push(
        ToolbarItems.createPanView({
          itemPriority: 20,
          layouts: horizontal,
        })
      );

    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.horizontal ||
      this.defaultNavigationTools.horizontal.fitView
    ) {
      items.push(
        ToolbarItems.createFitView({
          itemPriority: 30,
          layouts: horizontal,
        })
      );
    }

    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.horizontal ||
      this.defaultNavigationTools.horizontal.windowArea
    ) {
      items.push(
        ToolbarItems.createWindowArea({
          itemPriority: 40,
          layouts: horizontal,
        })
      );
    }

    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.horizontal ||
      this.defaultNavigationTools.horizontal.viewUndoRedo
    ) {
      items.push(
        ToolbarItems.createViewUndo({
          itemPriority: 50,
          layouts: horizontal,
        })
      );
      items.push(
        ToolbarItems.createViewRedo({
          itemPriority: 60,
          layouts: horizontal,
        })
      );
    }

    const vertical = {
      standard: {
        orientation: ToolbarOrientation.Vertical,
        usage: ToolbarUsage.ViewNavigation,
      },
    };
    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.vertical ||
      this.defaultNavigationTools.vertical.setupWalkCamera
    )
      items.push(
        ToolbarItems.createSetupWalkCamera({
          itemPriority: 5,
          layouts: vertical,
        })
      );

    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.vertical ||
      this.defaultNavigationTools.vertical.walk
    )
      items.push(
        ToolbarItems.createWalkView({
          itemPriority: 10,
          layouts: vertical,
        })
      );

    if (
      !this.defaultNavigationTools ||
      !this.defaultNavigationTools.vertical ||
      this.defaultNavigationTools.vertical.toggleCamera
    )
      items.push(
        ToolbarItems.createToggleCameraView({
          itemPriority: 20,
          layouts: vertical,
        })
      );
    return items;
  }
}
