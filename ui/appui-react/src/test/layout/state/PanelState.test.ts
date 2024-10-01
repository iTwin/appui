/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { isHorizontalPanelState } from "../../../appui-react/layout/state/PanelState.js";
import {
  createHorizontalPanelState,
  createVerticalPanelState,
} from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";

describe("isHorizontalPanelState", () => {
  it("returns true based on side property", () => {
    expect(isHorizontalPanelState(createHorizontalPanelState("top"))).toEqual(
      true
    );
  });

  it("returns false based on side property", () => {
    expect(isHorizontalPanelState(createVerticalPanelState("left"))).toEqual(
      false
    );
  });
});
