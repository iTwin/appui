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

/** Properties of [[FractionPrecisionSelector]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface FractionPrecisionSelectorProps extends CommonProps {
  precision: number;
  onChange: (value: number) => void;
}

/** Component use to set Fraction precision
 * @internal
 */
export function FractionPrecisionSelector(
  props: FractionPrecisionSelectorProps
) {
  const { precision, onChange, ...otherProps } = props;
  const { translate } = useTranslation();
  const options: SelectOption<number>[] = [
    {
      value: 1,
      label: translate("QuantityFormat.fraction_precision.whole"),
    },
    {
      value: 2,
      label: translate("QuantityFormat.fraction_precision.half"),
    },
    {
      value: 4,
      label: translate("QuantityFormat.fraction_precision.quarter"),
    },
    {
      value: 8,
      label: translate("QuantityFormat.fraction_precision.eighth"),
    },
    {
      value: 16,
      label: translate("QuantityFormat.fraction_precision.sixteenth"),
    },
    {
      value: 32,
      label: translate("QuantityFormat.fraction_precision.over32"),
    },
    {
      value: 64,
      label: translate("QuantityFormat.fraction_precision.over64"),
    },
    {
      value: 128,
      label: translate("QuantityFormat.fraction_precision.over128"),
    },
    {
      value: 256,
      label: translate("QuantityFormat.fraction_precision.over256"),
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
      options={options}
      value={precision}
      onChange={handleOnChange}
      size="small"
      {...otherProps}
    />
  );
}
