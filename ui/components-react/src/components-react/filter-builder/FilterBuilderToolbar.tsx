/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import cx from "classnames";
import { Flex, type FlexProps, IconButton } from "@itwin/itwinui-react";
import { SvgAdd, SvgDelete } from "@itwin/itwinui-icons-react";

interface FilterBuilderToolbarProps {
  size?: "small" | "large";
  onAddChild?: () => void;
  onDelete?: () => void;
}

/** Toolbar displaying the "add" and "delete" row buttons in the filter builder
 * @beta
 */
export const FilterBuilderToolbar = (
  props: FlexProps & FilterBuilderToolbarProps
) => {
  const { className, size, onAddChild, onDelete, ...rest } = props;

  return (
    <Flex
      className={cx("fb-toolbar", className)}
      gap="0"
      justifyContent="flex-end"
      {...rest}
    >
      <IconButton
        size={size}
        data-testid="fb-add-rule-button"
        label="Add"
        styleType="borderless"
        onClick={() => onAddChild?.()}
      >
        <SvgAdd />
      </IconButton>
      <IconButton
        size={size}
        data-testid="fb-remove-rule-button"
        label="Delete"
        styleType="borderless"
        onClick={() => onDelete?.()}
      >
        <SvgDelete />
      </IconButton>
    </Flex>
  );
};
