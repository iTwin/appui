/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { PropertyFilterBuilderRuleGroupRendererProps } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import { PropertyFilterBuilderRuleGroupRenderer } from "../../components-react/filter-builder/FilterBuilderRuleGroup";
import {
  PropertyFilterBuilderActions,
  type PropertyFilterBuilderRuleGroup,
} from "../../components-react/filter-builder/FilterBuilderState";
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
    operator: "and",
  };
  const defaultProps: PropertyFilterBuilderRuleGroupRendererProps = {
    group: rootGroup,
    path: [],
    isGroupOperatorDisabled: false,
  };

  it("does not render remove button for root group", () => {
    const { queryByTestId } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...defaultProps} />
    );

    expect(queryByTestId("rule-group-remove")).toEqual(null);
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
          operator: "and",
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
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const { container, findByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...defaultProps} />,
      { actions }
    );
    const setRuleGroupOperatorSpy = vi.spyOn(actions, "setRuleGroupOperator");

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).toBeTruthy();

    selector?.click();

    expect(
      await findByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.and"
        )
      )
    ).toBeTruthy();

    expect(setRuleGroupOperatorSpy).toHaveBeenCalledWith(
      defaultProps.path,
      "or"
    );
  });

  it("Toggles operator 'Or' to 'And'", async () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const props: PropertyFilterBuilderRuleGroupRendererProps = {
      group: { ...rootGroup, operator: "or" },
      path: [],
      isGroupOperatorDisabled: false,
    };
    const { container, findByText } = renderWithContext(
      <PropertyFilterBuilderRuleGroupRenderer {...props} />,
      { actions }
    );
    const setRuleGroupOperatorSpy = vi.spyOn(actions, "setRuleGroupOperator");

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).toBeTruthy();

    selector?.click();

    expect(
      await findByText(
        TestUtils.i18n.getLocalizedString(
          "Components:filterBuilder.operators.or"
        )
      )
    ).toBeTruthy();

    expect(setRuleGroupOperatorSpy).toHaveBeenCalledWith(
      defaultProps.path,
      "and"
    );
  });

  it("'Or' Operator should not be clickable if toggle disabled", async () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const props: PropertyFilterBuilderRuleGroupRendererProps = {
      group: { ...rootGroup, operator: "or" },
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
    ).toBeTruthy();

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).toEqual(null);
  });

  it("'And' Operator should not be clickable if toggled disabled", async () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
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
    ).toBeTruthy();

    const selector = container.querySelector<HTMLAnchorElement>(
      ".fb-group-operator .fb-logical-operator-toggle"
    );
    expect(selector).toEqual(null);
  });
});
