/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module NavigationAids */

import { ConfigurableCreateInfo, ConfigurableUiControl, ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl";

// -----------------------------------------------------------------------------
// Configurable Ui Navigation Aid Control
// -----------------------------------------------------------------------------

/** The base class for Navigation Aid controls.
 */
export class NavigationAidControl extends ConfigurableUiControl {
  private _reactElement: React.ReactNode;

  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  /** Gets the React element associated with this control */
  public get reactElement(): React.ReactNode { return this._reactElement; }
  /** Sets the React element associated with this control */
  public set reactElement(r: React.ReactNode) { this._reactElement = r; }

  /** Default size is "64px". Override to set a different size. */
  public getSize(): string | undefined { return undefined; }

  /** Get the type of this control. */
  public getType(): ConfigurableUiControlType { return ConfigurableUiControlType.NavigationAid; }
}
