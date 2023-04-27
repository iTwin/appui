/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Icon
 */

import type { IconSpec } from "./IconComponent";

/** Class used to return an icon. The icon is variable and can be changed in response to subscribed event ids.
 * @public
 */
export class ConditionalIconItem {
  private _value?: IconSpec;

  /** Constructor for ConditionalIconItem
   * @param iconGetter Function to retrieve the icon that matches the condition. Returns an IconSpec.
   * @param syncEventIds The array of event ids to be monitored. These events are triggered when the condition(s) that control the icon change.
   * @param value The default IconSpec. If this is not specified, the function is run to get the initial value.
  */
  constructor(public readonly iconGetter: () => IconSpec, public readonly syncEventIds: string[], value?: IconSpec) {
    this._value = value;
  }

  /** The current IconSpec according to conditions */
  public get value(): IconSpec {
    /* istanbul ignore else */
    if (undefined !== this._value)
      return this._value;
    this._value = this.iconGetter();
    return this._value;
  }

  /** Called to update the value by running the iconGetter */
  public refresh(): boolean {
    const newValue = this.iconGetter();
    /* istanbul ignore else */
    if (newValue !== this._value) {
      this._value = newValue;
      return true;
    }
    return false;
  }

  /** A helper function that updates the IconSpec value when the specified events are triggered */
  public static refreshValue(conditionalValue: ConditionalIconItem | string | undefined, eventIds: Set<string>): boolean {
    /* istanbul ignore else */
    if (undefined === conditionalValue || !(conditionalValue instanceof ConditionalIconItem))
      return false;

    /* istanbul ignore else */
    if (conditionalValue.syncEventIds.some((value: string): boolean => eventIds.has(value.toLowerCase())))
      return conditionalValue.refresh();

    return false;
  }

  /** helper function to get the iconSpec from a ConditionIconItem as IconSpec | undefined*/
  public static getValue(conditionalValue: ConditionalIconItem | string | undefined): IconSpec | undefined {
    /* istanbul ignore else */
    if (undefined === conditionalValue)
      return undefined;

    /* istanbul ignore else */
    if (conditionalValue instanceof ConditionalIconItem)
      return conditionalValue.value;

    return conditionalValue;
  }
}
