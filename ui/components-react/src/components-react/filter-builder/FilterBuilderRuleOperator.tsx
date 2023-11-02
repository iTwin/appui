/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import * as React from "react";
import "./FilterBuilderCondition.scss";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { Select } from "@itwin/itwinui-react";
import type { FilterRuleOperator } from "./Operators";
import { getFilterOperatorLabel, getFilterOperators } from "./Operators";

/**
 * Props for [[FilterBuilderRuleOperator]] component.
 * @beta
 */
export interface FilterBuilderRuleOperatorProps {
  /** Currently selected operator. */
  operator?: FilterRuleOperator;
  /** Property used in rule for which this operator will be used. */
  property: PropertyDescription;
  /** Callback that is invoked when selected operator changes. */
  onChange: (operator: FilterRuleOperator) => void;
  /** Size to render the component */
  size?: "small" | "large";
}

/**
 * Component that renders [[FilterBuilderRuleRenderer]] operator selector.
 * @internal
 */
export function FilterBuilderRuleOperator(
  props: FilterBuilderRuleOperatorProps
) {
  const { operator, property, onChange, size } = props;

  const availableOperators = React.useMemo(
    () => getFilterOperators(property),
    [property]
  );
  const selectedOperator =
    availableOperators.find((op) => op === operator) ?? availableOperators[0];

  React.useEffect(() => {
    onChange(selectedOperator);
  }, [onChange, selectedOperator]);

  const availableOptions = React.useMemo(
    () =>
      availableOperators.map((op) => ({
        value: op,
        label: getFilterOperatorLabel(op),
      })),
    [availableOperators]
  );

  return (
    <div className="fb-condition fb-row-condition">
      <Select
        options={availableOptions}
        value={selectedOperator}
        onChange={onChange}
        size={size}
      />
    </div>
  );
}
