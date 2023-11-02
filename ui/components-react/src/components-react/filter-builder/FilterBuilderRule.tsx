/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import "./FilterBuilderRule.scss";
import "./FilterBuilder.scss";
import "./FilterBuilderPropertyValue.scss";
import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { SvgStatusError } from "@itwin/itwinui-icons-react";
import { Flex } from "@itwin/itwinui-react";
import {
  FilterBuilderContext,
  FilterBuilderRuleRenderingContext,
} from "./FilterBuilderContext";
import { FilterBuilderRuleOperator } from "./FilterBuilderRuleOperator";
import { FilterBuilderRuleProperty } from "./FilterBuilderRuleProperty";
import { FilterBuilderRuleValue } from "./FilterBuilderRuleValue";
import type { FilterBuilderRule } from "./FilterBuilderState";
import type { FilterRuleOperator } from "./Operators";
import { isUnaryFilterOperator } from "./Operators";
import { FilterBuilderToolbar } from "./FilterBuilderToolbar";

/**
 * Props for [[FilterBuilderRuleRenderer]] component.
 * @internal
 */
export interface FilterBuilderRuleRendererProps {
  /** Path from [[FilterBuilder]] root to this rule. */
  path: string[];
  /** Rule to render. */
  rule: FilterBuilderRule;
  /** Function to add rule to group */
  onAddRule: () => void;
  size?: "small" | "large";
}

/**
 * Component that renders single rule in [[FilterBuilder]] component.
 * @internal
 */
export function FilterBuilderRuleRenderer(
  props: FilterBuilderRuleRendererProps
) {
  const { path, rule, onAddRule, size } = props;
  const { properties, actions, onRulePropertySelected } =
    React.useContext(FilterBuilderContext);
  const {
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled,
  } = React.useContext(FilterBuilderRuleRenderingContext);
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
    (newOperator: FilterRuleOperator) => {
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

  const operatorRenderer = React.useCallback(
    (prop: PropertyDescription) => {
      if (ruleOperatorRenderer)
        return ruleOperatorRenderer({
          property: prop,
          operator,
          onChange: onRuleOperatorChange,
        });
      return (
        <FilterBuilderRuleOperator
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
    (prop: PropertyDescription, op: FilterRuleOperator) => {
      if (ruleValueRenderer)
        return ruleValueRenderer({
          property: prop,
          value,
          onChange: onRuleValueChange,
          operator: op,
        });
      return (
        <FilterBuilderRuleValue
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
      <Flex gap="0px">
        <Flex className="fb-row-container">
          <FilterBuilderRuleProperty
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
          !isUnaryFilterOperator(operator) ? (
            <div style={{ display: "flex" }}>
              <div className="fb-property-value fb-row-value">
                {valueRenderer(property, operator)}
              </div>
              {rule.errorMessage ? (
                <>
                  <SvgStatusError className="iui-input-icon" />
                  <div className="iui-message">{rule.errorMessage}</div>
                </>
              ) : null}
            </div>
          ) : null}
          <FilterBuilderToolbar
            className="fb-row-toolbar"
            onAddChild={() => onAddRule()}
            onDelete={removeRule}
            size={size}
          />
        </Flex>
      </Flex>
    </div>
  );
}
