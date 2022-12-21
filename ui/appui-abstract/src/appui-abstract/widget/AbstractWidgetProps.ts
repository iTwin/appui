/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { ConditionalStringValue } from "../items/ConditionalStringValue";
import type { BadgeType } from "../items/BadgeType";
import type { ProvidedItem } from "../items/ProvidedItem";
import type { WidgetState } from "./WidgetState";

/** Properties for a Widget.
 * @public
 */
export interface AbstractWidgetProps extends ProvidedItem {
  /** Gets the widget content */
  readonly getWidgetContent: () => any;
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id. */
  readonly icon?: string | ConditionalStringValue;
  /** Id used to uniquely identify the widget.
   * @note It is recommended to provide unique widget id to correctly save/restore App layout.
   */
  readonly id?: string;
  /** Default Widget state. Controls how the Widget is initially displayed. Defaults to WidgetState.Unloaded. */
  readonly defaultState?: WidgetState;
  /** if set, component will be considered selected but will NOT display an "active stripe" - defaults to false. Typically used by buttons that toggle between two states. */
  readonly label?: string | ConditionalStringValue;
  /** used to explicitly set the tooltip shown by a component. */
  readonly tooltip?: string | ConditionalStringValue;
  /** Application data attached to the Widget. */
  readonly applicationData?: any;
  /** optional data to used by item implementor. */
  readonly internalData?: Map<string, any>;
  /** Indicates if widget can be popped out to a child window. Defaults to false. */
  readonly canPopout?: boolean;
  /** If the widget state is changed to `floating` and the floatingContainerId is defined, the widget will be added to a
   * floating panel by that name. If no name is specified, a GUID is used. */
  readonly floatingContainerId?: string;
  /** Indicates if widget can be in floating state, default to true. */
  readonly isFloatingStateSupported?: boolean;
  /** Indicates if floating widget is resizable, defaults to false which caused the widget to be auto-sized.. */
  readonly isFloatingStateWindowResizable?: boolean;
  /** Defines that default Top Left position when widget is floated via API calls */
  readonly defaultFloatingPosition?: { readonly x: number, readonly y: number };
  /** Widget priority */
  readonly priority?: number;
  /** Badge to be overlaid on the widget tab. */
  readonly badgeType?: BadgeType;
  /** Handler for widget state changed event */
  readonly onWidgetStateChanged?: () => void;
  /** Save transient DOM state (i.e. scroll offset). */
  readonly saveTransientState?: () => void;
  /** Restore transient DOM state.
   * @note Return true if the state is restored or the Widget will remount.
   */
  readonly restoreTransientState?: () => boolean;
  /** Optional default size to use when floating a widget. If not specified then the default is to size to content if possible.
   * Certain widget can't be intrinsically sized and must specify a content. These are typically ones that use a canvas element
   * internally. */
  readonly defaultFloatingSize?: { readonly width: number, readonly height: number };
  /** Optional prop that tells the widget system to fade this widget out with the rest of the UI when it is in floating state */
  readonly hideWithUiWhenFloating?: boolean;
  /** Optional prop specifying which Panel sides can be docking targets for this widget. If this prop is not specified, all sides are allowed.
   *  An empty array is treated the same as an undefined prop, allowing all targets. */
  readonly allowedPanelTargets?: ReadonlyArray<"left" | "right" | "bottom" | "top">;
}
