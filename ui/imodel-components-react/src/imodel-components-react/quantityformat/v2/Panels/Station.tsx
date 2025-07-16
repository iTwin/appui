/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { PanelProps } from "./Decimal.js";
import { FormatUnits } from "../../FormatUnits.js";
import { FormatTypeOption } from "../../FormatType.js";

/** Primary children component for station format (always visible) */
export function StationPrimaryChildren(props: PanelProps): React.ReactElement {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;

  return (
    <div className="station-primary-children">
      <FormatTypeOption formatProps={formatProps} onChange={onFormatChange} />
      <FormatUnits
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
        initialFormat={formatProps}
        onUnitsChange={onFormatChange}
      />
      {/* Add station offset, precision, etc. controls here */}
    </div>
  );
}

/** Returns the primary children for station format (always visible) */
export function getStationPrimaryChildren(props: PanelProps): React.ReactNode {
  return <StationPrimaryChildren {...props} />;
}

/** Returns the secondary children for station format (expandable/collapsible) */
export function getStationSecondaryChildren(
  props: PanelProps
): React.ReactNode {
  const { formatProps: _formatProps, onFormatChange: _onFormatChange } = props;

  return (
    <div className="station-secondary-children">
      {/* Secondary controls for station format - expandable/collapsible */}
      <div>Station Secondary Controls</div>
      {/* Add advanced station options here */}
    </div>
  );
}
