/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PrimitiveValue, PropertyRecord } from "@itwin/appui-abstract";
import { TypeConverterManager } from "../../../converters/TypeConverterManager";

/** @internal */
export function convertRecordToString(
  record: PropertyRecord
): string | Promise<string> {
  const primitive = record.value as PrimitiveValue;
  return (
    primitive.displayValue ||
    TypeConverterManager.getConverter(
      record.property.typename,
      record.property.converter?.name
    ).convertPropertyToString(record.property, primitive.value)
  );
}
