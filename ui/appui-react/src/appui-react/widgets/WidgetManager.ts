/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { BeUiEvent, Logger } from "@itwin/core-bentley";
import { UiFramework } from "../UiFramework.js";
import { WidgetDef } from "./WidgetDef.js";
import { createStableWidgetDef } from "./StableWidgetDef.js";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import { StagePanelSection } from "../stagepanels/StagePanelSection.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";

/** Information about WidgetDefs in the WidgetManager
 * @internal
 */
export interface WidgetInfo {
  widgetDef: WidgetDef;
  stageId?: string;
  stageUsage?: string;
  location: StagePanelLocation;
  section: StagePanelSection;
}

function getWidgetManagerStableWidgetId(
  stageUsage: string | undefined,
  location: StagePanelLocation,
  section: StagePanelSection,
  index: number
) {
  return `uifw-wm-${stageUsage || ""}-${StagePanelLocation[location]}-${
    StagePanelSection[section]
  }-${index}`;
}

/** Widget Manager class.
 * @beta
 */
export class WidgetManager {
  private _widgets: ReadonlyArray<WidgetInfo> = [];

  /** Event raised when Widgets are changed.
   * @internal
   */
  public readonly onWidgetsChanged = new BeUiEvent<{
    readonly items: ReadonlyArray<WidgetInfo>;
  }>();

  /** @internal */
  public get widgetCount(): number {
    return this._widgets.length;
  }

  /** @internal */
  public get widgets(): ReadonlyArray<WidgetInfo> {
    return this._widgets;
  }
  public set widgets(w: ReadonlyArray<WidgetInfo>) {
    this._widgets = w;
    this.onWidgetsChanged.emit({ items: w });
  }

  /** Adds a WidgetDef for use in a Frontstage.
   * @note Added `widgetDef` must return unique id to correctly save/restore App layout.
   * Semi-stable id is generated when auto-generated `widgetDef` id is detected,
   * but correctness of such id depends on `addWidgetDef` call order and widget location.
   */
  public addWidgetDef(
    widgetDef: WidgetDef,
    stageId: string | undefined,
    stageUsage: string | undefined,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): boolean {
    if (stageId === undefined && stageUsage === undefined) {
      Logger.logError(
        UiFramework.loggerCategory(this),
        `addWidgetDef: stageId or stageUsage param must be specified`
      );
      return false;
    }

    section = section !== undefined ? section : StagePanelSection.Start;
    const index = this._widgets.reduce((acc, info) => {
      if (
        info.stageId === stageId &&
        info.stageUsage === stageUsage &&
        info.location === location &&
        info.section === section
      )
        return acc + 1;
      return acc;
    }, 0);
    const stableId = getWidgetManagerStableWidgetId(
      stageUsage,
      location,
      section,
      index
    );
    const stableWidget = createStableWidgetDef(widgetDef, stableId);
    const newWidget: WidgetInfo = {
      widgetDef: stableWidget,
      stageId,
      stageUsage,
      location,
      section,
    };

    const oldWidgets = this._widgets.filter(
      (info) => info.widgetDef.id !== newWidget.widgetDef.id
    );
    const updatedWidgets = [...oldWidgets, newWidget];
    this.widgets = updatedWidgets;

    return true;
  }

  /** Removes a WidgetDef.
   */
  public removeWidgetDef(widgetId: string): boolean {
    let result = false;
    const updatedWidgets = this._widgets.filter(
      (info) => info.widgetDef.id !== widgetId
    );

    if (updatedWidgets.length !== this._widgets.length) {
      this.widgets = updatedWidgets;
      result = true;
    }

    return result;
  }

  /** Gets WidgetDefs for a Frontstage location.
   */
  public getWidgetDefs(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<WidgetDef> | undefined {
    const definedSection =
      section === undefined ? StagePanelSection.Start : section;

    const widgetInfos = this._widgets.filter((info) => {
      return (
        (!info.stageId || info.stageId === stageId) &&
        (!info.stageUsage || info.stageUsage === stageUsage) &&
        info.location === location &&
        info.section === definedSection
      );
    });

    const widgetDefs = widgetInfos.map((info) => info.widgetDef);

    // Consult the UiItemsManager to get any Abstract widgets
    const widgets = UiItemsManager.getWidgets(
      stageId,
      stageUsage,
      location,
      definedSection
    );
    widgets.forEach((abstractProps) => {
      const widgetDef = WidgetDef.create(abstractProps);
      widgetDefs.push(widgetDef);
    });
    return widgetDefs.length > 0 ? widgetDefs : undefined;
  }
}
