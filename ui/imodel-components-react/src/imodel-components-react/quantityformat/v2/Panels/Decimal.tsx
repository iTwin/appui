/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { FormatProps, UnitProps } from "@itwin/core-quantity";
import type { UnitsProvider } from "@itwin/core-quantity";
import { FormatUnits } from "../../FormatUnits.js";

/** Common props for all format panel components */
export interface PanelProps {
  formatProps: FormatProps;
  unitsProvider: UnitsProvider;
  onFormatChange: (formatProps: FormatProps) => void;
  persistenceUnit?: UnitProps;
}

/** Primary children component for decimal format */
export function DecimalPrimaryChildren(props: PanelProps): React.ReactElement {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;

  return (
    <div className="decimal-primary-children">
      <FormatUnits
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
        initialFormat={formatProps}
        onUnitsChange={onFormatChange}
      />
      {/* Add precision, rounding, etc. controls here */}
    </div>
  );
}

/** Returns the primary children for decimal format*/
export function getDecimalPrimaryChildren(props: PanelProps): React.ReactNode {
  return <DecimalPrimaryChildren {...props} />;
}

/** Returns the secondary children for decimal format */
export function getDecimalSecondaryChildren(
  props: PanelProps
): React.ReactNode {
  const { formatProps: _formatProps, onFormatChange: _onFormatChange } = props;

  return (
    <div className="decimal-secondary-children">
      <div>Decimal Secondary Controls</div>
    </div>
  );
}
