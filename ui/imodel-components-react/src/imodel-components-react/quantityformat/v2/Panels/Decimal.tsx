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
import { Format, FormatTraits } from "@itwin/core-quantity";
import { FormatUnitsV2 } from "../internal/FormatUnitsV2.js";
import { FormatTypeOption } from "../../FormatType.js";
import {
  AppendUnitLabelV2,
  UomSeparatorSelectorV2,
} from "../internal/FormatUnitLabelV2.js";
import { FormatPrecisionV2 } from "../internal/FormatPrecisionV2.js";
import { DecimalSeparatorSelector } from "../../misc/DecimalSeparator.js";
import { Divider, Label, Text } from "@itwin/itwinui-react";
import { useTranslation } from "../../../useTranslation.js";
import { ShowTrailingZerosV2 } from "../internal/ShowTrailingZerosV2.js";
import { SignOptionV2 } from "../internal/SignOptionV2.js";
import { KeepDecimalPointV2 } from "../internal/KeepDecimalPointV2.js";
import { KeepSingleZeroV2 } from "../internal/KeepSingleZeroV2.js";
import { ZeroEmptyV2 } from "../internal/ZeroEmptyV2.js";
import "../FormatPanelV2.scss";

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
  const { translate } = useTranslation();

  return (
    <div className="decimal-primary-children">
      <div className="format-type-row">
        <FormatTypeOption formatProps={formatProps} onChange={onFormatChange} />
      </div>
      <Text variant="small" isMuted={true}>
        {translate("QuantityFormat.labels.formatTypeSublabel")}
      </Text>
      <Divider />
      <Label>{translate("QuantityFormat.labels.units")}</Label>
      <FormatUnitsV2
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
        initialFormat={formatProps}
        onUnitsChange={onFormatChange}
      />
      <Divider />
      <AppendUnitLabelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
      />
      {Format.isFormatTraitSetInProps(
        formatProps,
        FormatTraits.ShowUnitLabel
      ) && (
        <UomSeparatorSelectorV2
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          disabled={false}
        />
      )}
      <FormatPrecisionV2 formatProps={formatProps} onChange={onFormatChange} />
      {/* Add precision, rounding, etc. controls here */}
    </div>
  );
}

/** Returns the primary children for decimal format*/
export function getDecimalPrimaryChildren(props: PanelProps): React.ReactNode {
  return <DecimalPrimaryChildren {...props} />;
}

/** Secondary children component for decimal format */
export function DecimalSecondaryChildren(
  props: PanelProps
): React.ReactElement {
  const { formatProps, onFormatChange } = props;
  const { translate } = useTranslation();

  const decimalSeparatorSelectorId = React.useId();

  const handleDecimalSeparatorChange = React.useCallback(
    (decimalSeparator: string) => {
      let thousandSeparator = formatProps.thousandSeparator;
      // make sure 1000 and decimal separator do not match
      if (
        Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.Use1000Separator
        )
      ) {
        switch (decimalSeparator) {
          case ".":
            thousandSeparator = ",";
            break;
          case ",":
            thousandSeparator = ".";
            break;
        }
      }
      const newFormatProps = {
        ...formatProps,
        thousandSeparator,
        decimalSeparator,
      };
      onFormatChange && onFormatChange(newFormatProps);
    },
    [formatProps, onFormatChange]
  );

  return (
    <div className="decimal-secondary-children">
      <SignOptionV2 formatProps={formatProps} onChange={onFormatChange} />
      <div className="format-inline-row">
        <Label
          className={"uicore-label"}
          as="div"
          displayStyle="inline"
          id={decimalSeparatorSelectorId}
        >
          {translate("QuantityFormat.labels.decimalSeparatorLabel")}
        </Label>
        <DecimalSeparatorSelector
          aria-labelledby={decimalSeparatorSelectorId}
          separator={formatProps.decimalSeparator ?? "."}
          onChange={handleDecimalSeparatorChange}
        />
      </div>
      <KeepDecimalPointV2 formatProps={formatProps} onChange={onFormatChange} />
      <ShowTrailingZerosV2
        formatProps={formatProps}
        onChange={onFormatChange}
      />
      <KeepSingleZeroV2 formatProps={formatProps} onChange={onFormatChange} />
      <ZeroEmptyV2 formatProps={formatProps} onChange={onFormatChange} />
    </div>
  );
}

/** Returns the secondary children for decimal format */
export function getDecimalSecondaryChildren(
  props: PanelProps
): React.ReactNode {
  return <DecimalSecondaryChildren {...props} />;
}
