/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { Css } from "../../ui-ninezone";

describe("Css", () => {
  it("should convert number to css string", () => {
    Css.toPx(10).should.eq("10px");
  });
});
