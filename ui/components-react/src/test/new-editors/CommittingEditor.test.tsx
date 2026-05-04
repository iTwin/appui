/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { CommittingEditor } from "../../components-react/new-editors/interop/PropertyRecordEditor.js";
import type { TextValueMetadata } from "../../components-react/new-editors/values/Metadata.js";
import type { TextValue } from "../../components-react/new-editors/values/Values.js";

describe("CommittingEditor", () => {
  const metadata: TextValueMetadata = { type: "string" };
  const initialValue: TextValue = { value: "hello" };

  it("renders editor with initial value", () => {
    const { getByDisplayValue } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );

    getByDisplayValue("hello");
  });

  it("commits changed value on Enter", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.clear(input);
    await user.type(input, "world");
    await user.keyboard("{Enter}");

    expect(onCommit).toHaveBeenCalledWith({ value: "world" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("commits changed value on Tab", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.clear(input);
    await user.type(input, "world");
    await user.keyboard("{Tab}");

    expect(onCommit).toHaveBeenCalledWith({ value: "world" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("commits changed value on blur", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.clear(input);
    await user.type(input, "world");
    fireEvent.blur(input);

    expect(onCommit).toHaveBeenCalledWith({ value: "world" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("calls onCancel on Escape", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.click(input);
    await user.keyboard("{Escape}");

    expect(onCancel).toHaveBeenCalled();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("calls onCancel when value is unchanged on Enter", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.click(input);
    await user.keyboard("{Enter}");

    expect(onCancel).toHaveBeenCalled();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("commits the value directly without transformation", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={{ type: "string" }}
        initialValue={{ value: "" }}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.type(input, "new value");
    await user.keyboard("{Enter}");

    expect(onCommit).toHaveBeenCalledWith({ value: "new value" });
  });

  it("does not commit after cancel", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    const onCancel = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={onCommit}
        onCancel={onCancel}
      />
    );

    const input = getByRole("textbox");
    await user.clear(input);
    await user.type(input, "changed");
    await user.keyboard("{Escape}");
    fireEvent.blur(input);

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("passes disabled prop to editor", () => {
    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={() => {}}
        onCancel={() => {}}
        disabled
      />
    );

    expect(getByRole("textbox")).toHaveProperty("disabled", true);
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    const { getByRole } = render(
      <CommittingEditor
        metadata={metadata}
        initialValue={initialValue}
        onCommit={() => {}}
        onCancel={() => {}}
        onClick={onClick}
      />
    );

    await user.click(getByRole("textbox"));

    expect(onClick).toHaveBeenCalled();
  });
});
