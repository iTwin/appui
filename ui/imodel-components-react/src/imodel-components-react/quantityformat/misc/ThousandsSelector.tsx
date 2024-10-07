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

/** Properties of [[ThousandsSelector]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface ThousandsSelectorProps extends CommonProps {
  separator: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

/** Component use to set Quantity Format thousand group separator.
 * @internal
 */
export function ThousandsSelector(props: ThousandsSelectorProps) {
  const { separator, ...otherProps } = props;
  const { translate } = useTranslation();

  const separatorOptions = React.useMemo(() => {
    const uomDefaultEntries: SelectOption<string>[] = [
      {
        value: ",",
        label: translate("QuantityFormat.thousand_separator.comma"),
      },
      {
        value: ".",
        label: translate("QuantityFormat.thousand_separator.point"),
      },
    ];
    const completeListOfEntries: SelectOption<string>[] = [];
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
      value={separator}
      size="small"
      {...otherProps}
    />
  );
}
