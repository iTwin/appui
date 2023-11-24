/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { PropertyFilterBuilderRuleGroupRendererProps } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import { PropertyFilterBuilderRuleGroupRenderer } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import type { PropertyFilterBuilderRuleGroup } from "../../components-react/filter-builder/FilterBuilderState";
import { PropertyFilterRuleGroupOperator } from "../../components-react/filter-builder/Operators";
import TestUtils from "../TestUtils";
import { renderWithContext } from "./Common";

describe("PropertyFilterBuilderRuleGroupRenderer", () => {
  const rootGroup: PropertyFilterBuilderRuleGroup = {
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
    operator: PropertyFilterRuleGroupOperator.And,
  };
  const defaultProps: PropertyFilterBuilderRuleGroupRendererProps = {
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
      <PropertyFilterBuilderRuleGroupRenderer {...defaultProps} />
    );

    expect(queryByTestId("rule-group-remove")).to.be.null;
  });

  it("does not render operator selector if only one rule is in group", () => {
    const { queryByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer
        {...defaultProps}
        group={{
          id: "id",
          items: [{ id: "childId", groupId: "id" }],
          operator: PropertyFilterRuleGroupOperator.And,
        }}
      />
    );
    expect(
      queryByText(
        TestUtils.i18n.getLocalizedString(
          "Components:PropertyFilterBuilder.operators.and"
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
      <PropertyFilterBuilderRuleGroupRenderer
        {...defaultProps}
        group={{
          id: "id",
          operator: PropertyFilterRuleGroupOperator.And,
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
