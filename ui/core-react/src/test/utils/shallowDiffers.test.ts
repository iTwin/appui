/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { shallowDiffers } from "../../core-react";

describe("shallowDiffers", () => {
  it("should return false with the same object", () => {
    const object = { test: 2 };
    expect(shallowDiffers(object, object)).toEqual(false);
  });
  it("should return true if either one object is undefined", () => {
    const object = { test: 2 };
    expect(shallowDiffers(undefined, object)).toEqual(true);
    expect(shallowDiffers(object, undefined)).toEqual(true);
  });
  it("should return true if objects' keys do not match", () => {
    const object1 = { test: 2 };
    const object2 = { test: 2, test2: 1 };
    expect(shallowDiffers(object1, object2)).toEqual(true);
    expect(shallowDiffers(object2, object1)).toEqual(true);
  });
  it("should return true if objects' values do not match", () => {
    const object1 = { test: 2, test2: 2 };
    const object2 = { test: 2, test2: 1 };
    expect(shallowDiffers(object1, object2)).toEqual(true);
    expect(shallowDiffers(object2, object1)).toEqual(true);
  });
  it("should return false if objects' keys and values match", () => {
    const object1 = { test: 2, test2: 1 };
    const object2 = { test: 2, test2: 1 };
    expect(shallowDiffers(object1, object2)).toEqual(false);
    expect(shallowDiffers(object2, object1)).toEqual(false);
  });
});
