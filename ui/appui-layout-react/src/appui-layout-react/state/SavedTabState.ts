/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { RectangleProps } from "@itwin/core-react";
import type { TabHomeState } from "./TabHomeState";
import type { TabState } from "./TabState";

/** @internal */
export interface SavedTabState {
  readonly id: TabState["id"];
  readonly home?: TabHomeState;
  readonly popoutBounds?: RectangleProps;
}

/** @internal */
export interface SavedTabsState {
  readonly byId: { readonly [id: string]: SavedTabState | undefined };
  readonly allIds: ReadonlyArray<SavedTabState["id"]>;
}
