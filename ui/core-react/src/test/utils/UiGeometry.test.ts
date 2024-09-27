/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiGeometry } from "../../core-react/utils/UiGeometry.js";

describe("UiGeometry", () => {
  it("clamp should clamp value outside (min,max) to within (min,max)", () => {
    const sut = UiGeometry.clamp(100, 0, 10);
    expect(sut).toEqual(10);
  });

  it("clamp should not alter value within (min,max)", () => {
    const sut = UiGeometry.clamp(5, 0, 10);
    expect(sut).toEqual(5);
  });
});
