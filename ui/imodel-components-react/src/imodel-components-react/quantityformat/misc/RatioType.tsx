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

/** Properties of [[RatioTypeSelector]] component.
 * @internal
 */
export interface RatioTypeSelectorProps {
  type: RatioType;
  onChange: (value: RatioType) => void;
  disabled?: boolean;
}

/** Component use to set Ratio type.
 * @internal
 */
export interface RatioTypeSelectorProps {
  type: RatioType;
  onChange: (value: RatioType) => void;
  disabled?: boolean;
}

/** Component use to set Scientific type.
 * @internal
 */
export function RatioTypeSelector(props: {
  type: RatioType;
  onChange: (value: RatioType) => void;
  disabled?: boolean;
}) {
  const { type, onChange, disabled } = props;
  const { translate } = useTranslation();
  const formatOptions: SelectOption<RatioType>[] = [
    {
      value: RatioType.NToOne,
      label: translate("QuantityFormat.ratio-type.n-to-one.label"),
    },
    {
      value: RatioType.OneToN,
      label: translate("QuantityFormat.ratio-type.one-to-n.label"),
    },
    {
      value: RatioType.UseGreatestCommonDivisor,
      label: translate("QuantityFormat.ratio-type.use-greatest-common-divisor.label"),
    },
    {
      value: RatioType.ValueBased,
      label: translate("QuantityFormat.ratio-type.value-based.label"),
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
    />
  );
}
