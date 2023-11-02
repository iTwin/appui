/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import * as React from "react";
import sinon from "sinon";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { FilterBuilder } from "../../components-react/filter-builder/FilterBuilder";
import type {
  FilterBuilderRule,
  FilterBuilderRuleGroup,
} from "../../components-react/filter-builder/FilterBuilderState";
import { createFilter } from "../../components-react/filter-builder/FilterBuilderState";
import {
  FilterRuleGroupOperator,
  FilterRuleOperator,
} from "../../components-react/filter-builder/Operators";
import TestUtils, { userEvent } from "../TestUtils";
import type { Filter } from "../../components-react/filter-builder/Types";

chai.use(chaiSubset);

describe("FilterBuilder", () => {
  const property1: PropertyDescription = {
    name: "propertyField1",
    displayLabel: "Prop1",
    typename: "boolean",
  };
  const property2: PropertyDescription = {
    name: "propertyField2",
    displayLabel: "Prop2",
    typename: "string",
  };

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  it("call onFilterChanged with filter after new rule is setup", async () => {
    const spy = sinon.spy();
    const { container, getByText, getByDisplayValue } = render(
      <FilterBuilder properties={[property1]} onFilterChanged={spy} />
    );
    const propertySelector = container.querySelector<HTMLInputElement>(
      ".fb-row-name .iui-input"
    );
    expect(propertySelector).to.not.be.null;
    propertySelector?.focus();
    fireEvent.click(getByText("Prop1"));
    // wait until property is selected
    await waitFor(() => getByDisplayValue("Prop1"));

    expect(spy).to.be.calledOnceWith({
      property: property1,
      operator: 0,
      value: undefined,
    });
  });

  it("renders FilterBuilder with single rule correctly", async () => {
    const Filter: Filter = {
      property: property1,
      operator: FilterRuleOperator.IsNull,
      value: undefined,
    };

    const { container, queryByDisplayValue } = render(
      <FilterBuilder
        properties={[property1]}
        onFilterChanged={() => {}}
        initialFilter={Filter}
      />
    );

    const rules = container.querySelectorAll(".fb-row-name");
    expect(rules.length).to.be.eq(1);
    const rule1 = queryByDisplayValue(property1.displayLabel);
    expect(rule1).to.not.be.null;
  });

  it("renders FilterBuilder with multiple rules correctly", async () => {
    const Filter: Filter = {
      operator: FilterRuleGroupOperator.And,
      rules: [
        {
          operator: FilterRuleGroupOperator.And,
          rules: [
            {
              property: property1,
              operator: FilterRuleOperator.IsTrue,
              value: undefined,
            },
            {
              property: property2,
              operator: FilterRuleOperator.IsNull,
              value: undefined,
            },
          ],
        },
      ],
    };
    const { container, queryByDisplayValue } = render(
      <FilterBuilder
        properties={[property1, property2]}
        onFilterChanged={() => {}}
        initialFilter={Filter}
      />
    );

    const rules = container.querySelectorAll(".fb-row-name");
    expect(rules.length).to.be.eq(2);
    const rule1 = queryByDisplayValue(property1.displayLabel);
    expect(rule1).to.not.be.null;
    const rule2 = queryByDisplayValue(property2.displayLabel);
    expect(rule2).to.not.be.null;
  });

  it("focus new rule property after adding new rule", async () => {
    const { container, getByTestId } = render(
      <FilterBuilder properties={[]} onFilterChanged={() => {}} />
    );

    const addRuleButton = getByTestId("fb-add-rule-button");
    addRuleButton.click();

    await waitFor(
      () =>
        expect(
          container.querySelectorAll(".fb-row-name input")[1] ===
            container.ownerDocument.activeElement
        ).to.be.true
    );
  });

  describe("createFilter", () => {
    const defaultRule: FilterBuilderRule = {
      id: "rule",
      groupId: "rootGroup",
      property: { name: "prop", displayLabel: "Prop", typename: "string" },
      operator: FilterRuleOperator.IsEqual,
      value: {
        valueFormat: PropertyValueFormat.Primitive,
        value: "test string",
      },
    };

    it("returns undefined when rule does not have property", () => {
      const rule: FilterBuilderRule = {
        ...defaultRule,
        property: undefined,
      };
      expect(createFilter(rule)).to.be.undefined;
    });

    it("returns undefined when rule does not have operator", () => {
      const rule: FilterBuilderRule = {
        ...defaultRule,
        operator: undefined,
      };
      expect(createFilter(rule)).to.be.undefined;
    });

    it("returns undefined when rule does not have value and operator requires value", () => {
      const rule: FilterBuilderRule = {
        ...defaultRule,
        value: undefined,
      };
      expect(createFilter(rule)).to.be.undefined;
    });

    it("returns undefined when rule has non primitive value", () => {
      const rule: FilterBuilderRule = {
        ...defaultRule,
        value: {
          valueFormat: PropertyValueFormat.Array,
          items: [],
          itemsTypeName: "arrayType",
        },
      };
      expect(createFilter(rule)).to.be.undefined;
    });

    it("returns undefined when group has no rules", () => {
      const ruleGroup: FilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: FilterRuleGroupOperator.And,
        items: [],
      };
      expect(createFilter(ruleGroup)).to.be.undefined;
    });

    it("returns single filter condition when group has one rule", () => {
      const ruleGroup: FilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: FilterRuleGroupOperator.And,
        items: [defaultRule],
      };
      expect(createFilter(ruleGroup)).to.containSubset({
        operator: defaultRule.operator,
        property: defaultRule.property,
        value: defaultRule.value,
      });
    });

    it("returns filter condition when group has at least one rule and others rules are empty", () => {
      const ruleGroup: FilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: FilterRuleGroupOperator.And,
        items: [
          defaultRule,
          { ...defaultRule, operator: undefined },
          { ...defaultRule, property: undefined },
          { ...defaultRule, value: undefined },
        ],
      };
      expect(createFilter(ruleGroup)).to.containSubset({
        operator: defaultRule.operator,
        property: defaultRule.property,
        value: defaultRule.value,
      });
    });

    it("returns filter conditions group when group has multiple rules", () => {
      const ruleGroup: FilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: FilterRuleGroupOperator.Or,
        items: [defaultRule, defaultRule],
      };
      const filter = createFilter(ruleGroup);
      const expectedFilter = {
        operator: ruleGroup.operator,
        rules: [
          {
            property: defaultRule.property,
            operator: defaultRule.operator,
            value: defaultRule.value,
          },
          {
            property: defaultRule.property,
            operator: defaultRule.operator,
            value: defaultRule.value,
          },
        ],
      };
      expect(filter).to.containSubset(expectedFilter);
    });
  });
});
