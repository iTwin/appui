/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import * as React from "react";
import { type PropertyDescription } from "@itwin/appui-abstract";
import { Select } from "@itwin/itwinui-react";
import type { PropertyFilterBuilderRuleOperator } from "./Operators";
import { getPropertyFilterBuilderOperators } from "./Operators";
import { useTranslation } from "../l10n/useTranslation";

/**
 * Props for [[PropertyFilterBuilderRuleOperator]] component.
 * @beta
 */
export interface PropertyFilterBuilderRuleOperatorProps {
  /** Currently selected operator. */
  operator?: PropertyFilterBuilderRuleOperator;
  /** Property used in rule for which this operator will be used. */
  property: PropertyDescription;
  /** Callback that is invoked when selected operator changes. */
  onChange: (operator: PropertyFilterBuilderRuleOperator) => void;
}

/**
 * Component that renders [[PropertyFilterBuilderRuleRenderer]] operator selector.
 * @internal
 */
export function PropertyFilterBuilderRuleOperatorRenderer(
  props: PropertyFilterBuilderRuleOperatorProps
) {
  const { operator, property, onChange } = props;
  const getLabel = usePropertyFilterBuilderOperatorLabels();
  const availableOperators = React.useMemo(
    () => getPropertyFilterBuilderOperators(property),
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
        label: getLabel(op),
      })),
    [availableOperators, getLabel]
  );

  return (
    <div className="fb-row-condition">
      <Select
        options={availableOptions}
        value={selectedOperator}
        onChange={onChange}
        size={"small"}
      />
    </div>
  );
}

/**
 * Function that returns display label for [[PropertyFilterBuilderRuleOperator]].
 * @beta
 */
function usePropertyFilterBuilderOperatorLabels() {
  const { translate } = useTranslation();

  return React.useCallback(
    (operator: PropertyFilterBuilderRuleOperator) => {
      switch (operator) {
        case "is-true":
          return translate("filterBuilder.operators.isTrue");
        case "is-false":
          return translate("filterBuilder.operators.isFalse");
        case "is-equal":
          return translate("filterBuilder.operators.equal");
        case "is-not-equal":
          return translate("filterBuilder.operators.notEqual");
        case "greater":
          return ">";
        case "greater-or-equal":
          return ">=";
        case "less":
          return "<";
        case "less-or-equal":
          return "<=";
        case "like":
          return translate("filterBuilder.operators.contains");
        case "is-null":
          return translate("filterBuilder.operators.isNull");
        case "is-not-null":
          return translate("filterBuilder.operators.isNotNull");
        case "between":
          return translate("filterBuilder.operators.between");
        case "not-between":
          return translate("filterBuilder.operators.notBetween");
      }
    },
    [translate]
  );
}
