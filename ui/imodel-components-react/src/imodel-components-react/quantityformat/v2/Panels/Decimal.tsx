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
import { FormatUnits } from "../../FormatUnits.js";
import { FormatTypeOption } from "../../FormatType.js";
import { AppendUnitLabel, UomSeparatorSelector } from "../../FormatUnitLabel.js";
import { FormatPrecision } from "../../FormatPrecision.js";
import { Divider, Label, Text } from "@itwin/itwinui-react";
import { useTranslation } from "../../../useTranslation.js";
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

	const isFormatTraitSet = React.useCallback(
		(trait: FormatTraits) => {
			return Format.isFormatTraitSetInProps(formatProps, trait);
		},
		[formatProps]
	);

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
			<FormatUnits unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} initialFormat={formatProps} onUnitsChange={onFormatChange} />
			<Divider />
			<AppendUnitLabel formatProps={formatProps} onFormatChange={onFormatChange} />
			{isFormatTraitSet(FormatTraits.ShowUnitLabel) && <UomSeparatorSelector formatProps={formatProps} onFormatChange={onFormatChange} disabled={false} />}
			<FormatPrecision formatProps={formatProps} onChange={onFormatChange} />
			{/* Add precision, rounding, etc. controls here */}
		</div>
	);
}

/** Returns the primary children for decimal format*/
export function getDecimalPrimaryChildren(props: PanelProps): React.ReactNode {
	return <DecimalPrimaryChildren {...props} />;
}

/** Returns the secondary children for decimal format */
export function getDecimalSecondaryChildren(props: PanelProps): React.ReactNode {
	const { formatProps: _formatProps, onFormatChange: _onFormatChange } = props;

	return (
		<div className="decimal-secondary-children">
			<div>Decimal Secondary Controls</div>
		</div>
	);
}
