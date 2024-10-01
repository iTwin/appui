/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type * as React from "react";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl.js";
import {
  ConfigurableUiControl,
  ConfigurableUiControlType,
} from "../configurableui/ConfigurableUiControl.js";
import type { WidgetDef } from "./WidgetDef.js";
import type { WidgetState } from "./WidgetState.js";

/* eslint-disable deprecation/deprecation */

/** The base class for Widget controls.
 * @public
 * @deprecated in 4.16.0. Extends a deprecated class {@link ConfigurableUiControl}.
 */
export class WidgetControl extends ConfigurableUiControl {
  private _widgetDef!: WidgetDef;
  private _reactNode: React.ReactNode;

  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  /** The ReactNode associated with this control */
  public get reactNode(): React.ReactNode {
    return this._reactNode;
  }
  public set reactNode(r: React.ReactNode) {
    this._reactNode = r;
  }

  /** The [[WidgetDef]] associated with this control */
  public get widgetDef(): WidgetDef {
    return this._widgetDef;
  }
  public set widgetDef(w: WidgetDef) {
    this._widgetDef = w;
  }

  /** Gets the type of ConfigurableUiControl, which is 'Widget' in this case */
  public getType(): ConfigurableUiControlType {
    return ConfigurableUiControlType.Widget;
  }

  /** Sets the [[WidgetState]] for this control */
  public setWidgetState(state: WidgetState): void {
    this.widgetDef.setWidgetState(state);
  }

  /** Called when widget state changes. */
  public onWidgetStateChanged(): void {}

  /** Overwrite to save transient DOM state (i.e. scroll offset). */
  public saveTransientState(): void {}

  /** Overwrite to restore transient DOM state.
   * @note Return true if the state is restored or the Widget will remount.
   */
  public restoreTransientState(): boolean {
    return false;
  }
}
