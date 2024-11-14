/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { render, waitFor } from "@testing-library/react";
import { PropertyFilterBuilder } from "../../components-react/filter-builder/FilterBuilder.js";
import type {
  PropertyFilterBuilderRule,
  PropertyFilterBuilderRuleGroup,
} from "../../components-react/filter-builder/FilterBuilderState.js";
import { buildPropertyFilter } from "../../components-react/filter-builder/FilterBuilderState.js";
import TestUtils, { userEvent } from "../TestUtils.js";
import type { PropertyFilter } from "../../components-react/filter-builder/Types.js";

describe("PropertyFilterBuilder", () => {
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

  beforeEach(() => {
    vi.spyOn(window.Element.prototype, "getBoundingClientRect").mockReturnValue(
      {
        height: 20,
        width: 20,
        x: 0,
        y: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        toJSON: () => {},
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("call onFilterChanged with filter after new rule is setup", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <PropertyFilterBuilder properties={[property1]} onFilterChanged={spy} />
    );
    const propSelector = getByPlaceholderText(
      TestUtils.i18n.getLocalizedString(
        "Components:filterBuilder.chooseProperty"
      )
    );
    await user.click(propSelector);
    await user.click(getByText("Prop1"));

    expect(spy).toHaveBeenCalledWith({
      property: property1,
      operator: "is-true",
      value: undefined,
    });
  });

  it("renders propertyFilterBuilder with single rule correctly", async () => {
    const propertyFilter: PropertyFilter = {
      property: property1,
      operator: "is-null",
      value: undefined,
    };

    const { container, queryByDisplayValue } = render(
      <PropertyFilterBuilder
        properties={[property1]}
        onFilterChanged={() => {}}
        initialFilter={propertyFilter}
      />
    );

    const rules = container.querySelectorAll(".fb-property-name");
    expect(rules.length).toEqual(1);
    const rule1 = queryByDisplayValue(property1.displayLabel);
    expect(rule1).toBeTruthy();
  });

  it("renders propertyFilterBuilder with multiple rules correctly", async () => {
    const propertyFilter: PropertyFilter = {
      operator: "and",
      rules: [
        {
          operator: "and",
          rules: [
            {
              property: property1,
              operator: "is-true",
              value: undefined,
            },
            {
              property: property2,
              operator: "is-null",
              value: undefined,
            },
          ],
        },
      ],
    };
    const { container, queryByDisplayValue } = render(
      <PropertyFilterBuilder
        properties={[property1, property2]}
        onFilterChanged={() => {}}
        initialFilter={propertyFilter}
      />
    );

    const rules = container.querySelectorAll(".fb-property-name");
    expect(rules.length).toEqual(2);
    const rule1 = queryByDisplayValue(property1.displayLabel);
    expect(rule1).toBeTruthy();
    const rule2 = queryByDisplayValue(property2.displayLabel);
    expect(rule2).toBeTruthy();
  });

  it("focus new rule property after adding new rule", async () => {
    const { container } = render(
      <PropertyFilterBuilder properties={[]} onFilterChanged={() => {}} />
    );

    const addRuleButton = container.querySelector(
      ".fb-add-rule-button"
    ) as HTMLElement;
    addRuleButton.click();

    await waitFor(
      () =>
        expect(
          container.querySelectorAll(".fb-property-name input")[1] ===
            container.ownerDocument.activeElement
        ).to.be.true
    );
  });

  describe("buildPropertyFilter", () => {
    const defaultRule: PropertyFilterBuilderRule = {
      id: "rule",
      groupId: "rootGroup",
      property: { name: "prop", displayLabel: "Prop", typename: "string" },
      operator: "is-equal",
      value: {
        valueFormat: PropertyValueFormat.Primitive,
        value: "test string",
      },
    };

    it("returns undefined when rule does not have property", () => {
      const rule: PropertyFilterBuilderRule = {
        ...defaultRule,
        property: undefined,
      };
      expect(buildPropertyFilter(rule)).toEqual(undefined);
    });

    it("returns undefined when rule does not have operator", () => {
      const rule: PropertyFilterBuilderRule = {
        ...defaultRule,
        operator: undefined,
      };
      expect(buildPropertyFilter(rule)).toEqual(undefined);
    });

    it("returns undefined when rule does not have value and operator requires value", () => {
      const rule: PropertyFilterBuilderRule = {
        ...defaultRule,
        value: undefined,
      };
      expect(buildPropertyFilter(rule)).toEqual(undefined);
    });

    it("returns undefined when rule has non primitive value", () => {
      const rule: PropertyFilterBuilderRule = {
        ...defaultRule,
        value: {
          valueFormat: PropertyValueFormat.Array,
          items: [],
          itemsTypeName: "arrayType",
        },
      };
      expect(buildPropertyFilter(rule)).toEqual(undefined);
    });

    it("returns undefined when group has no rules", () => {
      const ruleGroup: PropertyFilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: "and",
        items: [],
      };
      expect(buildPropertyFilter(ruleGroup)).toEqual(undefined);
    });

    it("returns single filter condition when group has one rule", () => {
      const ruleGroup: PropertyFilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: "and",
        items: [defaultRule],
      };
      expect(buildPropertyFilter(ruleGroup)).to.containSubset({
        operator: defaultRule.operator,
        property: defaultRule.property,
        value: defaultRule.value,
      });
    });

    it("returns filter condition when group has at least one rule and others rules are empty", () => {
      const ruleGroup: PropertyFilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: "and",
        items: [
          defaultRule,
          { ...defaultRule, operator: undefined },
          { ...defaultRule, property: undefined },
          { ...defaultRule, value: undefined },
        ],
      };
      expect(buildPropertyFilter(ruleGroup)).to.containSubset({
        operator: defaultRule.operator,
        property: defaultRule.property,
        value: defaultRule.value,
      });
    });

    it("returns filter conditions group when group has multiple rules", () => {
      const ruleGroup: PropertyFilterBuilderRuleGroup = {
        id: "rootGroup",
        operator: "or",
        items: [defaultRule, defaultRule],
      };
      const filter = buildPropertyFilter(ruleGroup);
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
