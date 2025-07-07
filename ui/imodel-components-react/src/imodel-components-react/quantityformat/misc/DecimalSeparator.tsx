/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import { useTranslation } from "../../useTranslation.js";

/** Properties of [[DecimalSeparatorSelector]] component.
 * @internal
 */
export interface DecimalSeparatorSelectorProps {
  separator: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

/** Component use to set Decimal Separator
 * @internal
 */
export function DecimalSeparatorSelector(props: DecimalSeparatorSelectorProps) {
  const { separator, onChange, disabled } = props;
  const { translate } = useTranslation();
  const options: SelectOption<string>[] = [
    {
      value: ".",
      label: translate("QuantityFormat.decimal_separator.point"),
    },
    {
      value: ",",
      label: translate("QuantityFormat.decimal_separator.comma"),
    },
  ];

  const handleOnChange = React.useCallback(
    (newValue: string) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );

  return (
    <Select
      options={options}
      value={separator}
      onChange={handleOnChange}
      size="small"
      disabled={disabled}
    />
  );
}
