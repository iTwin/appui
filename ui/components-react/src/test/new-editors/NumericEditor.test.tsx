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

  it("calls onChange with clamped value when user types", () => {
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

    expect(onChange).toHaveBeenCalledWith({ rawValue: 7, displayValue: "7" });
  });

  it("clamps value below minimum at onChange", () => {
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

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 0,
      displayValue: "-5",
    });
  });

  it("clamps value above maximum at onChange", () => {
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

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 100,
      displayValue: "150",
    });
  });

  it("passes value unchanged when within constraints", () => {
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

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 50,
      displayValue: "50",
    });
  });

  it("passes value unchanged when no constraints", () => {
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

    expect(onChange).toHaveBeenCalledWith({
      rawValue: 999,
      displayValue: "999",
    });
  });

  it("sets rawValue to undefined for NaN input", () => {
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

    expect(onChange).toHaveBeenCalledWith({
      rawValue: undefined,
      displayValue: "abc",
    });
  });
});
