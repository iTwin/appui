/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { BadgeType, ConditionalStringValue } from "@itwin/appui-abstract";
import type { XAndY } from "@itwin/core-geometry";
import type { IconSpec, SizeProps } from "@itwin/core-react";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import type { WidgetState } from "./WidgetState";

/** Describes options of a floating widget.
 * @public
 */
export interface CanFloatWidgetOptions {
  /** Describes if the widget is resizable. */
  readonly isResizable?: boolean;
  readonly defaultPosition?: XAndY;
  readonly defaultSize?: SizeProps;
  /** Describes to which container the floating widget is assigned. This allows the grouping of multiple widgets within the same floating widget. */
  readonly containerId?: string;
  /** Describes if the floating widget should hide together with other UI elements. */
  readonly hideWithUi?: boolean;
}

/** Describes the data needed to provide a widget.
 * @public
 */
export interface Widget {
  readonly id: string;
  /** Stage panels to which this widget can be docked. All stage panels are allowed if nothing is provided. To not allow docking to any panels, provide a blank array. */
  readonly allowedPanels?: ReadonlyArray<StagePanelLocation>;
  readonly badge?: BadgeType;
  /** Describes if the widget can be popped out to a separate window. Defaults to `false`. */
  readonly canPopout?: boolean;
  /** Set to `false` to disable floating of a widget. Alternatively options object can be provided which enables floating.
   * If allowedPanels is an empty array, automatically set to `true`. Defaults to `true`. */
  readonly canFloat?: boolean | CanFloatWidgetOptions;
  /** Defaults to `Floating`(3) if widget is not allowed to dock to any panels. */
  readonly defaultState?: WidgetState;
  /** Content of the Widget. */
  readonly content?: React.ReactNode;
  readonly icon?: IconSpec;
  readonly label?: string | ConditionalStringValue;
  readonly priority?: number;
  readonly tooltip?: string | ConditionalStringValue;
}
