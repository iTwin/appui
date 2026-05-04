/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { CommittingEditor } from "../../components-react/new-editors/interop/PropertyRecordEditor.js";
import type { TextValueMetadata } from "../../components-react/new-editors/values/Metadata.js";
import type { TextValue } from "../../components-react/new-editors/values/Values.js";

describe("CommittingEditor", () => {
  const metadata: TextValueMetadata = { type: "string" };
  const initialValue: TextValue = { value: "hello" };

  it("renders editor with initial value", () => {
    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("value", "hello");
  });

  it("commits changed value on Enter", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "world" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onCommit).toHaveBeenCalledWith({ value: "world" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("commits changed value on Tab", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "world" } });
    fireEvent.keyDown(input, { key: "Tab" });

    expect(onCommit).toHaveBeenCalledWith({ value: "world" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("commits changed value on blur", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "world" } });
    fireEvent.blur(input);

    expect(onCommit).toHaveBeenCalledWith({ value: "world" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("calls onCancel on Escape", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Escape" });

    expect(onCancel).toHaveBeenCalled();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("calls onCancel when value is unchanged on Enter", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onCancel).toHaveBeenCalled();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("commits the value directly without transformation", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={{ type: "string" }}
        initialValue={{ value: "" }}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onCommit).toHaveBeenCalledWith({ value: "new value" });
  });

  it("does not commit after cancel", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.keyDown(input, { key: "Escape" });
    fireEvent.blur(input);

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("passes disabled prop to editor", () => {
    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={() => {}}
        onCancel={() => {}}
        disabled
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty("disabled", true);
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={() => {}}
        onCancel={() => {}}
        onClick={onClick}
      />
    );

    fireEvent.click(screen.getByRole("textbox"));

    expect(onClick).toHaveBeenCalled();
  });
});
