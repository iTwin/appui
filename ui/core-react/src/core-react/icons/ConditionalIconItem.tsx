/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Icon
 */

import type { IconSpec } from "./IconComponent.js";

/* eslint-disable deprecation/deprecation */

/** Class used to return an icon. The icon is variable and can be changed in response to subscribed event ids.
 * @public
 * @deprecated in 4.16.0. Uses a deprecated {@link IconSpec} type. Use conditional rendering to render different icons.
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

  /** The current IconSpec according to conditions */
  public get value(): IconSpec {
    if (undefined !== this._value) return this._value;
    this._value = this.iconGetter();
    return this._value;
  }

  /** Called to update the value by running the iconGetter */
  public refresh(): boolean {
    const newValue = this.iconGetter();

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
    if (
      undefined === conditionalValue ||
      !(conditionalValue instanceof ConditionalIconItem)
    )
      return false;

    const iconItem = conditionalValue;

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
    if (undefined === conditionalValue) return undefined;

    if (conditionalValue instanceof ConditionalIconItem) {
      const iconItem = conditionalValue;
      return iconItem.value;
    }

    return conditionalValue;
  }
}
