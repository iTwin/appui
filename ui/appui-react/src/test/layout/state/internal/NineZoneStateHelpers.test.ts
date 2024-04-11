/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { RectangleProps } from "@itwin/core-react";
import produce from "immer";
import {
  initRectangleProps,
  initSizeProps,
} from "../../../../appui-react/layout/state/internal/NineZoneStateHelpers";

describe("initSizeProps", () => {
  it("should not update", () => {
    const obj = { x: { height: 10, width: 20 } };
    const sut = produce(obj, (draft) => {
      initSizeProps(draft, "x", { height: 10, width: 20 });
    });
    expect(sut).toEqual(obj);
  });

  it("should reset", () => {
    const obj = {
      x: { height: 1, width: 2 },
    };
    const sut = produce(obj, (draft) => {
      initSizeProps(draft, "x", undefined);
    });
    expect(sut.x).toEqual(undefined);
  });
});

describe("initRectangleProps", () => {
  it("should update rectangle", () => {
    const obj = { x: { left: 1, top: 2, bottom: 30, right: 40 } };
    const sut = produce(obj, (draft) => {
      initRectangleProps(draft, "x", {
        left: 10,
        top: 20,
        bottom: 300,
        right: 400,
      });
    });
    expect(sut.x).to.eql({
      left: 10,
      top: 20,
      bottom: 300,
      right: 400,
    });
  });

  it("should reset rectangle", () => {
    const obj: { x: RectangleProps | undefined } = {
      x: { left: 1, top: 2, bottom: 30, right: 40 },
    };
    const sut = produce(obj, (draft) => {
      initRectangleProps(draft, "x", undefined);
    });
    expect(sut.x).toEqual(undefined);
  });

  it("should not update object", () => {
    const obj = { x: { left: 1, top: 2, bottom: 30, right: 40 } };
    const sut = produce(obj, (draft) => {
      initRectangleProps(draft, "x", {
        left: 1,
        top: 2,
        bottom: 30,
        right: 40,
      });
    });
    expect(sut).toEqual(obj);
  });
});
