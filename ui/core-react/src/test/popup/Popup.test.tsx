/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { RelativePosition } from "@itwin/appui-abstract";
import type { RenderResult } from "@testing-library/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Popup } from "../../core-react";
import { classesFromElement } from "../TestUtils";
import userEvent from "@testing-library/user-event";

function NestedPopup() {
  const [showPopup, setShowPopup] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const togglePopup = React.useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  const handleClose = React.useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <div>
      <button data-testid="NestedPopup" onClick={togglePopup} ref={buttonRef}>
        {showPopup ? "Close" : "Open"}
      </button>
      <Popup
        isOpen={showPopup}
        position={RelativePosition.Bottom}
        target={buttonRef.current}
        onClose={handleClose}
        showArrow={true}
        showShadow={true}
      >
        <div>
          <button data-testid="NestedPopup-Button">Test</button>
        </div>
      </Popup>
    </div>
  );
}

function PrimaryPopup({
  closeOnNestedPopupOutsideClick,
}: {
  closeOnNestedPopupOutsideClick?: boolean;
}) {
  const [showPopup, setShowPopup] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const togglePopup = React.useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  const handleClose = React.useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <div>
      <button data-testid="PrimaryPopup" onClick={togglePopup} ref={buttonRef}>
        {showPopup ? "Close" : "Open"}
      </button>
      <Popup
        isOpen={showPopup}
        position={RelativePosition.Bottom}
        target={buttonRef.current}
        onClose={handleClose}
        showArrow={true}
        showShadow={true}
        closeOnNestedPopupOutsideClick={closeOnNestedPopupOutsideClick}
      >
        <NestedPopup />
      </Popup>
    </div>
  );
}

describe("<Popup />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render popup if closed and keepContentsMounted", () => {
    const component = render(<Popup keepContentsMounted top={30} left={70} />);
    expect(component.getByTestId("core-popup")).to.exist;
  });

  it("renders correctly", () => {
    const component = render(<Popup isOpen top={30} left={70} />);
    expect(component.getByTestId("core-popup")).to.exist;
  });

  it("mounts with role correctly", () => {
    render(<Popup isOpen top={30} left={70} role="alert" />);
    expect(screen.getByRole("alert")).to.exist;
  });

  it("renders correctly closed and open", () => {
    const component = render(<Popup top={30} left={70} />);
    expect(component.queryByTestId("core-popup")).not.to.exist;
    component.rerender(<Popup isOpen top={30} left={70} />);
    expect(component.getByTestId("core-popup")).to.exist;
  });

  it("button opens popup and moves focus correctly (HTMLElementRef)", async () => {
    const focusTarget = React.createRef<HTMLButtonElement>(); // button that should receive focus after popup is open
    let button: HTMLElement | null = null;
    let isOpen = false;

    const component = render(
      <div>
        <button
          ref={(el) => {
            button = el;
          }}
          onClick={() => (isOpen = !isOpen)}
        />
        <Popup
          isOpen={isOpen}
          top={30}
          left={70}
          focusTarget={focusTarget}
          moveFocus
        >
          <div>
            <button data-testid="button-not-to-have-focus" />
            <button data-testid="button-to-have-focus" ref={focusTarget} />
          </div>
        </Popup>
      </div>
    );
    expect(component).not.to.be.null;
    expect(button).not.to.be.null;
    expect(isOpen).to.be.false;
    fireEvent.click(button!);
    expect(isOpen).toEqual(true);
    component.rerender(
      <div>
        <button
          ref={(el) => {
            button = el;
          }}
          onClick={() => (isOpen = !isOpen)}
        />
        <Popup
          isOpen={isOpen}
          top={30}
          left={70}
          focusTarget={focusTarget}
          moveFocus
        >
          <div>
            <button data-testid="button-not-to-have-focus" />
            <button data-testid="button-to-have-focus" ref={focusTarget} />
          </div>
        </Popup>
      </div>
    );
    const popup = component.getByTestId("core-popup");
    expect(popup).to.exist;

    // wait for button to receive focus
    await new Promise((r) => {
      setTimeout(r, 80);
    });

    const buttonWithFocus = component.getByTestId(
      "button-to-have-focus"
    ) as HTMLButtonElement;
    const focusedElement = document.activeElement;
    expect(focusedElement).toEqual(buttonWithFocus);
  });

  it("button opens popup and moves focus correctly (CSS Selector)", async () => {
    let button: HTMLElement | null = null;
    let isOpen = false;

    const component = render(
      <div>
        <button
          ref={(el) => {
            button = el;
          }}
          onClick={() => (isOpen = !isOpen)}
        />
        <Popup
          isOpen={isOpen}
          top={30}
          left={70}
          focusTarget=".button-to-have-focus"
          moveFocus
        >
          <div>
            <button
              className="button-not-to-have-focus"
              data-testid="button-not-to-have-focus"
            />
            <button
              className="button-to-have-focus"
              data-testid="button-to-have-focus"
            />
          </div>
        </Popup>
      </div>
    );
    expect(component).not.to.be.null;
    expect(button).not.to.be.null;
    expect(isOpen).to.be.false;
    fireEvent.click(button!);
    expect(isOpen).toEqual(true);
    component.rerender(
      <div>
        <button
          ref={(el) => {
            button = el;
          }}
          onClick={() => (isOpen = !isOpen)}
        />
        <Popup
          isOpen={isOpen}
          top={30}
          left={70}
          focusTarget=".button-to-have-focus"
          moveFocus
        >
          <div>
            <button
              className="button-not-to-have-focus"
              data-testid="button-not-to-have-focus"
            />
            <button
              className="button-to-have-focus"
              data-testid="button-to-have-focus"
            />
          </div>
        </Popup>
      </div>
    );
    const popup = component.getByTestId("core-popup");
    expect(popup).to.exist;

    // wait for button to receive focus
    await new Promise((r) => {
      setTimeout(r, 80);
    });

    const buttonWithFocus = component.getByTestId(
      "button-to-have-focus"
    ) as HTMLButtonElement;
    const focusedElement = document.activeElement;
    expect(focusedElement).toEqual(buttonWithFocus);
  });

  it("button opens popup and moves focus to first available", async () => {
    let button: HTMLElement | null = null;
    let isOpen = false;

    const component = render(
      <div>
        <button
          ref={(el) => {
            button = el;
          }}
          onClick={() => (isOpen = !isOpen)}
        />
        <Popup isOpen={isOpen} top={30} left={70} moveFocus>
          <div>
            <span />
            <input data-testid="input-one" />
            <input data-testid="input-two" />
          </div>
        </Popup>
      </div>
    );
    expect(component).not.to.be.null;
    expect(button).not.to.be.null;
    expect(isOpen).to.be.false;
    fireEvent.click(button!);
    expect(isOpen).toEqual(true);
    component.rerender(
      <div>
        <button
          ref={(el) => {
            button = el;
          }}
          onClick={() => (isOpen = !isOpen)}
        />
        <Popup isOpen={isOpen} top={30} left={70} moveFocus>
          <div>
            <span />
            <input data-testid="input-one" />
            <input data-testid="input-two" />
          </div>
        </Popup>
      </div>
    );
    const popup = component.getByTestId("core-popup");
    expect(popup).to.exist;

    // wait for button to receive focus
    await new Promise((r) => {
      setTimeout(r, 80);
    });

    const topDiv = component.getByTestId("focus-trap-div") as HTMLDivElement;
    const bottomDiv = component.getByTestId(
      "focus-trap-limit-div"
    ) as HTMLDivElement;
    const inputOne = component.getByTestId("input-one") as HTMLInputElement;
    expect(document.activeElement).toEqual(inputOne);
    const inputTwo = component.getByTestId("input-two") as HTMLInputElement;
    inputTwo.focus();
    expect(document.activeElement).toEqual(inputTwo as HTMLElement);

    // if we hit top - reset focus to bottom
    topDiv.focus();
    expect(document.activeElement).toEqual(inputTwo as HTMLElement);

    // if we hit bottom - reset focus to top
    bottomDiv.focus();
    expect(document.activeElement).toEqual(inputOne as HTMLElement);
  });

  it("popup and moves focus to first available (button)", async () => {
    const component = render(
      <div>
        <Popup isOpen top={30} left={70} moveFocus>
          <div>
            <span />
            <button data-testid="item-one" />
            <button data-testid="item-two" />
          </div>
        </Popup>
      </div>
    );
    expect(component.getByTestId("core-popup")).to.exist;

    // wait for button to receive focus
    await new Promise((r) => {
      setTimeout(r, 80);
    });
    const activeFocusElement = document.activeElement;
    expect(activeFocusElement).toEqual(component.getByTestId("item-one"));
  });

  it("popup and moves focus to first available (a)", async () => {
    const component = render(
      <div>
        <Popup isOpen top={30} left={70} moveFocus>
          <div>
            <span />
            <div>
              <div>
                <a href="test" data-testid="item-one">
                  test1
                </a>
              </div>
            </div>
            <a href="test" data-testid="item-two">
              test2
            </a>
          </div>
        </Popup>
      </div>
    );
    expect(component.getByTestId("core-popup")).to.exist;

    // wait for button to receive focus
    await new Promise((r) => {
      setTimeout(r, 80);
    });
    const activeFocusElement = document.activeElement;
    expect(activeFocusElement).toEqual(component.getByTestId("item-one"));
  });

  it("popup and moves focus to first available (textarea)", async () => {
    const component = render(
      <div>
        <Popup isOpen top={30} left={70} moveFocus>
          <div>
            <span />
            <textarea data-testid="item-one" />
            <textarea data-testid="item-two" />
          </div>
        </Popup>
      </div>
    );
    expect(component.getByTestId("core-popup")).to.exist;

    // wait for button to receive focus
    await new Promise((r) => {
      setTimeout(r, 80);
    });
    const activeFocusElement = document.activeElement;
    expect(activeFocusElement).toEqual(component.getByTestId("item-one"));
  });

  it("popup should NOT close when click in nested popup", async () => {
    const component = render(<PrimaryPopup />);
    const primaryButton = component.getByTestId("PrimaryPopup");
    expect(primaryButton).to.exist;
    fireEvent.click(primaryButton);
    const secondaryButton = component.getByTestId("NestedPopup");
    expect(secondaryButton).to.exist;
    fireEvent.click(secondaryButton);
    let nestedButton = component.getByTestId("NestedPopup-Button");
    expect(nestedButton).to.exist;
    fireEvent.click(nestedButton);

    vi.stubGlobal("PointerEvent", MouseEvent);
    const mouseDown = new PointerEvent("pointerdown");
    vi.spyOn(mouseDown, "target", "get").mockImplementation(() => nestedButton);
    window.dispatchEvent(mouseDown);
    nestedButton = component.getByTestId("NestedPopup-Button");
    expect(nestedButton).to.exist;
  });

  it("popup should close when click in nested popup", async () => {
    const component = render(
      <PrimaryPopup closeOnNestedPopupOutsideClick={true} />
    );
    const primaryButton = component.getByTestId("PrimaryPopup");
    expect(primaryButton).to.exist;
    fireEvent.click(primaryButton);
    const secondaryButton = component.getByTestId("NestedPopup");
    expect(secondaryButton).to.exist;
    fireEvent.click(secondaryButton);
    const nestedButton = component.getByTestId("NestedPopup-Button");
    expect(nestedButton).to.exist;
    await theUserTo.click(nestedButton);

    expect(component.queryByTestId("NestedPopup-Button")).to.be.null;
  });

  it("should remove animation", async () => {
    render(
      <Popup isOpen>
        <div>Content</div>
      </Popup>
    );
    expect(classesFromElement(screen.getByRole("dialog"))).not.to.include(
      "core-animation-ended"
    );

    // Handles bubbling
    fireEvent.animationEnd(screen.getByText("Content"));
    expect(classesFromElement(screen.getByRole("dialog"))).not.to.include(
      "core-animation-ended"
    );

    fireEvent.animationEnd(screen.getByRole("dialog"));
    expect(classesFromElement(screen.getByRole("dialog"))).to.include(
      "core-animation-ended"
    );
  });

  describe("renders", () => {
    it("renders correctly with no animation", () => {
      render(<Popup isOpen animate={false} />);

      expect(classesFromElement(screen.getByRole("dialog"))).to.include(
        "core-popup-animation-none"
      );
    });
  });

  describe("componentDidUpdate", () => {
    it("should call onOpen", () => {
      const spyOnOpen = vi.fn();
      const { rerender } = render(<Popup onOpen={spyOnOpen} />);
      rerender(<Popup onOpen={spyOnOpen} isOpen={true} />);
      expect(spyOnOpen).toHaveBeenCalledOnce();
    });

    it("should call onClose", () => {
      const spyOnClose = vi.fn();
      const { rerender } = render(<Popup isOpen onClose={spyOnClose} />);
      rerender(<Popup isOpen={false} onClose={spyOnClose} />);
      expect(spyOnClose).toHaveBeenCalledOnce();
    });
  });

  describe("positioning", () => {
    let divWrapper: RenderResult;
    let targetElement: HTMLElement;

    beforeEach(() => {
      divWrapper = render(<div data-testid="test-target" />);
      targetElement = divWrapper.getByTestId("test-target");
      vi.spyOn(targetElement, "getBoundingClientRect").mockReturnValue(
        DOMRect.fromRect({ x: 100, y: 100, height: 50, width: 50 })
      );
    });

    afterEach(() => {
      divWrapper.unmount();
    });

    (
      [
        ["TopLeft", "core-popup-top-left", { top: "96px" }],
        ["TopRight", "core-popup-top-right", { top: "96px" }],
        ["BottomLeft", "core-popup-bottom-left", {}],
        ["BottomRight", "core-popup-bottom-right", {}],
        ["Top", "core-popup-top", { top: "96px" }],
        ["Left", "core-popup-left", { left: "96px" }],
        ["Right", "core-popup-right", {}],
        ["Bottom", "core-popup-bottom", {}],
        ["LeftTop", "core-popup-left-top", {}],
        ["RightTop", "core-popup-right-top", {}],
      ] as [keyof typeof RelativePosition, string, { top?: string }][]
    ).map(([position, className, style]) => {
      it(`should render ${position}`, () => {
        const { rerender } = render(
          <Popup position={RelativePosition[position]} target={targetElement} />
        );
        rerender(
          <Popup
            position={RelativePosition[position]}
            target={targetElement}
            isOpen={true}
          />
        );

        const tested = screen.getByRole("dialog");
        expect(classesFromElement(tested)).to.include(className);

        expect(tested.style).to.include(style);
      });
    });

    it("should render Bottom then Right", () => {
      const { rerender } = render(
        <Popup position={RelativePosition.Bottom} target={targetElement} />
      );

      rerender(
        <Popup
          isOpen={true}
          position={RelativePosition.Bottom}
          target={targetElement}
        />
      );
      expect(classesFromElement(screen.getByRole("dialog"))).to.include(
        "core-popup-bottom"
      );

      rerender(
        <Popup
          isOpen={true}
          position={RelativePosition.Right}
          target={targetElement}
        />
      );
      expect(classesFromElement(screen.getByRole("dialog"))).to.include(
        "core-popup-right"
      );
    });
  });

  describe("re-positioning", () => {
    const whenCloseToBottomRepositionTo = [
      "innerHeight",
      1000,
      { y: 100, height: 900 },
    ];
    const whenCloseToTopRepositionTo = ["scrollY", 100, { y: 80 }];
    const whenCloseToLeftRepositionTo = ["scrollX", 100, { x: 80 }];
    const whenCloseToRightRepositionTo = ["innerWidth", 1000, { width: 1010 }];
    (
      [
        ["Bottom", ...whenCloseToBottomRepositionTo, "top"],
        ["BottomLeft", ...whenCloseToBottomRepositionTo, "top-left"],
        ["BottomRight", ...whenCloseToBottomRepositionTo, "top-right"],
        ["Top", ...whenCloseToTopRepositionTo, "bottom"],
        ["TopLeft", ...whenCloseToTopRepositionTo, "bottom-left"],
        ["TopRight", ...whenCloseToTopRepositionTo, "bottom-right"],
        ["Left", ...whenCloseToLeftRepositionTo, "right"],
        ["LeftTop", ...whenCloseToLeftRepositionTo, "right-top"],
        ["Right", ...whenCloseToRightRepositionTo, "left"],
        ["RightTop", ...whenCloseToRightRepositionTo, "left-top"],
      ] as [
        keyof typeof RelativePosition,
        keyof typeof window,
        number,
        DOMRectInit,
        RelativePosition,
        string
      ][]
    ).map(
      ([
        testedPosition,
        windowMethod,
        windowMethodReturn,
        rect,
        expectedClass,
      ]) => {
        it(`should reposition ${testedPosition} to ${expectedClass}`, () => {
          vi.spyOn(window, windowMethod as any, "get").mockImplementation(
            () => windowMethodReturn as any
          );
          const target = document.createElement("div");
          vi.spyOn(target, "getBoundingClientRect").mockReturnValue(
            DOMRect.fromRect(rect)
          );

          const { rerender } = render(
            <Popup
              position={RelativePosition[testedPosition]}
              target={target}
            />
          );
          rerender(
            <Popup
              position={RelativePosition[testedPosition]}
              target={target}
              isOpen={true}
            />
          );
          expect(classesFromElement(screen.getByRole("dialog"))).to.include(
            `core-popup-${expectedClass}`
          );
        });
      }
    );

    it("should not reposition on bottom overflow", () => {
      vi.spyOn(window, "innerHeight", "get").mockImplementation(() => 900);
      const target = document.createElement("div");
      vi.spyOn(target, "getBoundingClientRect").mockReturnValue(
        DOMRect.fromRect({ y: 100, height: 900 })
      );

      const { rerender } = render(
        <Popup position={RelativePosition.Top} target={target} />
      );
      rerender(
        <Popup position={RelativePosition.Top} target={target} isOpen={true} />
      );
      expect(classesFromElement(screen.getByRole("dialog"))).to.include(
        `core-popup-top`
      );
    });

    it("should not reposition on right overflow", () => {
      vi.spyOn(window, "innerWidth", "get").mockImplementation(() => 1000);
      const target = document.createElement("div");
      vi.spyOn(target, "getBoundingClientRect").mockReturnValue(
        DOMRect.fromRect({ x: 100, width: 1000 })
      );

      const { rerender } = render(
        <Popup position={RelativePosition.Left} target={target} />
      );
      rerender(
        <Popup position={RelativePosition.Left} target={target} isOpen={true} />
      );
      expect(classesFromElement(screen.getByRole("dialog"))).to.include(
        `core-popup-left`
      );
    });
  });

  describe("outside click", () => {
    it("should call onOutsideClick", async () => {
      const spy = vi.fn();
      render(
        <>
          <button />
          <Popup isOpen onOutsideClick={spy} />
        </>
      );

      await theUserTo.click(screen.getByRole("button"));

      expect(spy).toHaveBeenCalledOnce();
    });

    it("should close on click outside without onOutsideClick", async () => {
      const spyOnClose = vi.fn();
      render(
        <>
          <button />
          <Popup isOpen onClose={spyOnClose} />
        </>
      );

      await theUserTo.click(screen.getByRole("button"));

      expect(spyOnClose).toHaveBeenCalledOnce();
    });

    it("should not close on click outside if pinned", async () => {
      const spyOnClose = vi.fn();
      render(
        <>
          <button />
          <Popup isOpen onClose={spyOnClose} isPinned />
        </>
      );

      await theUserTo.click(screen.getByRole("button"));

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not close on popup content click", async () => {
      const spyOnClose = vi.fn();
      render(
        <Popup isOpen onClose={spyOnClose}>
          <button />
        </Popup>
      );

      await theUserTo.click(screen.getByRole("button"));

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not close on target content click", async () => {
      render(<button />);
      const target = screen.getByRole("button");

      const spyOnClose = vi.fn();
      render(
        <>
          <input />
          <Popup isOpen onClose={spyOnClose} target={target} />
        </>
      );

      await theUserTo.click(target);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );

      // Sanity check that it would indeed close...
      await theUserTo.click(screen.getByRole("textbox"));
      expect(spyOnClose).toHaveBeenCalledOnce();
    });
  });

  describe("scrolling", () => {
    it("should hide when scrolling", async () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} />);

      // Using this as user-event do not support scrolling: https://github.com/testing-library/user-event/issues/475
      const scroll = new WheelEvent("wheel");
      vi.spyOn(scroll, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(scroll);

      await waitFor(() => expect(spyOnClose).toHaveBeenCalledOnce());
    });

    it("should not hide when scrolling popup content", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} />);

      const scroll = new WheelEvent("wheel");
      vi.spyOn(scroll, "target", "get").mockImplementation(() =>
        screen.getByRole("dialog")
      );
      window.dispatchEvent(scroll);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not hide when scrolling if pinned", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen isPinned onClose={spyOnClose} />);

      const scroll = new WheelEvent("wheel");
      vi.spyOn(scroll, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(scroll);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not hide when scrolling if closeOnWheel=false", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen closeOnWheel={false} onClose={spyOnClose} />);

      const scroll = new WheelEvent("wheel");
      vi.spyOn(scroll, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(scroll);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not hide when scrolling if onWheel prop is passed", () => {
      const spyWheel = vi.fn();
      const spyOnClose = vi.fn();
      render(<Popup isOpen onWheel={spyWheel} onClose={spyOnClose} />);

      const scroll = new WheelEvent("wheel");
      vi.spyOn(scroll, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(scroll);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
      expect(spyWheel).toHaveBeenCalled();
    });
  });

  describe("context menu", () => {
    it("should hide when context menu used", async () => {
      const spyOnClose = vi.fn();
      render(
        <>
          <div data-testid={"outside"} />
          <Popup isOpen onClose={spyOnClose} />
        </>
      );

      const contextMenu = new MouseEvent("contextmenu");
      vi.spyOn(contextMenu, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(contextMenu);

      await waitFor(() => expect(spyOnClose).toHaveBeenCalledOnce());
    });

    it("should not hide when context menu used popup content", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} />);
      const popup = screen.getByRole("dialog");

      const contextMenu = new MouseEvent("contextmenu");
      vi.spyOn(contextMenu, "target", "get").mockImplementation(() => popup);
      window.dispatchEvent(contextMenu);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not hide when context menu used if pinned", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen isPinned onClose={spyOnClose} />);

      const contextMenu = new MouseEvent("contextmenu");
      vi.spyOn(contextMenu, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(contextMenu);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not hide when context menu used if closeOnContextMenu=false", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen closeOnContextMenu={false} onClose={spyOnClose} />);

      const contextMenu = new MouseEvent("contextmenu");
      vi.spyOn(contextMenu, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(contextMenu);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
    });

    it("should not hide when context menu used if onContextMenu prop is passed", () => {
      const spyOnClose = vi.fn();
      const spyContextMenu = vi.fn();
      render(
        <Popup isOpen onContextMenu={spyContextMenu} onClose={spyOnClose} />
      );

      const contextMenu = new MouseEvent("contextmenu");
      vi.spyOn(contextMenu, "target", "get").mockImplementation(() =>
        document.createElement("div")
      );
      window.dispatchEvent(contextMenu);

      expect(spyOnClose).not.toBeCalled();
      expect(classesFromElement(screen.getByRole("dialog"))).to.not.include(
        "core-popup-hidden"
      );
      expect(spyContextMenu).toHaveBeenCalled();
    });
  });

  describe("keyboard handling", () => {
    it("should call onClose on Escape", async () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} />);

      await theUserTo.keyboard("[Escape]");

      expect(spyOnClose).toHaveBeenCalledOnce();
    });

    it("should call onClose on Enter", async () => {
      const spyOnClose = vi.fn();
      const spyOnEnter = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} onEnter={spyOnEnter} />);

      await theUserTo.keyboard("[Enter]");

      expect(spyOnClose).toHaveBeenCalledOnce();
      expect(spyOnEnter).toHaveBeenCalledOnce();
    });

    it("should call onEnter on Enter", async () => {
      const spyOnEnter = vi.fn();
      render(<Popup isOpen onEnter={spyOnEnter} />);

      await theUserTo.keyboard("[Enter]");

      expect(spyOnEnter).toHaveBeenCalledOnce();
    });

    it("should not call onClose on Enter if closeOnEnter=false", async () => {
      const spyOnClose = vi.fn();
      const spyOnEnter = vi.fn();
      render(
        <Popup
          isOpen
          onClose={spyOnClose}
          onEnter={spyOnEnter}
          closeOnEnter={false}
        />
      );

      await theUserTo.keyboard("[Enter]");

      expect(spyOnClose).not.toBeCalled();
      expect(spyOnEnter).toHaveBeenCalledOnce();
    });

    it("should not call onClose on 'a'", async () => {
      const spyOnClose = vi.fn();
      render(
        <Popup isOpen onClose={spyOnClose}>
          <div>fake content</div>
        </Popup>
      );

      await theUserTo.keyboard("a");

      expect(spyOnClose).not.toBeCalled();
    });

    it("should not call onClose if Pinned", async () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} isPinned />);

      await theUserTo.keyboard("[Escape]");

      expect(spyOnClose).not.toBeCalled();
    });

    it("should not call onClose if not open", async () => {
      const spyOnClose = vi.fn();
      const { rerender } = render(<Popup isOpen onClose={spyOnClose} />);
      rerender(<Popup isOpen={false} onClose={spyOnClose} />);
      spyOnClose.mockReset();

      await theUserTo.keyboard("[Escape]");

      expect(spyOnClose).not.toBeCalled();
    });

    it("should call onClose on resize event (default behavior)", async () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen onClose={spyOnClose} />);

      window.dispatchEvent(new UIEvent("resize"));

      await waitFor(() => expect(spyOnClose).toHaveBeenCalledOnce());
    });

    it("should not call onClose on resize event (reposition switch)", () => {
      const spyOnClose = vi.fn();
      render(<Popup isOpen repositionOnResize={true} onClose={spyOnClose} />);

      window.dispatchEvent(new UIEvent("resize"));

      expect(spyOnClose).not.toBeCalled();
    });
  });
});
