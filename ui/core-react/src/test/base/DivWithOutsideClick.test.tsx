/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import { DivWithOutsideClick } from "../../core-react.js";

describe("<DivWithOutsideClick />", () => {
  it("should use onOutsideClick", async () => {
    const theUserTo = userEvent.setup();
    const spy = vi.fn();
    render(
      <div>
        <button>Outside</button>
        <DivWithOutsideClick onOutsideClick={spy}>Inside</DivWithOutsideClick>
      </div>
    );

    await theUserTo.click(screen.getByText("Inside"));
    expect(spy).not.toBeCalled();

    await theUserTo.click(screen.getByRole("button"));
    expect(spy).toHaveBeenCalledOnce();
  });
});
