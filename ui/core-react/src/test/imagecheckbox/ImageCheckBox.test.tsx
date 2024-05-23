/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ImageCheckBox } from "../../core-react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("<ImageCheckBox />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  it("toggles correctly", async () => {
    const spy = vi.fn();
    render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        onClick={spy}
      />
    );
    await theUserTo.click(screen.getByRole("checkbox"));
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(true);
    spy.mockReset();
    await theUserTo.click(screen.getByRole("checkbox"));
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it("disabled do not react on click", async () => {
    const spy = vi.fn();
    render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        disabled={true}
        onClick={spy}
      />
    );
    await theUserTo.click(screen.getByRole("checkbox"));
    expect(spy).not.toBeCalled();
  });

  it("onClick should be called on label click", async () => {
    const spy = vi.fn();
    render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        onClick={spy}
        tooltip={"test"}
      />
    );
    await theUserTo.click(screen.getByTitle("test"));
    expect(spy).toHaveBeenCalled();
  });

  it("border renders correctly", () => {
    const { container } = render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        border={true}
      />
    );
    expect(container.querySelector(".image-checkbox-border")).to.exist;
  });

  it("renders on correctly", () => {
    const { container } = render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        checked={true}
      />
    );
    expect(container.querySelector(".icon.icon-visibility")).to.exist;
  });

  it("render off correctly", () => {
    const { container } = render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        checked={false}
      />
    );
    expect(container.querySelector(".icon.icon-visibility-hide-2")).to.exist;
  });

  it("onClick should be called on change", async () => {
    const handler = vi.fn();
    render(
      <ImageCheckBox
        imageOn="icon-visibility"
        imageOff="icon-visibility-hide-2"
        onClick={handler}
        checked={false}
      />
    );
    await theUserTo.click(screen.getByRole("checkbox"));
    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith(true);
  });
});
