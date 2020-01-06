/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { WidgetDef } from "../widgets/WidgetDef";
import { WidgetHost } from "../widgets/WidgetHost";
import { ZoneLocation } from "./Zone";

/** Zone State enum.
 * @public
 */
export enum ZoneState {
  Off,
  Minimized,
  Open,
  Popup,
  Floating,
}

/**
 * A ZoneDef represents each zone within a Frontstage.
 * @public
 */
export class ZoneDef extends WidgetHost {
  private _initialWidth: number | undefined = undefined;

  /** Zone state.  Defaults to ZoneState.Open. */
  public zoneState: ZoneState = ZoneState.Open;
  /** Indicates if other Zones may be merged with this Zone. Defaults to false.  */
  public allowsMerging: boolean = false;
  /** Any application data to attach to this Zone. */
  public applicationData?: any;
  /** Indicates with which other zone to merge. */
  public mergeWithZone?: ZoneLocation;
  /** Initial zone width. */
  public get initialWidth(): number | undefined {
    return this._initialWidth;
  }

  /** Constructor for ZoneDef.
   */
  constructor() {
    super();
  }

  /** Determines if this Zone is for Tool Settings. */
  public get isToolSettings(): boolean {
    const singleWidgetDef = this.getSingleWidgetDef();
    if (singleWidgetDef)
      return singleWidgetDef.isToolSettings;
    return false;
  }

  /** Determines if this Zone is for the Status Bar. */
  public get isStatusBar(): boolean {
    const singleWidgetDef = this.getSingleWidgetDef();
    if (singleWidgetDef)
      return singleWidgetDef.isStatusBar;
    return false;
  }

  /** Determines if the Zone should fill the available space. */
  public get shouldFillZone(): boolean {
    return this.widgetDefs.some((widgetDef: WidgetDef) => widgetDef.fillZone);
  }

  /** @internal */
  public setInitialWidth(width: number | undefined) {
    this._initialWidth = width;
  }
}
