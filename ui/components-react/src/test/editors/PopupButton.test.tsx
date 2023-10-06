/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import sinon from "sinon";
import * as React from "react";
import { PopupButton } from "../../components-react/editors/PopupButton";
import { selectorMatches, TestUtils, userEvent } from "../TestUtils";
import { SpecialKey } from "../../components-react/common/KeyboardKey";

describe("<PopupButton />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders correctly with showArrow and showShadow", async () => {
    render(
      <PopupButton label="Hello" showArrow={true} showShadow={true}>
        <div>Hello World</div>
      </PopupButton>
    );

    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).to.satisfy(
      selectorMatches(".arrow.core-popup-shadow")
    );
  });

  it("renders correctly with moveFocus", async () => {
    render(
      <PopupButton label="Hello" moveFocus={false}>
        <button data-testid={"focused-button"} />
      </PopupButton>
    );

    await theUserTo.click(screen.getByRole("button"));
    expect(screen.getByTestId("focused-button") === document.activeElement);
  });

  it("renders correctly with placeholder", () => {
    render(
      <PopupButton placeholder="Test">
        <div>Hello World</div>
      </PopupButton>
    );
    expect(
      screen.getByText("Test", {
        selector: ".components-popup-button-placeholder",
      })
    ).to.exist;
  });

  it("calls onClick", async () => {
    const spyOnClick = sinon.spy();
    const component = render(
      <PopupButton label="Hello" onClick={spyOnClick}>
        <div data-testid="popup-test-div">Hello World</div>
      </PopupButton>
    );

    const button = component.getByTestId("components-popup-button");
    expect(button).to.exist;
    fireEvent.click(button);
    await TestUtils.flushAsyncOperations();

    expect(spyOnClick.calledOnce).to.be.true;

    const popupDiv = component.getByTestId("popup-test-div");
    expect(popupDiv).to.exist;
  });

  it("shows the popup on down arrow", async () => {
    const component = render(
      <PopupButton label="Hello">
        <div data-testid="popup-test-div">Hello World</div>
      </PopupButton>
    );

    const button = component.getByTestId("components-popup-button");
    expect(button).to.exist;

    button.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        view: window,
        key: SpecialKey.ArrowDown,
      })
    );
    await TestUtils.flushAsyncOperations();

    const popupDiv = component.getByTestId("popup-test-div");
    expect(popupDiv).to.exist;
  });

  it("shows the popup on space bar", async () => {
    const component = render(
      <PopupButton label="Hello">
        <div data-testid="popup-test-div">Hello World</div>
      </PopupButton>
    );

    const button = component.getByTestId("components-popup-button");
    expect(button).to.exist;

    button.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        view: window,
        key: SpecialKey.Space,
      })
    );
    await TestUtils.flushAsyncOperations();

    const popupDiv = component.getByTestId("popup-test-div");
    expect(popupDiv).to.exist;
  });

  it("shows the popup on Enter", async () => {
    const component = render(
      <PopupButton label="Hello">
        <div data-testid="popup-test-div">Hello World</div>
      </PopupButton>
    );

    const button = component.getByTestId("components-popup-button");
    expect(button).to.exist;

    button.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        view: window,
        key: SpecialKey.Enter,
      })
    );
    await TestUtils.flushAsyncOperations();

    const popupDiv = component.getByTestId("popup-test-div");
    expect(popupDiv).to.exist;
  });

  it("calls onClose", async () => {
    const spyOnClose = sinon.spy();

    render(
      <PopupButton label="Hello" onClose={spyOnClose}>
        <div>Hello World</div>
      </PopupButton>
    );

    await theUserTo.click(screen.getByRole("button"));

    await theUserTo.keyboard("{Escape}");

    spyOnClose.calledOnce.should.true;
  });

  it("closePopup() closes popup", async () => {
    const spyOnClose = sinon.spy();
    const popupButtonRef = React.createRef<PopupButton>();

    render(
      <PopupButton label="Hello" onClose={spyOnClose} ref={popupButtonRef}>
        <div>Hello World</div>
      </PopupButton>
    );

    popupButtonRef.current?.closePopup();

    await waitFor(() => spyOnClose.calledOnce.should.true);
  });
});
