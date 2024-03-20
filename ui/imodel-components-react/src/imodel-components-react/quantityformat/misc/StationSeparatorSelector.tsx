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
import { useTranslation } from "../../useTranslation";

/** Properties of [[StationSeparatorSelector]] component.
 * @internal
 */
export interface StationSeparatorSelectorProps extends CommonProps {
  separator: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

/** Component use to setStation separator.
 * @internal
 */
export function StationSeparatorSelector(props: StationSeparatorSelectorProps) {
  const { separator, disabled, onChange, ...otherProps } = props;
  const { translate } = useTranslation();

  const handleOnChange = React.useCallback(
    (newValue: string) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );

  const separatorOptions = React.useMemo(() => {
    const uomDefaultEntries: SelectOption<string>[] = [
      {
        value: "+",
        label: translate("QuantityFormat.station_separator.plus"),
      },
      {
        value: "-",
        label: translate("QuantityFormat.station_separator.minus"),
      },
      {
        value: " ",
        label: translate("QuantityFormat.station_separator.blank"),
      },
      {
        value: "^",
        label: translate("QuantityFormat.station_separator.caret"),
      },
    ];
    const completeListOfEntries: SelectOption<string>[] = [];
    // istanbul ignore next (only used if format already has a character that does not match standard options)
    if (
      undefined ===
      uomDefaultEntries.find((option) => option.value === separator)
    ) {
      completeListOfEntries.push({ value: separator, label: separator });
    }
    completeListOfEntries.push(...uomDefaultEntries);
    return completeListOfEntries;
  }, [separator, translate]);

  return (
    <Select
      options={separatorOptions}
      disabled={disabled}
      value={separator}
      onChange={handleOnChange}
      size="small"
      {...otherProps}
    />
  );
}
