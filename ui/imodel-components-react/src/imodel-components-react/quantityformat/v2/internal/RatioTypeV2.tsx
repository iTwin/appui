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
import { parseRatioType, RatioType } from "@itwin/core-quantity";
import { IconButton, Label } from "@itwin/itwinui-react";
import { SvgHelpCircularHollow } from "@itwin/itwinui-icons-react";
import { RatioTypeSelector } from "../../misc/RatioType.js";
import { useTranslation } from "../../../useTranslation.js";
import "../FormatPanelV2.scss";

/** Properties of [[RatioTypeV2]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface RatioTypeV2Props extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
  disabled?: boolean;
}

/** Component to show/edit ratio type.
 * @internal
 */
export function RatioTypeV2(props: RatioTypeV2Props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();

  const ratioTypeSelectorId = React.useId();

  const handleSetFormatProps = React.useCallback(
    (newProps: FormatProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );

  const handleRatioTypeChange = React.useCallback(
    (type: RatioType) => {
      const newFormatProps = {
        ...formatProps,
        ratioType: type,
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const currentType = React.useMemo(() => {
    return formatProps.ratioType && formatProps.ratioType.length > 0
      ? parseRatioType(formatProps.ratioType, "custom")
      : RatioType.NToOne;
  }, [formatProps.ratioType]);

  return (
    <div className="icr-quantityFormat-v2-formatInlineRow">
      <Label
        className="uicore-label"
        displayStyle="inline"
        htmlFor={ratioTypeSelectorId}
      >
        {translate("QuantityFormat.labels.ratioTypeLabel")}
        <IconButton
          className="icr-quantityFormat-v2-formatHelpTooltip"
          styleType="borderless"
          size="small"
          label={translate("QuantityFormat.ratio-type.default.description")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </Label>
      <RatioTypeSelector
        type={currentType}
        disabled={disabled}
        onChange={handleRatioTypeChange}
        rest={{ id: ratioTypeSelectorId }}
      />
    </div>
  );
}
