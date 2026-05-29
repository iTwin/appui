/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { QuantityInput } from "../../../imodel-components-react/inputs/new-editors/QuantityInput.js";
import type { FormatterSpec, ParserSpec } from "@itwin/core-quantity";
import type { NumericValue } from "@itwin/components-react";

function createMockFormatter(unitLabel: string): FormatterSpec {
  return {
    applyFormatting: (value: number) => `${value} ${unitLabel}`,
    unitConversions: [
      { label: unitLabel, conversion: { factor: 1, offset: 0 } },
    ],
  } as unknown as FormatterSpec;
}

function createMockParser(): ParserSpec {
  return {
    parseToQuantityValue: (input: string) => {
      const num = parseFloat(input);
      if (isNaN(num)) {
        return { ok: false };
      }
      return { ok: true, value: num };
    },
  } as unknown as ParserSpec;
}

describe("QuantityInput (new-editors)", () => {
  it("renders formatted value when rawValue is defined", () => {
    const formatter = createMockFormatter("m");
    const parser = createMockParser();
    const value: NumericValue = { rawValue: 5, displayValue: "5 m" };

    const { getByDisplayValue } = render(
      <QuantityInput
        formatter={formatter}
        parser={parser}
        value={value}
        onChange={() => {}}
      />
    );

    getByDisplayValue("5 m");
  });

  it("renders display value as-is when rawValue is undefined", () => {
    const formatter = createMockFormatter("m");
    const parser = createMockParser();
    const value: NumericValue = {
      rawValue: undefined,
      displayValue: "-- m",
    };

    const { getByDisplayValue } = render(
      <QuantityInput
        formatter={formatter}
        parser={parser}
        value={value}
        onChange={() => {}}
      />
    );

    getByDisplayValue("-- m");
  });

  it("renders placeholder when formatter is provided", () => {
    const formatter = createMockFormatter("m");
    const parser = createMockParser();
    const value: NumericValue = { rawValue: 5, displayValue: "5 m" };

    const { getByRole } = render(
      <QuantityInput
        formatter={formatter}
        parser={parser}
        value={value}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox").getAttribute("placeholder")).toBe("m");
  });

  it("is disabled when formatter is not provided", () => {
    const parser = createMockParser();
    const value: NumericValue = { rawValue: 5, displayValue: "5 m" };

    const { getByRole } = render(
      <QuantityInput parser={parser} value={value} onChange={() => {}} />
    );

    expect(getByRole("textbox")).toHaveProperty("disabled", true);
  });

  it("is disabled when parser is not provided", () => {
    const formatter = createMockFormatter("m");
    const value: NumericValue = { rawValue: 5, displayValue: "5 m" };

    const { getByRole } = render(
      <QuantityInput formatter={formatter} value={value} onChange={() => {}} />
    );

    expect(getByRole("textbox")).toHaveProperty("disabled", true);
  });

  it("calls onChange when user types a valid value", async () => {
    const user = userEvent.setup();
    const formatter = createMockFormatter("m");
    const parser = createMockParser();
    const onChange = vi.fn();
    const value: NumericValue = {
      rawValue: 5,
      displayValue: "5 m",
    };

    const { getByDisplayValue } = render(
      <QuantityInput
        formatter={formatter}
        parser={parser}
        value={value}
        onChange={onChange}
      />
    );

    const input = getByDisplayValue("5 m");
    await user.clear(input);
    await user.type(input, "10");

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ rawValue: 10 })
    );
  });
});
