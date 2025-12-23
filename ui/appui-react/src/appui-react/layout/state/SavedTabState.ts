/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { XAndY } from "@itwin/core-geometry";
import type { TabState } from "./TabState.js";
import type { WidgetRestoreState } from "./WidgetRestoreState.js";
import type { SizeProps } from "../../utils/SizeProps.js";

/** @internal */
export type TabHomeState = WidgetRestoreState & {
  readonly tabIndex: number;
};

/** @internal */
export interface PopoutBounds {
  /** Window position. */
  readonly position: XAndY;
  /** Window size. */
  readonly size?: SizeProps;
  readonly contentSize: SizeProps;
}

/** @internal */
export interface SavedTabState {
  readonly id: TabState["id"];
  readonly home?: TabHomeState;
  readonly popout?: PopoutBounds;
}

/** @internal */
export interface SavedTabsState {
  readonly byId: { readonly [id: string]: SavedTabState | undefined };
  readonly allIds: ReadonlyArray<SavedTabState["id"]>;
}
