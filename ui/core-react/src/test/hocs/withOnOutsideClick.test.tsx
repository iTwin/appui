/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { withOnOutsideClick } from "../../core-react.js";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("WithOnOutsideClick", async () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  const WithOnOutsideClickDiv = withOnOutsideClick<{
    children?: React.ReactNode;
  }>((props) => <div {...props} />, undefined, true, false);

  const defaultOnClose = vi.fn();
  const WithOnOutsideClickAndDefaultDiv = withOnOutsideClick(
    (props) => <div {...props} />,
    defaultOnClose,
    true,
    false
  );

  const WithOnOutsidePointerDiv = withOnOutsideClick(
    (props) => <div {...props} />,
    undefined,
    true
  );

  const WithOnOutsidePointerAndDefaultDiv = withOnOutsideClick(
    (props) => <div {...props} />,
    defaultOnClose,
    true,
    true
  );

  it("should handle document click", async () => {
    const spyOnClose = vi.fn();
    render(<WithOnOutsideClickDiv onOutsideClick={spyOnClose} />);

    await theUserTo.pointer(["[MouseLeft]"]);
    expect(spyOnClose).toHaveBeenCalledOnce();
  });

  it("should handle inner click", async () => {
    const spyOnClose = vi.fn();
    render(
      <WithOnOutsideClickDiv onOutsideClick={spyOnClose}>
        <div>Inside</div>
      </WithOnOutsideClickDiv>
    );

    await theUserTo.click(screen.getByText("Inside"));
    expect(spyOnClose).not.toBeCalled();
  });

  it("should handle document click in default", async () => {
    defaultOnClose.mockReset();
    render(<WithOnOutsideClickAndDefaultDiv />);

    await theUserTo.pointer("[MouseLeft]");
    expect(defaultOnClose).toHaveBeenCalledOnce();
  });

  it("should handle document pointer events", async () => {
    const spyOnClose = vi.fn();
    render(<WithOnOutsidePointerDiv onOutsideClick={spyOnClose} />);

    await theUserTo.pointer("[MouseLeft]");
    expect(spyOnClose).toHaveBeenCalledOnce();
  });

  it("should handle empty onOutsideClick (Coverage only)", async () => {
    render(<WithOnOutsidePointerDiv />);

    // Although there is an await, error in eventhandlers do not trigger errors.
    // This is only adding coverage but we cant really test "nothing" to happen...
    await theUserTo.pointer("[MouseLeft]");
  });

  it("should handle document pointer events in default", async () => {
    defaultOnClose.mockReset();
    render(<WithOnOutsidePointerAndDefaultDiv />);

    await theUserTo.pointer("[MouseLeft]");
    expect(defaultOnClose).toHaveBeenCalledOnce();
  });

  it("should dispatch close processing if clicking on a popup", async () => {
    defaultOnClose.mockReset();
    render(
      <>
        <div className="core-popup" data-testid="popup" />
        <WithOnOutsidePointerAndDefaultDiv closeOnNestedPopupOutsideClick />
      </>
    );

    await theUserTo.click(screen.getByTestId("popup"));
    expect(defaultOnClose).toHaveBeenCalledOnce();
  });

  it("should not dispatch close processing if clicking on a popup", async () => {
    defaultOnClose.mockReset();
    // build an hierarchy that will test all recursion in code
    render(
      <>
        <div className="core-popup">
          <div>
            <div>
              <p>PopupContent</p>
            </div>
          </div>
        </div>
        <WithOnOutsidePointerAndDefaultDiv />
      </>
    );

    await theUserTo.click(screen.getByText("PopupContent"));
    expect(defaultOnClose).not.toBeCalled();

    await theUserTo.unhover(screen.getByText("PopupContent"));
    await theUserTo.pointer("[MouseLeft]");
    expect(defaultOnClose).toHaveBeenCalledOnce();
  });
});
