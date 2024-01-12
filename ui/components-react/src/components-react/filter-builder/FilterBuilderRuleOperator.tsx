/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { Select } from "@itwin/itwinui-react";
import type { PropertyFilterRuleOperator } from "./Operators";
import {
  getPropertyFilterOperatorLabel,
  getPropertyFilterOperators,
} from "./Operators";
import { getiTwinUISize } from "../common/iuiUtils";

/**
 * Props for [[PropertyFilterBuilderRuleOperator]] component.
 * @beta
 */
export interface PropertyFilterBuilderRuleOperatorProps {
  /** Currently selected operator. */
  operator?: PropertyFilterRuleOperator;
  /** Property used in rule for which this operator will be used. */
  property: PropertyDescription;
  /** Callback that is invoked when selected operator changes. */
  onChange: (operator: PropertyFilterRuleOperator) => void;
  /** Size to render the component. If undefined, defaults to iTwinUI "small" size. */
  size?: "medium" | "large";
}

/**
 * Component that renders [[PropertyFilterBuilderRuleRenderer]] operator selector.
 * @internal
 */
export function PropertyFilterBuilderRuleOperator(
  props: PropertyFilterBuilderRuleOperatorProps
) {
  const { operator, property, onChange, size } = props;

  const availableOperators = React.useMemo(
    () => getPropertyFilterOperators(property),
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
        label: getPropertyFilterOperatorLabel(op),
      })),
    [availableOperators]
  );

  return (
    <div className="fb-row-condition">
      <Select
        options={availableOptions}
        value={selectedOperator}
        onChange={onChange}
        size={getiTwinUISize(size)}
      />
    </div>
  );
}
