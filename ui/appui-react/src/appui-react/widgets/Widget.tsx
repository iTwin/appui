/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { BadgeType, ConditionalStringValue, PointProps } from "@itwin/appui-abstract";
import { IconSpec, SizeProps } from "@itwin/core-react";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { WidgetState } from "./WidgetState";

/** Describes options of a floating widget.
 * @public
 */
export interface CanFloatWidgetOptions {
  readonly isResizable?: boolean;
  readonly defaultPosition?: PointProps;
  readonly defaultSize?: SizeProps;
  readonly containerId?: string;
  readonly hideWithUi?: boolean;
}

/** Describes the data needed to provide a widget.
 * @public
 */
export interface Widget {
  readonly id: string;
  /** Stage panels to which this widget can be docked. All stage panels are allowed if nothing is provided. */
  readonly allowedPanels?: ReadonlyArray<StagePanelLocation>;
  readonly badge?: BadgeType;
  /** Defaults to `false`. */
  readonly canPopout?: boolean;
  /** Set to `false` to disable floating of a widget. Alternatively options object can be provided which enables floating. Defaults to `true`. */
  readonly canFloat?: boolean | CanFloatWidgetOptions;
  readonly defaultState?: WidgetState;
  /** Content of the Widget. */
  readonly content?: React.ReactNode;
  readonly icon?: IconSpec;
  readonly label?: string | ConditionalStringValue;
  readonly priority?: number;
  readonly tooltip?: string | ConditionalStringValue;
}
