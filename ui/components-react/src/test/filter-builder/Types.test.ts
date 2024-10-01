/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { isPropertyFilterRuleGroup } from "../../components-react/filter-builder/Types.js";

describe("isPropertyFilterRuleGroup", () => {
  it("returns correct values", () => {
    expect(
      isPropertyFilterRuleGroup({
        operator: "and",
        rules: [],
      })
    ).toEqual(true);
    expect(
      isPropertyFilterRuleGroup({
        property: { name: "prop", displayLabel: "Prop", typename: "string" },
        operator: "is-null",
      })
    ).toEqual(false);
  });
});
