/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createStableWidgetDef } from "../../appui-react/widgets/StableWidgetDef.js";
import { WidgetDef } from "../../appui-react/widgets/WidgetDef.js";

describe("createStableWidgetDef", () => {
  it("should return stableId", () => {
    const sut = createStableWidgetDef(new WidgetDef(), "w1");
    expect(sut.id).toEqual("w1");
  });
});
