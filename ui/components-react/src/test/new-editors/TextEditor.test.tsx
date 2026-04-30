/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { TextEditor } from "../../components-react/new-editors/editors/TextEditor.js";
import type { TextValueMetadata } from "../../components-react/new-editors/values/Metadata.js";

describe("TextEditor (new-system)", () => {
  it("renders input with value", () => {
    render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "hello" }}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "hello");
  });

  it("renders empty string when value is undefined", () => {
    render(
      <TextEditor
        metadata={{ type: "string" }}
        value={undefined}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "");
  });

  it("sets maxLength from metadata constraints", () => {
    const metadata: TextValueMetadata = {
      type: "string",
      constraints: { maximumLength: 10 },
    };

    render(
      <TextEditor
        metadata={metadata}
        value={{ value: "" }}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("maxLength", 10);
  });

  it("sets minLength from metadata constraints", () => {
    const metadata: TextValueMetadata = {
      type: "string",
      constraints: { minimumLength: 3 },
    };

    render(
      <TextEditor
        metadata={metadata}
        value={{ value: "" }}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("minLength", 3);
  });

  it("does not set maxLength or minLength when no constraints", () => {
    render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "" }}
        onChange={() => {}}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveProperty("maxLength", -1);
  });

  it("calls onChange with prepareForCommit when user types", async () => {
    const onChange = vi.fn();
    render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    await userEvent.type(screen.getByRole("textbox"), "a");

    expect(onChange).toHaveBeenCalledWith({ value: "a" }, expect.any(Function));
  });

  it("prepareForCommit truncates value exceeding maxLength", () => {
    const onChange = vi.fn();

    render(
      <TextEditor
        metadata={{ type: "string", constraints: { maximumLength: 5 } }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test long name" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    expect(prepareForCommit()).toEqual({ value: "test " });
  });

  it("prepareForCommit returns blank when value is shorter than minLength", () => {
    const onChange = vi.fn();

    render(
      <TextEditor
        metadata={{ type: "string", constraints: { minimumLength: 5 } }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "ab" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    expect(prepareForCommit()).toEqual({ value: "" });
  });

  it("prepareForCommit returns value unchanged when within constraints", () => {
    const onChange = vi.fn();

    render(
      <TextEditor
        metadata={{
          type: "string",
          constraints: { minimumLength: 2, maximumLength: 10 },
        }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    expect(prepareForCommit()).toEqual({ value: "hello" });
  });

  it("prepareForCommit returns value unchanged when no constraints", () => {
    const onChange = vi.fn();

    render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "anything" },
    });

    const prepareForCommit = onChange.mock.calls[0][1];
    expect(prepareForCommit()).toEqual({ value: "anything" });
  });

  it("renders disabled input when disabled prop is true", () => {
    render(
      <TextEditor
        metadata={{ type: "string" }}
        value={{ value: "test" }}
        onChange={() => {}}
        disabled={true}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("disabled", true);
  });
});
