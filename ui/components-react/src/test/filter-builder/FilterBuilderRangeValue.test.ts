/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { PrimitiveValue, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { PropertyFilterBuilderRuleRangeValue } from "../../components-react";
import { expect } from "chai";

describe("PropertyFilterBuilderRuleRangeValue", () => {
  it("serializes value", () => {
    const value: PropertyFilterBuilderRuleRangeValue = {
      from: {
        valueFormat: PropertyValueFormat.Primitive,
        value: 123,
        displayValue: "123",
      },
      to: {
        valueFormat: PropertyValueFormat.Primitive,
        value: 456,
        displayValue: "456",
      },
    };
    const serialized = PropertyFilterBuilderRuleRangeValue.serialize(
      value
    ) as PrimitiveValue;
    expect(serialized.value as string).to.be.eq(JSON.stringify(value));
  });

  describe("parse", () => {
    it("valid value", () => {
      const expected: PropertyFilterBuilderRuleRangeValue = {
        from: {
          valueFormat: PropertyValueFormat.Primitive,
          value: 123,
          displayValue: "123",
        },
        to: {
          valueFormat: PropertyValueFormat.Primitive,
          value: 456,
          displayValue: "456",
        },
      };
      const serializedValue: PropertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: JSON.stringify(expected),
      };
      const parsed = PropertyFilterBuilderRuleRangeValue.parse(serializedValue);
      expect(parsed).to.be.deep.eq(expected);
    });

    it("undefined value", () => {
      const expected: PropertyFilterBuilderRuleRangeValue = {
        from: { valueFormat: PropertyValueFormat.Primitive },
        to: { valueFormat: PropertyValueFormat.Primitive },
      };
      const serializedValue: PropertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: undefined,
      };
      const parsed = PropertyFilterBuilderRuleRangeValue.parse(serializedValue);
      expect(parsed).to.be.deep.eq(expected);
    });

    it("empty value", () => {
      const expected: PropertyFilterBuilderRuleRangeValue = {
        from: { valueFormat: PropertyValueFormat.Primitive },
        to: { valueFormat: PropertyValueFormat.Primitive },
      };
      const serializedValue: PropertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: JSON.stringify({}),
      };
      const parsed = PropertyFilterBuilderRuleRangeValue.parse(serializedValue);
      expect(parsed).to.be.deep.eq(expected);
    });

    it("returns empty value if JSON is invalid", () => {
      const expected: PropertyFilterBuilderRuleRangeValue = {
        from: { valueFormat: PropertyValueFormat.Primitive },
        to: { valueFormat: PropertyValueFormat.Primitive },
      };
      const serializedValue: PropertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: "invalid",
      };
      const parsed = PropertyFilterBuilderRuleRangeValue.parse(serializedValue);
      expect(parsed).to.be.deep.eq(expected);
    });
  });

  it("isRangeValid returns correct result for numbers", () => {
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: 123 },
        to: { valueFormat: PropertyValueFormat.Primitive, value: 456 },
      })
    ).to.be.true;
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: 456 },
        to: { valueFormat: PropertyValueFormat.Primitive, value: 123 },
      })
    ).to.be.false;
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: "invalid" },
        to: { valueFormat: PropertyValueFormat.Primitive, value: 456 },
      })
    ).to.be.false;
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: 123 },
        to: { valueFormat: PropertyValueFormat.Primitive, value: "invalid" },
      })
    ).to.be.false;
  });

  it("isRangeValid returns correct result for dates", () => {
    const fromDate = new Date("2024-01-01");
    const toDate = new Date("2024-01-05");
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: fromDate },
        to: { valueFormat: PropertyValueFormat.Primitive, value: toDate },
      })
    ).to.be.true;
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: toDate },
        to: { valueFormat: PropertyValueFormat.Primitive, value: fromDate },
      })
    ).to.be.false;
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: "invalid" },
        to: { valueFormat: PropertyValueFormat.Primitive, value: toDate },
      })
    ).to.be.false;
    expect(
      PropertyFilterBuilderRuleRangeValue.isRangeValid({
        from: { valueFormat: PropertyValueFormat.Primitive, value: fromDate },
        to: { valueFormat: PropertyValueFormat.Primitive, value: "invalid" },
      })
    ).to.be.false;
  });
});
