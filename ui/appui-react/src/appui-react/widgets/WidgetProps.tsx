/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { BadgeType, ConditionalStringValue, PointProps } from "@itwin/appui-abstract";
import { SizeProps } from "@itwin/core-react";
import { ProviderItem } from "../ui-items-provider/ProviderItem";
import { WidgetState } from "./WidgetState";

/** Properties of a Widget.
 * @public // TODO: 4.x cleanup
 */
export interface WidgetProps extends ProviderItem {
  readonly id?: string;
  readonly allowedPanelTargets?: ReadonlyArray<"left" | "right" | "bottom" | "top">;
  readonly applicationData?: any;
  readonly badgeType?: BadgeType;
  readonly canPopout?: boolean;
  readonly defaultFloatingPosition?: PointProps;
  readonly defaultFloatingSize?: SizeProps;
  readonly defaultState?: WidgetState;
  readonly floatingContainerId?: string;
  readonly getWidgetContent: () => any;
  readonly hideWithUiWhenFloating?: boolean;
  readonly icon?: string | ConditionalStringValue;
  readonly internalData?: Map<string, any>;
  readonly isFloatingStateSupported?: boolean;
  readonly isFloatingStateWindowResizable?: boolean;
  readonly label?: string | ConditionalStringValue;
  readonly onWidgetStateChanged?: () => void;
  readonly priority?: number;
  readonly restoreTransientState?: () => boolean;
  readonly saveTransientState?: () => void;
  readonly tooltip?: string | ConditionalStringValue;
}
