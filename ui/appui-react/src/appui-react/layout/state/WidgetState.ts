/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { RectangleProps } from "../../utils/RectangleProps.js";
import type { TabState } from "./TabState.js";
import type {
  PanelWidgetRestoreState,
  WidgetRestoreState,
} from "./WidgetRestoreState.js";

/** State of a stacked widget, which can contain multiple tabs. I.e. in a panel section or a floating widget.
 * @internal
 */
export interface WidgetState {
  readonly activeTabId: TabState["id"];
  readonly id: string;
  readonly minimized: boolean;
  readonly tabs: ReadonlyArray<TabState["id"]>;
}

/** @internal */
export interface WidgetsState {
  readonly [id: string]: WidgetState;
}

/** @internal */
export interface FloatingWidgetState {
  readonly id: WidgetState["id"];
  readonly bounds: RectangleProps;
  readonly home: PanelWidgetRestoreState;
  readonly userSized?: boolean;
  readonly resizable?: boolean;
}

/** @internal */
export interface FloatingWidgetsState {
  readonly byId: { readonly [id: string]: FloatingWidgetState };
  readonly allIds: ReadonlyArray<FloatingWidgetState["id"]>;
}

/** @internal */
export interface PopoutWidgetState {
  readonly bounds: RectangleProps;
  readonly id: WidgetState["id"];
  readonly home: WidgetRestoreState;
}

/** @internal */
export interface PopoutWidgetsState {
  readonly byId: { readonly [id: string]: PopoutWidgetState };
  readonly allIds: ReadonlyArray<PopoutWidgetState["id"]>;
}
