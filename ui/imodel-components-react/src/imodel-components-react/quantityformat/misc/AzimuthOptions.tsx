/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */
import type { FormatProps } from "@itwin/core-quantity";
import React from "react";
import classnames from "classnames";
import { useTranslation } from "../../useTranslation.js";
import { SvgHelpCircularHollow } from "@itwin/itwinui-icons-react";
import { Checkbox, IconButton, Input, Label } from "@itwin/itwinui-react";

/**
 * Component used to customize Azimuth options of a Format.
 * @alpha
 */
export function AzimuthOptions(props: {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
  disabled: boolean;
}) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();

  const handleAzimuthBaseChange = React.useCallback(
    (value: number) => {
      const newFormatProps = { ...formatProps, azimuthBase: value };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );

  const handleAzimuthCCWChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormatProps = {
        ...formatProps,
        azimuthCounterClockwise: event.target.checked,
      };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );

  /** Disable commas and letters */
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    if (event.key === "," || isLetter) {
      event.preventDefault();
    }
  };

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value);
      if (isNaN(numValue)) {
        e.preventDefault();
        return;
      }
      handleAzimuthBaseChange(numValue);
    },
    [handleAzimuthBaseChange]
  );

  return (
    <>
      <Label
        className={classnames("uicore-label", disabled && "uicore-disabled")}
        id="azimuth-counter-clockwise"
        as="div"
        displayStyle="inline"
      >
        {translate("QuantityFormat.labels.azimuthCounterClockwise")}
        <IconButton
          size="small"
          styleType="borderless"
          label={translate("QuantityFormat.azimuthType.ccwFlagTooltip")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </Label>
      <Checkbox
        aria-labelledby="azimuth-counter-clockwise"
        checked={formatProps.azimuthCounterClockwise ?? false}
        onChange={handleAzimuthCCWChange}
        disabled={disabled}
      />

      <Label
        id="azimuth-base-input"
        className={classnames("uicore-label", disabled && "uicore-disabled")}
        as="div"
        displayStyle="inline"
      >
        {translate("QuantityFormat.labels.azimuthBase")}
        <IconButton
          size="small"
          styleType="borderless"
          label={translate("QuantityFormat.azimuthType.baseTooltip")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </Label>
      <Input
        aria-labelledby="azimuth-base-input"
        type="number"
        value={formatProps.azimuthBase?.toString() ?? "0"}
        onKeyDown={onKeyDown}
        onChange={handleInputChange}
        size="small"
        disabled={disabled}
      />
    </>
  );
}
