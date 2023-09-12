/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { getPanelMaxSize } from "../../../appui-layout-react/state/internal/PanelStateHelpers";

describe("getPanelMaxSize", () => {
  it("should use percentage for vertical panel", () => {
    const sut = getPanelMaxSize(
      "left",
      { height: 1000, width: 2000 },
      { percentage: 80 }
    );
    expect(sut).to.eq(1600);
  });

  it("should use percentage for horizontal panel", () => {
    const sut = getPanelMaxSize(
      "top",
      { height: 1000, width: 2000 },
      { percentage: 80 }
    );
    expect(sut).to.eq(800);
  });
});
