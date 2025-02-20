/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { MessageBoxIconType, MessageBoxType } from "@itwin/core-frontend";
import { fireEvent, render, screen } from "@testing-library/react";
import { StandardMessageBox } from "../../appui-react.js";
import { childStructure, userEvent } from "../TestUtils.js";

/* eslint-disable @typescript-eslint/no-deprecated */

describe("StandardMessageBox", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("OK button & NoSymbol", async () => {
    const spy = vi.fn();

    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.NoSymbol}
        messageBoxType={MessageBoxType.Ok}
        onResult={spy}
      />
    );

    const { container } = render(reactNode);
    expect(container.querySelector(".core-message-box-icon")).toBeNull();

    await theUserTo.click(screen.getByRole("button", { name: "dialog.ok" }));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("OK/Cancel buttons & Information", async () => {
    const spy = vi.fn();

    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Information}
        messageBoxType={MessageBoxType.OkCancel}
        onResult={spy}
      />
    );

    render(reactNode);
    expect(screen.getByTestId("message-box-dialog-container")).to.satisfy(
      childStructure(".core-message-box-icon")
    );

    await theUserTo.click(screen.getByRole("button", { name: "dialog.ok" }));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("Yes/No buttons & Question", async () => {
    const spy = vi.fn();

    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Question}
        messageBoxType={MessageBoxType.YesNo}
        onResult={spy}
      />
    );

    render(reactNode);
    expect(screen.getByTestId("message-box-dialog-container")).to.satisfy(
      childStructure(".core-message-box-icon")
    );

    await theUserTo.click(screen.getByRole("button", { name: "dialog.yes" }));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("MediumAlert & Question", async () => {
    const spy = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Warning}
        messageBoxType={MessageBoxType.MediumAlert}
        onResult={spy}
      />
    );
    render(reactNode);
    expect(screen.getByTestId("message-box-dialog-container")).to.satisfy(
      childStructure(".core-message-box-icon")
    );

    await theUserTo.click(
      screen.getByRole("button", { name: "dialog.cancel" })
    );
    expect(spy).toHaveBeenCalledOnce();
  });

  it("YesNoCancel & Critical", async () => {
    const spy = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Critical}
        messageBoxType={MessageBoxType.YesNoCancel}
        onResult={spy}
      />
    );
    render(reactNode);
    expect(screen.getByTestId("message-box-dialog-container")).to.satisfy(
      childStructure(".core-message-box-icon")
    );

    await theUserTo.click(screen.getByRole("button", { name: "dialog.no" }));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("YesNoCancel & Warning", async () => {
    const spy = vi.fn();
    const reactNode = (
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Warning}
        messageBoxType={MessageBoxType.YesNoCancel}
        onResult={spy}
      />
    );
    render(reactNode);
    expect(screen.getByTestId("message-box-dialog-container")).to.satisfy(
      childStructure(".core-message-box-icon")
    );

    await theUserTo.click(
      screen.getByRole("button", { name: "dialog.cancel" })
    );
    expect(spy).toHaveBeenCalledOnce();
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

    fireEvent.keyDown(screen.getByText("My Title"), { key: "Escape" });
    expect(spyOnEscape).toHaveBeenCalledOnce();
  });
});
