/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { render, screen, waitFor } from "@testing-library/react";
import { PropertyFilterBuilderRuleValue } from "../../components-react/filter-builder/FilterBuilderRuleValue";
import { userEvent } from "../TestUtils";
import { PropertyFilterBuilderRuleRangeValue } from "../../components-react";

describe("PropertyFilterBuilderRuleValue", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  const defaultProperty: PropertyDescription = {
    name: "prop",
    displayLabel: "Prop",
    typename: "string",
  };

  it("renders string value", async () => {
    const { getByDisplayValue } = render(
      <PropertyFilterBuilderRuleValue
        value={{
          valueFormat: PropertyValueFormat.Primitive,
          value: "Test String",
        }}
        property={defaultProperty}
        onChange={() => {}}
        operator={"is-equal"}
      />
    );
    await waitFor(() => getByDisplayValue("Test String"));
  });

  it("renders empty value", () => {
    const { container } = render(
      <PropertyFilterBuilderRuleValue
        property={defaultProperty}
        onChange={() => {}}
        operator={"is-equal"}
      />
    );

    const input = container.querySelector<HTMLInputElement>(
      ".components-editor-container input"
    );
    expect(input).toBeTruthy();

    expect(input?.value).to.be.empty;
  });

  it("calls onChange when value is changed", async () => {
    const spy = vi.fn();
    render(
      <PropertyFilterBuilderRuleValue
        property={defaultProperty}
        onChange={spy}
        operator={"is-equal"}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "test text");
    screen.getByRole("textbox").blur();

    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith({
        valueFormat: PropertyValueFormat.Primitive,
        value: "test text",
        displayValue: "test text",
      })
    );
  });

  describe("range value", () => {
    const prop: PropertyDescription = { ...defaultProperty, typename: "int" };
    const value: PropertyFilterBuilderRuleRangeValue = {
      from: {
        valueFormat: PropertyValueFormat.Primitive,
        value: 123,
      },
      to: {
        valueFormat: PropertyValueFormat.Primitive,
        value: 456,
      },
    };

    it("renders", async () => {
      const serializedValue =
        PropertyFilterBuilderRuleRangeValue.serialize(value);
      const { queryByDisplayValue } = render(
        <PropertyFilterBuilderRuleValue
          property={prop}
          onChange={() => {}}
          operator="between"
          value={serializedValue}
        />
      );

      await waitFor(() => {
        expect(queryByDisplayValue("123")).toBeTruthy();
        expect(queryByDisplayValue("456")).toBeTruthy();
      });
    });

    it("calls 'onChange' when 'from' value changes", async () => {
      const serializedValue =
        PropertyFilterBuilderRuleRangeValue.serialize(value);
      const user = userEvent.setup();
      const spy = vi.fn();
      const { getByDisplayValue } = render(
        <PropertyFilterBuilderRuleValue
          property={prop}
          onChange={spy}
          operator="between"
          value={serializedValue}
        />
      );

      const input = await waitFor(() => getByDisplayValue("123"));
      await user.type(input, "456");
      await user.keyboard("{Enter}");

      const expected = PropertyFilterBuilderRuleRangeValue.serialize({
        ...value,
        from: { ...value.from, value: 123456, displayValue: "123456" },
      } as PropertyFilterBuilderRuleRangeValue);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(expected);
      });
    });

    it("calls 'onChange' when 'to' value changes", async () => {
      const serializedValue =
        PropertyFilterBuilderRuleRangeValue.serialize(value);
      const user = userEvent.setup();
      const spy = vi.fn();
      const { getByDisplayValue } = render(
        <PropertyFilterBuilderRuleValue
          property={prop}
          onChange={spy}
          operator="between"
          value={serializedValue}
        />
      );

      const input = await waitFor(() => getByDisplayValue("456"));
      await user.type(input, "789");
      await user.keyboard("{Enter}");

      const expected = PropertyFilterBuilderRuleRangeValue.serialize({
        ...value,
        to: { ...value.to, value: 456789, displayValue: "456789" },
      } as PropertyFilterBuilderRuleRangeValue);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(expected);
      });
    });
  });
});
