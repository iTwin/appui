/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { FormatProps } from "@itwin/core-quantity";
import type { UnitsProvider } from "@itwin/core-quantity";
import { FormatPanelV2 } from "./FormatPanelV2.js";

/** Props for QuantityFormatPanelV2 */
export interface QuantityFormatPanelV2Props {
  formatDefinition: FormatProps;
  unitsProvider: UnitsProvider;
  onFormatChange: (formatProps: FormatProps) => void;
  initialMagnitude?: number;
}

/** Quantity Format Panel V2 that uses the new V2FormatPanel structure */
export function QuantityFormatPanelV2(props: QuantityFormatPanelV2Props) {
  const { formatDefinition, unitsProvider, onFormatChange } = props;

  const handleOnFormatChanged = React.useCallback(
    async (newProps: FormatProps) => {
      onFormatChange && onFormatChange(newProps);
    },
    [onFormatChange]
  );

  return (
    <div className="components-quantityFormat-quantityPanel">
      <FormatPanelV2
        formatProps={formatDefinition}
        unitsProvider={unitsProvider}
        onFormatChange={handleOnFormatChanged}
      />
    </div>
  );
}
