/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import "./FilterBuilderRule.scss";
import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { SvgStatusError } from "@itwin/itwinui-icons-react";
import { Flex } from "@itwin/itwinui-react";
import {
  PropertyFilterBuilderContext,
  PropertyFilterBuilderRuleRenderingContext,
} from "./FilterBuilderContext";
import { PropertyFilterBuilderRuleOperator } from "./FilterBuilderRuleOperator";
import { PropertyFilterBuilderRuleProperty } from "./FilterBuilderRuleProperty";
import { PropertyFilterBuilderRuleValue } from "./FilterBuilderRuleValue";
import type { PropertyFilterBuilderRule } from "./FilterBuilderState";
import type { PropertyFilterRuleOperator } from "./Operators";
import { isUnaryPropertyFilterOperator } from "./Operators";
import { PropertyFilterBuilderToolbar } from "./FilterBuilderToolbar";

/**
 * Props for [[PropertyFilterBuilderRuleRenderer]] component.
 * @internal
 */
export interface PropertyFilterBuilderRuleRendererProps {
  /** Path from [[PropertyFilterBuilder]] root to this rule. */
  path: string[];
  /** Rule to render. */
  rule: PropertyFilterBuilderRule;
  /** Function to add rule to group */
  onRuleAdded: () => void;
  /** Size to render the component. If undefined, defaults to iTwinUI "small" size. */
  size?: "medium" | "large";
}

/**
 * Component that renders single rule in [[PropertyFilterBuilder]] component.
 * @internal
 */
export function PropertyFilterBuilderRuleRenderer(
  props: PropertyFilterBuilderRuleRendererProps
) {
  const { path, rule, onRuleAdded, size } = props;
  const { properties, actions, onRulePropertySelected } = React.useContext(
    PropertyFilterBuilderContext
  );
  const {
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled,
  } = React.useContext(PropertyFilterBuilderRuleRenderingContext);
  const { property, operator, value } = rule;

  const onSelectedPropertyChanged = React.useCallback(
    (newProperty?: PropertyDescription) => {
      actions.setRuleProperty(path, newProperty);
      // invoke 'onRulePropertySelected' when new property is selected. There is no way to deselect property
      // so 'newProperty' will be 'undefined' only if selected property is no longer in 'properties' list.
      if (onRulePropertySelected && newProperty)
        onRulePropertySelected(newProperty);
    },
    [path, onRulePropertySelected, actions]
  );

  const onRuleOperatorChange = React.useCallback(
    (newOperator: PropertyFilterRuleOperator) => {
      actions.setRuleOperator(path, newOperator);
    },
    [path, actions]
  );

  const onRuleValueChange = React.useCallback(
    (newValue: PropertyValue) => {
      actions.setRuleValue(path, newValue);
    },
    [path, actions]
  );

  const removeRule = () => actions.removeItem(path);
  const handleRuleAdded = () => {
    actions.addItem([], "RULE");
    onRuleAdded();
  };

  const operatorRenderer = React.useCallback(
    (prop: PropertyDescription) => {
      if (ruleOperatorRenderer)
        return ruleOperatorRenderer({
          property: prop,
          operator,
          onChange: onRuleOperatorChange,
        });
      return (
        <PropertyFilterBuilderRuleOperator
          property={prop}
          onChange={onRuleOperatorChange}
          operator={operator}
          size={size}
        />
      );
    },
    [operator, ruleOperatorRenderer, onRuleOperatorChange, size]
  );

  const valueRenderer = React.useCallback(
    (prop: PropertyDescription, op: PropertyFilterRuleOperator) => {
      if (ruleValueRenderer)
        return ruleValueRenderer({
          property: prop,
          value,
          onChange: onRuleValueChange,
          operator: op,
        });
      return (
        <PropertyFilterBuilderRuleValue
          property={prop}
          onChange={onRuleValueChange}
          value={value}
          size={size}
        />
      );
    },
    [value, ruleValueRenderer, onRuleValueChange, size]
  );

  return (
    <div className="fb-component-row">
      <Flex className="fb-row-container">
        <PropertyFilterBuilderRuleProperty
          properties={properties}
          selectedProperty={rule.property}
          onSelectedPropertyChanged={onSelectedPropertyChanged}
          propertyRenderer={propertyRenderer}
          isDisabled={isDisabled}
          size={size}
        />
        {property !== undefined ? operatorRenderer(property) : null}
        {property !== undefined &&
        operator !== undefined &&
        !isUnaryPropertyFilterOperator(operator) ? (
          <div className="fb-property-value">
            {valueRenderer(property, operator)}
            {rule.errorMessage ? (
              <>
                <SvgStatusError className="iui-input-icon" />
                <div className="iui-message">{rule.errorMessage}</div>
              </>
            ) : null}
          </div>
        ) : null}
        <PropertyFilterBuilderToolbar
          onAddChild={handleRuleAdded}
          onDelete={removeRule}
          size={size}
        />
      </Flex>
    </div>
  );
}
