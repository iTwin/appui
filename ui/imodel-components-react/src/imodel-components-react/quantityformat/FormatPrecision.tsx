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
import { DecimalPrecisionSelector } from "./misc/DecimalPrecision";
import { FractionPrecisionSelector } from "./misc/FractionPrecision";
import { useTranslation } from "../useTranslation";

/** Properties of [[FormatPrecision]] component.
 * @alpha
 */
// eslint-disable-next-line deprecation/deprecation
export interface FormatPrecisionProps extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
}

/** Component to show/edit Quantity Format Precision.
 * @alpha
 */
export function FormatPrecision(props: FormatPrecisionProps) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();

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
      <span className={"uicore-label"}>
        {translate("QuantityFormat.labels.precision")}
      </span>
      {formatType === FormatType.Fractional ? (
        <FractionPrecisionSelector
          data-testid="fraction-precision-selector"
          precision={formatProps.precision ?? 0}
          onChange={handlePrecisionChange}
        />
      ) : (
        <DecimalPrecisionSelector
          data-testid="decimal-precision-selector"
          precision={formatProps.precision ?? 0}
          onChange={handlePrecisionChange}
        />
      )}
    </>
  );
}
