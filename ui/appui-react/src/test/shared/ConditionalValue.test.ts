/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ConditionalIconItem } from "@itwin/core-react";
import { ConditionalIconValue } from "../../appui-react/shared/ConditionalValue";

describe("ConditionalIconValue", () => {
  it("should use the same type for instanceof check", () => {
    const item = new ConditionalIconItem(() => "item", []);
    const value = new ConditionalIconValue(() => "value", []);

    expect(item instanceof ConditionalIconItem).toBe(true);
    expect(value instanceof ConditionalIconItem).toBe(true);
    expect(item instanceof ConditionalIconValue).toBe(true);
    expect(value instanceof ConditionalIconValue).toBe(true);
  });

  it("should return true for isConditionalIconItem check", () => {
    const item = new ConditionalIconItem(() => "item", []);
    const value = new ConditionalIconValue(() => "value", []);

    expect(ConditionalIconItem.isConditionalIconItem(item)).toBe(true);
    expect(ConditionalIconItem.isConditionalIconItem(value)).toBe(true);
    expect(ConditionalIconValue.isConditionalIconItem(item)).toBe(true);
    expect(ConditionalIconValue.isConditionalIconItem(value)).toBe(true);
  });
});
