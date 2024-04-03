/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  getPropertyFilterBuilderOperators,
  isUnaryPropertyFilterOperator,
} from "../../components-react/filter-builder/Operators";

describe("getPropertyFilterBuilderOperators", () => {
  it("returns operators by type", () => {
    expect(
      getPropertyFilterBuilderOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "boolean",
      })
    ).to.be.deep.eq(["is-true", "is-false"]);
    expect(
      getPropertyFilterBuilderOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "string",
      })
    ).to.be.deep.eq([
      "like",
      "is-equal",
      "is-not-equal",
      "is-null",
      "is-not-null",
    ]);
    expect(
      getPropertyFilterBuilderOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "int",
      })
    ).to.be.deep.eq([
      "is-equal",
      "is-not-equal",
      "is-null",
      "is-not-null",
      "greater",
      "greater-or-equal",
      "less",
      "less-or-equal",
      "between",
      "not-between",
    ]);
    expect(
      getPropertyFilterBuilderOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "double",
      })
    ).to.be.deep.eq([
      "is-equal",
      "is-not-equal",
      "is-null",
      "is-not-null",
      "greater",
      "greater-or-equal",
      "less",
      "less-or-equal",
      "between",
      "not-between",
    ]);
    expect(
      getPropertyFilterBuilderOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "dateTime",
      })
    ).to.be.deep.eq([
      "is-equal",
      "is-not-equal",
      "is-null",
      "is-not-null",
      "greater",
      "greater-or-equal",
      "less",
      "less-or-equal",
      "between",
      "not-between",
    ]);
    expect(
      getPropertyFilterBuilderOperators({
        name: "prop",
        displayLabel: "Prop",
        typename: "otherType",
      })
    ).to.be.deep.eq(["is-equal", "is-not-equal", "is-null", "is-not-null"]);
  });
});

describe("isUnaryPropertyFilterOperator", () => {
  it("returns correct values", () => {
    expect(isUnaryPropertyFilterOperator("is-true")).toEqual(true);
    expect(isUnaryPropertyFilterOperator("is-false")).toEqual(true);
    expect(isUnaryPropertyFilterOperator("is-null")).toEqual(true);
    expect(isUnaryPropertyFilterOperator("is-not-null")).toEqual(true);
    expect(isUnaryPropertyFilterOperator("is-equal")).toEqual(false);
    expect(isUnaryPropertyFilterOperator("is-not-equal")).toEqual(false);
    expect(isUnaryPropertyFilterOperator("greater")).toEqual(false);
    expect(isUnaryPropertyFilterOperator("greater-or-equal")).toEqual(false);
    expect(isUnaryPropertyFilterOperator("less")).toEqual(false);
    expect(isUnaryPropertyFilterOperator("less-or-equal")).toEqual(false);
    expect(isUnaryPropertyFilterOperator("like")).toEqual(false);
  });
});
