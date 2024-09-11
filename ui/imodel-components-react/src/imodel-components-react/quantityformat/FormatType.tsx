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
import {
  DecimalPrecision,
  FormatType,
  formatTypeToString,
  FractionalPrecision,
  parseFormatType,
  ScientificType,
  scientificTypeToString,
} from "@itwin/core-quantity";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import { useTranslation } from "../useTranslation";

/** Properties of [[FormatTypeSelector]] component.
 * @alpha
 */
// eslint-disable-next-line deprecation/deprecation
interface FormatTypeSelectorProps extends CommonProps {
  type: FormatType;
  onChange: (value: FormatType) => void;
}

/** Component to select the format type.
 * @alpha
 */
function FormatTypeSelector(props: FormatTypeSelectorProps) {
  const { type, onChange, ...otherProps } = props;
  const { translate } = useTranslation();
  const formatOptions = React.useRef<SelectOption<FormatType>[]>([
    {
      value: FormatType.Decimal,
      label: translate("QuantityFormat.decimal"),
    },
    {
      value: FormatType.Scientific,
      label: translate("QuantityFormat.scientific"),
    },
    {
      value: FormatType.Station,
      label: translate("QuantityFormat.station"),
    },
    {
      value: FormatType.Fractional,
      label: translate("QuantityFormat.fractional"),
    },
  ]);

  const handleOnChange = React.useCallback(
    (newValue: FormatType) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );

  return (
    <Select
      options={formatOptions.current}
      value={type}
      onChange={handleOnChange}
      size="small"
      {...otherProps}
    />
  );
}

/** Properties of [[FormatTypeOption]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FormatTypeOption>`
 */
// eslint-disable-next-line deprecation/deprecation
export interface FormatTypeOptionProps extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
}

/** Component to set the Quantity Format type.
 * @alpha
 */
// eslint-disable-next-line deprecation/deprecation
export function FormatTypeOption(props: FormatTypeOptionProps) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const handleFormatTypeChange = React.useCallback(
    (newType: FormatType) => {
      const type = formatTypeToString(newType);
      let precision: number | undefined;
      let stationOffsetSize: number | undefined;
      let scientificType: string | undefined;
      switch (
        newType // type must be decimal, fractional, scientific, or station
      ) {
        case FormatType.Scientific:
          precision = DecimalPrecision.Six;
          scientificType = scientificTypeToString(ScientificType.Normalized);
          break;
        case FormatType.Decimal:
          precision = DecimalPrecision.Four;
          break;
        case FormatType.Station:
          precision = DecimalPrecision.Two;
          stationOffsetSize = formatProps.composite?.units[0].name
            .toLocaleLowerCase()
            .endsWith("m")
            ? 3
            : 2;
          break;
        case FormatType.Fractional:
          precision = FractionalPrecision.Eight;
          break;
      }
      const newFormatProps = {
        ...formatProps,
        type,
        precision,
        scientificType,
        stationOffsetSize,
      };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );

  const formatType = parseFormatType(formatProps.type, "format");
  return (
    <>
      <span className={"uicore-label.current"}>
        {translate("QuantityFormat.labels.type")}
      </span>
      <FormatTypeSelector
        data-testid="format-type-selector"
        type={formatType}
        onChange={handleFormatTypeChange}
      />
    </>
  );
}
