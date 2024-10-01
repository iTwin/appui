/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Logger } from "@itwin/core-bentley";
import { RelativePosition } from "@itwin/appui-abstract";
import { Point } from "@itwin/core-react";
import type { CursorPopupOptions, Placement } from "../../../appui-react.js";
import {
  CursorInformation,
  CursorPopup,
  CursorPopupContent,
  CursorPopupManager,
  CursorPopupRenderer,
} from "../../../appui-react.js";
import TestUtils, { selectorMatches } from "../../TestUtils.js";
import { render, screen, waitFor } from "@testing-library/react";
import type { XAndY } from "@itwin/core-geometry";

describe("CursorPopup", () => {
  beforeEach(() => {
    CursorPopupManager.clearPopups();
  });

  it("should open and close", async () => {
    render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const relativePosition =
      CursorInformation.getRelativePositionFromCursorDirection(
        CursorInformation.cursorDirection
      );
    CursorPopupManager.open(
      "test",
      <div>Hello</div>,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition
    );
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(1);

    CursorPopupManager.close("test", false);
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(0);
  });

  it("should open, update and close", async () => {
    render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const relativePosition =
      CursorInformation.getRelativePositionFromCursorDirection(
        CursorInformation.cursorDirection
      );
    CursorPopupManager.open(
      "test",
      <div>Hello</div>,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition
    );
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(1);

    CursorPopupManager.update(
      "test",
      <div>Hello World!</div>,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition
    );
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(1);

    CursorPopupManager.close("test", false);
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(0);
  });

  it("should open and close with Props", async () => {
    render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const spyClose = vi.fn();
    const spyApply = vi.fn();

    const relativePosition =
      CursorInformation.getRelativePositionFromCursorDirection(
        CursorInformation.cursorDirection
      );
    const props: CursorPopupOptions = {
      title: "Title",
      onClose: spyClose,
      onApply: spyApply,
    };
    CursorPopupManager.open(
      "test",
      <div>Hello</div>,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition,
      0,
      props
    );
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(1);

    CursorPopupManager.close("test", true);
    await TestUtils.flushAsyncOperations();
    expect(CursorPopupManager.popupCount).toEqual(0);

    expect(spyClose).toHaveBeenCalledOnce();
    expect(spyApply).toHaveBeenCalledOnce();
  });

  it("should open and close with fadeOut", async function test() {
    const { getByText } = render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const relativePosition =
      CursorInformation.getRelativePositionFromCursorDirection(
        CursorInformation.cursorDirection
      );
    CursorPopupManager.open(
      "test",
      "Hello",
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition
    );

    await waitFor(() => {
      expect(CursorPopupManager.popupCount).toEqual(1);
      getByText("Hello");
    });

    CursorPopupManager.close("test", false, true);
    await waitFor(() => {
      expect(getByText("Hello")).to.satisfy(
        selectorMatches(".uifw-cursorpopup-fadeOut")
      );
    });

    await waitFor(() => {
      expect(CursorPopupManager.popupCount).toEqual(0);
    });
  });

  it("should fadeOut correct popup", async () => {
    const { findByText, getByText } = render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const relativePosition =
      CursorInformation.getRelativePositionFromCursorDirection(
        CursorInformation.cursorDirection
      );
    CursorPopupManager.open(
      "test",
      "Hello1",
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition
    );
    CursorPopupManager.open(
      "test2",
      "Hello2",
      CursorInformation.cursorPosition,
      new Point(20, 20),
      relativePosition
    );
    await waitFor(() => {
      expect(CursorPopupManager.popupCount).toEqual(2);
    });

    await findByText("Hello1");
    await findByText("Hello2");

    CursorPopupManager.close("test", false, true);
    await waitFor(() => {
      expect(getByText("Hello1")).to.satisfy(
        selectorMatches(".uifw-cursorpopup-fadeOut")
      );
      expect(getByText("Hello2")).to.not.satisfy(
        selectorMatches(".uifw-cursorpopup-fadeOut")
      );
    });

    await waitFor(() => {
      expect(CursorPopupManager.popupCount).toEqual(1);
    });

    CursorPopupManager.close("test2", false);
    await waitFor(() => {
      expect(CursorPopupManager.popupCount).toEqual(0);
    });
  });

  it("should set relativePosition", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100, width: 100, x: 100, y: 100 })
    );
    render(<CursorPopupRenderer />);
    const center = new Point(300, 300);

    CursorPopupManager.open(
      "test",
      "Hello",
      center,
      new Point(20, 20),
      RelativePosition.TopLeft
    );
    await screen.findByText("Hello");

    const cases = [
      [RelativePosition.TopLeft, { top: "180px", left: "180px" }],
      [RelativePosition.Top, { top: "281px", left: "300.5px" }],
      [RelativePosition.TopRight, { top: "281px", left: "320px" }],
      [RelativePosition.Right, { top: "300.5px", left: "320px" }],
      [RelativePosition.BottomRight, { top: "320px", left: "320px" }],
      [RelativePosition.Bottom, { top: "320px", left: "300.5px" }],
      [RelativePosition.BottomLeft, { top: "320px", left: "281px" }],
      [RelativePosition.Left, { top: "300.5px", left: "281px" }],
    ] as [RelativePosition, { top: string; left: string }][];
    for (const [position, topLeftCorner] of cases) {
      CursorPopupManager.update(
        "test",
        "Hello",
        center,
        new Point(20, 20),
        position
      );

      await waitFor(() => {
        expect(screen.getByText("Hello").style).to.include(topLeftCorner);
      });
    }

    CursorPopupManager.close("test", false);
  });

  // After looking thoroughly the numbers, the "working" tests are wrong
  // This needs to be completely reviewed...
  // TODO: react 18 upgrade
  it.skip("should set offset if more than one popup in a position", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100, width: 100, x: 100, y: 100 })
    );
    render(<CursorPopupRenderer />);
    const pt = new Point(300, 300);
    const offset = new Point(20, 20);

    CursorPopupManager.open(
      "test",
      <div>Hello</div>,
      pt,
      offset,
      RelativePosition.TopLeft
    );
    CursorPopupManager.open(
      "test2",
      <div>World</div>,
      pt,
      offset,
      RelativePosition.TopLeft
    );

    (
      [
        [
          RelativePosition.TopLeft,
          { top: "180px", left: "180px" },
          { top: "80px", left: "180px" },
        ],
        [
          RelativePosition.Top,
          { top: "180px", left: "250px" },
          { top: "181px", left: "300.5px" },
        ],
        [
          RelativePosition.TopRight,
          { top: "180px", left: "320px" },
          { top: "181px", left: "320px" },
        ],
        [
          RelativePosition.Right,
          { top: "250px", left: "320px" },
          { top: "300.5px", left: "420px" },
        ],
        [
          RelativePosition.BottomRight,
          { top: "320px", left: "320px" },
          { top: "420px", left: "320px" },
        ],
        [
          RelativePosition.Bottom,
          { top: "320px", left: "250px" },
          { top: "420px", left: "300.5px" },
        ],
        [
          RelativePosition.BottomLeft,
          { top: "320px", left: "180px" },
          { top: "420px", left: "281px" },
        ],
        [
          RelativePosition.Left,
          { top: "250px", left: "180px" },
          { top: "300.5px", left: "181px" },
        ],
      ] as [
        RelativePosition,
        { top: string; left: string },
        { top: string; left: string }
      ][]
    ).map(([position, helloTopLeftCorner, worldTopLeftCorner]) => {
      CursorPopupManager.update("test", "Hello", pt, offset, position);
      CursorPopupManager.update("test2", "World", pt, offset, position);

      expect(screen.getByText("Hello").style).to.include(helloTopLeftCorner);
      expect(screen.getByText("World").style).to.include(worldTopLeftCorner);
    });
    CursorPopupManager.close("test", false);
    CursorPopupManager.close("test2", false);
  });

  // TODO: react 18 upgrade
  it.skip("should flip right to left appropriately", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100, width: 100, x: 100, y: 100 })
    );
    render(<CursorPopupRenderer />);
    const offset = new Point(20, 20);
    const pt = new Point(300, 300);

    const originalWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { value: 301 });

    (
      [
        [RelativePosition.Top, { top: "180px", left: "180px" }],
        [RelativePosition.TopRight, { top: "180px", left: "180px" }],
        [RelativePosition.Right, { top: "250px", left: "180px" }],
        [RelativePosition.BottomRight, { top: "320px", left: "180px" }],
        [RelativePosition.Bottom, { top: "320px", left: "180px" }],
      ] as [RelativePosition, { top: string; left: string }][]
    ).map(([position, topLeftCorner]) => {
      CursorPopupManager.open("test", "Hello", pt, offset, position);
      CursorPopupManager.update("test", "Hello", pt, offset, position);
      expect(screen.getByText("Hello").style).to.include(topLeftCorner);
      CursorPopupManager.close("test", false);
    });
    Object.defineProperty(window, "innerWidth", { value: originalWidth });
  });

  // TODO: react 18 upgrade
  it.skip("should flip bottom to top appropriately", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100, width: 100, x: 100, y: 100 })
    );
    render(<CursorPopupRenderer />);
    const offset = new Point(20, 20);
    const pt = new Point(300, 300);

    const originalHeight = window.innerHeight;
    Object.defineProperty(window, "innerHeight", { value: 301 });
    (
      [
        [RelativePosition.Right, { top: "180px", left: "320px" }],
        [RelativePosition.BottomRight, { top: "180px", left: "320px" }],
        [RelativePosition.Bottom, { top: "180px", left: "250px" }],
        [RelativePosition.BottomLeft, { top: "180px", left: "180px" }],
        [RelativePosition.Left, { top: "180px", left: "180px" }],
      ] as [RelativePosition, { top: string; left: string }][]
    ).map(([position, topLeftCorner]) => {
      CursorPopupManager.open("test", "Hello", pt, offset, position);
      CursorPopupManager.update("test", "Hello", pt, offset, position);
      expect(screen.getByText("Hello").style).to.include(topLeftCorner);
      CursorPopupManager.close("test", false);
    });
    CursorPopupManager.close("test", false);
    Object.defineProperty(window, "innerHeight", { value: originalHeight });
  });

  // TODO: react 18 upgrade
  it.skip("should flip left to right appropriately", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100, width: 100, x: 100, y: 100 })
    );
    render(<CursorPopupRenderer />);
    const offset = new Point(20, 20);
    const pt = new Point(1, 300);

    (
      [
        [RelativePosition.TopLeft, { top: "180px", left: "21px" }],
        [RelativePosition.Top, { top: "180px", left: "21px" }],
        [RelativePosition.Bottom, { top: "320px", left: "21px" }],
        [RelativePosition.BottomLeft, { top: "320px", left: "21px" }],
        [RelativePosition.Left, { top: "250px", left: "21px" }],
      ] as [RelativePosition, { top: string; left: string }][]
    ).map(([position, topLeftCorner]) => {
      CursorPopupManager.open("test", "Hello", pt, offset, position);
      CursorPopupManager.update("test", "Hello", pt, offset, position);
      expect(screen.getByText("Hello").style).to.include(topLeftCorner);
      CursorPopupManager.close("test", false);
    });
  });

  // TODO: react 18 upgrade
  it.skip("should flip top to bottom appropriately", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100, width: 100, x: 100, y: 100 })
    );
    render(<CursorPopupRenderer />);
    const offset = new Point(20, 20);
    const pt = new Point(300, 1);

    (
      [
        [RelativePosition.TopLeft, { top: "21px", left: "180px" }],
        [RelativePosition.Top, { top: "21px", left: "250px" }],
        [RelativePosition.TopRight, { top: "21px", left: "320px" }],
        [RelativePosition.Right, { top: "21px", left: "320px" }],
        [RelativePosition.Left, { top: "21px", left: "180px" }],
      ] as [RelativePosition, { top: string; left: string }][]
    ).map(([position, topLeftCorner]) => {
      CursorPopupManager.open("test", "Hello", pt, offset, position);
      CursorPopupManager.update("test", "Hello", pt, offset, position);
      expect(screen.getByText("Hello").style).to.include(topLeftCorner);
      CursorPopupManager.close("test", false);
    });
  });

  it("CursorPopupContent should render", () => {
    render(<CursorPopupContent>Hello world</CursorPopupContent>);

    expect(screen.getByText("Hello world")).to.satisfy(
      selectorMatches(".uifw-cursorpopup-content")
    );
  });

  it("CursorPopupManager.update should log error when id not found", () => {
    const spy = vi.spyOn(Logger, "logError");

    CursorPopupManager.update(
      "xyz",
      <div>Hello</div>,
      new Point(0, 0),
      new Point(20, 20),
      RelativePosition.Left
    );

    expect(spy).toHaveBeenCalledOnce();
  });

  it("CursorPopupManager.close should log error when id not found", () => {
    const spy = vi.spyOn(Logger, "logError");

    CursorPopupManager.close("xyz", false);

    expect(spy).toHaveBeenCalledOnce();
  });

  describe("Placement", () => {
    it("left-start", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "left-start");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(el.style.left).toEqual("-50px");
      expect(el.style.top).toEqual("0px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "left-start",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-67px");
      expect(elWithOffset.style.top).toEqual("-17px");
    });

    it("left-end", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "left-end");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(el.style.left).toEqual("-50px");
      expect(el.style.top).toEqual("50px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "left-end",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-67px");
      expect(elWithOffset.style.top).toEqual("33px");
    });

    it("left", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "left");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("-50px");
      expect(el.style.top).toEqual("25px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "left",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-67px");
      expect(elWithOffset.style.top).toEqual("8px");
    });

    it("right-start", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "right-start");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("0px");
      expect(el.style.top).toEqual("0px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "right-start",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("17px");
      expect(elWithOffset.style.top).toEqual("-17px");
    });

    it("right-end", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "right-end");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("0px");
      expect(el.style.top).toEqual("50px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "right-end",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("17px");
      expect(elWithOffset.style.top).toEqual("33px");
    });

    it("right", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "right");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("0px");
      expect(el.style.top).toEqual("25px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "right",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("17px");
      expect(elWithOffset.style.top).toEqual("8px");
    });

    it("top-start", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "top-start");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("0px");
      expect(el.style.top).toEqual("50px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "top-start",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-17px");
      expect(elWithOffset.style.top).toEqual("33px");
    });

    it("top-end", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "top-end");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("-50px");
      expect(el.style.top).toEqual("50px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "top-end",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-67px");
      expect(elWithOffset.style.top).toEqual("33px");
    });

    it("top", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "top");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("-25px");
      expect(el.style.top).toEqual("50px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "top",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-42px");
      expect(elWithOffset.style.top).toEqual("33px");
    });

    it("bottom-start", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "bottom-start");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("0px");
      expect(el.style.top).toEqual("0px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "bottom-start",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-17px");
      expect(elWithOffset.style.top).toEqual("17px");
    });

    it("bottom-end", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "bottom-end");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("-50px");
      expect(el.style.top).toEqual("0px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "bottom-end",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-67px");
      expect(elWithOffset.style.top).toEqual("17px");
    });

    it("bottom", () => {
      const height = 50;
      const width = 50;

      const container = setupTestCursorPopup(height, width, "bottom");
      const el = container.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;
      expect(el.style.left).toEqual("-25px");
      expect(el.style.top).toEqual("0px");

      const containerWithOffset = setupTestCursorPopup(
        height,
        width,
        "bottom",
        { x: 17, y: 17 },
        false
      );
      const elWithOffset =
        containerWithOffset.querySelector<HTMLDivElement>(".uifw-cursorpopup")!;

      expect(elWithOffset.style.left).toEqual("-42px");
      expect(elWithOffset.style.top).toEqual("17px");
    });
  });
});

function setupTestCursorPopup(
  height: number,
  width: number,
  placement: Placement,
  offset: XAndY = { x: 0, y: 0 },
  stub: boolean = true
): HTMLElement {
  if (stub)
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height, width, x: 0, y: 0 })
    );

  const content = (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        display: "block",
        position: "relative",
      }}
    >
      Hello
    </div>
  );
  const id = "test";
  const pt = { x: 0, y: 0 };
  const { container, rerender } = render(
    <CursorPopup
      content={content}
      id={id}
      pt={pt}
      placement={placement}
      offset={offset}
    />
  );
  // must rerender otherwise new size state will not be updated
  rerender(
    <CursorPopup
      content={content}
      id={id}
      pt={pt}
      placement={placement}
      offset={offset}
    />
  );

  return container;
}
