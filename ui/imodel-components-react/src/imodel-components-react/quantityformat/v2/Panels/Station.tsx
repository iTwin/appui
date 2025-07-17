/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { PanelProps } from "./Decimal.js";
import { Format, FormatTraits } from "@itwin/core-quantity";
import { FormatUnits } from "../../FormatUnits.js";
import { FormatTypeOption } from "../../FormatType.js";
import {
  AppendUnitLabel,
  UomSeparatorSelector,
} from "../../FormatUnitLabel.js";
import { FormatPrecision } from "../../FormatPrecision.js";
import { Divider, Label, Text } from "@itwin/itwinui-react";
import { useTranslation } from "../../../useTranslation.js";
import "../FormatPanelV2.scss";

/** Primary children component for station format (always visible) */
export function StationPrimaryChildren(props: PanelProps): React.ReactElement {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();

  const isFormatTraitSet = React.useCallback(
    (trait: FormatTraits) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );

  return (
    <div className="station-primary-children">
      <div className="format-type-row">
        <FormatTypeOption formatProps={formatProps} onChange={onFormatChange} />
      </div>
      <Text variant="small" isMuted={true}>
        {translate("QuantityFormat.labels.formatTypeSublabel")}
      </Text>
      <Divider />
      <Label>{translate("QuantityFormat.labels.units")}</Label>
      <FormatUnits
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
        initialFormat={formatProps}
        onUnitsChange={onFormatChange}
      />
      <Divider />
      <AppendUnitLabel
        formatProps={formatProps}
        onFormatChange={onFormatChange}
      />
      {isFormatTraitSet(FormatTraits.ShowUnitLabel) && (
        <UomSeparatorSelector
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          disabled={false}
        />
      )}
      <FormatPrecision formatProps={formatProps} onChange={onFormatChange} />
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
