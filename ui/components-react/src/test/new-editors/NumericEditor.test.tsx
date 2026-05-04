/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { NumericEditor } from "../../components-react/new-editors/editors/NumericEditor.js";
import type { NumericValueMetadata } from "../../components-react/new-editors/values/Metadata.js";

describe("NumericEditor (new-system)", () => {
  it("renders input with display value", () => {
    const { getByDisplayValue } = render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={{ rawValue: 42, displayValue: "42" }}
        onChange={() => {}}
      />
    );

    getByDisplayValue("42");
  });

  it("renders empty string when value is undefined", () => {
    const { getByRole } = render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={undefined}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("value", "");
  });

  it("calls onChange with clamped value when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "7");

    expect(onChange).toHaveBeenCalledWith({ rawValue: 7, displayValue: "7" });
  });

  it("clamps value below minimum at onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    const { getByRole } = render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    await user.click(getByRole("textbox"));
    await user.paste("-5");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 0,
      displayValue: "-5",
    });
  });

  it("clamps value above maximum at onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    const { getByRole } = render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    await user.click(getByRole("textbox"));
    await user.paste("150");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 100,
      displayValue: "150",
    });
  });

  it("passes value unchanged when within constraints", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    const { getByRole } = render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    await user.click(getByRole("textbox"));
    await user.paste("50");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 50,
      displayValue: "50",
    });
  });

  it("passes value unchanged when no constraints", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <NumericEditor
        metadata={{ type: "number" }}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    await user.click(getByRole("textbox"));
    await user.paste("999");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: 999,
      displayValue: "999",
    });
  });

  it("sets rawValue to undefined for NaN input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const metadata: NumericValueMetadata = {
      type: "number",
      constraints: { minimumValue: 0, maximumValue: 100 },
    };

    const { getByRole } = render(
      <NumericEditor
        metadata={metadata}
        value={{ rawValue: undefined, displayValue: "" }}
        onChange={onChange}
      />
    );

    await user.click(getByRole("textbox"));
    await user.paste("abc");

    expect(onChange).toHaveBeenLastCalledWith({
      rawValue: undefined,
      displayValue: "abc",
    });
  });
});
