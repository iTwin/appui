/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module TypeConverters
 */

import { StandardTypeNames } from "@itwin/appui-abstract";
import type { TypeConverter } from "./TypeConverter";
import { StringTypeConverter } from "./StringTypeConverter";

/**
 * Manages Type Converters. Type Converters are registered with and obtained from the manager.
 * @public
 */
export class TypeConverterManager {
  private static _converters: { [index: string]: TypeConverter } = {};
  private static _defaultTypeConverter: TypeConverter;

  private static getFullConverterName(
    typename: string,
    converterName?: string
  ): string {
    let fullConverterName = typename;
    if (converterName) fullConverterName += `:${converterName}`;
    return fullConverterName;
  }

  public static registerConverter(
    typename: string,
    converter: new () => TypeConverter,
    converterName?: string
  ): void {
    const fullConverterName = TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );

    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      const nameOfConverter =
        TypeConverterManager._converters[fullConverterName].constructor.name;
      throw Error(
        `TypeConverterManager.registerConverter error: type '${typename}' already registered to '${nameOfConverter}'`
      );
    }

    const instance = new converter();
    TypeConverterManager._converters[fullConverterName] = instance;
  }

  public static unregisterConverter(
    typename: string,
    converterName?: string
  ): void {
    const fullConverterName = TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );

    // istanbul ignore else
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      delete TypeConverterManager._converters[fullConverterName];
    }
  }

  public static getConverter(
    typename: string,
    converterName?: string
  ): TypeConverter {
    const fullConverterName = TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );

    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName))
      return TypeConverterManager._converters[fullConverterName];

    if (!TypeConverterManager._defaultTypeConverter) {
      TypeConverterManager._defaultTypeConverter = new StringTypeConverter();
    }
    return TypeConverterManager._defaultTypeConverter;
  }
}

// Register these here as this is also the default type register, we always want it to be registered
// and if moved to the StringTypeConverter it causes a dependency loop issue.
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
