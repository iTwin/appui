/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import cx from "classnames";
import { Anchor } from "@itwin/itwinui-react";
import "./FilterBuilderLogicalOperator.scss";
import { UiComponents } from "../UiComponents";

type Operator = "And" | "Or";

interface PropertyFilterBuilderLogicalOperatorProps {
  size?: "small" | "large";
  isLinkDisabled?: boolean;
  operator?: Operator;
  onOperatorChange?: (operator: Operator) => void;
}

/** Component to render the operator inside of the filter builder
 * @beta
 */
export const PropertyFilterBuilderLogicalOperator = (
  props: Omit<React.HTMLProps<HTMLDivElement>, "size"> &
    PropertyFilterBuilderLogicalOperatorProps
) => {
  const {
    className,
    size,
    isLinkDisabled,
    operator,
    onOperatorChange,
    ...rest
  } = props;

  const toggle = () => (operator === "And" ? "Or" : "And");

  return (
    <div
      className={cx("fb-logical-operator", className)}
      data-iui-size={size}
      {...rest}
    >
      {undefined === operator ? (
        <span>{UiComponents.translate("PropertyFilterBuilder.group")}</span>
      ) : isLinkDisabled ? (
        <span>{operator}</span>
      ) : (
        <Anchor onClick={() => onOperatorChange?.(toggle())}>{operator}</Anchor>
      )}
    </div>
  );
};
