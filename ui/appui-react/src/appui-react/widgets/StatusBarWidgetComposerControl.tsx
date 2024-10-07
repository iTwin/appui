/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { StatusBarComposer } from "../statusbar/StatusBarComposer.js";
import { StatusBarWidgetControl } from "../statusbar/StatusBarWidgetControl.js";
import { UiFramework } from "../UiFramework.js";

/* eslint-disable deprecation/deprecation */

/** StatusBarWidgetComposerControl provides status bar to specified Frontstage that allows status bar items to be populated
 * via UiItemsProviders. See [[StandardStatusbarItemsProvider]] that can be used to populate this status bar with a common
 * set of status fields.
 * @public
 * @deprecated in 4.16.0. Use {@link StatusBarComposer} component instead.
 */
export class StatusBarWidgetComposerControl extends StatusBarWidgetControl {
  public static controlId = "uifw:StatusBarWidgetComposerControl";
  public readonly id = StatusBarWidgetComposerControl.controlId;

  public getReactNode(): React.ReactNode {
    return (
      <StatusBarComposer
        key={UiFramework.frontstages.activeFrontstageId}
        items={[]}
      />
    );
  }
}
