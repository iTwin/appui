/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PrimitiveValue, PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type {
  BooleanValue,
  DateValue,
  EnumValue,
  Value as NewEditorValue,
  NumericValue,
  TextValue,
} from "../values/Values.js";
import {
  isBooleanValue,
  isDateTimeValue,
  isEnumValue,
  isNumericValue,
  isTextValue,
} from "../values/Values.js";
import type { OldEditorMetadata } from "./Metadata.js";

export namespace EditorInterop {
  /**
   *
   */
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
            type: "date",
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
            displayValue: primitiveValue.displayValue ?? "",
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
            label: primitiveValue.displayValue as string,
          } satisfies EnumValue,
        };
    }

    return {
      metadata: undefined,
      value: undefined,
    };
  }

  /**
   *
   */
  export function convertToPrimitiveValue(
    newValue: NewEditorValue
  ): PrimitiveValue {
    if (isTextValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value,
      };
    }
    if (isNumericValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.rawValue,
        displayValue: newValue.displayValue,
      };
    }
    if (isBooleanValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString(),
      };
    }
    if (isDateTimeValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString(),
      };
    }

    if (isEnumValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.choice,
        displayValue: newValue.label,
      };
    }

    throw new Error("Invalid value type");
  }
}
