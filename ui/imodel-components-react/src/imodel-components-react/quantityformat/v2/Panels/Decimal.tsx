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
import { Format, FormatTraits, getTraitString } from "@itwin/core-quantity";
import { FormatUnitsV2 } from "../internal/FormatUnitsV2.js";
import { FormatTypeOption } from "../../FormatType.js";
import { AppendUnitLabelV2, UomSeparatorSelectorV2 } from "../internal/FormatUnitLabelV2.js";
import { FormatPrecisionV2 } from "../internal/FormatPrecisionV2.js";
import { DecimalSeparatorSelector } from "../../misc/DecimalSeparator.js";
import { Checkbox, Divider, Label, Text } from "@itwin/itwinui-react";
import { useTranslation } from "../../../useTranslation.js";
import { ShowTrailingZerosV2 } from "../internal/ShowTrailingZerosV2.js";
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
			<FormatUnitsV2 unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} initialFormat={formatProps} onUnitsChange={onFormatChange} />
			<Divider />
			<AppendUnitLabelV2 formatProps={formatProps} onFormatChange={onFormatChange} />
			{Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && <UomSeparatorSelectorV2 formatProps={formatProps} onFormatChange={onFormatChange} disabled={false} />}
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
export function DecimalSecondaryChildren(props: PanelProps): React.ReactElement {
	const { formatProps, onFormatChange } = props;
	const { translate } = useTranslation();

	const decimalSeparatorSelectorId = React.useId();
	const keepDecimalPointId = React.useId();

	const setFormatTrait = React.useCallback(
		(trait: FormatTraits, setActive: boolean) => {
			const traitStr = getTraitString(trait);
			let formatTraits: string[] = [traitStr];
			if (setActive) {
				// setting trait
				if (formatProps.formatTraits) {
					const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
					if (!traits.find((traitEntry) => traitStr === traitEntry)) {
						formatTraits = [...traits, traitStr];
					}
				}
			} else {
				// clearing trait
				if (!formatProps.formatTraits) return;
				const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
				formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
			}
			const newFormatProps = { ...formatProps, formatTraits };
			onFormatChange && onFormatChange(newFormatProps);
		},
		[formatProps, onFormatChange]
	);

	const handleDecimalSeparatorChange = React.useCallback(
		(decimalSeparator: string) => {
			let thousandSeparator = formatProps.thousandSeparator;
			// make sure 1000 and decimal separator do not match
			if (Format.isFormatTraitSetInProps(formatProps, FormatTraits.Use1000Separator)) {
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

	const handleKeepDecimalPointChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormatTrait(FormatTraits.KeepDecimalPoint, e.target.checked);
		},
		[setFormatTrait]
	);

	return (
		<div className="decimal-secondary-children">
			<div className="format-inline-row">
				<Label className={"uicore-label"} as="div" displayStyle="inline" id={decimalSeparatorSelectorId}>
					{translate("QuantityFormat.labels.decimalSeparatorLabel")}
				</Label>
				<DecimalSeparatorSelector aria-labelledby={decimalSeparatorSelectorId} separator={formatProps.decimalSeparator ?? "."} onChange={handleDecimalSeparatorChange} />
			</div>
			<div className="format-inline-row">
				<Label className={"uicore-label"} as="div" displayStyle="inline" id={keepDecimalPointId}>
					{translate("QuantityFormat.labels.keepDecimalPointLabel")}
				</Label>
				<Checkbox aria-labelledby={keepDecimalPointId} checked={Format.isFormatTraitSetInProps(formatProps, FormatTraits.KeepDecimalPoint)} onChange={handleKeepDecimalPointChange} />
			</div>
			<ShowTrailingZerosV2 formatProps={formatProps} onChange={onFormatChange} />
		</div>
	);
}

/** Returns the secondary children for decimal format */
export function getDecimalSecondaryChildren(props: PanelProps): React.ReactNode {
	return <DecimalSecondaryChildren {...props} />;
}
