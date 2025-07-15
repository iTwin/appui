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

/** Primary children component for scientific format */
export function ScientificPrimaryChildren(
  props: PanelProps
): React.ReactElement {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;

  return (
    <div className="scientific-primary-children">
      <FormatUnits
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
        initialFormat={formatProps}
        onUnitsChange={onFormatChange}
      />
    </div>
  );
}

/** Returns the primary children for scientific format */
export function getScientificPrimaryChildren(
  props: PanelProps
): React.ReactNode {
  return <ScientificPrimaryChildren {...props} />;
}

/** Returns the secondary children for scientific format */
export function getScientificSecondaryChildren(
  props: PanelProps
): React.ReactNode {
  const { formatProps: _formatProps, onFormatChange: _onFormatChange } = props;

  return (
    <div className="scientific-secondary-children">
      <div>Scientific Secondary Controls</div>
    </div>
  );
}
