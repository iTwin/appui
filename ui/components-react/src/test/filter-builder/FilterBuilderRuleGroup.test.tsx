/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import sinon from "sinon";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { FilterBuilderRuleGroupRendererProps } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import { FilterBuilderRuleGroupRenderer } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import type { FilterBuilderRuleGroup } from "../../components-react/filter-builder/FilterBuilderState";
import { FilterBuilderActions } from "../../components-react/filter-builder/FilterBuilderState";
import { FilterRuleGroupOperator } from "../../components-react/filter-builder/Operators";
import TestUtils from "../TestUtils";
import { renderWithContext } from "./Common";

describe("FilterBuilderRuleGroupRenderer", () => {
  const rootGroup: FilterBuilderRuleGroup = {
    id: "id",
    items: [
      {
        id: "child1",
        groupId: "id",
      },
      {
        id: "child2",
        groupId: "id",
      },
    ],
    operator: FilterRuleGroupOperator.And,
  };
  const defaultProps: FilterBuilderRuleGroupRendererProps = {
    group: rootGroup,
    path: [],
  };

  beforeEach(async () => {
    await TestUtils.initializeUiComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiComponents();
  });

  it("does not render remove button for root group", () => {
    const { queryByTestId } = renderWithContext(
      <FilterBuilderRuleGroupRenderer {...defaultProps} />
    );

    expect(queryByTestId("rule-group-remove")).to.be.null;
  });

  it("does not render operator selector if only one rule is in group", () => {
    const { queryByText } = renderWithContext(
      <FilterBuilderRuleGroupRenderer
        {...defaultProps}
        group={{
          id: "id",
          items: [{ id: "childId", groupId: "id" }],
          operator: FilterRuleGroupOperator.And,
        }}
      />
    );
    expect(
      queryByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.and"
        )
      )
    ).to.be.null;
  });

  it("renders child rule", () => {
    const property: PropertyDescription = {
      displayLabel: "Prop",
      name: "prop",
      typename: "int",
    };
    const { getByDisplayValue } = renderWithContext(
      <FilterBuilderRuleGroupRenderer
        {...defaultProps}
        group={{
          id: "id",
          operator: FilterRuleGroupOperator.And,
          items: [
            {
              id: "childId",
              groupId: "id",
              property,
            },
          ],
        }}
      />,
      { properties: [property] }
    );

    getByDisplayValue("Prop");
  });
});
