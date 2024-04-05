/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PrimitiveValue } from "@itwin/appui-abstract";
import { NavigationPropertyTypeConverter } from "../../components-react/converters/NavigationPropertyTypeConverter";
import { TestUtils } from "../TestUtils";

describe("NavigationPropertyTypeConverter", () => {
  const converter = new NavigationPropertyTypeConverter();
  describe("convertPropertyToString", () => {
    it("returns property description display label when value is not undefined", () => {
      const record = TestUtils.createNavigationProperty(
        "test_property",
        { className: "", id: "0x1" },
        "test_value"
      );
      const { property, value } = record;
      const convertedString = converter.convertPropertyToString(
        property,
        (value as PrimitiveValue).value
      );
      expect(convertedString).toEqual("test_property");
    });

    it("returns empty string when value is undefined", () => {
      const record = TestUtils.createNavigationProperty(
        "test_property",
        { className: "", id: "0x1" },
        "test_value"
      );
      const convertedString = converter.convertPropertyToString(
        record.property,
        undefined
      );
      expect(convertedString).toEqual("");
    });
  });

  describe("sortCompare", () => {
    it("compares two navigation property values", () => {
      const { value: a } = TestUtils.createNavigationProperty("test_property", {
        className: "",
        id: "0x1",
      });
      const { value: b } = TestUtils.createNavigationProperty("test_property", {
        className: "",
        id: "0x2",
      });
      const result = converter.sortCompare(
        (a as PrimitiveValue).value!,
        (b as PrimitiveValue).value!
      );
      expect(result).toEqual(-1);
    });

    it("does not throw when handling non-navigation property values", () => {
      const result = converter.sortCompare(1, 2);
      expect(result).toEqual(0);
    });
  });
});
