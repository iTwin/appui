/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module KeyboardShortcut
 */
import type { Key } from "ts-key-enum";
import type { ActionButtonItemDef } from "../shared/ActionButtonItemDef";
import type {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "../shared/ConditionalValue";
import type {
  BadgeKind,
  BadgeType,
  IconProps,
  IconSpec,
} from "@itwin/core-react";
import type { StringGetter } from "@itwin/appui-abstract";

/** Properties for a Keyboard Shortcut
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface KeyboardShortcutProps extends IconProps {
  /** The key that invokes the shortcut.
   * This is either an alphanumeric key, a function key or a special key.
   */
  key: string | Key;

  /** The item to execute when this shortcut is invoked. Either 'item' or 'shortcuts' must be specified.
   * @deprecated in 4.15.0. Use properties of this object instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  item?: ActionButtonItemDef;
  /** Function to run when the keyboard shortcut is executed. */
  execute?: () => void;

  /** Nested array of shortcut props.
   * @note `execute` is ignored if `shortcuts` is specified.
   */
  shortcuts?: KeyboardShortcutProps[];

  /** Indicates whether the Alt key required. Default - false */
  isAltKeyRequired?: boolean;
  /** Indicates whether the Ctrl key required. Default - false */
  isCtrlKeyRequired?: boolean;
  /** Indicates whether the Shift key required. Default - false */
  isShiftKeyRequired?: boolean;

  // #region "ItemProps" properties previously extended from deprecated type.

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
  /** Badge to be overlaid on the item.
   * @deprecated in 4.16.0. Use `badgeKind` property instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  badgeType?: BadgeType;
  /** Specifies the kind of badge, if any, to be overlaid on the item. */
  badgeKind?: BadgeKind;
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

  // #endregion "ItemProps"
}
