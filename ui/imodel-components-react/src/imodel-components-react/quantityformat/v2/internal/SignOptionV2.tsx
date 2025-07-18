/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { FormatProps } from "@itwin/core-quantity";
import { parseShowSignOption, type ShowSignOption } from "@itwin/core-quantity";
import { SignOptionSelector } from "../../misc/SignOption.js";
import { useTranslation } from "../../../useTranslation.js";
import { IconButton, Label } from "@itwin/itwinui-react";
import { SvgHelpCircularHollow } from "@itwin/itwinui-icons-react";
import "../FormatPanelV2.scss";

/** Properties of [[SignOptionV2]] component.
 * @alpha
 * @internal
 */
export interface SignOptionV2Props {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
  disabled?: boolean;
}

/** Component to show/edit Show Sign Option.
 * @alpha
 * @internal
 */
export function SignOptionV2(props: SignOptionV2Props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const showSignOptionId = React.useId();

  const showSignOption = React.useMemo(
    () =>
      parseShowSignOption(
        formatProps.showSignOption ?? "onlyNegative",
        "format"
      ),
    [formatProps.showSignOption]
  );

  const handleShowSignOptionChange = React.useCallback(
    (value: ShowSignOption) => {
      const newFormatProps = { ...formatProps, showSignOption: value };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );

  return (
    <div className="format-inline-row">
      <Label
        className={"uicore-label"}
        as="div"
        displayStyle="inline"
        id={showSignOptionId}
      >
        {translate("QuantityFormat.labels.signOptionLabel")}
        <IconButton
          className="format-help-tooltip"
          styleType="borderless"
          size="small"
          label={translate("QuantityFormat.labels.signOptionTooltip")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </Label>
      <SignOptionSelector
        aria-labelledby={showSignOptionId}
        signOption={showSignOption}
        disabled={disabled}
        onChange={handleShowSignOptionChange}
      />
    </div>
  );
}
