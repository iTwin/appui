import type { FormatProps } from "@itwin/core-quantity";
import React from "react";
import classnames from "classnames";
import { useTranslation } from "../../useTranslation.js";
import { SvgHelpCircularHollow } from "@itwin/itwinui-icons-react";
import { Checkbox, IconButton } from "@itwin/itwinui-react";
import { AzimuthBaseInput } from "./AzimuthBaseInput.js";

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

  return (
    <>
      <span
        className={classnames("uicore-label", disabled && "uicore-disabled")}
      >
        {translate("QuantityFormat.labels.azimuthCounterClockwise")}
        <IconButton
          size="small"
          styleType="borderless"
          label={translate("QuantityFormat.azimuthType.ccwFlagTooltip")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </span>

      <Checkbox
        data-testid="azimuth-counter-clockwise-checkbox"
        checked={formatProps.azimuthCounterClockwise ?? false}
        onChange={handleAzimuthCCWChange}
        disabled={disabled}
      />

      <span
        className={classnames("uicore-label", disabled && "uicore-disabled")}
      >
        {translate("QuantityFormat.labels.azimuthBase")}
        <IconButton
          size="small"
          styleType="borderless"
          label={translate("QuantityFormat.azimuthType.baseTooltip")}
        >
          <SvgHelpCircularHollow />
        </IconButton>
      </span>
      <AzimuthBaseInput
        value={
          formatProps.azimuthBase !== undefined ? formatProps.azimuthBase : 0.0
        }
        disabled={disabled}
        onChange={handleAzimuthBaseChange}
      />
    </>
  );
}
