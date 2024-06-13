/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import * as React from "react";
import type { IconSpec } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";
import type { FrameworkBackstage } from "../framework/FrameworkBackstage";
import { InternalBackstageManager } from "./InternalBackstageManager";

/** Controls backstage.
 * @public
 * @deprecated in 4.15.0. Use {@link UiFramework.backstage} instead.
 */
export class BackstageManager {
  private internal = new InternalBackstageManager();

  /**
   * Override internal implementation for a mock
   * @internal For tests only.
   */
  public mockInternal(internal: InternalBackstageManager) {
    this.internal = internal;
  }

  /** Event raised when backstage is opened or closed. */
  public get onToggled() {
    return this.internal.onToggled;
  }

  public get isOpen() {
    return this.internal.isOpen;
  }

  public open() {
    return this.internal.open();
  }

  public close() {
    return this.internal.close();
  }

  public toggle() {
    return this.internal.toggle();
  }

  public getBackstageToggleCommand(overrideIconSpec?: IconSpec) {
    return this.internal.getBackstageToggleCommand(overrideIconSpec);
  }

  /** Get CommandItemDef that will toggle display of Backstage and allow iconSpec to be overridden
   */
  public static getBackstageToggleCommand(overrideIconSpec?: IconSpec) {
    // eslint-disable-next-line deprecation/deprecation
    return UiFramework.backstage.getBackstageToggleCommand(overrideIconSpec);
  }
}

/** Hook that returns isOpen flag of the backstage.
 * @public
 */
export const useIsBackstageOpen = (manager: FrameworkBackstage) => {
  const [isOpen, setIsOpen] = React.useState(manager.isOpen);
  React.useEffect(() => {
    setIsOpen(manager.isOpen);
    return manager.onToggled.addListener((args) => {
      setIsOpen(args.isOpen);
    });
  }, [manager]);
  return isOpen;
};

/** Hook that returns backstage manager.
 * @public
 */
export const useBackstageManager = () => {
  const [manager] = React.useState(UiFramework.backstage);
  return manager;
};
