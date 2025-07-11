/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import { RatioType } from "@itwin/core-quantity";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import { useTranslation } from "../../useTranslation.js";

/** Component use to set Ratio type.
 * @alpha
 */
export function RatioTypeSelector(props: {
  type: RatioType;
  onChange: (value: RatioType) => void;
  disabled?: boolean;
  rest?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const { type, onChange, disabled, ...rest } = props;
  const { translate } = useTranslation();
  const formatOptions: SelectOption<RatioType>[] = [
    {
      value: RatioType.NToOne,
      label: translate("QuantityFormat.ratio-type.n-to-one.label"),
      sublabel: translate("QuantityFormat.ratio-type.n-to-one.description"),
    },
    {
      value: RatioType.OneToN,
      label: translate("QuantityFormat.ratio-type.one-to-n.label"),
      sublabel: translate("QuantityFormat.ratio-type.one-to-n.description"),
    },
    {
      value: RatioType.UseGreatestCommonDivisor,
      label: translate(
        "QuantityFormat.ratio-type.use-greatest-common-divisor.label"
      ),
      sublabel: translate(
        "QuantityFormat.ratio-type.use-greatest-common-divisor.description"
      ),
    },
    {
      value: RatioType.ValueBased,
      label: translate("QuantityFormat.ratio-type.value-based.label"),
      sublabel: translate("QuantityFormat.ratio-type.value-based.description"),
    },
  ];

  const handleOnChange = React.useCallback(
    (newValue: RatioType) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );

  return (
    <Select
      options={formatOptions}
      value={type}
      onChange={handleOnChange}
      size="small"
      disabled={disabled}
      {...rest}
    />
  );
}
