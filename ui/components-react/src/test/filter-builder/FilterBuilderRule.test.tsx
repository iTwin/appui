/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import { fireEvent } from "@testing-library/react";
import type { PropertyFilterBuilderRuleRendererProps } from "../../components-react/filter-builder/FilterBuilderRule.js";
import { PropertyFilterBuilderRuleRenderer } from "../../components-react/filter-builder/FilterBuilderRule.js";
import type { PropertyFilterBuilderRuleOperatorProps } from "../../components-react/filter-builder/FilterBuilderRuleOperator.js";
import type { PropertyFilterBuilderRuleValueProps } from "../../components-react/filter-builder/FilterBuilderRuleValue.js";
import { PropertyFilterBuilderActions } from "../../components-react/filter-builder/FilterBuilderState.js";
import { renderWithContext } from "./Common.js";

describe("PropertyFilterBuilderRuleRenderer", () => {
  const defaultProps: PropertyFilterBuilderRuleRendererProps = {
    path: [],
    rule: { id: "id", groupId: "groupId" },
    onRuleAdded: () => {},
  };
  const defaultProperty: PropertyDescription = {
    displayLabel: "Prop",
    name: "prop",
    typename: "int",
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

  describe("rule operator", () => {
    it("does not render operator if rule property is undefined", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer {...defaultProps} />
      );

      const operatorContainer =
        container.querySelector<HTMLDivElement>(".fb-row-condition");
      expect(operatorContainer).toEqual(null);
    });

    it("renders operator if rule property is defined", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{ ...defaultProps.rule, property: defaultProperty }}
        />
      );

      const operatorContainer =
        container.querySelector<HTMLDivElement>(".fb-row-condition");
      expect(operatorContainer).toBeTruthy();
    });

    it("operator defaults to `contains` if rule property is string", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{
            ...defaultProps.rule,
            property: {
              ...defaultProperty,
              typename: StandardTypeNames.String,
            },
          }}
        />
      );

      const operatorSpan = container.querySelector<HTMLSpanElement>(
        ".fb-row-condition span"
      );
      expect(operatorSpan?.innerHTML).toEqual(
        "filterBuilder.operators.contains"
      );
    });

    it("operator defaults to `contains` if rule property is text", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{
            ...defaultProps.rule,
            property: { ...defaultProperty, typename: StandardTypeNames.Text },
          }}
        />
      );

      const operatorSpan = container.querySelector<HTMLSpanElement>(
        ".fb-row-condition span"
      );
      expect(operatorSpan?.innerHTML).toEqual(
        "filterBuilder.operators.contains"
      );
    });

    it("renders operator using provided renderer", () => {
      const spy = vi.fn();
      renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{ ...defaultProps.rule, property: defaultProperty }}
        />,
        {},
        { ruleOperatorRenderer: spy }
      );

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("rule value", () => {
    it("does not render value if rule property is undefined", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer {...defaultProps} />
      );

      const valueContainer =
        container.querySelector<HTMLDivElement>(".fb-property-value");
      expect(valueContainer).toEqual(null);
    });

    it("does not render value if rule operator is undefined", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{ ...defaultProps.rule, property: defaultProperty }}
        />
      );

      const valueContainer =
        container.querySelector<HTMLDivElement>(".fb-property-value");
      expect(valueContainer).toEqual(null);
    });

    it("renders value when value and operator defined", () => {
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{
            ...defaultProps.rule,
            property: defaultProperty,
            operator: "is-equal",
          }}
        />
      );

      const valueContainer =
        container.querySelector<HTMLDivElement>(".fb-property-value");
      expect(valueContainer).toBeTruthy();
      expect(valueContainer!.hasChildNodes()).toEqual(true);
    });

    it("renders operator using provided renderer", () => {
      const spy = vi.fn();
      renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{
            ...defaultProps.rule,
            property: defaultProperty,
            operator: "is-equal",
          }}
        />,
        {},
        { ruleValueRenderer: spy }
      );

      expect(spy).toHaveBeenCalledOnce();
    });

    it("renders error message", () => {
      const errorMessage = "This is an error";
      const { queryByText } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer
          {...defaultProps}
          rule={{
            ...defaultProps.rule,
            property: defaultProperty,
            operator: "is-equal",
            errorMessage,
          }}
        />
      );

      expect(queryByText(errorMessage)).toBeTruthy();
    });
  });

  describe("rule property", () => {
    it("renders with property renderer", () => {
      const actions = new PropertyFilterBuilderActions(vi.fn());
      const propertyRendererSpy = vi.fn();
      const { container } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer {...defaultProps} />,
        { actions, properties: [defaultProperty] },
        { propertyRenderer: propertyRendererSpy }
      );

      // open property selector menu
      const selector = container.querySelector<HTMLInputElement>(
        ".fb-property-name input"
      );
      expect(selector).toBeTruthy();
      fireEvent.click(selector!);

      expect(propertyRendererSpy).toHaveBeenCalledWith(defaultProperty.name);
    });

    it("opens property selector menu", () => {
      const actions = new PropertyFilterBuilderActions(vi.fn());
      const { container, queryByText } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer {...defaultProps} />,
        { actions, properties: [defaultProperty] }
      );

      // open property selector
      const selector = container.querySelector<HTMLInputElement>(
        ".fb-property-name input"
      );
      expect(selector).toBeTruthy();
      fireEvent.click(selector!);

      expect(queryByText(defaultProperty.displayLabel)).toBeTruthy();
    });

    it("does not open property selector menu when property selection is disabled", () => {
      const actions = new PropertyFilterBuilderActions(vi.fn());
      const { container, queryByText } = renderWithContext(
        <PropertyFilterBuilderRuleRenderer {...defaultProps} />,
        { actions, properties: [defaultProperty] },
        { isDisabled: true }
      );

      // attempt to open property selector
      const selector = container.querySelector<HTMLInputElement>(
        ".fb-property-name input"
      );
      expect(selector).toBeTruthy();
      fireEvent.click(selector!);

      expect(queryByText(defaultProperty.displayLabel)).toEqual(null);
    });
  });

  it("dispatches property change when property is selected", () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const { container, getByText } = renderWithContext(
      <PropertyFilterBuilderRuleRenderer {...defaultProps} />,
      { actions, properties: [defaultProperty] }
    );
    const setRulePropertySpy = vi.spyOn(actions, "setRuleProperty");

    const selector = container.querySelector<HTMLInputElement>(
      ".fb-property-name input"
    );
    expect(selector).toBeTruthy();
    fireEvent.click(selector!);

    fireEvent.click(getByText(defaultProperty.displayLabel));
    expect(setRulePropertySpy).toHaveBeenCalledWith(
      defaultProps.path,
      defaultProperty
    );
  });

  it("dispatches property change with undefined property when selected property is not in properties list", () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const setRulePropertySpy = vi.spyOn(actions, "setRuleProperty");
    renderWithContext(
      <PropertyFilterBuilderRuleRenderer
        {...defaultProps}
        rule={{
          ...defaultProps.rule,
          property: defaultProperty,
          operator: "is-equal",
        }}
      />,
      { actions, properties: [] }
    );

    expect(setRulePropertySpy).toHaveBeenCalledWith(
      defaultProps.path,
      undefined
    );
  });

  it("invokes onRulePropertySelected callback when property is selected", () => {
    const spy = vi.fn();
    const { container, getByText } = renderWithContext(
      <PropertyFilterBuilderRuleRenderer {...defaultProps} />,
      { properties: [defaultProperty], onRulePropertySelected: spy }
    );

    const selector = container.querySelector<HTMLInputElement>(
      ".fb-property-name input"
    );
    expect(selector).toBeTruthy();
    fireEvent.click(selector!);

    fireEvent.click(getByText(defaultProperty.displayLabel));
    expect(spy).toHaveBeenCalledWith(defaultProperty);
  });

  it("dispatches remove rule action", () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const { container } = renderWithContext(
      <PropertyFilterBuilderRuleRenderer {...defaultProps} />,
      { actions }
    );
    const removeItemSpy = vi.spyOn(actions, "removeItem");

    const button = container.querySelector(".fb-toolbar")?.childNodes[1];
    expect(button).toBeTruthy();
    fireEvent.click(button!);
    expect(removeItemSpy).toHaveBeenCalledWith(defaultProps.path, undefined);
  });

  it("dispatches operator change when operator is changed", () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const operatorRendererSpy = vi.fn();
    renderWithContext(
      <PropertyFilterBuilderRuleRenderer
        {...defaultProps}
        rule={{
          ...defaultProps.rule,
          property: defaultProperty,
          operator: "is-equal",
        }}
      />,
      { actions },
      { ruleOperatorRenderer: operatorRendererSpy }
    );
    const setRuleOperatorSpy = vi.spyOn(actions, "setRuleOperator");

    expect(operatorRendererSpy).toHaveBeenCalledOnce();
    const operatorRendererProps = operatorRendererSpy.mock
      .calls[0][0] as PropertyFilterBuilderRuleOperatorProps;
    const newOperator = "is-not-null";
    operatorRendererProps.onChange(newOperator);

    expect(setRuleOperatorSpy).toHaveBeenCalledWith(
      defaultProps.path,
      newOperator
    );
  });

  it("dispatches value change when value is changed", () => {
    const actions = new PropertyFilterBuilderActions(vi.fn());
    const valueRendererSpy = vi.fn();
    renderWithContext(
      <PropertyFilterBuilderRuleRenderer
        {...defaultProps}
        rule={{
          ...defaultProps.rule,
          property: defaultProperty,
          operator: "is-equal",
        }}
      />,
      { actions },
      { ruleValueRenderer: valueRendererSpy }
    );
    const setRuleValueSpy = vi.spyOn(actions, "setRuleValue");

    expect(valueRendererSpy).toHaveBeenCalledOnce();
    const valueRendererProps = valueRendererSpy.mock
      .calls[0][0] as PropertyFilterBuilderRuleValueProps;
    const newValue: PropertyValue = {
      valueFormat: PropertyValueFormat.Primitive,
    };
    valueRendererProps.onChange(newValue);

    expect(setRuleValueSpy).toHaveBeenCalledWith(defaultProps.path, newValue);
  });
});
