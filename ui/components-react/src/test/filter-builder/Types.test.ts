/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { isPropertyFilterRuleGroup } from "../../components-react/filter-builder/Types";

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
    ).to.be.false;
  });
});
