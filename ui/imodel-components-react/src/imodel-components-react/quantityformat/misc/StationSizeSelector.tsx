/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import { useTranslation } from "../../useTranslation.js";

/** Properties of [[StationSizeSelector]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface StationSizeSelectorProps extends CommonProps {
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

/** Component use to set Station size (number of digits from right until '+').
 * @internal
 */
export function StationSizeSelector(props: StationSizeSelectorProps) {
  const { value, disabled, onChange, ...otherProps } = props;
  const { translate } = useTranslation();
  const separatorOptions: SelectOption<number>[] = [
    {
      value: 2,
      label: translate("QuantityFormat.station_size.two"),
    },
    {
      value: 3,
      label: translate("QuantityFormat.station_size.three"),
    },
  ];

  const handleOnChange = React.useCallback(
    (newValue: number) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );

  return (
    <Select
      options={separatorOptions}
      disabled={disabled}
      value={value}
      onChange={handleOnChange}
      size="small"
      {...otherProps}
    />
  );
}
