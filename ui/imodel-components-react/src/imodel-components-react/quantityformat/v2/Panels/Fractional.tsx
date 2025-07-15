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

/** Primary children component for fractional format */
export function FractionalPrimaryChildren(
  props: PanelProps
): React.ReactElement {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;

  return (
    <div className="fractional-primary-children">
      <FormatUnits
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
        initialFormat={formatProps}
        onUnitsChange={onFormatChange}
      />
    </div>
  );
}

/** Returns the primary children for fractional format*/
export function getFractionalPrimaryChildren(
  props: PanelProps
): React.ReactNode {
  return <FractionalPrimaryChildren {...props} />;
}

/** Returns the secondary children for fractional format */
export function getFractionalSecondaryChildren(
  props: PanelProps
): React.ReactNode {
  const { formatProps: _formatProps, onFormatChange: _onFormatChange } = props;

  return (
    <div className="fractional-secondary-children">
      <div>Fractional Secondary Controls</div>
    </div>
  );
}
