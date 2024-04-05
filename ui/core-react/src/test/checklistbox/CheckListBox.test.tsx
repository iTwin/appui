/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import userEvent from "@testing-library/user-event";
import {
  CheckListBox,
  CheckListBoxItem,
  CheckListBoxSeparator,
} from "../../core-react";
import { classesFromElement } from "../TestUtils";

describe("<CheckListBox />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render", () => {
    render(
      <CheckListBox>
        <CheckListBoxItem label="label" />
        <CheckListBoxSeparator />
      </CheckListBox>
    );

    expect(classesFromElement(screen.getByRole("list"))).to.include(
      "core-chk-listbox"
    );

    expect(screen.getByLabelText("label")).to.exist;

    const separatorClasses = classesFromElement(
      screen.getByRole("list").lastElementChild
    );
    expect(separatorClasses).to.include("core-chk-listbox-separator");
  });

  it("CheckListBoxItem should call onClick method", async () => {
    const spy = vi.fn();

    render(<CheckListBoxItem label="label" onClick={spy} />);

    await theUserTo.click(screen.getByRole("checkbox"));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("CheckListBoxItem should call onChange method", async () => {
    const spy = vi.fn();

    render(<CheckListBoxItem label="label" checked={false} onChange={spy} />);

    await theUserTo.click(screen.getByRole("checkbox"));
    expect(spy).toHaveBeenCalledOnce();
  });
});
