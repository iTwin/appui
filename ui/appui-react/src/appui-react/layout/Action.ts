/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { WidgetState } from "../widgets/WidgetState";

/** @internal */
export type Dispatch = (action: Action) => void;

/** @internal */
export interface SetWidgetStateAction {
  readonly type: "SET_WIDGET_STATE";
  readonly id: string;
  readonly state: WidgetState;
}

/** @internal */
export type Action = SetWidgetStateAction;
