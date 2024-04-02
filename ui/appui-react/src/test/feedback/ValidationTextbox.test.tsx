/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { MessageManager, ValidationTextbox } from "../../appui-react";
import { userEvent } from "../TestUtils";

describe("ValidationTextbox", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  const onValueChanged = vi.fn();
  const onEnterPressed = vi.fn();
  const onEscPressed = vi.fn();

  beforeEach(async () => {
    onValueChanged.mockReset();
    onEnterPressed.mockReset();
    onEscPressed.mockReset();
  });

  it("should render correctly", () => {
    render(<ValidationTextbox />);

    expect(screen.getByRole("textbox")).to.exist;
  });

  it("should use onValueChanged function provided", async () => {
    render(
      <ValidationTextbox
        onValueChanged={onValueChanged}
        onEnterPressed={onEnterPressed}
        onEscPressed={onEscPressed}
        errorText="Error"
      />
    );
    await theUserTo.type(screen.getByRole("textbox"), "a");
    expect(onValueChanged).toHaveBeenCalled();
  });

  it("should use default value check if none provided", async () => {
    render(
      <ValidationTextbox
        placeholder="Placeholder"
        size={12}
        errorText="Error"
      />
    );
    await theUserTo.type(screen.getByRole("textbox"), "t");
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("t");
  });

  it("should hide message when value is valid", async () => {
    render(
      <ValidationTextbox
        placeholder="Placeholder"
        size={12}
        errorText="Error"
      />
    );
    const hideMessage = vi.spyOn(MessageManager, "hideInputFieldMessage");
    await theUserTo.type(screen.getByRole("textbox"), "test");
    expect(hideMessage).toHaveBeenCalled();
  });

  it("should show message when value is invalid", async () => {
    render(
      <ValidationTextbox
        placeholder="Placeholder"
        size={12}
        errorText="Error"
      />
    );
    const showMessage = vi.spyOn(MessageManager, "displayInputFieldMessage");
    await theUserTo.type(screen.getByRole("textbox"), "t[Backspace]");
    expect(showMessage).toHaveBeenCalled();
  });

  it("should manage escape press", async () => {
    render(
      <ValidationTextbox
        onValueChanged={onValueChanged}
        onEnterPressed={onEnterPressed}
        onEscPressed={onEscPressed}
        errorText="Error"
      />
    );
    await theUserTo.type(screen.getByRole("textbox"), "[Escape]");
    expect(onEscPressed).toHaveBeenCalled();
  });

  it("should manage enter press", async () => {
    render(
      <ValidationTextbox
        onValueChanged={onValueChanged}
        onEnterPressed={onEnterPressed}
        onEscPressed={onEscPressed}
        errorText="Error"
      />
    );
    await theUserTo.type(screen.getByRole("textbox"), "[Enter]");
    expect(onEnterPressed).toHaveBeenCalled();
  });
});
