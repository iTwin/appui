/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { PropertyFilterBuilderRuleGroupRendererProps } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import { PropertyFilterBuilderRuleGroupRenderer } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import {
  PropertyFilterBuilderActions,
  type PropertyFilterBuilderRuleGroup,
} from "../../components-react/filter-builder/FilterBuilderState";
import { PropertyFilterRuleGroupOperator } from "../../components-react/filter-builder/Operators";
import TestUtils from "../TestUtils";
import { renderWithContext } from "./Common";
import sinon from "sinon";

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
    isGroupOperatorDisabled: false,
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

  it("dispatches operator change event when operator is selected", async () => {
    const actions = new PropertyFilterBuilderActions(sinon.spy());
    const { container, findByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...defaultProps} />,
      { actions }
    );
    const setRuleGroupOperatorSpy = sinon.stub(actions, "setRuleGroupOperator");

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).to.not.be.null;

    selector?.click();

    expect(
      await findByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.and"
        )
      )
    ).to.not.be.null;

    expect(setRuleGroupOperatorSpy).to.be.calledWith(
      defaultProps.path,
      PropertyFilterRuleGroupOperator.Or
    );
  });

  it("Toggles operator 'Or' to 'And'", async () => {
    const actions = new PropertyFilterBuilderActions(sinon.spy());
    rootGroup.operator = PropertyFilterRuleGroupOperator.Or;
    const props: PropertyFilterBuilderRuleGroupRendererProps = {
      group: rootGroup,
      path: [],
      isGroupOperatorDisabled: false,
    };
    const { container, findByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...props} />,
      { actions }
    );
    const setRuleGroupOperatorSpy = sinon.stub(actions, "setRuleGroupOperator");

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).to.not.be.null;

    selector?.click();

    expect(
      await findByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.or"
        )
      )
    ).to.not.be.null;

    expect(setRuleGroupOperatorSpy).to.be.calledWith(
      defaultProps.path,
      PropertyFilterRuleGroupOperator.And
    );
  });

  it("'Or' Operator should not be clickable if toggled disabled", async () => {
    const actions = new PropertyFilterBuilderActions(sinon.spy());
    const props: PropertyFilterBuilderRuleGroupRendererProps = {
      group: { ...rootGroup, operator: PropertyFilterRuleGroupOperator.Or },
      path: [],
      isGroupOperatorDisabled: true,
    };
    const { container, findByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...props} />,
      { actions }
    );

    expect(
      findByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.or"
        )
      )
    ).to.not.be.null;

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).to.be.null;
  });

  it("'And' Operator should not be clickable if toggled disabled", async () => {
    const actions = new PropertyFilterBuilderActions(sinon.spy());
    rootGroup.operator = PropertyFilterRuleGroupOperator.And;
    const props: PropertyFilterBuilderRuleGroupRendererProps = {
      group: rootGroup,
      path: [],
      isGroupOperatorDisabled: true,
    };
    const { container, findByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...props} />,
      { actions }
    );

    expect(
      findByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.and"
        )
      )
    ).to.not.be.null;

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).to.be.null;
  });
});
