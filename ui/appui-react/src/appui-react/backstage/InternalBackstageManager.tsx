/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import { BeEvent } from "@itwin/core-bentley";
import type { IconSpec } from "@itwin/core-react";
import { CommandItemDef } from "../shared/CommandItemDef.js";
import { UiFramework } from "../UiFramework.js";
import type { BackstageToggledArgs } from "../framework/FrameworkBackstage.js";

/** Controls backstage.
 * @internal
 */
export class InternalBackstageManager {
  private _isOpen = false;

  /** Event raised when backstage is opened or closed. */
  public readonly onToggled = new BeEvent<
    (args: BackstageToggledArgs) => void
  >();

  public get isOpen() {
    return this._isOpen;
  }

  private setIsOpen(isOpen: boolean) {
    if (isOpen === this._isOpen) return;
    this._isOpen = isOpen;
    this.onToggled.raiseEvent({
      isOpen,
    });
  }

  public open() {
    this.setIsOpen(true);
  }

  public close() {
    this.setIsOpen(false);
  }

  public toggle() {
    this.setIsOpen(!this.isOpen);
  }

  /** Get CommandItemDef that will toggle display of Backstage and allow iconSpec to be overridden */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public getBackstageToggleCommand(overrideIconSpec?: IconSpec) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return new CommandItemDef({
      commandId: "UiFramework.openBackstage",
      iconSpec: overrideIconSpec ? overrideIconSpec : "icon-home",
      labelKey: "UiFramework:buttons.openBackstageMenu",
      execute: () => {
        UiFramework.backstage.toggle();
      },
    });
  }
}
