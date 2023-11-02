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
import type {
  FilterBuilderRule,
  FilterBuilderRuleGroup,
  FilterBuilderRuleGroupItem,
} from "../../components-react/filter-builder/FilterBuilderState";
import { useFilterBuilder } from "../../components-react/filter-builder/FilterBuilderState";
import {
  FilterRuleGroupOperator,
  FilterRuleOperator,
} from "../../components-react/filter-builder/Operators";
import TestUtils from "../TestUtils";
import { UiComponents } from "../../components-react/UiComponents";

chai.use(chaiSubset);

describe("useFilterBuilder", () => {
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
    const { result } = renderHook(() => useFilterBuilder());
    const { rootGroup } = result.current;
    expect(rootGroup).to.containSubset({
      operator: FilterRuleGroupOperator.And,
      items: [
        {
          groupId: rootGroup.id,
        },
      ],
    });
  });

  it("adds rule to root group", () => {
    const { result } = renderHook(() => useFilterBuilder());
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
    const { result } = renderHook(() => useFilterBuilder());
    const { rootGroup, actions } = result.current;
    actions.addItem(["invalidParent"]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("removes rule from root group", () => {
    const { result } = renderHook(() => useFilterBuilder());
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
    const { result } = renderHook(() => useFilterBuilder());
    const { actions, rootGroup } = result.current;
    actions.removeItem(["invalidParent", rootGroup.items[0].id]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("does not change state when removing non existing item", () => {
    const { result } = renderHook(() => useFilterBuilder());
    const { actions, rootGroup } = result.current;
    actions.removeItem(["invalidItem"]);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets root group operator", async () => {
    const { result } = renderHook(() => useFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

    expect(rootGroup.operator).to.be.eq(FilterRuleGroupOperator.And);
    actions.setRuleGroupOperator([], FilterRuleGroupOperator.Or);

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        operator: FilterRuleGroupOperator.Or,
        items: [
          {
            groupId: rootGroup.id,
          },
        ],
      });
    });
  });

  it("does not change state when setting non existing group operator", () => {
    const { result } = renderHook(() => useFilterBuilder());
    const { actions, rootGroup } = result.current;
    actions.setRuleGroupOperator(["invalidGroup"], FilterRuleGroupOperator.Or);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule property", async () => {
    const { result } = renderHook(() => useFilterBuilder());
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
    const { result } = renderHook(() => useFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleProperty(["invalidRule"], property);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule operator", async () => {
    const { result } = renderHook(() => useFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      FilterRuleOperator.IsEqual
    );

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            operator: FilterRuleOperator.IsEqual,
          },
        ],
      });
    });
  });

  it("resets rule value if new operator does not need value", async () => {
    const { result } = renderHook(() => useFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.setRuleValue([rootGroup.items[0].id], value);
    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      const rule = rootGroup.items[0] as FilterBuilderRule;
      expect(rule.value).to.be.deep.eq(value);
    });

    actions.setRuleOperator([rootGroup.items[0].id], FilterRuleOperator.IsNull);

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            operator: FilterRuleOperator.IsNull,
            value: undefined,
          },
        ],
      });
    });
  });

  it("resets rule value if new operator is `IsEqual` and previous operator was `Less`", () => {
    const { result } = renderHook(() =>
      useFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: FilterRuleOperator.IsEqual,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);
    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );

    actions.setRuleOperator([rootGroup.items[0].id], FilterRuleOperator.Less);

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.undefined;
  });

  it("resets rule value if new operator is `Less` and previous operator was `IsNotEqual``", () => {
    const { result } = renderHook(() =>
      useFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: FilterRuleOperator.Less,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      FilterRuleOperator.IsNotEqual
    );

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.undefined;
  });

  it("does not reset rule value when new operator is the same as the previous", () => {
    const { result } = renderHook(() =>
      useFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: FilterRuleOperator.Like,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );

    actions.setRuleOperator([rootGroup.items[0].id], FilterRuleOperator.Like);

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );
  });

  it("does not reset rule value when new operator changes from `IsEqual` to `IsNotEqual`", () => {
    const { result } = renderHook(() =>
      useFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: FilterRuleOperator.IsEqual,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      FilterRuleOperator.IsNotEqual
    );

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );
  });

  it("does not reset rule value when new operator changes from `Less` to `Greater`", () => {
    const { result } = renderHook(() =>
      useFilterBuilder({
        initialFilter: {
          value,
          property,
          operator: FilterRuleOperator.Less,
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );

    actions.setRuleOperator(
      [rootGroup.items[0].id],
      FilterRuleOperator.Greater
    );

    rootGroup = result.current.rootGroup;

    expect((rootGroup.items[0] as FilterBuilderRule).value).to.be.deep.eq(
      value
    );
  });

  it("does not change state when setting non existing rule operator", () => {
    const { result } = renderHook(() => useFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleOperator(["invalidRule"], FilterRuleOperator.IsEqual);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule value", async () => {
    const { result } = renderHook(() => useFilterBuilder());
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
    const { result } = renderHook(() => useFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleValue(["invalidRule"], value);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  describe("buildFilter", () => {
    describe("defaultRuleValidator", () => {
      it("returns undefined and sets rule error message to `Value is empty` if item has a property but value is undefined", () => {
        const { result } = renderHook(() =>
          useFilterBuilder({
            initialFilter: {
              property,
              operator: FilterRuleOperator.Like,
            },
          })
        );
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as FilterBuilderRule).errorMessage).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.emptyValue")
        );

        expect(buildFilterResult).to.be.undefined;
      });

      it("returns undefined and sets rule error message to `Value is empty` if item`s value is empty string", () => {
        const { result } = renderHook(() =>
          useFilterBuilder({
            initialFilter: {
              property,
              operator: FilterRuleOperator.IsEqual,
              value: { valueFormat: PropertyValueFormat.Primitive, value: "" },
            },
          })
        );
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as FilterBuilderRule).errorMessage).to.be.eq(
          UiComponents.translate("filterBuilder.errorMessages.emptyValue")
        );

        expect(buildFilterResult).to.be.undefined;
      });

      it("returns property filter and doesn't set error message if operator is unary.", () => {
        const { result } = renderHook(() =>
          useFilterBuilder({
            initialFilter: {
              property,
              operator: FilterRuleOperator.IsFalse,
            },
          })
        );
        const { buildFilter } = result.current;

        const buildFilterResult = buildFilter();

        const { rootGroup } = result.current;
        expect((rootGroup.items[0] as FilterBuilderRule).errorMessage).to.be
          .undefined;

        expect(buildFilterResult).to.deep.equal({
          property,
          operator: FilterRuleOperator.IsFalse,
          value: undefined,
        });
      });

      it("returns property filter and doesn't set error message if filter is valid.", () => {
        const { result } = renderHook(() =>
          useFilterBuilder({
            initialFilter: {
              property,
              operator: FilterRuleOperator.IsEqual,
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
        expect((rootGroup.items[0] as FilterBuilderRule).errorMessage).to.be
          .undefined;

        expect(buildFilterResult).to.deep.equal({
          property,
          operator: FilterRuleOperator.IsEqual,
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
        useFilterBuilder({ ruleValidator: () => customErrorMessage })
      );
      const { buildFilter } = result.current;

      buildFilter();

      const { rootGroup } = result.current;

      expect((rootGroup.items[0] as FilterBuilderRule).errorMessage).to.be.eq(
        customErrorMessage
      );
    });

    it("does not save errors if options specify to ignore them", () => {
      const errorMessage = "My error";
      const { result } = renderHook(() =>
        useFilterBuilder({ ruleValidator: () => errorMessage })
      );
      const { buildFilter } = result.current;

      buildFilter({ ignoreErrors: true });

      const { rootGroup } = result.current;

      expect((rootGroup.items[0] as FilterBuilderRule).errorMessage).to.be
        .undefined;
    });
  });
});
