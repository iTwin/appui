/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { BadgeType, ConditionalStringValue, PointProps, StagePanelLocation } from "@itwin/appui-abstract";
import { IconSpec, SizeProps } from "@itwin/core-react";
import { ProviderItem } from "../ui-items-provider/ProviderItem";
import { WidgetState } from "./WidgetState";

interface CanFloatWidgetOptions {
  readonly isResizable?: boolean;
  readonly defaultPosition?: PointProps;
  readonly defaultSize?: SizeProps;
  readonly containerId?: string;
  readonly hideWithUi?: boolean;
}

/** Describes the data needed to provide a widget.
 * @public // TODO: 4.x cleanup
 */
export interface Widget extends ProviderItem {
  readonly id: string;
  readonly allowedPanels?: ReadonlyArray<StagePanelLocation>;
  readonly badgeType?: BadgeType;
  readonly canPopout?: boolean;
  readonly canFloat?: boolean | CanFloatWidgetOptions;
  readonly defaultState?: WidgetState;
  /** A React element for the Widget. */
  readonly element?: React.ReactNode;
  readonly icon?: IconSpec;
  readonly label?: string | ConditionalStringValue;
  readonly priority?: number;
  readonly tooltip?: string | ConditionalStringValue;
}
