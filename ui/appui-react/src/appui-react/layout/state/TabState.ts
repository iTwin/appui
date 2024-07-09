/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { IconSpec } from "@itwin/core-react";
import type { PanelSide } from "../widget-panels/PanelTypes";
import type { XAndY } from "./internal/NineZoneStateHelpers";
import type { PanelWidgetRestoreState } from "./WidgetRestoreState";
import type { SizeProps } from "../../utils/SizeProps";

/** `WidgetDef` is equivalent structure in `appui-react`.
 * @internal
 */
export interface TabState {
  readonly id: string;
  readonly label: string;
  readonly iconSpec?: IconSpec;
  readonly preferredFloatingWidgetSize?: SizeProps;
  readonly preferredPanelWidgetSize?: "fit-content";
  readonly allowedPanelTargets?: ReadonlyArray<PanelSide>;
  readonly canPopout?: boolean;
  readonly userSized?: boolean;
  readonly isFloatingWidgetResizable?: boolean;
  readonly hideWithUiWhenFloating?: boolean;
  readonly unloaded?: boolean;
}

/** @internal */
export interface TabsState {
  readonly [id: string]: TabState;
}

/** @internal */
export interface DraggedTabState {
  readonly tabId: TabState["id"];
  readonly position: XAndY;
  readonly home: PanelWidgetRestoreState;
}
