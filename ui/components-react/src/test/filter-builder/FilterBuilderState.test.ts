/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import type {
  PropertyFilterBuilderRule,
  PropertyFilterBuilderRuleGroup,
  PropertyFilterBuilderRuleGroupItem,
} from "../../components-react/filter-builder/FilterBuilderState";
import { usePropertyFilterBuilder } from "../../components-react/filter-builder/FilterBuilderState";
import {
  PropertyFilterRuleGroupOperator,
  PropertyFilterRuleOperator,
} from "../../components-react/filter-builder/Operators";
import TestUtils from "../TestUtils";
import sinon from "sinon";
import { UiComponents } from "../../components-react";

chai.use(chaiSubset);

describe("usePropertyFilterBuilder", () => {
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  it("initializes group with one empty rule", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { rootGroup } = result.current;
    expect(rootGroup).to.containSubset({
      operator: PropertyFilterRuleGroupOperator.And,
      items: [
        {
          groupId: rootGroup.id,
        },
      ],
    });
  });

  it("adds rule to root group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    actions.addItem([], "RULE");

    const { rootGroup } = result.current;
    expect(rootGroup.items).to.have.lengthOf(2);
    expect(rootGroup.items[0].groupId).to.be.eq(rootGroup.items[1].groupId);
  });

  it("adds rule to nested group", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    actions.addItem([], "RULE_GROUP");

    let nestedGroup: PropertyFilterBuilderRuleGroupItem | undefined;

    await waitFor(() => {
      nestedGroup = result.current.rootGroup.items[1];
      expect(nestedGroup).to.not.be.undefined;
    });

    actions.addItem([], "RULE");

    const rootGroup = result.current.rootGroup;
    expect(rootGroup).to.containSubset({
      operator: PropertyFilterRuleGroupOperator.And,
      items: [
        {
          groupId: rootGroup.id,
        },
        {
          groupId: rootGroup.id,
          operator: PropertyFilterRuleGroupOperator.And,
          items: [
            {
              groupId: nestedGroup!.id,
            },
          ],
        },
      ],
    });
  });

  it("adds rule group to root group", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    actions.addItem([], "RULE_GROUP");

    await waitFor(() => {
      const { rootGroup } = result.current;
      expect(rootGroup).to.containSubset({
        operator: PropertyFilterRuleGroupOperator.And,
        items: [
          {
            groupId: rootGroup.id,
          },
          {
            groupId: rootGroup.id,
            operator: PropertyFilterRuleGroupOperator.And,
            items: [],
          },
        ],
      });
    });
  });

  it("does not change state if parent group is not found when adding item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { rootGroup, actions } = result.current;
    actions.addItem(["invalidParent"], "RULE_GROUP");

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("removes rule from root group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    actions.addItem([], "RULE");

    let { rootGroup } = result.current;

    expect(rootGroup.items).to.have.lengthOf(2);
    actions.removeItem([rootGroup.items[0].id]);

    rootGroup = result.current.rootGroup;

    expect(rootGroup.items).to.have.lengthOf(1);
    expect(rootGroup).to.containSubset({
      items: [{ groupId: rootGroup.id }],
    });
  });

  it("clears rule instead of removing it when only one rule is left in the rule group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;

    let { rootGroup } = result.current;
    expect(rootGroup.items).to.have.lengthOf(1);
    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsTrue
    );
    actions.setRuleValue([rootGroup.items[0].id], {
      valueFormat: PropertyValueFormat.Primitive,
    });
    const testProperty = {
      name: "testName",
      displayLabel: "testLabel",
      typename: "testTypename",
    };
    actions.setRuleProperty([rootGroup.items[0].id], testProperty);

    rootGroup = result.current.rootGroup;
    expect((rootGroup.items[0] as PropertyFilterBuilderRule).property).to.be.eq(
      testProperty
    );
    actions.removeItem([rootGroup.items[0].id]);

    rootGroup = result.current.rootGroup;
    expect(result.current.rootGroup).to.containSubset({
      operator: PropertyFilterRuleGroupOperator.And,
      items: [{ operator: undefined, value: undefined, property: undefined }],
    });
  });

  it("does not change state if parent group is not found when removing item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;
    actions.removeItem(["invalidParent", rootGroup.items[0].id]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("does not change state when removing non existing item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;
    actions.removeItem(["invalidItem"]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets root group operator", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    expect(rootGroup.operator).to.be.eq(PropertyFilterRuleGroupOperator.And);
    actions.setRuleGroupOperator([], PropertyFilterRuleGroupOperator.Or);

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        operator: PropertyFilterRuleGroupOperator.Or,
        items: [
          {
            groupId: rootGroup.id,
          },
        ],
      });
    });
  });

  it("does not change state when setting non existing group operator", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;
    actions.setRuleGroupOperator(
      ["invalidGroup"],
      PropertyFilterRuleGroupOperator.Or
    );

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule property", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    const property: PropertyDescription = {
      name: "prop",
      displayLabel: "Prop",
      typename: "string",
    };
    actions.setRuleProperty([rootGroup.items[0].id], property);

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            property,
          },
        ],
      });
    });
  });

  it("does not change state when setting non existing rule property", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;

    const property: PropertyDescription = {
      name: "prop",
      displayLabel: "Prop",
      typename: "string",
    };
    actions.setRuleProperty(["invalidRule"], property);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule operator", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsEqual
    );

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            operator: PropertyFilterRuleOperator.IsEqual,
          },
        ],
      });
    });
  });

  it("resets rule value if new operator does not need value", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    const value: PropertyValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: "test string",
      displayValue: "TEST STRING",
    };
    actions.setRuleValue([rootGroup.items[0].id], value);
    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      const rule = rootGroup.items[0] as PropertyFilterBuilderRule;
      expect(rule.value).to.be.deep.eq(value);
    });

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsNull
    );

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            operator: PropertyFilterRuleOperator.IsNull,
            value: undefined,
          },
        ],
      });
    });
  });

  it("does not change state when setting non existing rule operator", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;

    actions.setRuleOperator(
      ["invalidRule"],
      PropertyFilterRuleOperator.IsEqual
    );

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule value", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    const value: PropertyValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: "test string",
      displayValue: "TEST STRING",
    };
    actions.setRuleValue([rootGroup.items[0].id], value);

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            value,
          },
        ],
      });
    });
  });

  it("does not change state when setting non existing rule value", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;

    const value: PropertyValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: "test string",
      displayValue: "TEST STRING",
    };
    actions.setRuleValue(["invalidRule"], value);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("does not change state when trying to set property on rule group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions, rootGroup } = result.current;

    const property: PropertyDescription = {
      name: "prop",
      displayLabel: "Prop",
      typename: "string",
    };
    actions.setRuleProperty([], property);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("does not set rule error message if rule is not found", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;

    actions.setRuleErrorMessage(["invalid path"], "error");

    const { rootGroup } = result.current;

    expect(rootGroup.items).to.have.lengthOf(1);
    expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage).to.be
      .undefined;
  });

  it("does not set error message if operator is unary", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsTrue
    );

    rootGroup = result.current.rootGroup;
    expect(rootGroup.items[0].operator).to.be.eq(
      PropertyFilterRuleOperator.IsTrue
    );
    actions.setRuleErrorMessage([rootGroup.items[0].id], "error");

    rootGroup = result.current.rootGroup;
    expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage).to.be
      .undefined;
  });

  it("sets rule error message if rule is found and it's operator is not unary", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder({}));
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsEqual
    );

    rootGroup = result.current.rootGroup;
    expect(rootGroup.items[0].operator).to.be.eq(
      PropertyFilterRuleOperator.IsEqual
    );
    actions.setRuleErrorMessage([rootGroup.items[0].id], "error message");

    rootGroup = result.current.rootGroup;
    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
    ).to.be.eq("error message");
  });

  describe("validate", () => {
    describe("defaultRuleValidator", () => {
      const property: PropertyDescription = {
        name: "propertyField",
        displayLabel: "Prop",
        typename: StandardTypeNames.String,
      };

      const numberProperty: PropertyDescription = {
        name: "propertyField",
        displayLabel: "Prop",
        typename: StandardTypeNames.Int,
      };

      it("returns undefined and sets rule error message to `Value is not a number` if item`s typename is `int` and value is undefined", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property: numberProperty,
              operator: PropertyFilterRuleOperator.IsEqual,
              value: { valueFormat: PropertyValueFormat.Primitive },
            },
          })
        );
        const { validate } = result.current;

        const validateResult = validate();

        const { rootGroup } = result.current;
        expect(
          (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
        ).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.notANumber")
        );

        expect(validateResult).to.be.undefined;
      });

      it("returns undefined and sets rule error message to `Value is not a number` if item`s typename is `int` and PropertyFilterRule.value is undefined", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property: numberProperty,
              operator: PropertyFilterRuleOperator.IsEqual,
            },
          })
        );
        const { validate } = result.current;

        const validateResult = validate();

        const { rootGroup } = result.current;
        expect(
          (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
        ).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.notANumber")
        );

        expect(validateResult).to.be.undefined;
      });

      it("returns undefined and sets rule error message to `Value is empty` if item has a property but PropertyFilterRule.value is undefined", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: PropertyFilterRuleOperator.Like,
            },
          })
        );
        const { validate } = result.current;

        const validateResult = validate();

        const { rootGroup } = result.current;
        expect(
          (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
        ).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.emptyValue")
        );

        expect(validateResult).to.be.undefined;
      });

      it("returns undefined and sets rule error message to `Value is empty` if item`s value is empty string", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: PropertyFilterRuleOperator.IsEqual,
              value: { valueFormat: PropertyValueFormat.Primitive, value: "" },
            },
          })
        );
        const { validate } = result.current;

        const validateResult = validate();

        const { rootGroup } = result.current;
        expect(
          (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
        ).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.emptyValue")
        );

        expect(validateResult).to.be.undefined;
      });

      it("returns propert filter and doesn't set error message if operator is unary.", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: PropertyFilterRuleOperator.IsFalse,
            },
          })
        );
        const { validate } = result.current;

        const validateResult = validate();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage)
          .to.be.undefined;

        expect(validateResult).to.deep.equal({
          property,
          operator: PropertyFilterRuleOperator.IsFalse,
          value: undefined,
        });
      });

      it("returns property filter and doesn't set error message if filter is valid.", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: PropertyFilterRuleOperator.IsEqual,
              value: {
                valueFormat: PropertyValueFormat.Primitive,
                value: "value",
                displayValue: "value",
              },
            },
          })
        );
        const { validate } = result.current;

        const validateResult = validate();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage)
          .to.be.undefined;

        expect(validateResult).to.deep.equal({
          property,
          operator: PropertyFilterRuleOperator.IsEqual,
          value: {
            valueFormat: PropertyValueFormat.Primitive,
            value: "value",
            displayValue: "value",
          },
        });
      });
    });

    it("uses custom validator", () => {
      const spy = sinon.spy();
      const { result } = renderHook(() => usePropertyFilterBuilder({}));
      const { validate } = result.current;

      validate(spy);

      expect(spy).to.be.calledOnce;
    });
  });

  describe("rule group", () => {
    async function getStateWithNestedRule() {
      const { result } = renderHook(() => usePropertyFilterBuilder({}));
      const { actions } = result.current;

      const getNestingRule = () =>
        result.current.rootGroup.items[1] as PropertyFilterBuilderRuleGroup;
      const getNestedRule = () =>
        getNestingRule().items[0] as PropertyFilterBuilderRule;
      const getNestedRulePath = () => [getNestingRule().id, getNestedRule().id];

      actions.addItem([], "RULE_GROUP");
      await waitFor(() => {
        expect(getNestingRule()).to.not.be.undefined;
        expect(getNestedRule()).to.not.be.undefined;
      });

      return { result, getNestingRule, getNestedRule, getNestedRulePath };
    }

    describe("nested rule", () => {
      it("sets property", async () => {
        const { result, getNestingRule, getNestedRule, getNestedRulePath } =
          await getStateWithNestedRule();
        const { actions } = result.current;

        const property: PropertyDescription = {
          name: "prop",
          displayLabel: "Prop",
          typename: "string",
        };
        actions.setRuleProperty(getNestedRulePath(), property);

        await waitFor(() => {
          const rule = getNestedRule();
          expect(rule).to.containSubset({
            groupId: getNestingRule().id,
            property,
          });
        });
      });

      it("sets operator", async () => {
        const { result, getNestingRule, getNestedRule, getNestedRulePath } =
          await getStateWithNestedRule();
        const { actions } = result.current;

        actions.setRuleOperator(
          getNestedRulePath(),
          PropertyFilterRuleOperator.IsEqual
        );

        await waitFor(() => {
          const rule = getNestedRule();
          expect(rule).to.containSubset({
            groupId: getNestingRule().id,
            operator: PropertyFilterRuleOperator.IsEqual,
          });
        });
      });

      it("sets value", async () => {
        const { result, getNestingRule, getNestedRule, getNestedRulePath } =
          await getStateWithNestedRule();
        const { actions } = result.current;

        const value: PropertyValue = {
          valueFormat: PropertyValueFormat.Primitive,
          value: "test string",
          displayValue: "TEST STRING",
        };
        actions.setRuleValue(getNestedRulePath(), value);

        await waitFor(() => {
          const rule = getNestedRule();
          expect(rule).to.containSubset({
            groupId: getNestingRule().id,
            value,
          });
        });
      });
    });

    it("adds and removes rule", async () => {
      const { result, getNestingRule } = await getStateWithNestedRule();
      const { actions } = result.current;

      actions.addItem([getNestingRule().id], "RULE");
      await waitFor(() => {
        expect(getNestingRule().items).to.have.lengthOf(2);
      });

      actions.removeItem([getNestingRule().id, getNestingRule().items[1].id]);
      await waitFor(() => {
        expect(getNestingRule().items).to.have.lengthOf(1);
      });
    });
  });
});
