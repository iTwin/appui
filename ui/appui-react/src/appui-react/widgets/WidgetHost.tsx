/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { UiFramework } from "../UiFramework";
import { WidgetDef } from "./WidgetDef";

/**
 * A WidgetHost represents a definition that hosts one or most Widgets in a Frontstage.
 * @public
 */
export class WidgetHost {

  private _widgetDefs: WidgetDef[] = new Array<WidgetDef>();
  private _dynamicWidgetDefs: ReadonlyArray<WidgetDef> | undefined;
  private _sortedWidgetDefs: ReadonlyArray<WidgetDef> = [];

  /** Constructor for WidgetHost.
   */
  constructor() { }

  /** Adds a WidgetDef to the list of Widgets.
   * @param widgetDef  Definition of the Widget to add
   */
  public addWidgetDef(widgetDef: WidgetDef) {
    this._widgetDefs.push(widgetDef);
    this.sortWidgetDefs();
  }

  /** Gets the list of Widgets. */
  public get widgetDefs(): ReadonlyArray<WidgetDef> {
    return this._sortedWidgetDefs;
  }

  /** Gets the number of Widgets. */
  public get widgetCount(): number {
    return this.widgetDefs.length;
  }

  /** If there is only one Widget in the Panel, gets the single WidgetDef.
   * @returns The single WidgetDef if there is only one Widget; otherwise, undefined is returned.
   */
  public getSingleWidgetDef(): WidgetDef | undefined {
    if (this.widgetCount === 1) {
      return this.widgetDefs[0];
    }
    return undefined;
  }

  /** Finds a WidgetDef with a given Id.
   * @param id  Id of the WidgetDef to find
   * @returns The WidgetDef if found; otherwise, undefined is returned.
   */
  public findWidgetDef(id: string): WidgetDef | undefined {
    return this.widgetDefs.find((widgetDef: WidgetDef) => widgetDef.id === id);
  }

  /** Updates the WidgetHost with dynamic widgets
   * @internal
   */
  public updateDynamicWidgetDefs(stageId: string, stageUsage: string, location: StagePanelLocation, section: StagePanelSection | undefined,
    allStageWidgetDefs: WidgetDef[]): void {
    // get widgetDefs not already in allStageWidgetDefs and add them
    const uniqueWidgets = this._widgetDefs.filter((widgetDef) => {
      return !allStageWidgetDefs.find((wDef) => wDef.id === widgetDef.id);
    });

    allStageWidgetDefs.push(...uniqueWidgets);

    let dynamicWidgetDefs: readonly WidgetDef[] | undefined;
    if (section !== undefined) {
      dynamicWidgetDefs = UiFramework.widgetManager.getWidgetDefs(stageId, stageUsage, location, section) ?? [];
    }

    const uniqueDynamicWidgetDefs = dynamicWidgetDefs?.filter((widgetDef) => {
      return ((!allStageWidgetDefs.find((wDef) => wDef.id === widgetDef.id)));
    });

    // Now that we no longer support a middle panel section, yet we have existing API that allows a middle section to be
    // defined, the following is needed to combining middle and end panel section widgets into a single set of widgets
    if (uniqueDynamicWidgetDefs) {
      allStageWidgetDefs.push(...uniqueDynamicWidgetDefs);
      this._dynamicWidgetDefs = [...uniqueDynamicWidgetDefs];
    }
    this.sortWidgetDefs();
  }

  /** Sorts all widgets */
  private sortWidgetDefs(): void {
    let sortedWidgetDefs = [];
    if (this._dynamicWidgetDefs)
      sortedWidgetDefs = this._widgetDefs.concat(this._dynamicWidgetDefs);
    else
      sortedWidgetDefs = this._widgetDefs.slice();

    sortedWidgetDefs.sort((a, b) => a.priority - b.priority);

    this._sortedWidgetDefs = sortedWidgetDefs;
  }
}
