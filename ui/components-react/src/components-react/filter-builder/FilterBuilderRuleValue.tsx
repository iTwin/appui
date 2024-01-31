/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "../editors/EditorContainer";
import { EditorContainer } from "../editors/EditorContainer";
import { Flex, Text } from "@itwin/itwinui-react";
import { PropertyFilterBuilderRuleRangeValue } from "./FilterBuilderRangeValue";
import type { PropertyFilterBuilderRuleOperator } from "./Operators";
import { UiComponents } from "../UiComponents";

/**
 * Props for [[PropertyFilterBuilderRuleValue]] component.
 * @beta
 */
export interface PropertyFilterBuilderRuleValueProps {
  /** Currently entered value. */
  value?: PropertyValue;
  /** Property used in rule to which this value will be compared to. */
  property: PropertyDescription;
  /** Callback that is invoked when value changes. */
  onChange: (value: PropertyValue) => void;
}

/**
 * Props for custom [[PropertyFilterBuilderRuleValue]] renderer.
 * @beta
 */
export interface PropertyFilterBuilderRuleValueRendererProps
  extends PropertyFilterBuilderRuleValueProps {
  /** Current operator. */
  operator: PropertyFilterBuilderRuleOperator;
}

/**
 * Component that renders [[PropertyFilterBuilderRuleRenderer]] value input.
 * @beta
 */
export function PropertyFilterBuilderRuleValue(
  props: PropertyFilterBuilderRuleValueRendererProps
) {
  const { operator, ...restProps } = props;

  return operator === "between" || operator === "not-between" ? (
    <FilterBuilderRuleRangeValueRenderer {...restProps} />
  ) : (
    <FilterBuilderRulePrimitiveValueRenderer {...restProps} />
  );
}

function FilterBuilderRulePrimitiveValueRenderer({
  property,
  value,
  onChange,
}: PropertyFilterBuilderRuleValueProps) {
  const propertyRecord = React.useMemo(() => {
    return new PropertyRecord(
      value ?? { valueFormat: PropertyValueFormat.Primitive },
      property
    );
  }, [value, property]);

  const onValueChange = React.useCallback(
    ({ newValue }: PropertyUpdatedArgs) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <EditorContainer
      propertyRecord={propertyRecord}
      onCancel={/* istanbul ignore next */ () => {}}
      onCommit={onValueChange}
      setFocus={false}
      shouldCommitOnChange={false}
    />
  );
}

function FilterBuilderRuleRangeValueRenderer({
  property,
  value,
  onChange,
}: PropertyFilterBuilderRuleValueProps) {
  const { from, to } = React.useMemo(() => {
    const rangeValue = PropertyFilterBuilderRuleRangeValue.parse(value);
    return {
      from: new PropertyRecord(rangeValue.from, property),
      to: new PropertyRecord(rangeValue.to, property),
    };
  }, [property, value]);

  const handleFromValue = React.useCallback(
    ({ newValue }: PropertyUpdatedArgs) => {
      onChange(getSerializedRangeValue(newValue, to.value));
    },
    [onChange, to]
  );

  const handleToValue = React.useCallback(
    ({ newValue }: PropertyUpdatedArgs) => {
      onChange(getSerializedRangeValue(from.value, newValue));
    },
    [onChange, from]
  );

  return (
    <Flex
      className="rule-value-range"
      display="inline-flex"
      flexDirection="row"
    >
      <Flex.Item>
        <EditorContainer
          propertyRecord={from}
          onCancel={/* istanbul ignore next */ () => {}}
          onCommit={handleFromValue}
          setFocus={false}
          shouldCommitOnChange={false}
        />
      </Flex.Item>
      <Text>
        {UiComponents.translate("filterBuilder.operators.and").toLowerCase()}
      </Text>
      <Flex.Item>
        <EditorContainer
          propertyRecord={to}
          onCancel={/* istanbul ignore next */ () => {}}
          onCommit={handleToValue}
          setFocus={false}
          shouldCommitOnChange={false}
        />
      </Flex.Item>
    </Flex>
  );
}

function getSerializedRangeValue(from: PropertyValue, to: PropertyValue) {
  return PropertyFilterBuilderRuleRangeValue.serialize({
    from:
      from.valueFormat === PropertyValueFormat.Primitive
        ? from
        : { valueFormat: PropertyValueFormat.Primitive },
    to:
      to.valueFormat === PropertyValueFormat.Primitive
        ? to
        : { valueFormat: PropertyValueFormat.Primitive },
  });
}
