/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { getWidgetLocation } from "../../../appui-react/layout/state/WidgetLocation";

describe("getWidgetLocation", () => {
  it("should return `undefined` if widget is not found", () => {
    const state = createNineZoneState();
    const location = getWidgetLocation(state, "w1");
    expect(location).not.to.exist;
  });
});
