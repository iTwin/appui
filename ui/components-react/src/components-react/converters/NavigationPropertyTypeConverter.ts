/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module TypeConverters
 */

import type { Primitives, PropertyDescription } from "@itwin/appui-abstract";
import { StandardTypeNames } from "@itwin/appui-abstract";
import { TypeConverter } from "./TypeConverter.js";
import { TypeConverterManager } from "./TypeConverterManager.js";

/**
 * Navigation property type converter.
 * @public
 */
export class NavigationPropertyTypeConverter extends TypeConverter {
  public override convertPropertyToString(
    propertyDescription: PropertyDescription,
    value?: Primitives.Value
  ) {
    return value === undefined ? "" : propertyDescription.displayLabel;
  }

  public sortCompare(
    a: Primitives.Value,
    b: Primitives.Value,
    ignoreCase?: boolean
  ): number {
    return TypeConverterManager.getConverter(
      StandardTypeNames.Hexadecimal
    ).sortCompare(
      (a as Primitives.InstanceKey).id,
      (b as Primitives.InstanceKey).id,
      ignoreCase
    );
  }
}
