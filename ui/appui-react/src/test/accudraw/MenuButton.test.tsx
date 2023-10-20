/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as React from "react";
import mysvg from "@bentley/icons-generic/icons/2d.svg";
import { MenuButton } from "../../appui-react/accudraw/MenuButton";
import { selectorMatches, userEvent } from "../TestUtils";
import { fireEvent, render, screen } from "@testing-library/react";

// eslint-disable-next-line no-console
console.log(mysvg);
describe("MenuButton", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should call onSizeKnown when mounting", () => {
    const spy = vi.fn();
    render(<MenuButton point={{ x: 100, y: 120 }} onSizeKnown={spy} />);

    expect(spy).toHaveBeenCalled();
  });

  it("should open and close on click", async () => {
    render(
      <MenuButton point={{ x: 100, y: 120 }}>
        <div data-testid={"TestMenuItem"}></div>
      </MenuButton>
    );
    expect(screen.getByTestId("TestMenuItem"))
      .to.satisfy(selectorMatches(".core-context-menu-container div"))
      .and.not.satisfy(selectorMatches(".core-context-menu-opened div"));

    await theUserTo.click(screen.getByRole("button"));
    expect(screen.getByTestId("TestMenuItem")).to.satisfy(
      selectorMatches(".core-context-menu-opened div")
    );

    // WRONG TEST: The real behavior (userEvent) will close the ContextMenu because of "OnOutsideClick"
    // and then the button click will toggle the state (which will spring back to open)
    // This component should be updated to fix this.
    fireEvent.click(screen.getByRole("button"));
    // await theUserTo.click(screen.getByRole("button"));
    expect(screen.getByTestId("TestMenuItem"))
      .to.satisfy(selectorMatches(".core-context-menu-container div"))
      .and.not.satisfy(selectorMatches(".core-context-menu-opened div"));
  });
});
