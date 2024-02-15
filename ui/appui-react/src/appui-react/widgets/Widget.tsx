/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { ConditionalStringValue } from "@itwin/appui-abstract";
import type { XAndY } from "@itwin/core-geometry";
import type { IconSpec, SizeProps } from "@itwin/core-react";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import type { WidgetState } from "./WidgetState";
import type { StagePanelSection } from "../stagepanels/StagePanelSection";
import type { BadgeType } from "../shared/BadgeType";

/** Describes options of a floating widget.
 * @public
 */
export interface CanFloatWidgetOptions {
  /** Describes if the widget is resizable. Defaults to `true`. */
  readonly isResizable?: boolean;
  readonly defaultPosition?: XAndY;
  readonly defaultSize?: SizeProps;
  /** Describes to which container the floating widget is assigned. This allows the grouping of multiple widgets within the same floating widget. */
  readonly containerId?: string;
  /** Describes if the floating widget should hide together with other UI elements. Defaults to `false`. */
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
  /** Set to `false` to disable floating of a widget. Defaults to `true`.
   * Alternatively options object can be provided to configure floating behavior.
   * It is not possible to disable the floating of a widget if `allowedPanels` is an empty array.
   */
  readonly canFloat?: boolean | CanFloatWidgetOptions;
  /** Defaults to `Floating` if widget is not allowed to dock to any panels. Otherwise defaults to `Closed`. */
  readonly defaultState?: WidgetState;
  /** Content of the Widget. */
  readonly content?: React.ReactNode;
  readonly icon?: IconSpec;
  readonly label?: string | ConditionalStringValue;
  readonly priority?: number;
  readonly tooltip?: string | ConditionalStringValue;
  /** Describes layout specific configuration of a widget.
   * @note Only used by `get*` methods of [[UiItemsProvider]].
   * @alpha
   */
  readonly layouts?: WidgetLayouts;
}

/** Describes widget configuration specific for each layout.
 * @alpha
 */
export interface WidgetLayouts {
  /** Widget configuration in a standard layout. */
  readonly standard?: StandardLayoutWidget;
}

/** Describes widget configuration specific to a standard layout.
 * @alpha
 */
export interface StandardLayoutWidget {
  /** Describes to which panel the widget is added. */
  readonly location: StagePanelLocation;
  /** Describes to which section of a panel the widget is added. */
  readonly section: StagePanelSection;
}
