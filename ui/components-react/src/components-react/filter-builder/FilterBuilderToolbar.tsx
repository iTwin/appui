/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */
import React from "react";
import { Flex, IconButton } from "@itwin/itwinui-react";
import { SvgAdd, SvgDelete } from "@itwin/itwinui-icons-react";
import { UiComponents } from "../UiComponents";
/**
 * Props for [[PropertyFilterBuilderToolbar]] component.
 * @internal
 */
interface PropertyFilterBuilderToolbarProps {
  /** Size to render the component. If undefined, defaults to iTwinUI "medium" size. */
  size?: "medium" | "large";
  /** Function to add child of current group. */
  onAddChild: () => void;
  /** Function to remove child from current group. */
  onDelete: () => void;
}

/** Toolbar displaying the "add" and "delete" row buttons in the filter builder
 * @beta
 */
export const PropertyFilterBuilderToolbar = (
  props: PropertyFilterBuilderToolbarProps
) => {
  const { size, onAddChild, onDelete } = props;

  return (
    <Flex
      className={"fb-toolbar fb-row-toolbar"}
      gap="0"
      justifyContent="flex-end"
    >
      <IconButton
        size={!size ? "small" : size === "medium" ? undefined : "large"}
        data-testid="fb-add-rule-button"
        label={UiComponents.translate("filterBuilder.add")}
        styleType="borderless"
        onClick={onAddChild}
      >
        <SvgAdd />
      </IconButton>
      <IconButton
        size={!size ? "small" : size === "medium" ? undefined : "large"}
        data-testid="fb-remove-rule-button"
        label={UiComponents.translate("filterBuilder.delete")}
        styleType="borderless"
        onClick={onDelete}
      >
        <SvgDelete />
      </IconButton>
    </Flex>
  );
};
