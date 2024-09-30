/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Size } from "../../core-react.js";

describe("Size", () => {
  it("unspecified size should be 0", () => {
    const sut = new Size();
    expect(sut.height).toEqual(0);
    expect(sut.width).toEqual(0);
  });

  it("should specify size while constructing", () => {
    const sut = new Size(19, 94);
    expect(sut.width).toEqual(19);
    expect(sut.height).toEqual(94);
  });

  it("create should create correct size", () => {
    const sut = Size.create({ width: 19, height: 94 });
    expect(sut.width).toEqual(19);
    expect(sut.height).toEqual(94);
  });

  it("equals should return true", () => {
    const sut1 = Size.create({ width: 19, height: 94 });
    const sut2 = new Size(19, 94);
    expect(sut1.equals(sut2)).toEqual(true);
  });

  it("equals should return false", () => {
    const sut1 = Size.create({ width: 19, height: 94 });
    const sut2 = new Size(29, 84);
    expect(sut1.equals(sut2)).toEqual(false);
  });
});
