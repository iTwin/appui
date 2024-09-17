/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ConditionalStringValue as AbstractConditionalStringValue } from "@itwin/appui-abstract";
import { ConditionalStringValue } from "../../appui-react/shared/ConditionalValue";

describe("ConditionalStringValue", () => {
  it("should use the same type for instanceof check", () => {
    const abstractValue = new AbstractConditionalStringValue(
      () => "abstractValue",
      []
    );
    const value = new ConditionalStringValue(() => "value", []);

    expect(abstractValue instanceof AbstractConditionalStringValue).toBe(true);
    expect(value instanceof AbstractConditionalStringValue).toBe(true);
    expect(value instanceof ConditionalStringValue).toBe(true);
    expect(value instanceof ConditionalStringValue).toBe(true);
  });
});
