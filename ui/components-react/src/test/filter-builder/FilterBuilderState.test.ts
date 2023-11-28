/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import type { PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import type { PropertyFilterBuilderRule } from "../../components-react/filter-builder/FilterBuilderState";
import { usePropertyFilterBuilder } from "../../components-react/filter-builder/FilterBuilderState";
import {
  PropertyFilterRuleGroupOperator,
  PropertyFilterRuleOperator,
} from "../../components-react/filter-builder/Operators";
import TestUtils from "../TestUtils";
import { UiComponents } from "../../components-react/UiComponents";

chai.use(chaiSubset);

describe("usePropertyFilterBuilder", () => {
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  const property = {
    name: "testName",
    displayLabel: "testLabel",
    typename: "testTypename",
  };

  const value: PropertyValue = {
    valueFormat: PropertyValueFormat.Primitive,
    value: "test string",
    displayValue: "TEST STRING",
  };

  it("initializes group with one empty rule", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
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
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    actions.addItem([]);

    const { rootGroup } = result.current;
    expect(rootGroup.items).to.have.lengthOf(2);
    expect(
      rootGroup.items[0].groupId === rootGroup.items[1].groupId &&
        rootGroup.items[0].groupId === rootGroup.id
    ).to.be.true;
  });

  it("does not change state if parent group is not found when adding item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { rootGroup, actions } = result.current;
    actions.addItem(["invalidParent"]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("removes rule from root group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    actions.addItem([]);

    let { rootGroup } = result.current;

    expect(rootGroup.items).to.have.lengthOf(2);
    actions.removeItem([rootGroup.items[0].id]);

    rootGroup = result.current.rootGroup;

    expect(rootGroup.items).to.have.lengthOf(1);
    expect(rootGroup).to.containSubset({
      items: [{ groupId: rootGroup.id }],
    });
  });

  it("does not change state if parent group is not found when removing item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;
    actions.removeItem(["invalidParent", rootGroup.items[0].id]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("does not change state when removing non existing item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;
    actions.removeItem(["invalidItem"]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets root group operator", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
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
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;
    actions.setRuleGroupOperator(
      ["invalidGroup"],
      PropertyFilterRuleGroupOperator.Or
    );

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule property", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

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
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleProperty(["invalidRule"], property);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule operator", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
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
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

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

  it("resets rule value if new operator is `IsEqual` and previous operator was `Less`", () => {
    const { result } = renderHook(() =>
      usePropertyFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: PropertyFilterRuleOperator.IsEqual,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);
    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.Less
    );

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as PropertyFilterBuilderRule).value).to.be
      .undefined;
  });

  it("resets rule value if new operator is `Less` and previous operator was `IsNotEqual``", () => {
    const { result } = renderHook(() =>
      usePropertyFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: PropertyFilterRuleOperator.Less,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsNotEqual
    );

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as PropertyFilterBuilderRule).value).to.be
      .undefined;
  });

  it("does not reset rule value when new operator is the same as the previous", () => {
    const { result } = renderHook(() =>
      usePropertyFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: PropertyFilterRuleOperator.Like,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.Like
    );

    rootGroup = result.current.rootGroup;

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);
  });

  it("does not reset rule value when new operator changes from `IsEqual` to `IsNotEqual`", () => {
    const { result } = renderHook(() =>
      usePropertyFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: PropertyFilterRuleOperator.IsEqual,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.IsNotEqual
    );

    rootGroup = result.current.rootGroup;

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);
  });

  it("does not reset rule value when new operator changes from `Less` to `Greater`", () => {
    const { result } = renderHook(() =>
      usePropertyFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: PropertyFilterRuleOperator.Less,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      PropertyFilterRuleOperator.Greater
    );

    rootGroup = result.current.rootGroup;

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);
  });

  it("does not change state when setting non existing rule operator", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleOperator(
      ["invalidRule"],
      PropertyFilterRuleOperator.IsEqual
    );

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule value", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

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
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleValue(["invalidRule"], value);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  describe("buildFilter", () => {
    describe("defaultRuleValidator", () => {
      it("returns undefined and sets rule error message to `Value is empty` if item has a property but value is undefined", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: PropertyFilterRuleOperator.Like,
            },
          })
        );
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect(
          (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
        ).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.emptyValue")
        );

        expect(buildFilterResult).to.be.undefined;
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
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect(
          (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
        ).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.emptyValue")
        );

        expect(buildFilterResult).to.be.undefined;
      });

      it("returns property filter and doesn't set error message if operator is unary.", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: PropertyFilterRuleOperator.IsFalse,
            },
          })
        );
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage)
          .to.be.undefined;

        expect(buildFilterResult).to.deep.equal({
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
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage)
          .to.be.undefined;

        expect(buildFilterResult).to.deep.equal({
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
      const customErrorMessage = "My custom error";
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({ ruleValidator: () => customErrorMessage })
      );
      const { buildFilter } = result.current;

      buildFilter();

      const { rootGroup } = result.current;

      expect(
        (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
      ).to.be.eq(customErrorMessage);
    });

    it("does not save errors if options specify to ignore them", () => {
      const errorMessage = "My error";
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({ ruleValidator: () => errorMessage })
      );
      const { buildFilter } = result.current;

      buildFilter({ ignoreErrors: true });

      const { rootGroup } = result.current;

      expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage).to
        .be.undefined;
    });
  });
});
