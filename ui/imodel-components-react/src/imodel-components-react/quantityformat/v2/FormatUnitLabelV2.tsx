/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import classnames from "classnames";
import * as React from "react";
import type { FormatProps } from "@itwin/core-quantity";
import { Format, FormatTraits, getTraitString } from "@itwin/core-quantity";
import type { SelectOption } from "@itwin/itwinui-react";
import { Checkbox, Label, Select } from "@itwin/itwinui-react";
import { useTranslation } from "../../useTranslation.js";

/** Properties of [[UomSeparatorSelectorV2]] component.
 * @alpha
 */
interface UomSeparatorSelectorV2Props {
	formatProps: FormatProps;
	onFormatChange: (formatProps: FormatProps) => void;
	disabled?: boolean;
}

/** Component to set the unit of measure separator.
 * @alpha
 */
export function UomSeparatorSelectorV2(props: UomSeparatorSelectorV2Props) {
	const { formatProps, onFormatChange, disabled, ...rest } = props;
	const { translate } = useTranslation();
	const uomSeparatorSelectorId = React.useId();

	const handleOnChange = React.useCallback(
		(value: string) => {
			const newFormatProps = { ...formatProps, uomSeparator: value };
			onFormatChange && onFormatChange(newFormatProps);
		},
		[formatProps, onFormatChange]
	);

	const separatorOptions: SelectOption<string>[] = React.useMemo(() => {
		const uomDefaultEntries: SelectOption<string>[] = [
			{ value: "", label: translate("QuantityFormat.none") },
			{ value: " ", label: translate("QuantityFormat.space") },
			{ value: "-", label: translate("QuantityFormat.dash") },
		];

		const completeListOfEntries: SelectOption<string>[] = [];
		const separator = formatProps.uomSeparator ?? "";
		if (separator.length > 0) {
			// if the separator is not in the default list, add it
			if (undefined === uomDefaultEntries.find((option) => option.value === separator)) {
				completeListOfEntries.push({ value: separator, label: separator });
			}
		}
		completeListOfEntries.push(...uomDefaultEntries);
		return completeListOfEntries;
	}, [formatProps.uomSeparator, translate]);

	return (
		<div className="format-inline-row">
			<Label as="div" displayStyle="inline" id={uomSeparatorSelectorId} className={classnames("uicore-label", disabled && "uicore-disabled")}>
				{translate("QuantityFormat.labels.labelSeparator")}
			</Label>
			<Select options={separatorOptions} value={formatProps.uomSeparator ?? ""} onChange={handleOnChange} size="small" disabled={disabled} aria-labelledby={uomSeparatorSelectorId} {...rest} />
		</div>
	);
}

/** Properties of [[AppendUnitLabelV2]] component.
 * @alpha
 */
interface AppendUnitLabelV2Props {
	formatProps: FormatProps;
	onFormatChange: (formatProps: FormatProps) => void;
}

/** Component to set the append unit label flag.
 * @alpha
 */
export function AppendUnitLabelV2(props: AppendUnitLabelV2Props) {
	const { formatProps, onFormatChange } = props;
	const { translate } = useTranslation();
	const appendUnitLabelId = React.useId();

	const setFormatTrait = React.useCallback(
		(trait: FormatTraits, setActive: boolean) => {
			if (setActive) {
				const newFormatProps = { ...formatProps, formatTraits: formatProps.formatTraits ? [...formatProps.formatTraits, getTraitString(trait)] : [getTraitString(trait)] };
				onFormatChange && onFormatChange(newFormatProps);
			} else {
				const formatTraits = formatProps.formatTraits;
				if (Array.isArray(formatTraits)) {
					const newFormatProps = { ...formatProps, formatTraits: formatTraits.filter((entry: string) => entry !== getTraitString(trait)) };
					onFormatChange && onFormatChange(newFormatProps);
				} else {
					const newFormatProps = { ...formatProps, formatTraits: [] };
					onFormatChange && onFormatChange(newFormatProps);
				}
			}
		},
		[formatProps, onFormatChange]
	);

	const isFormatTraitSet = React.useCallback(
		(trait: FormatTraits) => {
			return Format.isFormatTraitSetInProps(formatProps, trait);
		},
		[formatProps]
	);

	const handleShowUnitLabelChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormatTrait(FormatTraits.ShowUnitLabel, e.target.checked);
		},
		[setFormatTrait]
	);

	return (
		<div className="format-inline-row append-unit-label">
			<span className={"uicore-label"} id={appendUnitLabelId}>
				{translate("QuantityFormat.labels.appendUnitLabel")}
			</span>
			<Checkbox aria-labelledby={appendUnitLabelId} checked={isFormatTraitSet(FormatTraits.ShowUnitLabel)} onChange={handleShowUnitLabelChange} />
		</div>
	);
}
