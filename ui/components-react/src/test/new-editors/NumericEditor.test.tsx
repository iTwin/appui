/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { NumericEditor } from "../../components-react/new-editors/editors/NumericEditor.js";
import type { NumericValueMetadata } from "../../components-react/new-editors/values/Metadata.js";

describe("NumericEditor (new-system)", () => {
  it("renders input with display value", () => {
    render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={{ rawValue: 42, displayValue: "42" }}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "42");
  });

  it("renders empty string when value is undefined", () => {
    render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={undefined}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "");
  });

  it("calls onChange with prepareForCommit when user types", () => {
    const onChange = vi.fn();
    render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "7" },
    });

    expect(onChange).toHaveBeenCalledWith(
      { rawValue: 7, displayValue: "7" },
      expect.any(Function)
    );
  });

  it("prepareForCommit clamps value below minimum to minimum", () => {
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "-5" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    expect(prepareForCommit()).toEqual({ rawValue: 0, displayValue: "0" });
  });

  it("prepareForCommit clamps value above maximum to maximum", () => {
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "150" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    expect(prepareForCommit()).toEqual({ rawValue: 100, displayValue: "100" });
  });

  it("prepareForCommit returns value unchanged when within constraints", () => {
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "50" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBe(50);
  });

  it("prepareForCommit returns value unchanged when no constraints", () => {
    const onChange = vi.fn();

    render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "999" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBe(999);
  });

  it("prepareForCommit handles NaN input without clamping", () => {
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "abc" },
    });

    // onChange first arg has rawValue: undefined for NaN
    expect(onChange.mock.calls[0][0]).toEqual({
      rawValue: undefined,
      displayValue: "abc",
    });

    // prepareForCommit returns NaN rawValue (no clamping for non-numeric)
    const prepareForCommit = onChange.mock.calls[0][1];
    const result = prepareForCommit();
    expect(result.rawValue).toBeNaN();
  });
});
