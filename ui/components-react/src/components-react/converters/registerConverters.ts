/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import { StandardTypeNames } from "@itwin/appui-abstract";
import { TypeConverterManager } from "./TypeConverterManager.js";
import { BooleanTypeConverter } from "./BooleanTypeConverter.js";
import { CompositeTypeConverter } from "./CompositeTypeConverter.js";
import {
  DateTimeTypeConverter,
  ShortDateTypeConverter,
} from "./DateTimeTypeConverter.js";
import { EnumTypeConverter } from "./EnumTypeConverter.js";
import { HexadecimalTypeConverter } from "./HexadecimalTypeConverter.js";
import { NavigationPropertyTypeConverter } from "./NavigationPropertyTypeConverter.js";
import {
  FloatTypeConverter,
  IntTypeConverter,
} from "./NumericTypeConverter.js";
import {
  Point2dTypeConverter,
  Point3dTypeConverter,
} from "./PointTypeConverter.js";
import { StringTypeConverter } from "./StringTypeConverter.js";

/** @internal */
export function registerConverters() {
  TypeConverterManager.registerConverter(
    StandardTypeNames.Boolean,
    BooleanTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Bool,
    BooleanTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Int,
    IntTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Integer,
    IntTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Float,
    FloatTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Double,
    FloatTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Number,
    FloatTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Text,
    StringTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.String,
    StringTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.URL,
    StringTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Composite,
    CompositeTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.ShortDate,
    ShortDateTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.DateTime,
    DateTimeTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Enum,
    EnumTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Hex,
    HexadecimalTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Hexadecimal,
    HexadecimalTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Navigation,
    NavigationPropertyTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Point2d,
    Point2dTypeConverter
  );

  TypeConverterManager.registerConverter(
    StandardTypeNames.Point3d,
    Point3dTypeConverter
  );
}
