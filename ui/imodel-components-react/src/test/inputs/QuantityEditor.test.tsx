/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuantityValueMetadata } from "../../imodel-components-react/inputs/new-editors/QuantityEditor.js";

const METERS_PER_INCH = 0.0254;
const convertMetersToInches = (meters: number) => meters / METERS_PER_INCH;
const convertInchesToMeters = (inches: number) => inches * METERS_PER_INCH;

const mockConfig = {
  formatter: (v: number) => `${v} m`,
  parser: (input: string) => {
    const num = parseFloat(input);
    return isNaN(num) ? { ok: false } : { ok: true, value: num };
  },
};

vi.mock(
  "../../imodel-components-react/inputs/new-editors/UseQuantityInfo.js",
  () => ({
    useQuantityInfo: () => ({
      defaultFormatter: {
        applyFormatting: (v: number) => mockConfig.formatter(v),
      },
      highPrecisionFormatter: {
        applyFormatting: (v: number) => mockConfig.formatter(v),
      },
      parser: {
        parseToQuantityValue: (input: string) => mockConfig.parser(input),
      },
    }),
  })
);

// Import after mock setup
const { QuantityEditor } = await import(
  "../../imodel-components-react/inputs/new-editors/QuantityEditor.js"
);

function renderQuantityEditor(
  metadata: QuantityValueMetadata,
  value: { rawValue: number | undefined; displayValue: string },
  onChange: (...args: any[]) => void
) {
  return render(
    <QuantityEditor metadata={metadata} value={value} onChange={onChange} />
  );
}

describe("QuantityEditor", () => {
  describe("persistence unit matches display unit", () => {
    const metadata: QuantityValueMetadata = {
      type: "number",
      quantityType: 1, // any value, hook is mocked
    };

    it("renders input with formatted value", () => {
      const { getByDisplayValue } = renderQuantityEditor(
        metadata,
        { rawValue: 5, displayValue: "5 m" },
        () => {}
      );

      getByDisplayValue("5 m");
    });

    it("calls onChange when user types a value", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { getByRole } = renderQuantityEditor(
        metadata,
        { rawValue: 0, displayValue: "0 m" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      await user.type(input, "25");

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ rawValue: 25 })
      );
    });

    it("clamps value below minimum at onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const constrainedMetadata: QuantityValueMetadata = {
        type: "number",
        quantityType: 1,
        constraints: { minimumValue: 0, maximumValue: 100 },
      };

      const { getByRole } = renderQuantityEditor(
        constrainedMetadata,
        { rawValue: 0, displayValue: "0 m" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      await user.type(input, "-10");

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ rawValue: 0 })
      );
    });

    it("clamps value above maximum at onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const constrainedMetadata: QuantityValueMetadata = {
        type: "number",
        quantityType: 1,
        constraints: { minimumValue: 0, maximumValue: 100 },
      };

      const { getByRole } = renderQuantityEditor(
        constrainedMetadata,
        { rawValue: 0, displayValue: "0 m" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      await user.type(input, "200");

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ rawValue: 100 })
      );
    });

    it("passes value unchanged when within constraints", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const constrainedMetadata: QuantityValueMetadata = {
        type: "number",
        quantityType: 1,
        constraints: { minimumValue: 0, maximumValue: 100 },
      };

      const { getByRole } = renderQuantityEditor(
        constrainedMetadata,
        { rawValue: 0, displayValue: "0 m" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      await user.type(input, "50");

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ rawValue: 50 })
      );
    });

    it("passes value unchanged when no constraints", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { getByRole } = renderQuantityEditor(
        metadata,
        { rawValue: 0, displayValue: "0 m" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      await user.type(input, "999");

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ rawValue: 999 })
      );
    });
  });

  describe("persistence unit is different from display unit", () => {
    const metadata: QuantityValueMetadata = {
      type: "number",
      quantityType: 1,
    };

    beforeEach(() => {
      // Display unit: inches, persistence unit: meters
      mockConfig.formatter = (v: number) => `${+convertMetersToInches(v)} in`;
      mockConfig.parser = (input: string) => {
        const num = parseFloat(input);
        // Parser converts display value (inches) to persistence value (meters)
        return isNaN(num)
          ? { ok: false }
          : { ok: true, value: convertInchesToMeters(num) };
      };
    });

    afterEach(() => {
      mockConfig.formatter = (v: number) => `${v} m`;
      mockConfig.parser = (input: string) => {
        const num = parseFloat(input);
        return isNaN(num) ? { ok: false } : { ok: true, value: num };
      };
    });

    it("renders value converted from persistence to display unit", () => {
      const meters = 1;
      const { getByDisplayValue } = renderQuantityEditor(
        metadata,
        {
          rawValue: meters,
          displayValue: `${convertMetersToInches(meters)} in`,
        },
        () => {}
      );

      getByDisplayValue(`${convertMetersToInches(meters)} in`);
    });

    it("converts input in display units to persistence units via parser", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const meters = 0;
      const { getByRole } = renderQuantityEditor(
        metadata,
        {
          rawValue: meters,
          displayValue: `${convertMetersToInches(meters)} in`,
        },
        onChange
      );

      const newValueInInches = 100;

      const input = getByRole("textbox");
      await user.clear(input);
      await user.type(input, `${newValueInInches} in`);

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          rawValue: convertInchesToMeters(newValueInInches),
        })
      );
    });

    it("applies constraints in persistence units", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const constrainedMetadata: QuantityValueMetadata = {
        type: "number",
        quantityType: 1,
        // Constraints are in persistence unit (meters): max 1 meter
        constraints: { minimumValue: 0, maximumValue: 1 },
      };

      const { getByRole } = renderQuantityEditor(
        constrainedMetadata,
        { rawValue: 0, displayValue: "0 in" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      // Type 50 inches = 1.27 meters, exceeds maximumValue of 1 meter
      const newValueInInches = 50;
      await user.type(input, `${newValueInInches} in`);

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ rawValue: 1 })
      );
    });

    it("does not clamp value when within constraints in persistence units", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const constrainedMetadata: QuantityValueMetadata = {
        type: "number",
        quantityType: 1,
        // Constraints in meters: max 5 meters
        constraints: { minimumValue: 0, maximumValue: 5 },
      };

      const { getByRole } = renderQuantityEditor(
        constrainedMetadata,
        { rawValue: 0, displayValue: "0 in" },
        onChange
      );

      const input = getByRole("textbox");
      await user.clear(input);
      // 10 inches = 0.254 meters, is within maximumValue of 5 meters
      const newValueInInches = 10;
      await user.type(input, `${newValueInInches} in`);

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          rawValue: convertInchesToMeters(newValueInInches),
        })
      );
    });
  });
});
