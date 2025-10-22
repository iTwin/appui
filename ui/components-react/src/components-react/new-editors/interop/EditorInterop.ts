/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type {
  Primitives,
  PrimitiveValue,
  PropertyRecord,
} from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type {
  BooleanValue,
  DateValue,
  EnumValue,
  InstanceKeyValue,
  NumericValue,
  TextValue,
} from "../values/Values.js";
import type { Value as NewEditorValue } from "../values/Values.js";
import type { OldEditorMetadata } from "./Metadata.js";
import {
  isBoolean,
  isDate,
  isEnum,
  isNumeric,
  isText,
} from "../values/ValueUtilities.js";

/**
 * Interop utilities for converting between old and new editor values.
 * @internal
 */
export namespace EditorInterop {
  /** Attempts to convert `PropertyRecord` into `ValueMetadata` and `Value`. */
  export function getMetadataAndValue(propertyRecord: PropertyRecord): {
    metadata: OldEditorMetadata | undefined;
    value: NewEditorValue | undefined;
  } {
    const baseMetadata: Omit<OldEditorMetadata, "type"> = {
      preferredEditor: propertyRecord.property.editor?.name,
      params: propertyRecord.property.editor?.params,
      extendedData: propertyRecord.extendedData,
      enum: propertyRecord.property.enum,
      typename: propertyRecord.property.typename,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      quantityType: propertyRecord.property.quantityType,
    };

    const primitiveValue = propertyRecord.value as PrimitiveValue;
    switch (propertyRecord.property.typename) {
      case "text":
      case "string":
        return {
          metadata: {
            ...baseMetadata,
            type: "string",
          },
          value: {
            value: (primitiveValue.value as string) ?? "",
          } satisfies TextValue,
        };
      case "dateTime":
      case "shortdate":
        return {
          metadata: {
            ...baseMetadata,
            type:
              propertyRecord.property.typename === "shortdate"
                ? "date"
                : "dateTime",
          },
          value: {
            value: (primitiveValue.value as Date) ?? new Date(),
          } satisfies DateValue,
        };
      case "boolean":
      case "bool":
        return {
          metadata: {
            ...baseMetadata,
            type: "bool",
          },
          value: {
            value: (primitiveValue.value as boolean) ?? false,
          } satisfies BooleanValue,
        };
      case "float":
      case "double":
      case "int":
      case "integer":
      case "number":
        return {
          metadata: {
            ...baseMetadata,
            type: "number",
          },
          value: {
            rawValue: primitiveValue.value as number,
            displayValue: primitiveValue.displayValue
              ? primitiveValue.displayValue
              : primitiveValue.value !== undefined
              ? `${primitiveValue.value as number}`
              : "",
            roundingError: primitiveValue.roundingError,
          } satisfies NumericValue,
        };
      case "enum":
        return {
          metadata: {
            ...baseMetadata,
            type: "enum",
          },
          value: {
            choice: primitiveValue.value as number | string,
          } satisfies EnumValue,
        };
      case "navigation":
        return {
          metadata: {
            ...baseMetadata,
            type: "instanceKey",
          },
          value: {
            key: primitiveValue.value as Primitives.InstanceKey,
            label: primitiveValue.displayValue ?? "",
          } satisfies InstanceKeyValue,
        };
    }

    return {
      metadata: undefined,
      value: undefined,
    };
  }

  /** Converts new editors system `Value` into old `PrimitiveValue` */
  export function convertToPrimitiveValue(
    newValue: NewEditorValue
  ): PrimitiveValue {
    if (isText(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value,
      };
    }
    if (isNumeric(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.rawValue,
        displayValue: newValue.displayValue,
        roundingError: newValue.roundingError,
      };
    }
    if (isBoolean(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString(),
      };
    }
    if (isDate(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString(),
      };
    }

    if (isEnum(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.choice,
      };
    }

    throw new Error("Unsupported value type");
  }
}
