/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { FormatProps } from "@itwin/core-quantity";
import { parseScientificType, ScientificType } from "@itwin/core-quantity";
import { IconButton, Label } from "@itwin/itwinui-react";
import { SvgHelpCircularHollow } from "@itwin/itwinui-icons-react";
import { ScientificTypeSelector } from "../../misc/ScientificType.js";
import { useTranslation } from "../../../useTranslation.js";
import "../FormatPanelV2.scss";

/** Properties of [[ScientificTypeV2]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ScientificTypeV2Props extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
  disabled?: boolean;
}

/** Component to show/edit scientific type.
 * @internal
 */
export function ScientificTypeV2(props: ScientificTypeV2Props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();

  const scientificTypeSelectorId = React.useId();

  const handleSetFormatProps = React.useCallback(
    (newProps: FormatProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );

  const handleScientificTypeChange = React.useCallback(
    (type: ScientificType) => {
      const newFormatProps = {
        ...formatProps,
        scientificType: type,
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const currentType = React.useMemo(() => {
    return formatProps.scientificType && formatProps.scientificType.length > 0
      ? parseScientificType(formatProps.scientificType, "custom")
      : ScientificType.Normalized;
  }, [formatProps.scientificType]);

  return (
    <div className="icr-quantityFormat-v2-formatInlineRow">
      <Label displayStyle="inline" htmlFor={scientificTypeSelectorId}>
        {translate("QuantityFormat.labels.scientificTypeLabel")}
        <IconButton
          className="icr-quantityFormat-v2-formatHelpTooltip"
          styleType="borderless"
          size="small"
          label={translate("QuantityFormat.labels.scientificTypeTooltip")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </Label>
      <ScientificTypeSelector
        type={currentType}
        disabled={disabled}
        onChange={handleScientificTypeChange}
        id={scientificTypeSelectorId}
      />
    </div>
  );
}
