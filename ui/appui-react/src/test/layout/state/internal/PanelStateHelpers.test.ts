/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createNineZoneState } from "../../../../appui-react/layout/state/NineZoneState";
import {
  getPanelPixelSizeFromSpec,
  getPanelSize,
  insertPanelWidget,
} from "../../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTabs, handleMetaData } from "../../Utils";

describe("getPanelPixelSizeFromSpec", () => {
  it("should return pixel value", () => {
    const size = getPanelPixelSizeFromSpec(
      "top",
      { height: 1000, width: 2000 },
      150
    );
    expect(size).to.eq(150);
  });

  it("should use percentage for vertical panel", () => {
    const size = getPanelPixelSizeFromSpec(
      "left",
      { height: 1000, width: 2000 },
      { percentage: 80 }
    );
    expect(sut).toEqual(1600);
  });

  it("should use percentage for horizontal panel", () => {
    const size = getPanelPixelSizeFromSpec(
      "top",
      { height: 1000, width: 2000 },
      { percentage: 80 }
    );
    expect(sut).toEqual(800);
  });
});

describe("getPanelSize", () => {
  [
    {
      testName:
        "should return preferred value when it is between min and max sizes",
      preferredSize: 250,
      expectedResult: 250,
    },
    {
      testName: "should return min size value when preferred size is smaller",
      preferredSize: 180,
      expectedResult: 200,
    },
    {
      testName: "should return max size value when preferred size is bigger",
      preferredSize: 600,
      expectedResult: 500,
    },
    {
      testName:
        "should return preferred size when it is a percentage value and is between min and max sizes",
      preferredSize: { percentage: 20 }, // 400px
      expectedResult: 400,
    },
    {
      testName:
        "should return min size when preferred size is a percentage value and is smaller",
      preferredSize: { percentage: 5 }, // 100px
      expectedResult: 200,
    },
    {
      testName:
        "should return max size when preferred size is a percentage value and is bigger",
      preferredSize: { percentage: 40 }, // 800px
      expectedResult: 500,
    },
  ].forEach((testCase) =>
    it(testCase.testName, () => {
      const size = getPanelSize(testCase.preferredSize, "left", 200, 500, {
        height: 1000,
        width: 2000,
      });

      expect(size).to.eq(testCase.expectedResult);
    })
  );
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
