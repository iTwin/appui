/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import * as React from "react";
import type { PropertyDescription, PropertyValue } from "@itwin/appui-abstract";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "../editors/EditorContainer";
import { EditorContainer } from "../editors/EditorContainer";
import type { FilterRuleOperator } from "./Operators";

/**
 * Props for [[FilterBuilderRuleValue]] component.
 * @beta
 */
export interface FilterBuilderRuleValueProps {
  /** Currently entered value. */
  value?: PropertyValue;
  /** Property used in rule to which this value will be compared to. */
  property: PropertyDescription;
  /** Callback that is invoked when value changes. */
  onChange: (value: PropertyValue) => void;
  /** Determines size to render the component */
  size?: "small" | "large";
}

/**
 * Props for custom [[FilterBuilderRuleValue]] renderer.
 * @beta
 */
export interface FilterBuilderRuleValueRendererProps
  extends FilterBuilderRuleValueProps {
  /** Current operator. */
  operator: FilterRuleOperator;
}

/**
 * Component that renders [[FilterBuilderRuleRenderer]] value input.
 * @beta
 */
export function FilterBuilderRuleValue(props: FilterBuilderRuleValueProps) {
  const { value, property, onChange, size } = props;

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
      size={size}
    />
  );
}
