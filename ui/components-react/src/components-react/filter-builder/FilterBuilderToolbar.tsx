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
import { useTranslation } from "../l10n/useTranslation";
/**
 * Props for [[PropertyFilterBuilderToolbar]] component.
 * @internal
 */
interface PropertyFilterBuilderToolbarProps {
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
  const { onAddChild, onDelete } = props;
  const { translate } = useTranslation();

  return (
    <Flex className={"fb-toolbar fb-row-toolbar"}>
      <IconButton
        size={"small"}
        className="fb-add-rule-button"
        label={translate("filterBuilder.add")}
        onClick={onAddChild}
      >
        <SvgAdd />
      </IconButton>
      <IconButton
        size={"small"}
        className="fb-remove-rule-button"
        label={translate("filterBuilder.delete")}
        styleType="borderless"
        onClick={onDelete}
      >
        <SvgDelete />
      </IconButton>
    </Flex>
  );
};
