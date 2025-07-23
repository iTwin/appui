/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { ScientificType } from "@itwin/core-quantity";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import { useTranslation } from "../../useTranslation.js";

/** Properties of [[ScientificTypeSelector]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ScientificTypeSelectorProps extends CommonProps {
  type: ScientificType;
  onChange: (value: ScientificType) => void;
  disabled?: boolean;
  id?: string;
}

/** Component use to set Scientific type.
 * @internal
 */
export function ScientificTypeSelector(props: ScientificTypeSelectorProps) {
  const { type, onChange, disabled, id, ...rest } = props;
  const { translate } = useTranslation();
  const formatOptions: SelectOption<ScientificType>[] = [
    {
      value: ScientificType.Normalized,
      label: translate("QuantityFormat.scientific-type.normalized"),
    },
    {
      value: ScientificType.ZeroNormalized,
      label: translate("QuantityFormat.scientific-type.zero-normalized"),
    },
  ];

  const handleOnChange = React.useCallback(
    (newValue: ScientificType) => {
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
      id={id}
      {...rest}
    />
  );
}
