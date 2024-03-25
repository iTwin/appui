/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { withIsPressed } from "../../core-react";

describe("withIsPressed", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  const WithIsPressedDiv = withIsPressed((props) => <div {...props} />);

  it("mousedown event", async () => {
    let iAmPressed = false;
    const spy = vi.fn();

    function handlePressedChange(isPressed: boolean) {
      iAmPressed = isPressed;
      spy();
    }

    render(
      <WithIsPressedDiv
        isPressed={iAmPressed}
        onIsPressedChange={handlePressedChange}
        data-testid="tested"
      />
    );
    await theUserTo.pointer({
      keys: "[MouseLeft>]",
      target: screen.getByTestId("tested"),
    });

    expect(spy).toHaveBeenCalledOnce();
    expect(iAmPressed).toEqual(true);
  });

  it("mouseup event", async () => {
    let iAmPressed = true;
    const spy = vi.fn();

    function handlePressedChange(isPressed: boolean) {
      iAmPressed = isPressed;
      spy();
    }

    render(
      <WithIsPressedDiv
        isPressed={iAmPressed}
        onIsPressedChange={handlePressedChange}
        data-testid="tested"
      />
    );
    await theUserTo.pointer({
      keys: "[MouseLeft>]",
      target: screen.getByTestId("tested"),
    });

    spy.mockReset();

    await theUserTo.pointer("[/MouseLeft]");

    expect(spy).toHaveBeenCalledOnce();
    expect(iAmPressed).toEqual(false);
  });

  it("mouseup event when not pressed", async () => {
    let iAmPressed = false;
    const spy = vi.fn();

    function handlePressedChange(isPressed: boolean) {
      iAmPressed = isPressed;
      spy();
    }

    render(
      <WithIsPressedDiv
        isPressed={iAmPressed}
        onIsPressedChange={handlePressedChange}
        data-testid="tested"
      />
    );
    await theUserTo.pointer([
      "[MouseLeft>]",
      { target: screen.getByTestId("tested") },
      "[/MouseLeft]",
    ]);

    expect(spy).not.toBeCalled();
    expect(iAmPressed).toEqual(false);
  });

  it("mouseleave event", async () => {
    let iAmPressed = true;
    const spy = vi.fn();

    function handlePressedChange(isPressed: boolean) {
      iAmPressed = isPressed;
      spy();
    }

    render(
      <WithIsPressedDiv
        isPressed={iAmPressed}
        onIsPressedChange={handlePressedChange}
        data-testid="tested"
      />
    );
    await theUserTo.hover(screen.getByTestId("tested"));
    await theUserTo.unhover(screen.getByTestId("tested"));

    expect(spy).toHaveBeenCalledOnce();
    expect(iAmPressed).toEqual(false);
  });
});
