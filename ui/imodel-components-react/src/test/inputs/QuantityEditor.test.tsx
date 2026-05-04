/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import type { QuantityValueMetadata } from "../../imodel-components-react/inputs/new-editors/QuantityEditor.js";
import {
  EditorRenderer,
  EditorsRegistryProvider,
} from "@itwin/components-react";

vi.mock(
  "../../imodel-components-react/inputs/new-editors/UseQuantityInfo.js",
  () => ({
    useQuantityInfo: () => ({
      defaultFormatter: { applyFormatting: (v: number) => `${v} m` },
      highPrecisionFormatter: { applyFormatting: (v: number) => `${v} m` },
      parser: {
        parseToQuantityValue: (input: string) => {
          const num = parseFloat(input);
          return isNaN(num) ? { ok: false } : { ok: true, value: num };
        },
      },
    }),
  })
);

// Import after mock setup
const { QuantityEditorSpec } = await import(
  "../../imodel-components-react/inputs/new-editors/QuantityEditor.js"
);

function renderQuantityEditor(
  metadata: QuantityValueMetadata,
  value: { rawValue: number | undefined; displayValue: string },
  onChange: (...args: any[]) => void
) {
  return render(
    <EditorsRegistryProvider editors={[QuantityEditorSpec]}>
      <EditorRenderer metadata={metadata} value={value} onChange={onChange} />
    </EditorsRegistryProvider>
  );
}

describe("QuantityEditor", () => {
  const metadata: QuantityValueMetadata = {
    type: "number",
    quantityType: 1, // any value, hook is mocked
  };

  it("renders input with formatted value", () => {
    renderQuantityEditor(
      metadata,
      { rawValue: 5, displayValue: "5 m" },
      () => {}
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "5 m");
  });

  it("calls onChange when user types a value", () => {
    const onChange = vi.fn();
    renderQuantityEditor(
      metadata,
      { rawValue: 0, displayValue: "0 m" },
      onChange
    );
    onChange.mockClear();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "25" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 25 })
    );
  });

  it("clamps value below minimum at onChange", () => {
    const onChange = vi.fn();
    const constrainedMetadata: QuantityValueMetadata = {
      type: "number",
      quantityType: 1,
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    renderQuantityEditor(
      constrainedMetadata,
      { rawValue: 0, displayValue: "0 m" },
      onChange
    );
    onChange.mockClear();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "-10" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 0 })
    );
  });

  it("clamps value above maximum at onChange", () => {
    const onChange = vi.fn();
    const constrainedMetadata: QuantityValueMetadata = {
      type: "number",
      quantityType: 1,
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    renderQuantityEditor(
      constrainedMetadata,
      { rawValue: 0, displayValue: "0 m" },
      onChange
    );
    onChange.mockClear();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "200" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 100 })
    );
  });

  it("passes value unchanged when within constraints", () => {
    const onChange = vi.fn();
    const constrainedMetadata: QuantityValueMetadata = {
      type: "number",
      quantityType: 1,
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    renderQuantityEditor(
      constrainedMetadata,
      { rawValue: 0, displayValue: "0 m" },
      onChange
    );
    onChange.mockClear();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "50" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 50 })
    );
  });

  it("passes value unchanged when no constraints", () => {
    const onChange = vi.fn();
    renderQuantityEditor(
      metadata,
      { rawValue: 0, displayValue: "0 m" },
      onChange
    );
    onChange.mockClear();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "999" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rawValue: 999 })
    );
  });
});
