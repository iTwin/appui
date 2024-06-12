/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import type { BeEvent } from "@itwin/core-bentley";
import type { IconSpec } from "@itwin/core-react";
import type { CommandItemDef } from "../shared/CommandItemDef";
import type { BackstageAppButton } from "../widgets/BackstageAppButton";

/** Arguments of [[Backstage.onToggled]].
 * @public
 */
export interface BackstageToggledArgs {
  readonly isOpen: boolean;
}

/**
 * [[UiFramework.backstage]] interface.
 * @public
 */
export interface FrameworkBackstage {
  /**
   * Event activated when the backstage is toggled.
   */
  readonly onToggled: BeEvent<(args: BackstageToggledArgs) => void>;
  /**
   * State of the backstage.
   */
  readonly isOpen: boolean;
  /**
   * Display the backstage.
   */
  open(): void;
  /**
   * Hides the backstage.
   */
  close(): void;
  /**
   * Toggle the backstage.
   */
  toggle(): void;
  /** Creates a CommandItemDef that toggle the backstage.
   * @param overrideIconSpec Icon to replace the default 'home'.
   * @deprecated in 4.15.0. Use {@link BackstageAppButton} component and {@link FrameworkBackstage.toggle} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  getBackstageToggleCommand(overrideIconSpec?: IconSpec): CommandItemDef;
}
