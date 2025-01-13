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
import { Value as NewEditorValue } from "../values/Values.js";
import type { OldEditorMetadata } from "./Metadata.js";

/**
 * Interop utilities for converting between old and new editor values.
 * @internal
 */
export namespace EditorInterop {
  /**
   * @internal
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
            displayValue:
              primitiveValue.value !== undefined
                ? `${primitiveValue.value as number}`
                : primitiveValue.displayValue ?? "",
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
            label: primitiveValue.displayValue ?? "",
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

  /**
   * @internal
   */
  export function convertToPrimitiveValue(
    newValue: NewEditorValue
  ): PrimitiveValue {
    if (NewEditorValue.isTextValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value,
      };
    }
    if (NewEditorValue.isNumericValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.rawValue,
        displayValue: newValue.displayValue,
      };
    }
    if (NewEditorValue.isBooleanValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString(),
      };
    }
    if (NewEditorValue.isDateValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString(),
      };
    }

    if (NewEditorValue.isEnumValue(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.choice,
        displayValue: newValue.label,
      };
    }

    throw new Error("Invalid value type");
  }
}
