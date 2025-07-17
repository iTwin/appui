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
import { FormatUnitsV2 } from "../FormatUnitsV2.js";
import { FormatTypeOption } from "../../FormatType.js";
import { AppendUnitLabelV2, UomSeparatorSelectorV2 } from "../FormatUnitLabelV2.js";
import { FormatPrecisionV2 } from "../FormatPrecisionV2.js";
import { Divider, Label, Text } from "@itwin/itwinui-react";
import { useTranslation } from "../../../useTranslation.js";
import "../FormatPanelV2.scss";

/** Primary children component for fractional format */
export function FractionalPrimaryChildren(props: PanelProps): React.ReactElement {
	const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
	const { translate } = useTranslation();

	const isFormatTraitSet = React.useCallback(
		(trait: FormatTraits) => {
			return Format.isFormatTraitSetInProps(formatProps, trait);
		},
		[formatProps]
	);

	return (
		<div className="fractional-primary-children">
			<div className="format-type-row">
				<FormatTypeOption formatProps={formatProps} onChange={onFormatChange} />
			</div>
			<Text variant="small" isMuted={true}>
				{translate("QuantityFormat.labels.formatTypeSublabel")}
			</Text>
			<Divider />
			<Label>{translate("QuantityFormat.labels.units")}</Label>
			<FormatUnitsV2 unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} initialFormat={formatProps} onUnitsChange={onFormatChange} />
			<Divider />
			<AppendUnitLabelV2 formatProps={formatProps} onFormatChange={onFormatChange} />
			{isFormatTraitSet(FormatTraits.ShowUnitLabel) && <UomSeparatorSelectorV2 formatProps={formatProps} onFormatChange={onFormatChange} disabled={false} />}
			<FormatPrecisionV2 formatProps={formatProps} onChange={onFormatChange} />
		</div>
	);
}

/** Returns the primary children for fractional format*/
export function getFractionalPrimaryChildren(props: PanelProps): React.ReactNode {
	return <FractionalPrimaryChildren {...props} />;
}

/** Returns the secondary children for fractional format */
export function getFractionalSecondaryChildren(props: PanelProps): React.ReactNode {
	const { formatProps: _formatProps, onFormatChange: _onFormatChange } = props;

	return (
		<div className="fractional-secondary-children">
			<div>Fractional Secondary Controls</div>
		</div>
	);
}
