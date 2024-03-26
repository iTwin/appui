/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import type {
  PropertyFilterBuilderRule,
  PropertyFilterBuilderRuleGroup,
  PropertyFilterBuilderRuleGroupItem,
} from "../../components-react/filter-builder/FilterBuilderState";
import {
  buildPropertyFilter,
  isPropertyFilterBuilderRuleGroup,
  usePropertyFilterBuilder,
} from "../../components-react/filter-builder/FilterBuilderState";
import TestUtils from "../TestUtils";
import { UiComponents } from "../../components-react/UiComponents";
import type { PropertyFilter } from "../../components-react/filter-builder/Types";
import { PropertyFilterBuilderRuleRangeValue } from "../../components-react";

chai.use(chaiSubset);

describe("usePropertyFilterBuilder", () => {
  beforeEach(async () => {
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
      operator: "and",
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
    actions.addItem([], "RULE");

    const { rootGroup } = result.current;
    expect(rootGroup.items).to.have.lengthOf(2);
    expect(
      rootGroup.items[0].groupId === rootGroup.items[1].groupId &&
        rootGroup.items[0].groupId === rootGroup.id
    ).toEqual(true);
  });

  it("adds rule to nested group", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
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
      operator: "and",
      items: [
        {
          groupId: rootGroup.id,
        },
        {
          groupId: rootGroup.id,
          operator: "and",
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
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    actions.addItem([], "RULE_GROUP");

    await waitFor(() => {
      const { rootGroup } = result.current;
      expect(rootGroup).to.containSubset({
        operator: "and",
        items: [
          {
            groupId: rootGroup.id,
          },
          {
            groupId: rootGroup.id,
            operator: "and",
            items: [],
          },
        ],
      });
    });
  });

  it("does not change state if parent group is not found when adding item", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { rootGroup, actions } = result.current;
    actions.addItem(["invalidParent"], "RULE_GROUP");

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("removes rule from root group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
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

  it("removes all rules from root group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.addItem([], "RULE");
    actions.addItem([], "RULE_GROUP");

    rootGroup = result.current.rootGroup;
    expect(rootGroup.items).to.have.lengthOf(3);
    actions.removeAllItems();

    rootGroup = result.current.rootGroup;
    expect(rootGroup.items).to.have.lengthOf(1);
    expect(rootGroup).to.containSubset({
      items: [{ groupId: rootGroup.id }],
    });
  });

  it("clears rule instead of removing it when only one rule is left in the rule group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;

    let { rootGroup } = result.current;
    expect(rootGroup.items).to.have.lengthOf(1);
    actions.setRuleOperator([rootGroup.items[0].id], "is-true");
    actions.setRuleValue([rootGroup.items[0].id], {
      valueFormat: PropertyValueFormat.Primitive,
    });
    actions.setRuleProperty([rootGroup.items[0].id], property);

    rootGroup = result.current.rootGroup;
    expect((rootGroup.items[0] as PropertyFilterBuilderRule).property).to.be.eq(
      property
    );
    actions.removeItem([rootGroup.items[0].id]);

    rootGroup = result.current.rootGroup;
    expect(result.current.rootGroup).to.containSubset({
      operator: "and",
      items: [{ operator: undefined, value: undefined, property: undefined }],
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

    expect(rootGroup.operator).to.be.eq("and");
    actions.setRuleGroupOperator([], "or");

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        operator: "or",
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
    actions.setRuleGroupOperator(["invalidGroup"], "or");

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

  it("resets operator when property is changed.", async () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

    // set operator for rule item
    actions.setRuleOperator([rootGroup.items[0].id], "is-null");

    // setting the property should reset the operator
    actions.setRuleProperty([rootGroup.items[0].id], property);

    // confirm that operator has been reset
    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            property,
            operator: undefined,
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

    actions.setRuleOperator([rootGroup.items[0].id], "is-equal");

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            operator: "is-equal",
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

    actions.setRuleOperator([rootGroup.items[0].id], "is-null");

    await waitFor(() => {
      rootGroup = result.current.rootGroup;
      expect(rootGroup).to.containSubset({
        items: [
          {
            groupId: rootGroup.id,
            operator: "is-null",
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
          operator: "is-equal",
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);
    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator([rootGroup.items[0].id], "less");

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
          operator: "less",
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator([rootGroup.items[0].id], "is-not-equal");

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
          operator: "like",
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator([rootGroup.items[0].id], "like");

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
          operator: "is-equal",
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator([rootGroup.items[0].id], "is-not-equal");

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
          operator: "less",
        },
      })
    );
    const { actions } = result.current;
    let { rootGroup } = result.current;
    actions.setRuleValue([rootGroup.items[0].id], value);

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);

    actions.setRuleOperator([rootGroup.items[0].id], "greater");

    rootGroup = result.current.rootGroup;

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(value);
  });

  it("does not reset rule value when operator changes from `Between` to `Not Between`", () => {
    const { result } = renderHook(() =>
      usePropertyFilterBuilder({
        initialFilter: createRangeFilter(
          property,
          "between",
          {
            valueFormat: PropertyValueFormat.Primitive,
            value: 1,
          },
          {
            valueFormat: PropertyValueFormat.Primitive,
            value: 2,
          }
        ),
      })
    );

    const { actions } = result.current;
    let { rootGroup } = result.current;

    const initialValue = (rootGroup.items[0] as PropertyFilterBuilderRule)
      .value;
    expect((rootGroup.items[0] as PropertyFilterBuilderRule).operator).to.be.eq(
      "between"
    );
    expect(initialValue).to.not.be.undefined;
    actions.setRuleOperator([rootGroup.items[0].id], "not-between");

    rootGroup = result.current.rootGroup;
    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).value
    ).to.be.deep.eq(initialValue);
  });

  it("does not change state when setting non existing rule operator", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleOperator(["invalidRule"], "is-equal");

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

  it("does not change state when trying to set property on rule group", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions, rootGroup } = result.current;

    actions.setRuleProperty([], property);

    const { rootGroup: newRootGroup } = result.current;
    expect(rootGroup).to.be.eq(newRootGroup);
  });

  it("sets rule error message", () => {
    const { result } = renderHook(() => usePropertyFilterBuilder());
    const { actions } = result.current;
    let { rootGroup } = result.current;

    actions.addItem([], "RULE");

    actions.setRuleErrorMessages(
      new Map([[rootGroup.items[0].id, "error message"]])
    );

    rootGroup = result.current.rootGroup;

    expect(
      (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
    ).to.be.eq("error message");

    expect((rootGroup.items[1] as PropertyFilterBuilderRule).errorMessage).to.be
      .undefined;
  });

  describe("buildFilter", () => {
    describe("defaultRuleValidator", () => {
      it("returns undefined and sets rule error message to `Value is empty` if item has a property but value is undefined", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: "like",
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
              operator: "is-equal",
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
              operator: "is-false",
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
          operator: "is-false",
          value: undefined,
        });
      });

      it("returns property filter and doesn't set error message if filter is valid.", () => {
        const { result } = renderHook(() =>
          usePropertyFilterBuilder({
            initialFilter: {
              property,
              operator: "is-equal",
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
          operator: "is-equal",
          value: {
            valueFormat: PropertyValueFormat.Primitive,
            value: "value",
            displayValue: "value",
          },
        });
      });

      describe("range value", () => {
        it("returns undefined and sets rule error message to `Value is empty` if item`s range `from` value is empty", () => {
          const { result } = renderHook(() =>
            usePropertyFilterBuilder({
              initialFilter: createRangeFilter(
                property,
                "between",
                {
                  valueFormat: PropertyValueFormat.Primitive,
                },
                {
                  valueFormat: PropertyValueFormat.Primitive,
                  value: 2,
                }
              ),
            })
          );
          const { buildFilter } = result.current;

          const buildFilterResult = buildFilter();
          expect(buildFilterResult).to.be.undefined;

          const { rootGroup } = result.current;
          expect(
            (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
          ).to.be.eq(
            UiComponents.translate("filterBuilder.errorMessages.emptyValue")
          );
        });

        it("returns undefined and sets rule error message to `Value is empty` if item`s range `to` value is empty", () => {
          const { result } = renderHook(() =>
            usePropertyFilterBuilder({
              initialFilter: createRangeFilter(
                property,
                "between",
                {
                  valueFormat: PropertyValueFormat.Primitive,
                  value: 1,
                },
                {
                  valueFormat: PropertyValueFormat.Primitive,
                }
              ),
            })
          );
          const { buildFilter } = result.current;

          const buildFilterResult = buildFilter();
          expect(buildFilterResult).to.be.undefined;

          const { rootGroup } = result.current;
          expect(
            (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
          ).to.be.eq(
            UiComponents.translate("filterBuilder.errorMessages.emptyValue")
          );
        });

        it("returns undefined and sets rule error message to `Invalid range` if item`s range is not valid", () => {
          const { result } = renderHook(() =>
            usePropertyFilterBuilder({
              initialFilter: createRangeFilter(
                property,
                "between",
                {
                  valueFormat: PropertyValueFormat.Primitive,
                  value: 2,
                },
                {
                  valueFormat: PropertyValueFormat.Primitive,
                  value: 1,
                }
              ),
            })
          );
          const { buildFilter } = result.current;

          const buildFilterResult = buildFilter();
          expect(buildFilterResult).to.be.undefined;

          const { rootGroup } = result.current;
          expect(
            (rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage
          ).to.be.eq(
            UiComponents.translate("filterBuilder.errorMessages.invalidRange")
          );
        });

        it("returns property filter with `Between` rule when value is valid", () => {
          const initialFilter = createRangeFilter(
            property,
            "between",
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: 1,
            },
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: 2,
            }
          );
          const { result } = renderHook(() =>
            usePropertyFilterBuilder({
              initialFilter,
            })
          );
          const { buildFilter } = result.current;

          const buildFilterResult = buildFilter();
          expect(buildFilterResult).to.containSubset({
            operator: "and",
            rules: [
              {
                operator: "and",
                rules: [
                  {
                    property,
                    operator: "greater-or-equal",
                  },
                  {
                    property,
                    operator: "less-or-equal",
                  },
                ],
              },
            ],
          });

          const { rootGroup } = result.current;
          expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage)
            .to.be.undefined;
        });

        it("returns property filter with `Not Between` rule when value is valid", () => {
          const initialFilter = createRangeFilter(
            property,
            "not-between",
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: 1,
            },
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: 2,
            }
          );
          const { result } = renderHook(() =>
            usePropertyFilterBuilder({
              initialFilter,
            })
          );
          const { buildFilter } = result.current;

          const buildFilterResult = buildFilter();
          expect(buildFilterResult).to.containSubset({
            operator: "and",
            rules: [
              {
                operator: "or",
                rules: [
                  {
                    property,
                    operator: "less",
                  },
                  {
                    property,
                    operator: "greater",
                  },
                ],
              },
            ],
          });

          const { rootGroup } = result.current;
          expect((rootGroup.items[0] as PropertyFilterBuilderRule).errorMessage)
            .to.be.undefined;
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

  describe("range rule", () => {
    it("converts `>=` and `<=` rules into `Between` rule", () => {
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({
          initialFilter: {
            operator: "and",
            rules: [
              {
                operator: "and",
                rules: [
                  {
                    operator: "greater-or-equal",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 1,
                    },
                  },
                  {
                    operator: "less-or-equal",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 2,
                    },
                  },
                ],
              },
            ],
          },
        })
      );

      const { rootGroup } = result.current;
      expect(rootGroup.items.length).to.be.eq(1);
      const rule = rootGroup.items[0];
      expect(isPropertyFilterBuilderRuleGroup(rule)).to.be.false;
      expect((rule as PropertyFilterBuilderRule).operator).to.be.eq("between");
    });

    it("converts `<` and `>` rules into `Not Between` rule", () => {
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({
          initialFilter: {
            operator: "and",
            rules: [
              {
                operator: "or",
                rules: [
                  {
                    operator: "less",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 1,
                    },
                  },
                  {
                    operator: "greater",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 2,
                    },
                  },
                ],
              },
            ],
          },
        })
      );

      const { rootGroup } = result.current;
      expect(rootGroup.items.length).to.be.eq(1);
      const rule = rootGroup.items[0];
      expect(isPropertyFilterBuilderRuleGroup(rule)).to.be.false;
      expect((rule as PropertyFilterBuilderRule).operator).to.be.eq(
        "not-between"
      );
    });

    it("does not convert `>` and `<` rules into `Between` rule", () => {
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({
          initialFilter: {
            operator: "and",
            rules: [
              {
                operator: "and",
                rules: [
                  {
                    operator: "greater",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 1,
                    },
                  },
                  {
                    operator: "less",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 2,
                    },
                  },
                ],
              },
            ],
          },
        })
      );

      const { rootGroup } = result.current;
      const group = rootGroup.items[0];
      expect(isPropertyFilterBuilderRuleGroup(group)).toEqual(true);
      expect((group as PropertyFilterBuilderRuleGroup).items.length).to.be.eq(
        2
      );
    });

    it("does not convert `<=` and `>=` rules into `Not Between` rule", () => {
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({
          initialFilter: {
            operator: "and",
            rules: [
              {
                operator: "or",
                rules: [
                  {
                    operator: "less-or-equal",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 1,
                    },
                  },
                  {
                    operator: "greater-or-equal",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 2,
                    },
                  },
                ],
              },
            ],
          },
        })
      );

      const { rootGroup } = result.current;
      const group = rootGroup.items[0];
      expect(isPropertyFilterBuilderRuleGroup(group)).toEqual(true);
      expect((group as PropertyFilterBuilderRuleGroup).items.length).to.be.eq(
        2
      );
    });

    it("does not convert `>=` and `<=` rules into `Between` rule if there is more rules", () => {
      const { result } = renderHook(() =>
        usePropertyFilterBuilder({
          initialFilter: {
            operator: "and",
            rules: [
              {
                operator: "and",
                rules: [
                  {
                    operator: "greater-or-equal",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 1,
                    },
                  },
                  {
                    operator: "less-or-equal",
                    property,
                    value: {
                      valueFormat: PropertyValueFormat.Primitive,
                      value: 2,
                    },
                  },
                  {
                    operator: "is-not-null",
                    property,
                  },
                ],
              },
            ],
          },
        })
      );

      const { rootGroup } = result.current;
      const group = rootGroup.items[0];
      expect(isPropertyFilterBuilderRuleGroup(group)).toEqual(true);
      expect((group as PropertyFilterBuilderRuleGroup).items.length).to.be.eq(
        3
      );
    });
  });

  describe("rule group", () => {
    async function getStateWithNestedRule() {
      const { result } = renderHook(() => usePropertyFilterBuilder());
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

        actions.setRuleOperator(getNestedRulePath(), "is-equal");

        await waitFor(() => {
          const rule = getNestedRule();
          expect(rule).to.containSubset({
            groupId: getNestingRule().id,
            operator: "is-equal",
          });
        });
      });

      it("sets value", async () => {
        const { result, getNestingRule, getNestedRule, getNestedRulePath } =
          await getStateWithNestedRule();
        const { actions } = result.current;

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

describe("buildFilter", () => {
  const property = {
    name: "testName",
    displayLabel: "testLabel",
    typename: "testTypename",
  };

  it("returns undefined if `Between` rule value is invalid", () => {
    const filter: PropertyFilterBuilderRuleGroup = {
      id: "1",
      operator: "and",
      items: [
        {
          id: "2",
          groupId: "1",
          property,
          operator: "between",
          value: {
            valueFormat: PropertyValueFormat.Primitive,
            value: 123,
          },
        },
      ],
    };

    const buildFilterResult = buildPropertyFilter(filter);
    expect(buildFilterResult).to.be.undefined;
  });

  it("returns undefined if `Between` rule value has empty range end", () => {
    const filter: PropertyFilterBuilderRuleGroup = {
      id: "1",
      operator: "and",
      items: [
        {
          id: "2",
          groupId: "1",
          property,
          operator: "between",
          value: PropertyFilterBuilderRuleRangeValue.serialize({
            from: { valueFormat: PropertyValueFormat.Primitive, value: 1 },
            to: { valueFormat: PropertyValueFormat.Primitive },
          }),
        },
      ],
    };

    const buildFilterResult = buildPropertyFilter(filter);
    expect(buildFilterResult).to.be.undefined;
  });
});

function createRangeFilter(
  property: PropertyDescription,
  operator: "between" | "not-between",
  fromValue?: PropertyValue,
  toValue?: PropertyValue
): PropertyFilter {
  return {
    operator: "and",
    rules: [
      {
        operator: operator === "between" ? "and" : "or",
        rules: [
          {
            value: fromValue,
            property,
            operator: operator === "between" ? "greater-or-equal" : "less",
          },
          {
            value: toValue,
            property,
            operator: operator === "between" ? "less-or-equal" : "greater",
          },
        ],
      },
    ],
  };
}
