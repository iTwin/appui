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
  constructor(
    public readonly iconGetter: () => IconSpec,
    public readonly syncEventIds: string[],
    value?: IconSpec
  ) {
    this._value = value;
  }

  public static isConditionalIconItem(item: any): boolean {
    /* istanbul ignore else */
    if (!item || typeof item !== "object") return false;
    const itemPrototype = Object.getPrototypeOf(item);
    /* istanbul ignore else */
    if (itemPrototype.constructor.name !== "ConditionalIconItem") return false;

    return true;
  }
  /** The current IconSpec according to conditions */
  public get value(): IconSpec {
    /* istanbul ignore else */
    if (undefined !== this._value) return this._value;
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
  public static refreshValue(
    conditionalValue: ConditionalIconItem | string | undefined,
    eventIds: Set<string>
  ): boolean {
    /* istanbul ignore else */
    if (
      undefined === conditionalValue ||
      !ConditionalIconItem.isConditionalIconItem(conditionalValue)
    )
      return false;

    const iconItem = conditionalValue as ConditionalIconItem;
    /* istanbul ignore else */
    if (
      iconItem.syncEventIds.some((value: string): boolean =>
        eventIds.has(value.toLowerCase())
      )
    )
      return iconItem.refresh();

    return false;
  }
  /** helper function to get the iconSpec from a ConditionIconItem as IconSpec | undefined*/
  public static getValue(
    conditionalValue: ConditionalIconItem | string | undefined
  ): IconSpec | undefined {
    /* istanbul ignore else */
    if (undefined === conditionalValue) return undefined;

    /* istanbul ignore else */
    if (ConditionalIconItem.isConditionalIconItem(conditionalValue)) {
      const iconItem = conditionalValue as ConditionalIconItem;
      return iconItem.value;
    }

    return conditionalValue;
  }
}
