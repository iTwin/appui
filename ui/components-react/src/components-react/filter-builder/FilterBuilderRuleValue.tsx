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
import type { PropertyFilterRuleOperator } from "./Operators";

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
  /** Size to render the component. If undefined, defaults to iTwinUI "small" size. */
  size?: "medium" | "large";
}

/**
 * Props for custom [[PropertyFilterBuilderRuleValue]] renderer.
 * @beta
 */
export interface PropertyFilterBuilderRuleValueRendererProps
  extends PropertyFilterBuilderRuleValueProps {
  /** Current operator. */
  operator: PropertyFilterRuleOperator;
}

/**
 * Component that renders [[PropertyFilterBuilderRuleRenderer]] value input.
 * @beta
 */
export function PropertyFilterBuilderRuleValue(
  props: PropertyFilterBuilderRuleValueProps
) {
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
