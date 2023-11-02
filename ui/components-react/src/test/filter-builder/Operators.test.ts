/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import {
  FilterRuleOperator,
  getFilterOperators,
  isUnaryFilterOperator,
} from "../../components-react/filter-builder/Operators";

chai.use(chaiSubset);

describe("getFilterOperators", () => {
  it("returns operators by type", () => {
    expect(
      getFilterOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "boolean",
      })
    ).to.containSubset([FilterRuleOperator.IsTrue, FilterRuleOperator.IsFalse]);
    expect(
      getFilterOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "string",
      })
    ).to.containSubset([
      FilterRuleOperator.IsEqual,
      FilterRuleOperator.IsNotEqual,
      FilterRuleOperator.IsNull,
      FilterRuleOperator.IsNotNull,
      FilterRuleOperator.Like,
    ]);
    expect(
      getFilterOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "int",
      })
    ).to.containSubset([
      FilterRuleOperator.IsEqual,
      FilterRuleOperator.IsNotEqual,
      FilterRuleOperator.IsNull,
      FilterRuleOperator.IsNotNull,
      FilterRuleOperator.Greater,
      FilterRuleOperator.GreaterOrEqual,
      FilterRuleOperator.Less,
      FilterRuleOperator.LessOrEqual,
    ]);
    expect(
      getFilterOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "double",
      })
    ).to.containSubset([
      FilterRuleOperator.IsEqual,
      FilterRuleOperator.IsNotEqual,
      FilterRuleOperator.IsNull,
      FilterRuleOperator.IsNotNull,
      FilterRuleOperator.Greater,
      FilterRuleOperator.GreaterOrEqual,
      FilterRuleOperator.Less,
      FilterRuleOperator.LessOrEqual,
    ]);
    expect(
      getFilterOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "dateTime",
      })
    ).to.containSubset([
      FilterRuleOperator.IsEqual,
      FilterRuleOperator.IsNotEqual,
      FilterRuleOperator.IsNull,
      FilterRuleOperator.IsNotNull,
      FilterRuleOperator.Greater,
      FilterRuleOperator.GreaterOrEqual,
      FilterRuleOperator.Less,
      FilterRuleOperator.LessOrEqual,
    ]);
    expect(
      getFilterOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "otherType",
      })
    ).to.containSubset([
      FilterRuleOperator.IsEqual,
      FilterRuleOperator.IsNotEqual,
      FilterRuleOperator.IsNull,
      FilterRuleOperator.IsNotNull,
    ]);
  });
});

describe("isUnaryFilterOperator", () => {
  it("returns correct values", () => {
    expect(isUnaryFilterOperator(FilterRuleOperator.IsTrue)).to.be.true;
    expect(isUnaryFilterOperator(FilterRuleOperator.IsFalse)).to.be.true;
    expect(isUnaryFilterOperator(FilterRuleOperator.IsNull)).to.be.true;
    expect(isUnaryFilterOperator(FilterRuleOperator.IsNotNull)).to.be.true;
    expect(isUnaryFilterOperator(FilterRuleOperator.IsEqual)).to.be.false;
    expect(isUnaryFilterOperator(FilterRuleOperator.IsNotEqual)).to.be.false;
    expect(isUnaryFilterOperator(FilterRuleOperator.Greater)).to.be.false;
    expect(isUnaryFilterOperator(FilterRuleOperator.GreaterOrEqual)).to.be
      .false;
    expect(isUnaryFilterOperator(FilterRuleOperator.Less)).to.be.false;
    expect(isUnaryFilterOperator(FilterRuleOperator.LessOrEqual)).to.be.false;
    expect(isUnaryFilterOperator(FilterRuleOperator.Like)).to.be.false;
  });
});
