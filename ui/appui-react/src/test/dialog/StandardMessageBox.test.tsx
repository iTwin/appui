/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import * as React from "react";
import { MessageBoxIconType, MessageBoxType } from "@itwin/core-frontend";
import { render, screen } from "@testing-library/react";
import { StandardMessageBox } from "../../appui-react";
import TestUtils, { childStructure, userEvent } from "../TestUtils";

describe("StandardMessageBox", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  it("OK button & NoSymbol", async () => {
    const spyMethod = vi.fn();

    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.NoSymbol}
        messageBoxType={MessageBoxType.Ok}
        onResult={spyMethod}
      />
    );

    const { container } = render(reactNode);
    expect(
      container.querySelector(".icon.core-message-box-icon")?.classList.length
    ).to.eq(2);

    await theUserTo.click(screen.getByRole("button", { name: "dialog.ok" }));
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("OK/Cancel buttons & Information", async () => {
    const spyMethod = vi.fn();

    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Information}
        messageBoxType={MessageBoxType.OkCancel}
        onResult={spyMethod}
      />
    );

    render(reactNode);
    expect(screen.getByTestId("core-dialog-container")).to.satisfy(
      childStructure(".icon.core-message-box-icon")
    );

    await theUserTo.click(screen.getByRole("button", { name: "dialog.ok" }));
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("Yes/No buttons & Question", async () => {
    const spyMethod = vi.fn();

    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Question}
        messageBoxType={MessageBoxType.YesNo}
        onResult={spyMethod}
      />
    );

    render(reactNode);
    expect(screen.getByTestId("core-dialog-container")).to.satisfy(
      childStructure(".icon.core-message-box-icon")
    );

    await theUserTo.click(screen.getByRole("button", { name: "dialog.yes" }));
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("MediumAlert & Question", async () => {
    const spyMethod = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Warning}
        messageBoxType={MessageBoxType.MediumAlert}
        onResult={spyMethod}
      />
    );
    render(reactNode);
    expect(screen.getByTestId("core-dialog-container")).to.satisfy(
      childStructure(".icon.core-message-box-icon")
    );

    await theUserTo.click(
      screen.getByRole("button", { name: "dialog.cancel" })
    );
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("YesNoCancel & Critical", async () => {
    const spyMethod = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Critical}
        messageBoxType={MessageBoxType.YesNoCancel}
        onResult={spyMethod}
      />
    );
    render(reactNode);
    expect(screen.getByTestId("core-dialog-container")).to.satisfy(
      childStructure(".icon.core-message-box-icon")
    );

    await theUserTo.click(screen.getByRole("button", { name: "dialog.no" }));
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("YesNoCancel & Warning", async () => {
    const spyMethod = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Warning}
        messageBoxType={MessageBoxType.YesNoCancel}
        onResult={spyMethod}
      />
    );
    render(reactNode);
    expect(screen.getByTestId("core-dialog-container")).to.satisfy(
      childStructure(".icon.core-message-box-icon")
    );

    await theUserTo.click(
      screen.getByRole("button", { name: "dialog.cancel" })
    );
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("should close on Esc key", async () => {
    const spyOnEscape = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Success}
        messageBoxType={MessageBoxType.Ok}
        onResult={spyOnEscape}
      />
    );
    render(reactNode);

    await theUserTo.type(screen.getByText("My Title"), "[Escape]");
    expect(spyOnEscape).toHaveBeenCalled();
  });
});
