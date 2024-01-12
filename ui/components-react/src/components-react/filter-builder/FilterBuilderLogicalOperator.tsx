/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */
import React from "react";
import cx from "classnames";
import { Anchor } from "@itwin/itwinui-react";
import "./FilterBuilderLogicalOperator.scss";
import { UiComponents } from "../UiComponents";
import { PropertyFilterRuleGroupOperator } from "./Operators";

/**
 * Props for [[PropertyFilterBuilderLogicalOperator]] component.
 * @beta
 */
export interface PropertyFilterBuilderLogicalOperatorProps {
  /** Size to render the component. If undefined, defaults to iTwinUI "small" size. */
  size?: "medium" | "large";
  /** Allows toggling of operator by clicking operator text. */
  isDisabled?: boolean;
  /** Operator to combine FilterBuilderRules. Must be either "And" or "Or". */
  operator: PropertyFilterRuleGroupOperator;
  /** Callback that is invoked when operator changes. */
  onOperatorChange: (operator: PropertyFilterRuleGroupOperator) => void;
  /** Classname to specify CSS styling */
  className?: string;
}

/** Component to render the operator inside of the filter builder
 * @beta
 */
export const PropertyFilterBuilderLogicalOperator = (
  props: PropertyFilterBuilderLogicalOperatorProps
) => {
  const { size, isDisabled, operator, onOperatorChange, className } = props;

  const toggle = () =>
    operator === PropertyFilterRuleGroupOperator.And
      ? PropertyFilterRuleGroupOperator.Or
      : PropertyFilterRuleGroupOperator.And;

  const operatorDisplayText =
    operator === PropertyFilterRuleGroupOperator.And
      ? UiComponents.translate("filterBuilder.operators.and")
      : UiComponents.translate("filterBuilder.operators.or");

  const sizeClass = size === "large" ? "fb-logical-operator-large" : "";

  return (
    <div className={cx("fb-logical-operator", className, sizeClass)}>
      {isDisabled ? (
        <span>{operatorDisplayText}</span>
      ) : (
        <Anchor onClick={() => onOperatorChange(toggle())}>
          {operatorDisplayText}
        </Anchor>
      )}
    </div>
  );
};
