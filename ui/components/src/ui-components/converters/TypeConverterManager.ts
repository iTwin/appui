/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module TypeConverters
 */

import { TypeConverter } from "./TypeConverter";

/**
 * Manages Type Converters. Type Converters are registered with and obtained from the manager.
 * @public
 */
export class TypeConverterManager {
  private static _converters: { [index: string]: (TypeConverter) } = {};
  private static _defaultTypeConverter: TypeConverter;

  public static registerConverter(typename: string, converter: new () => TypeConverter): void {
    if (TypeConverterManager._converters.hasOwnProperty(typename)) {
      const nameOfConverter = TypeConverterManager._converters[typename].constructor.name;
      throw Error("TypeConverterManager.registerConverter error: type '" + typename + "' already registered to '" + nameOfConverter + "'");
    }

    const instance = new converter();
    TypeConverterManager._converters[typename] = instance;
  }

  public static getConverter(typename: string): TypeConverter {
    if (TypeConverterManager._converters.hasOwnProperty(typename))
      return TypeConverterManager._converters[typename];

    if (!TypeConverterManager._defaultTypeConverter) {
      const { StringTypeConverter } = require("../converters/StringTypeConverter");
      TypeConverterManager._defaultTypeConverter = new StringTypeConverter();
    }
    return TypeConverterManager._defaultTypeConverter;
  }
}
