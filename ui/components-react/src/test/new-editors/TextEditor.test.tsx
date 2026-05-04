/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { TextEditor } from "../../components-react/new-editors/editors/TextEditor.js";
import type { TextValueMetadata } from "../../components-react/new-editors/values/Metadata.js";

describe("TextEditor (new-system)", () => {
  it("renders input with value", () => {
    const { getByDisplayValue } = render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "hello" }}
        onChange={() => {}}
      />
    );

    getByDisplayValue("hello");
  });

  it("renders empty string when value is undefined", () => {
    const { getByRole } = render(
      <TextEditor
        metadata={{ type: "string" }}
        value={undefined}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("value", "");
  });

  it("sets maxLength from metadata constraints", () => {
    const metadata: TextValueMetadata = {
      type: "string",
      constraints: { maximumLength: 10 },
    };

    const { getByRole } = render(
      <TextEditor
        metadata={metadata}
        value={{ value: "" }}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("maxLength", 10);
  });

  it("sets minLength from metadata constraints", () => {
    const metadata: TextValueMetadata = {
      type: "string",
      constraints: { minimumLength: 3 },
    };

    const { getByRole } = render(
      <TextEditor
        metadata={metadata}
        value={{ value: "" }}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("minLength", 3);
  });

  it("does not set maxLength or minLength when no constraints", () => {
    const { getByRole } = render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "" }}
        onChange={() => {}}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("maxLength", -1);
  });

  it("calls onChange with value when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    await user.type(getByRole("textbox"), "a");

    expect(onChange).toHaveBeenCalledWith({ value: "a" });
  });

  it("passes value through onChange without transformation", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <TextEditor
        metadata={{ type: "string", constraints: { maximumLength: 5 } }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    await user.click(getByRole("textbox"));
    await user.paste("hello");

    expect(onChange).toHaveBeenLastCalledWith({ value: "hello" });
  });

  it("renders disabled input when disabled prop is true", () => {
    const { getByRole } = render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "test" }}
        onChange={() => {}}
        disabled={true}
      />
    );

    expect(getByRole("textbox")).toHaveProperty("disabled", true);
  });
});
