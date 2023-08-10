/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { Dispatch } from "./Action";
import type { WidgetState } from "../widgets/WidgetState";
import type { WidgetDef } from "../widgets/WidgetDef";

/** @internal */
export interface Layout {
  dispatch: Dispatch;
  getWidgetState(widgetId: WidgetDef["id"]): WidgetState;
}
