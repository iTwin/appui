/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { FormatProps } from "@itwin/core-quantity";
import { Format, FormatTraits, getTraitString } from "@itwin/core-quantity";
import type { SelectOption } from "@itwin/itwinui-react";
import { Checkbox, Label, Select } from "@itwin/itwinui-react";
import { useTranslation } from "../useTranslation.js";

/** Properties of [[UomSeparatorSelector]] component.
 * @alpha
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface UomSeparatorSelectorProps extends CommonProps {
	formatProps: FormatProps;
	disabled?: boolean;
	onFormatChange: (format: FormatProps) => void;
}

/** Component to select the unit of measure separator.
 * @alpha
 * @internal
 */
export function UomSeparatorSelector(props: UomSeparatorSelectorProps) {
	const { formatProps, onFormatChange, disabled, ...rest } = props;
	const { translate } = useTranslation();

	const uomSeparatorSelectorId = React.useId();
	const handleOnChange = React.useCallback(
		(newSeparator: string) => {
			const newFormatProps = { ...formatProps, uomSeparator: newSeparator };
			onFormatChange && onFormatChange(newFormatProps);
		},
		[formatProps, onFormatChange]
	);

	const separatorOptions = React.useMemo(() => {
		const separator = formatProps.uomSeparator ?? "";
		const uomDefaultEntries: SelectOption<string>[] = [
			{ value: "", label: translate("QuantityFormat.none") },
			{ value: " ", label: translate("QuantityFormat.space") },
			{ value: "-", label: translate("QuantityFormat.dash") },
		];
		const completeListOfEntries: SelectOption<string>[] = [];

		if (undefined === uomDefaultEntries.find((option) => option.value === separator)) {
			completeListOfEntries.push({ value: separator, label: separator });
		}
		completeListOfEntries.push(...uomDefaultEntries);
		return completeListOfEntries;
	}, [formatProps.uomSeparator, translate]);

	return (
		<div className="uom-separator-selector-row">
			<Label as="div" displayStyle="inline" id={uomSeparatorSelectorId} className={classnames("uicore-label", disabled && "uicore-disabled")}>
				{translate("QuantityFormat.labels.labelSeparator")}
			</Label>
			<Select options={separatorOptions} value={formatProps.uomSeparator ?? ""} onChange={handleOnChange} size="small" disabled={disabled} aria-labelledby={uomSeparatorSelectorId} {...rest} />
		</div>
	);
}

/** Properties of [[AppendUnitLabel]] component.
 * @alpha
 * @internal
 */
export interface AppendUnitLabelProps {
	formatProps: FormatProps;
	onFormatChange: (format: FormatProps) => void;
}

/** Component to set whether the unit label should be appended to the formatted value.
 * @alpha
 * @internal
 */
export function AppendUnitLabel(props: AppendUnitLabelProps) {
	const { formatProps, onFormatChange } = props;
	const { translate } = useTranslation();

	const appendUnitLabelId = React.useId();
	const handleSetFormatProps = React.useCallback(
		(newProps: FormatProps) => {
			onFormatChange && onFormatChange(newProps);
		},
		[onFormatChange]
	);

	const isFormatTraitSet = React.useCallback(
		(trait: FormatTraits) => {
			return Format.isFormatTraitSetInProps(formatProps, trait);
		},
		[formatProps]
	);

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
			handleSetFormatProps(newFormatProps);
		},
		[formatProps, handleSetFormatProps]
	);

	const handleShowUnitLabelChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormatTrait(FormatTraits.ShowUnitLabel, e.target.checked);
		},
		[setFormatTrait]
	);

	return (
		<div className="append-unit-label-row">
			<span className={"uicore-label"} id={appendUnitLabelId}>
				{translate("QuantityFormat.labels.appendUnitLabel")}
			</span>
			<Checkbox aria-labelledby={appendUnitLabelId} checked={isFormatTraitSet(FormatTraits.ShowUnitLabel)} onChange={handleShowUnitLabelChange} />
		</div>
	);
}

/** Properties of [[FormatUnitLabel]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FormatUnitLabel>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FormatUnitLabelProps extends CommonProps {
	formatProps: FormatProps;
	onUnitLabelChange?: (format: FormatProps) => void;
}

/** Component to set the label separator definition in a Quantity Format and if it the label is to be displayed.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FormatUnitLabel(props: FormatUnitLabelProps) {
	const { formatProps, onUnitLabelChange } = props;

	const handleSetFormatProps = React.useCallback(
		(newProps: FormatProps) => {
			onUnitLabelChange && onUnitLabelChange(newProps);
		},
		[onUnitLabelChange]
	);

	const isFormatTraitSet = React.useCallback(
		(trait: FormatTraits) => {
			return Format.isFormatTraitSetInProps(formatProps, trait);
		},
		[formatProps]
	);

	return (
		<>
			<AppendUnitLabel formatProps={formatProps} onFormatChange={handleSetFormatProps} />
			<UomSeparatorSelector formatProps={formatProps} onFormatChange={handleSetFormatProps} disabled={!isFormatTraitSet(FormatTraits.ShowUnitLabel)} />
		</>
	);
}
