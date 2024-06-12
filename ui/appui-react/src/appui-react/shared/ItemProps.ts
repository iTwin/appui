/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type {
  ConditionalBooleanValue,
  ConditionalStringValue,
  StringGetter,
} from "@itwin/appui-abstract";
import type { BadgeType, IconProps, IconSpec } from "@itwin/core-react";
import type { ToolbarGroupItem } from "../toolbar/ToolbarItem";

/* eslint-disable deprecation/deprecation */

/** Definition that specifies properties shared between many ConfigurableUi components.
 * @public
 * @deprecated in 4.15.0. Use item specific types like {@link ToolbarGroupItem} instead.
 */
export interface ItemProps extends IconProps {
  /** if true component will be hidden - defaults to false */
  isHidden?: boolean | ConditionalBooleanValue;
  /** if true component will be disabled - defaults to false */
  isDisabled?: boolean | ConditionalBooleanValue;
  /** if set, component will be considered "active" an will display an "active stripe" - defaults to false */
  isActive?: boolean;
  /** if set, component will be considered selected but will NOT display an "active stripe" - defaults to false. Typically used by buttons that toggle between two states. */
  isPressed?: boolean;
  /** can be used by application to store miscellaneous data. */
  applicationData?: any;
  /** Badge to be overlaid on the item. */
  badgeType?: BadgeType;
  /** abstract icon definition, used when create itemDef from abstract item (ie. MenuItem) */
  icon?: IconSpec;

  /** if set, it is used to explicitly set the label shown by a component. */
  label?: string | StringGetter | ConditionalStringValue;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if label is not explicitly set. */
  labelKey?: string;

  /** if set, it is used to explicitly set the description shown by a component. */
  description?: string | StringGetter | ConditionalStringValue;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if description is not explicitly set. */
  descriptionKey?: string;
  /** used to explicitly set the tooltip shown by a component. */
  tooltip?: string | StringGetter | ConditionalStringValue;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if label is not explicitly set. */
  tooltipKey?: string;
}

/** Properties for a Tool item with a tool id.
 * @public
 * @deprecated in 4.15.0. Use a custom type instead.
 */
export interface ToolItemProps extends ItemProps, CommandHandler {
  toolId: string;
}

/** Properties for a Command item.
 * @public
 * @deprecated in 4.15.0. Use a custom type instead.
 */
export interface CommandItemProps extends ItemProps, CommandHandler {
  commandId?: string;
}

/** Definition for a command handler.
 * @public
 */
export interface CommandHandler {
  /** Function to execute */
  execute?: (args?: any) => any;
  /** Parameters passed to the function */
  parameters?: any;
  /** Function to get the parameters passed to the function */
  getCommandArgs?: () => any[];
}
