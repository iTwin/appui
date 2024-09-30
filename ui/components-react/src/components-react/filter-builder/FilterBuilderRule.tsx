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
import { Flex, Text } from "@itwin/itwinui-react";
import {
  PropertyFilterBuilderContext,
  PropertyFilterBuilderRuleRenderingContext,
} from "./FilterBuilderContext";
import { PropertyFilterBuilderRuleOperatorRenderer } from "./FilterBuilderRuleOperator";
import { PropertyFilterBuilderRuleProperty } from "./FilterBuilderRuleProperty";
import { PropertyFilterBuilderRuleValue } from "./FilterBuilderRuleValue";
import type { PropertyFilterBuilderRule } from "./FilterBuilderState";
import {
  isUnaryPropertyFilterBuilderOperator,
  type PropertyFilterBuilderRuleOperator,
} from "./Operators";
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
  /** Boolean to allow last rule to be removed */
  allowLastRuleDelete?: boolean;
}

/**
 * Component that renders single rule in [[PropertyFilterBuilder]] component.
 * @internal
 */
export function PropertyFilterBuilderRuleRenderer(
  props: PropertyFilterBuilderRuleRendererProps
) {
  const { path, rule, onRuleAdded, allowLastRuleDelete } = props;
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
    (newOperator: PropertyFilterBuilderRuleOperator) => {
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

  const removeRule = () => actions.removeItem(path, allowLastRuleDelete);
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
        <PropertyFilterBuilderRuleOperatorRenderer
          property={prop}
          onChange={onRuleOperatorChange}
          operator={operator}
        />
      );
    },
    [operator, ruleOperatorRenderer, onRuleOperatorChange]
  );

  const valueRenderer = React.useCallback(
    (prop: PropertyDescription, op: PropertyFilterBuilderRuleOperator) => {
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
          operator={op}
        />
      );
    },
    [value, ruleValueRenderer, onRuleValueChange]
  );

  return (
    <div className="fb-component-row">
      <Flex className="fb-row-container" gap="s" alignItems="flex-start">
        <PropertyFilterBuilderRuleProperty
          properties={properties}
          selectedProperty={rule.property}
          onSelectedPropertyChanged={onSelectedPropertyChanged}
          propertyRenderer={propertyRenderer}
          isDisabled={isDisabled}
        />
        {property !== undefined ? operatorRenderer(property) : null}
        {property !== undefined &&
        operator !== undefined &&
        !isUnaryPropertyFilterBuilderOperator(operator) ? (
          <div className="fb-property-value">
            {valueRenderer(property, operator)}
            {rule.errorMessage ? (
              <Flex>
                <SvgStatusError />
                <Text>{rule.errorMessage}</Text>
              </Flex>
            ) : null}
          </div>
        ) : null}
        <PropertyFilterBuilderToolbar
          onAddChild={handleRuleAdded}
          onDelete={removeRule}
        />
      </Flex>
    </div>
  );
}
