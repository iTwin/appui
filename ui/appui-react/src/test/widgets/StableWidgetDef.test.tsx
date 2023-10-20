/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createStableWidgetDef } from "../../appui-react";
import { WidgetDef } from "../../appui-react/widgets/WidgetDef";
import { describe, expect, it } from "vitest";

describe("createStableWidgetDef", () => {
  it("should return stableId", () => {
    const sut = createStableWidgetDef(new WidgetDef(), "w1");
    expect(sut.id).to.eq("w1");
  });
});
