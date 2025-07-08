/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import { Input } from "@itwin/itwinui-react";
import React from "react";

/** Component used to enter a numeric Azimuth base value.
 */
export function AzimuthBaseInput(props: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  const { value, onChange, disabled } = props;

  /** Disable commas and letters */
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    if (event.key === "," || isLetter) {
      event.preventDefault();
    }
  };

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value);
      if (isNaN(numValue) || numValue === undefined) {
        e.preventDefault();
        return;
      }
      onChange && onChange(numValue);
    },
    [onChange],
  );

  return (
    <Input
      data-testid="azimuth-base-input"
      type="number"
      value={value.toString()}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      size="small"
      disabled={disabled} />
  );
}
