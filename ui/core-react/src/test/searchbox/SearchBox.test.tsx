/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SearchBox } from "../../core-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/* eslint-disable deprecation/deprecation */

describe("SearchBox", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  const throttleMs = 16;

  beforeEach(() => {
    vi.useFakeTimers();
    theUserTo = userEvent.setup({
      advanceTimers: (delay) => {
        vi.advanceTimersByTime(delay);
      },
      delay: throttleMs,
    });
  });

  describe("renders", () => {
    it("renders correctly", () => {
      render(<SearchBox onValueChanged={() => {}} />);

      expect(screen.getByRole("searchbox")).to.exist;
      expect(screen.getByRole("button")).to.exist;
    });
  });

  describe("track change", () => {
    it("should call onValueChanged", async () => {
      const spy = vi.fn();
      render(<SearchBox onValueChanged={spy} />);

      await theUserTo.type(screen.getByRole("searchbox"), "T");
      expect(spy).toHaveBeenCalledOnce();
    });

    it("should ignore if value specified is not different", async () => {
      const spy = vi.fn();
      render(
        <SearchBox onValueChanged={spy} valueChangedDelay={throttleMs * 2} />
      );

      await theUserTo.type(screen.getByRole("searchbox"), "T[Backspace]");
      vi.advanceTimersByTime(throttleMs * 3);
      expect(spy).not.toBeCalled();
    });

    it("should honor valueChangedDelay", async () => {
      const spy = vi.fn();
      render(<SearchBox onValueChanged={spy} valueChangedDelay={100} />);

      await theUserTo.type(screen.getByRole("searchbox"), "Test"); // 16ms / letter => 64ms
      expect(spy).not.toBeCalled();
      await vi.advanceTimersByTimeAsync(100);
      expect(spy).toHaveBeenCalledOnce();
    });

    it("should call onEscPressed", async () => {
      const spy = vi.fn();
      render(<SearchBox onValueChanged={() => {}} onEscPressed={spy} />);

      await theUserTo.type(screen.getByRole("searchbox"), "[Escape]");
      expect(spy).toHaveBeenCalledOnce();
    });

    it("should call onEnterPressed", async () => {
      const spy = vi.fn();
      render(<SearchBox onValueChanged={() => {}} onEnterPressed={spy} />);

      await theUserTo.type(screen.getByRole("searchbox"), "[Enter]");
      expect(spy).toHaveBeenCalledOnce();
    });

    it("should call onClear", async () => {
      const spy = vi.fn();
      render(
        <SearchBox
          onValueChanged={() => {}}
          onClear={spy}
          initialValue="Test"
        />
      );

      await theUserTo.click(screen.getByRole("button"));
      expect(spy).toHaveBeenCalledOnce();
    });

    it("should set focus to input", () => {
      const searchBox = React.createRef<SearchBox>();
      render(
        <SearchBox
          ref={searchBox}
          onValueChanged={() => {}}
          placeholder="Search"
        />
      );
      searchBox.current?.focus();
      const inputElement = screen.getByRole("searchbox");
      const focusedElement = document.activeElement;
      expect(inputElement).toEqual(focusedElement);
    });
  });
});
