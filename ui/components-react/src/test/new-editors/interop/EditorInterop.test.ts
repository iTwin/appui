/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import { describe, it } from "vitest";
import { EditorInterop } from "../../../components-react/new-editors/interop/EditorInterop.js";
import type { OldEditorMetadata } from "../../../components-react/new-editors/interop/Metadata.js";
import type {
  BooleanValue,
  DateValue,
  EnumValue,
  InstanceKeyValue,
  NumericValue,
  TextValue,
} from "../../../components-react/new-editors/values/Values.js";

describe("EditorInterop", () => {
  describe("converts PropertyRecord to ValueMetadata and Value of type", () => {
    it("string", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: "test",
        },
        {
          name: "TestProp",
          typename: "string",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "string",
        typename: "string",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        value: "test",
      } satisfies TextValue);
    });

    it("text", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: "test",
        },
        {
          name: "TestProp",
          typename: "text",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "string",
        typename: "text",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        value: "test",
      } satisfies TextValue);
    });

    it("number", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: 1,
          displayValue: "1",
        },
        {
          name: "TestProp",
          typename: "number",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "number",
        typename: "number",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        rawValue: 1,
        displayValue: "1",
      } satisfies NumericValue);
    });

    it("float", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: 1.23,
          displayValue: "1.23",
        },
        {
          name: "TestProp",
          typename: "float",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "number",
        typename: "float",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        rawValue: 1.23,
        displayValue: "1.23",
      } satisfies NumericValue);
    });

    it("double", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: 2.34,
          displayValue: "2.34",
        },
        {
          name: "TestProp",
          typename: "double",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "number",
        typename: "double",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        rawValue: 2.34,
        displayValue: "2.34",
      } satisfies NumericValue);
    });

    it("int", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: 123,
          displayValue: "123",
        },
        {
          name: "TestProp",
          typename: "int",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "number",
        typename: "int",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        rawValue: 123,
        displayValue: "123",
      } satisfies NumericValue);
    });

    it("integer", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: 456,
          displayValue: "456",
        },
        {
          name: "TestProp",
          typename: "integer",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "number",
        typename: "integer",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        rawValue: 456,
        displayValue: "456",
      } satisfies NumericValue);
    });

    it("boolean", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: true,
        },
        {
          name: "TestProp",
          typename: "boolean",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "bool",
        typename: "boolean",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        value: true,
      } satisfies BooleanValue);
    });

    it("bool", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: true,
        },
        {
          name: "TestProp",
          typename: "bool",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "bool",
        typename: "bool",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        value: true,
      } satisfies BooleanValue);
    });

    it("dateTime", () => {
      const date = new Date();
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: date,
        },
        {
          name: "TestProp",
          typename: "dateTime",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "dateTime",
        typename: "dateTime",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        value: date,
      } satisfies DateValue);
    });

    it("shortdate", () => {
      const date = new Date();
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: date,
        },
        {
          name: "TestProp",
          typename: "shortdate",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "date",
        typename: "shortdate",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        value: date,
      } satisfies DateValue);
    });

    it("enum", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: 1,
        },
        {
          name: "TestProp",
          typename: "enum",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "enum",
        typename: "enum",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        choice: 1,
      } satisfies EnumValue);
    });

    it("navigation", () => {
      const record = new PropertyRecord(
        {
          valueFormat: PropertyValueFormat.Primitive,
          value: { id: "1", className: "TestClass" },
          displayValue: "Test Navigation",
        },
        {
          name: "TestProp",
          typename: "navigation",
          displayLabel: "Test Property",
        }
      );

      const { metadata, value } = EditorInterop.getMetadataAndValue(record);
      expect(metadata).toMatchObject({
        type: "instanceKey",
        typename: "navigation",
      } satisfies OldEditorMetadata);

      expect(value).toMatchObject({
        key: { id: "1", className: "TestClass" },
        label: "Test Navigation",
      } satisfies InstanceKeyValue);
    });
  });

  describe("convertToPrimitiveValue converts Value to PrimitiveValue for type", () => {
    it("string", () => {
      const value = { value: "test" } satisfies TextValue;
      const primitiveValue = EditorInterop.convertToPrimitiveValue(value);
      expect(primitiveValue).toMatchObject({
        valueFormat: PropertyValueFormat.Primitive,
        value: "test",
        displayValue: "test",
      });
    });

    it("number", () => {
      const value = { rawValue: 1, displayValue: "1" } satisfies NumericValue;
      const primitiveValue = EditorInterop.convertToPrimitiveValue(value);
      expect(primitiveValue).toMatchObject({
        valueFormat: PropertyValueFormat.Primitive,
        value: 1,
        displayValue: "1",
      });
    });

    it("boolean", () => {
      const value = { value: true } satisfies BooleanValue;
      const primitiveValue = EditorInterop.convertToPrimitiveValue(value);
      expect(primitiveValue).toMatchObject({
        valueFormat: PropertyValueFormat.Primitive,
        value: true,
        displayValue: "true",
      });
    });

    it("date", () => {
      const date = new Date();
      const value = { value: date } satisfies DateValue;
      const primitiveValue = EditorInterop.convertToPrimitiveValue(value);
      expect(primitiveValue).toMatchObject({
        valueFormat: PropertyValueFormat.Primitive,
        value: date,
        displayValue: date.toString(),
      });
    });

    it("enum", () => {
      const value = { choice: 1 } satisfies EnumValue;
      const primitiveValue = EditorInterop.convertToPrimitiveValue(value);
      expect(primitiveValue).toMatchObject({
        valueFormat: PropertyValueFormat.Primitive,
        value: 1,
      });
    });
  });
});
