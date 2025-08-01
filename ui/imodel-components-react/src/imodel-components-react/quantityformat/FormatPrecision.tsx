/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { FormatProps } from "@itwin/core-quantity";
import { FormatType, parseFormatType } from "@itwin/core-quantity";
import { DecimalPrecisionSelector } from "./misc/DecimalPrecision.js";
import { FractionPrecisionSelector } from "./misc/FractionPrecision.js";
import { useTranslation } from "../useTranslation.js";
import { Label } from "@itwin/itwinui-react";

/** Properties of [[FormatPrecision]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FormatPrecision>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FormatPrecisionProps extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
}

/** Component to show/edit Quantity Format Precision.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FormatPrecision(props: FormatPrecisionProps) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const precisionSelectorId = React.useId();
  const handlePrecisionChange = React.useCallback(
    (precision: number) => {
      const newFormatProps = { ...formatProps, precision };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );

  const formatType = parseFormatType(formatProps.type, "format");

  return (
    <>
      <Label
        className={"uicore-label"}
        as="div"
        displayStyle="inline"
        id={precisionSelectorId}
      >
        {translate("QuantityFormat.labels.precision")}
      </Label>
      {formatType === FormatType.Fractional ? (
        <FractionPrecisionSelector
          aria-labelledby={precisionSelectorId}
          precision={formatProps.precision ?? 0}
          onChange={handlePrecisionChange}
        />
      ) : (
        <DecimalPrecisionSelector
          aria-labelledby={precisionSelectorId}
          precision={formatProps.precision ?? 0}
          onChange={handlePrecisionChange}
        />
      )}
    </>
  );
}
