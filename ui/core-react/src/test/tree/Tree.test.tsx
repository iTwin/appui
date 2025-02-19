/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Tree } from "../../core-react.js";
import { classesFromElement } from "../TestUtils.js";
import type { MockInstance } from "vitest";

describe("<Tree />", () => {
  const createRect = (
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): DOMRect => new DOMRect(x0, y0, x1 - x0, y1 - y0);
  const createRandomRect = () => createRect(1, 2, 3, 4);

  it("renders correctly", () => {
    render(<Tree />);

    expect(classesFromElement(screen.getByRole("tree"))).to.include(
      "core-tree"
    );
  });

  it("renders children correctly", () => {
    render(
      <Tree>
        <div data-testid="unique" />
      </Tree>
    );

    expect(screen.getByTestId("unique")).to.exist;
  });

  describe("scrollToElement", () => {
    const overrides = {
      scrollTo: Element.prototype.scrollTo,
    };
    let scrollToSpy: MockInstance<(x: number, y: number) => void>;

    beforeEach(() => {
      Element.prototype.scrollTo = () => {};
      scrollToSpy = vi.spyOn(HTMLElement.prototype, "scrollTo");
    });

    afterEach(() => {
      Element.prototype.scrollTo = overrides.scrollTo;
    });

    it("scrolls x to 0 if current scroll is not 0 but scrolling to 0 still keeps the whole element visible", () => {
      const tree = React.createRef<Tree>();
      render(<Tree ref={tree} style={{ overflow: "scroll" }} />);

      const treediv = screen.getByRole<HTMLDivElement>("tree");
      vi.spyOn(treediv, "getBoundingClientRect").mockReturnValue(
        createRect(1000, 0, 1100, 100)
      );
      treediv.scrollLeft = 100;

      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRect(980, 0, 1000, 20)
      );
      tree.current?.scrollToElement(element);
      expect(scrollToSpy).toBeCalledWith(expect.objectContaining({ left: 0 }));
    });

    it("keeps current x scroll if the whole element is already visible", () => {
      const tree = React.createRef<Tree>();
      render(<Tree ref={tree} style={{ overflow: "scroll" }} />);

      const treediv = screen.getByRole<HTMLDivElement>("tree");
      vi.spyOn(treediv, "getBoundingClientRect").mockReturnValue(
        createRect(1000, 0, 1100, 100)
      );
      treediv.scrollLeft = 100;

      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRect(1000, 0, 1020, 20)
      );
      tree.current?.scrollToElement(element);
      expect(scrollToSpy).toBeCalledWith(
        expect.objectContaining({ left: 100 })
      );
    });

    it("scrolls to x position to make the whole element visible", () => {
      const tree = React.createRef<Tree>();
      render(<Tree ref={tree} style={{ overflow: "scroll" }} />);

      const treediv = screen.getByRole<HTMLDivElement>("tree");
      vi.spyOn(treediv, "getBoundingClientRect").mockReturnValue(
        createRect(1000, 0, 1100, 100)
      );
      treediv.scrollLeft = 0;

      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRect(1100, 0, 1120, 20)
      );
      tree.current?.scrollToElement(element);
      expect(scrollToSpy).toBeCalledWith(
        expect.objectContaining({ left: 100 })
      );
    });

    it("keeps current y scroll if the whole element is already visible", () => {
      const tree = React.createRef<Tree>();
      render(<Tree ref={tree} style={{ overflow: "scroll" }} />);

      const treediv = screen.getByRole<HTMLDivElement>("tree");
      vi.spyOn(treediv, "getBoundingClientRect").mockReturnValue(
        createRect(0, 100, 100, 220)
      );
      treediv.scrollTop = 20;

      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRect(0, 120, 20, 140)
      );
      tree.current?.scrollToElement(element);
      expect(scrollToSpy).toBeCalledWith(expect.objectContaining({ top: 20 }));
    });

    it("scrolls to y position to make the whole element visible", () => {
      const tree = React.createRef<Tree>();
      render(<Tree ref={tree} style={{ overflow: "scroll" }} />);

      const treediv = screen.getByRole<HTMLDivElement>("tree");
      vi.spyOn(treediv, "getBoundingClientRect").mockReturnValue(
        createRect(0, 100, 100, 220)
      );
      treediv.scrollLeft = 0;

      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRect(0, 220, 20, 240)
      );
      tree.current?.scrollToElement(element);
      expect(scrollToSpy).toBeCalledWith(
        expect.objectContaining({
          top: 120,
        })
      );
    });

    it("does nothing if Tree isn't mounted properly", () => {
      const tree = new Tree({});
      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRandomRect()
      );
      tree.scrollToElement(element);
      expect(scrollToSpy).not.toBeCalled();
    });

    it("does nothing if Tree is not scrollable and doesn't have a scrollable child", () => {
      const tree = React.createRef<Tree>();
      render(
        <Tree ref={tree}>
          <div />
        </Tree>
      );
      const element = document.createElement("div");
      vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
        createRandomRect()
      );
      tree.current?.scrollToElement(element);
      expect(scrollToSpy).not.toBeCalled();
    });
  });

  describe("getElementsByClassName", () => {
    it("returns empty array when component is not mounted", () => {
      const instance = new Tree({});
      expect(instance.getElementsByClassName("test").length).toEqual(0);
    });

    it("returns child elements by class name", () => {
      const tree = React.createRef<Tree>();
      render(
        <Tree ref={tree}>
          <div className="test" />
        </Tree>
      );

      expect(tree.current?.getElementsByClassName("no").length).toEqual(0);
      expect(tree.current?.getElementsByClassName("test").length).toEqual(1);
    });
  });

  describe("setFocusByClassName", () => {
    it("does not set focus when element not found", () => {
      const instance = new Tree({});
      expect(instance.setFocusByClassName(".test")).toEqual(false);
    });

    it("sets focus by class name", () => {
      const tree = React.createRef<Tree>();
      render(
        <Tree ref={tree}>
          <button className="test" />
        </Tree>
      );

      expect(document.activeElement).not.to.eq(screen.getByRole("button"));

      expect(tree.current?.setFocusByClassName(".test")).toEqual(true);
      expect(document.activeElement).toEqual(screen.getByRole("button"));
    });
  });
});
