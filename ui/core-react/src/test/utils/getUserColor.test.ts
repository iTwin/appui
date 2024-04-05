/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getUserColor } from "../../core-react";

describe("getUserColor", () => {
  it("should return correct color 1", () => {
    const email = "test1@bentley.com";
    expect(getUserColor(email)).toEqual("#c8c2b4");
  });
  it("should return correct color blank", () => {
    const email = "";
    expect(getUserColor(email)).toEqual("#6ab9ec");
  });
  it("should return color if not passed a string", () => {
    const email = ["test1", "test2"] as unknown as string; // Test invalid data
    expect(getUserColor(email)).toEqual("#6ab9ec");
  });
});
