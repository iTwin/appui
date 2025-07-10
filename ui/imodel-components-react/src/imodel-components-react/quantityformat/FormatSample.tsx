/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import type { FormatterSpec } from "@itwin/core-quantity";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { Input } from "@itwin/itwinui-react";
import { SvgProgressForward } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../useTranslation.js";

/** Properties of [[FormatSample]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FormatSample>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FormatSampleProps extends CommonProps {
  formatSpec?: FormatterSpec;
  initialMagnitude?: number;
  hideLabels?: boolean;
}

/** Component to show the persistence value and formatted value given a FormatterSpec.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FormatSample(props: FormatSampleProps) {
  const { initialMagnitude, formatSpec, hideLabels } = props;
  const { translate } = useTranslation();
  const initialValue = initialMagnitude ?? 0;
  const [magnitude, setMagnitude] = React.useState(initialValue);
  const [sampleValue, setSampleValue] = React.useState(initialValue.toString());

  React.useEffect(() => {
    const value = initialMagnitude ?? 0;
    setMagnitude(value);
    setSampleValue(value.toString());
  }, [initialMagnitude]);

  const handleOnValueBlur = React.useCallback(() => {
    let newValue = Number.parseFloat(sampleValue);
    if (Number.isNaN(newValue)) newValue = 0;
    setMagnitude(newValue);
    setSampleValue(newValue.toString());
  }, [sampleValue]);

  const handleOnValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSampleValue(event.target.value);
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === Key.Enter.valueOf()) {
        let newValue = Number.parseFloat(sampleValue);
        if (Number.isNaN(newValue)) newValue = 0;
        setMagnitude(newValue);
        setSampleValue(newValue.toString());
        e.preventDefault();
      }
    },
    [sampleValue]
  );

  const activePersistenceUnitLabel = formatSpec
    ? formatSpec.persistenceUnit.label
    : "";
  const formattedValue = formatSpec
    ? formatSpec.applyFormatting(magnitude)
    : "";

  return (
    <>
      {!hideLabels && (
        <span className={"uicore-label"}>
          {translate("QuantityFormat.labels.value")}
        </span>
      )}
      <span className="components-inline">
        <Input
          data-testid="format-sample-input"
          className="components-quantity-persistence-input"
          value={sampleValue}
          onChange={handleOnValueChange}
          onKeyDown={handleKeyDown}
          onBlur={handleOnValueBlur}
          size="small"
        />
        {activePersistenceUnitLabel}
      </span>
      {!hideLabels && (
        <span className={"uicore-label"}>
          {translate("QuantityFormat.labels.formatted")}
        </span>
      )}
      <span data-testid="progress-forward">
        {hideLabels && formattedValue.length > 0 && (
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          <Icon iconSpec={<SvgProgressForward />} />
        )}
        <span
          data-testid="format-sample-formatted"
          className={"uicore-label components-quantity-formatted-sample"}
        >
          {formattedValue}
        </span>
      </span>
    </>
  );
}
