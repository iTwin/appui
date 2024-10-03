/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as moq from "typemoq";
import { Key } from "ts-key-enum";
import { Orientation } from "../../core-react.js";
import {
  isNavigationKey,
  ItemKeyboardNavigator,
} from "../../core-react/focus/ItemKeyboardNavigator.js";

describe("ItemKeyboardNavigator", () => {
  describe("properties", () => {
    it("itemCount property should be set properly", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      expect(nav.itemCount).toEqual(0);
      nav.itemCount = 100;
      expect(nav.itemCount).toEqual(100);
    });

    it("orientation property should be set properly", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      expect(nav.orientation).toEqual(Orientation.Horizontal);
      nav.orientation = Orientation.Vertical;
      expect(nav.orientation).toEqual(Orientation.Vertical);
    });

    it("allowWrap property should be set properly", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      expect(nav.allowWrap).toEqual(true);
      nav.allowWrap = false;
      expect(nav.allowWrap).toEqual(false);
    });

    it("crossAxisArrowKeyHandler property should be set properly", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      expect(nav.crossAxisArrowKeyHandler).toEqual(undefined);
      const callback = () => {};
      nav.crossAxisArrowKeyHandler = callback;
      expect(nav.crossAxisArrowKeyHandler).toEqual(callback);
    });
  });

  describe("events", () => {
    const keyEventMock = moq.Mock.ofType<React.KeyboardEvent>();

    beforeEach(() => {
      keyEventMock.reset();

      keyEventMock.setup((x) => x.shiftKey).returns(() => false);
      keyEventMock.setup((x) => x.ctrlKey).returns(() => false);
    });

    it("should call crossAxisArrowKeyHandler with true for ArrowRight", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      nav.orientation = Orientation.Vertical;
      const spy = vi.fn();
      nav.crossAxisArrowKeyHandler = spy;
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowRight);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it("should call crossAxisArrowKeyHandler with false for ArrowLeft", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      nav.orientation = Orientation.Vertical;
      const spy = vi.fn();
      nav.crossAxisArrowKeyHandler = spy;
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowLeft);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spy).toHaveBeenCalledWith(false);
    });

    it("should call crossAxisArrowKeyHandler with true for ArrowDown", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      nav.orientation = Orientation.Horizontal;
      const spy = vi.fn();
      nav.crossAxisArrowKeyHandler = spy;
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowDown);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it("should call crossAxisArrowKeyHandler with false for ArrowUp", () => {
      const nav = new ItemKeyboardNavigator(
        () => {},
        () => {}
      );
      nav.orientation = Orientation.Horizontal;
      const spy = vi.fn();
      nav.crossAxisArrowKeyHandler = spy;
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowUp);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spy).toHaveBeenCalledWith(false);
    });

    it("should handle no crossAxisArrowKeyHandler (horizontal)", () => {
      const spy = vi.fn();
      const nav = new ItemKeyboardNavigator(spy, spy);
      nav.orientation = Orientation.Vertical;
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowLeft);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spy).not.toBeCalled();
    });

    it("should handle no crossAxisArrowKeyHandler (vertical)", () => {
      const spy = vi.fn();
      const nav = new ItemKeyboardNavigator(spy, spy);
      nav.orientation = Orientation.Horizontal;
      keyEventMock.setup((x) => x.key).returns(() => Key.ArrowDown);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spy).not.toBeCalled();
    });

    it("should focus on item 0 for Home", () => {
      const spyFocus = vi.fn();
      const nav = new ItemKeyboardNavigator(spyFocus, () => {});
      keyEventMock.setup((x) => x.key).returns(() => Key.Home);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spyFocus).toHaveBeenCalledWith(0);
    });

    it("should focus on last item for End", () => {
      const spyFocus = vi.fn();
      const count = 10;
      const nav = new ItemKeyboardNavigator(spyFocus, () => {});
      nav.itemCount = count;
      keyEventMock.setup((x) => x.key).returns(() => Key.End);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spyFocus).toHaveBeenCalledWith(count - 1);
    });

    it("should activate item for Enter", () => {
      const spyActivate = vi.fn();
      const nav = new ItemKeyboardNavigator(() => {}, spyActivate);
      keyEventMock.setup((x) => x.key).returns(() => Key.Enter);
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spyActivate).toHaveBeenCalledWith(0);
    });

    it("should activate item for Space", () => {
      const spyActivate = vi.fn();
      const nav = new ItemKeyboardNavigator(() => {}, spyActivate);
      keyEventMock.setup((x) => x.key).returns(() => " ");
      nav.handleKeyDownEvent(keyEventMock.object, 0);
      nav.handleKeyUpEvent(keyEventMock.object, 0);
      expect(spyActivate).toHaveBeenCalledWith(0);
    });

    (
      [
        [
          "previous item for ArrowUp (horizontal)",
          Key.ArrowUp,
          Orientation.Vertical,
          4,
          0,
        ],
        [
          "next item for ArrowDown (horizontal)",
          Key.ArrowDown,
          Orientation.Vertical,
          6,
          9,
        ],
        [
          "previous item for ArrowLeft (vertical)",
          Key.ArrowLeft,
          Orientation.Horizontal,
          4,
          0,
        ],
        [
          "next item for ArrowRight (vertical)",
          Key.ArrowRight,
          Orientation.Horizontal,
          6,
          9,
        ],
      ] as [string, Key, Orientation, number, number][]
    ).map(([title, key, orientation, result, wrapStart]) => {
      it(`should focus on ${title}`, () => {
        const spyFocus = vi.fn();
        const count = 10;
        const nav = new ItemKeyboardNavigator(spyFocus, () => {});
        nav.orientation = orientation;
        nav.itemCount = count;
        keyEventMock.setup((x) => x.key).returns(() => key);
        nav.handleKeyDownEvent(keyEventMock.object, 5);
        nav.handleKeyUpEvent(keyEventMock.object, 5);
        expect(spyFocus).toHaveBeenCalledWith(result);
      });

      it(`should allow wrap if true on ${title}`, () => {
        const spyFocus = vi.fn();
        const count = 10;
        const nav = new ItemKeyboardNavigator(spyFocus, () => {});
        nav.orientation = orientation;
        nav.itemCount = count;
        nav.allowWrap = true;
        keyEventMock.setup((x) => x.key).returns(() => key);
        nav.handleKeyDownEvent(keyEventMock.object, wrapStart);
        nav.handleKeyUpEvent(keyEventMock.object, wrapStart);
        expect(spyFocus).toHaveBeenCalledWith(wrapStart === 0 ? 9 : 0);
      });

      it(`should not allow wrap if false on ${title}`, () => {
        const spyFocus = vi.fn();
        const count = 10;
        const nav = new ItemKeyboardNavigator(spyFocus, () => {});
        nav.orientation = orientation;
        nav.itemCount = count;
        nav.allowWrap = false;
        keyEventMock.setup((x) => x.key).returns(() => key);
        nav.handleKeyDownEvent(keyEventMock.object, wrapStart);
        nav.handleKeyUpEvent(keyEventMock.object, wrapStart);
        expect(spyFocus).not.toBeCalled();
      });
    });
  });

  describe("isNavigationKey", () => {
    it("should return true if arrow key", () => {
      expect(isNavigationKey(Key.ArrowUp)).toEqual(true);
    });

    it("should return true if Home key", () => {
      expect(isNavigationKey(Key.Home)).toEqual(true);
    });

    it("should return true if End key", () => {
      expect(isNavigationKey(Key.End)).toEqual(true);
    });

    it("should return true if Enter key", () => {
      expect(isNavigationKey(Key.Enter)).toEqual(true);
    });

    it("should return true if Space key", () => {
      expect(isNavigationKey(" ")).toEqual(true);
    });

    it("should return false if Delete key", () => {
      expect(isNavigationKey(Key.Delete)).toEqual(false);
    });
  });
});
