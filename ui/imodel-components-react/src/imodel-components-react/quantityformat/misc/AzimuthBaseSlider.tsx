/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import { Slider } from "@itwin/itwinui-react";
import React from "react";

/** Component used to set Azimuth base.
 */
export function AzimuthBaseSlider(props: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  const { value, onChange, disabled } = props;

  const handleOnChange = React.useCallback(
    (values: readonly number[]) => {
      const newValue = values[0];
      if (newValue !== value)
        onChange && onChange(newValue);
    },
    [onChange, value]
  );

  return (
    <Slider min={0} max={360} values={[value]} step={1} onChange={handleOnChange} disabled={disabled} />
  );
}
