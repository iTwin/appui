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

/**
 * Props for [[PropertyFilterBuilderLogicalOperator]] component.
 * @internal
 */
interface PropertyFilterBuilderLogicalOperatorProps {
  /** Size to render the component. If undefined, defaults to iTwinUI "medium" size. */
  size?: "small" | "large";
  /** Allows toggling of operator by clicking operator text. */
  isLinkDisabled?: boolean;
  /** Operator to combine FilterBuilderRules. Must be either "And" or "Or". */
  operator?: Operator;
  /** Callback that is invoked when operator changes. */
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
        <span>{UiComponents.translate("filterBuilder.group")}</span>
      ) : isLinkDisabled ? (
        <span>{operator}</span>
      ) : (
        <Anchor onClick={() => onOperatorChange?.(toggle())}>{operator}</Anchor>
      )}
    </div>
  );
};
