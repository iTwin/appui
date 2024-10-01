/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { Widget } from "./Widget.js";

/** Configuration from which a widget is created.
 * @public
 */
export interface WidgetConfig extends Widget {
  /** If set, it is used to define a key that is used to look up a localized string. This value is used only if label is not explicitly set. */
  readonly labelKey?: string;
  /** If set, it is used to define a key that is used to look up a localized string. This value is used only if tooltip is not explicitly set. */
  readonly tooltipKey?: string;
  /** @alpha */
  readonly preferredPanelSize?: "fit-content";
}
