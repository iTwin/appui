/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  PrimitiveValue,
  PropertyEditorParams,
  PropertyRecord,
} from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type {
  BooleanValue,
  DateValue,
  Value as EditorValue,
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
import type { EnumValueMetadata, ValueMetadata } from "../values/Metadata.js";

export namespace EditorInterop {
  /**
   *
   */
  export interface NumericEditorMetadata extends ValueMetadata {
    type: "number";
    params: PropertyEditorParams[];
  }

  /**
   *
   */
  export function isNumericEditorMetadata(
    metadata: ValueMetadata
  ): metadata is NumericEditorMetadata {
    return metadata.type === "number" && "params" in metadata;
  }

  /**
   *
   */
  export function getMetadataAndValue(propertyRecord: PropertyRecord): {
    metadata: ValueMetadata | undefined;
    value: EditorValue | undefined;
  } {
    const baseMetadata: Omit<ValueMetadata, "type"> = {
      preferredEditor: propertyRecord.property.editor?.name,
      ...(propertyRecord.property.editor
        ? { params: propertyRecord.property.editor.params }
        : {}),
      ...(propertyRecord.property.enum
        ? { choices: propertyRecord.property.enum.choices }
        : {}),
      ...(propertyRecord.property.quantityType
        ? { quantityType: propertyRecord.property.quantityType }
        : {}),
      ...propertyRecord.extendedData,
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
          } as ValueMetadata,
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
          } as EnumValueMetadata,
          value: {
            choice: primitiveValue.value as number | string,
            label: primitiveValue.displayValue as string,
          },
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
    newValue: EditorValue
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
