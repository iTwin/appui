/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { createNineZoneState } from "../../../../appui-react/layout/state/NineZoneState";
import {
  getPanelMaxSize,
  insertPanelWidget,
} from "../../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTabs, handleMetaData } from "../../Utils";

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

describe("insertPanelWidget", () => {
  it("should throw if `maxWidgetCount` is exceeded", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2", "t3"]);
    state = insertPanelWidget(state, "left", "w1", ["t1"], 0);
    state = insertPanelWidget(state, "left", "w2", ["t2"], 1);
    handleMetaData(() =>
      insertPanelWidget(state, "left", "w3", ["t3"], 2)
    ).should.throw();
  });
});
