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
import type { PropertyUpdatedArgs } from "../editors/EditorContainer.js";
import { Flex, Text } from "@itwin/itwinui-react";
import { PropertyFilterBuilderRuleRangeValue } from "./FilterBuilderRangeValue.js";
import type { PropertyFilterBuilderRuleOperator } from "./Operators.js";
import { useTranslation } from "../l10n/useTranslation.js";
import { PropertyRecordEditor } from "../new-editors/interop/PropertyRecordEditor.js";

/**
 * @beta
 */
interface PropertyFilterBuilderRuleValueBaseProps {
  /** Currently entered value. */
  value?: PropertyValue;
  /** Property used in rule to which this value will be compared to. */
  property: PropertyDescription;
  /** Callback that is invoked when value changes. */
  onChange: (value: PropertyValue) => void;
}

/**
 * @beta
 */
interface PropertyFilterBuilderRuleValueLegacyProps
  extends PropertyFilterBuilderRuleValueBaseProps {
  /**
   * Specifies which editors system should be used: legacy or the new one.
   * @default "legacy"
   * @beta
   * @deprecated in 5.29. Legacy editors system is deprecated. Use `editorSystem: "new"`.
   */
  editorSystem?: "legacy";
}

/**
 * @beta
 */
interface PropertyFilterBuilderRuleValueNewProps
  extends PropertyFilterBuilderRuleValueBaseProps {
  /**
   * Specifies which editors system should be used: legacy or the new one.
   * @default "legacy"
   * @beta
   */
  editorSystem: "new";
}

/**
 * Props for [[PropertyFilterBuilderRuleValue]] component.
 * @beta
 */
export type PropertyFilterBuilderRuleValueProps =
  | PropertyFilterBuilderRuleValueLegacyProps
  | PropertyFilterBuilderRuleValueNewProps;

/**
 * Props for custom [[PropertyFilterBuilderRuleValue]] renderer.
 * @beta
 */
export type PropertyFilterBuilderRuleValueRendererProps =
  PropertyFilterBuilderRuleValueProps & {
    /** Current operator. */
    operator: PropertyFilterBuilderRuleOperator;
  };

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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  editorSystem,
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
    <PropertyRecordEditor
      propertyRecord={propertyRecord}
      onCancel={() => {}}
      onCommit={onValueChange}
      size="small"
      editorSystem={editorSystem}
    />
  );
}

function FilterBuilderRuleRangeValueRenderer({
  property,
  value,
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  editorSystem,
}: PropertyFilterBuilderRuleValueProps) {
  const { translate } = useTranslation();
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
        <PropertyRecordEditor
          propertyRecord={from}
          onCancel={() => {}}
          onCommit={handleFromValue}
          editorSystem={editorSystem}
        />
      </Flex.Item>
      <Text>{translate("filterBuilder.operators.and").toLowerCase()}</Text>
      <Flex.Item>
        <PropertyRecordEditor
          propertyRecord={to}
          onCancel={() => {}}
          onCommit={handleToValue}
          editorSystem={editorSystem}
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
