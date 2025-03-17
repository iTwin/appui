/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { ConditionalStringValue } from "@itwin/appui-abstract";
import type { XAndY } from "@itwin/core-geometry";
import type { BadgeType, IconSpec } from "@itwin/core-react";
import type { BadgeKind } from "@itwin/core-react/internal";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import type { WidgetState } from "./WidgetState.js";
import type { StagePanelSection } from "../stagepanels/StagePanelSection.js";
import { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";
import type { SizeProps } from "../utils/SizeProps.js";

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
  /** Specifies the kind of badge, if any, to be rendered.
   * @deprecated in 4.16.0. Use `badgeKind` property instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly badge?: BadgeType;
  /** Specifies the kind of badge, if any, to be rendered. */
  readonly badgeKind?: BadgeKind;
  /** Describes if the widget can be popped out to a separate window. Defaults to `false`. */
  readonly canPopout?: boolean;
  /** Set to `false` to disable floating of a widget. Defaults to `true`.
   * Alternatively options object can be provided to configure floating behavior.
   * It is not possible to disable the floating of a widget if `allowedPanels` is an empty array.
   */
  readonly canFloat?: boolean | CanFloatWidgetOptions;
  /** The default state of the widget.
   * - Defaults to `Floating` if the widget is not allowed to dock to any panels.
   * - Otherwise, defaults to `Closed`.
   *
   * @note If set to `Hidden`, the widget will be hidden after the layout is restored, independently of the saved layout state. Set `useSavedState` to `true` to disable this behavior.
   * @note If set to `Unloaded`, the widget will be unloaded after the layout is restored, independently of the saved layout state. Set `useSavedState` to `true` to disable this behavior.
   */
  readonly defaultState?: WidgetState;
  /** When enabled, the widget will always use the saved layout state. `defaultState` will only be used for the initial layout setup.
   * This is useful for scenarios where the widget should only be hidden/unloaded initially, but is always restored to the last state.
   * @note This property is only useful to disable the special handling of `defaultState` when it is set to `Hidden` or `Unloaded`.
   */
  readonly useSavedState?: boolean;
  /** Content of the Widget. */
  readonly content?: React.ReactNode;
  /** @deprecated in 4.16.0. Use {@link Widget.iconNode} instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly icon?: IconSpec;
  /** Icon to use for the widget. */
  readonly iconNode?: React.ReactNode;
  readonly label?: string | ConditionalStringValue;
  readonly priority?: number;
  readonly tooltip?: string | ConditionalStringValue;
  /** Describes layout specific configuration of a widget.
   * @note Only used by {@link UiItemsProvider.getWidgets}.
   */
  readonly layouts?: WidgetLayouts;
}

/** Describes widget configuration specific for each layout.
 * @public
 */
export interface WidgetLayouts {
  /** Widget configuration in a standard layout. */
  readonly standard?: StandardLayoutWidget;
  /** Allow additional layout specific configurations.
   * @note Use unique keys to avoid conflicts.
   */
  readonly [layout: string]: unknown;
}

/** Describes widget configuration specific to a standard layout.
 * @public
 */
export interface StandardLayoutWidget {
  /** Describes to which panel the widget is added. */
  readonly location: StagePanelLocation;
  /** Describes to which section of a panel the widget is added. */
  readonly section: StagePanelSection;
}
