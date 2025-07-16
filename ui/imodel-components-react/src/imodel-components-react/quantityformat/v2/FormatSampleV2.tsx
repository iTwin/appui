/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import { Format, type FormatProps, FormatterSpec, type UnitProps } from "@itwin/core-quantity";
import type { UnitsProvider } from "@itwin/core-quantity";
// import { Icon } from "@itwin/core-react";
import { Divider, Input, Tag } from "@itwin/itwinui-react";
// import { SvgProgressForward } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../../useTranslation.js";

/** Properties of FormatSampleV2 component. */
export interface FormatSampleV2Props {
	formatProps: FormatProps;
	unitsProvider: UnitsProvider;
	persistenceUnit?: UnitProps;
	initialMagnitude?: number;
	hideLabels?: boolean;
}

/** Component to show the persistence value and formatted value for FormatProps.
 * Creates its own FormatterSpec internally based on formatProps and persistenceUnit.
 */
export function FormatSampleV2(props: FormatSampleV2Props) {
	const { formatProps, unitsProvider, persistenceUnit, initialMagnitude, hideLabels } = props;
	const { translate } = useTranslation();
	const initialValue = initialMagnitude ?? 0;
	const [magnitude, setMagnitude] = React.useState(initialValue);
	const [sampleValue, setSampleValue] = React.useState(initialValue.toString());
	const [formatSpec, setFormatSpec] = React.useState<FormatterSpec | undefined>(undefined);

	// Create FormatterSpec when formatProps or persistenceUnit changes
	React.useEffect(() => {
		const createFormatterSpec = async () => {
			if (!persistenceUnit) {
				setFormatSpec(undefined);
				return;
			}

			try {
				const actualFormat = await Format.createFromJSON("custom", unitsProvider, formatProps);
				const spec = await FormatterSpec.create(actualFormat.name, actualFormat, unitsProvider, persistenceUnit);
				setFormatSpec(spec);
			} catch {
				setFormatSpec(undefined);
			}
		};

		void createFormatterSpec();
	}, [formatProps, unitsProvider, persistenceUnit]);

	React.useEffect(() => {
		const value = initialMagnitude ?? 0;
		setMagnitude(value);
		setSampleValue(value.toString());
	}, [initialMagnitude]);

	const handleOnValueBlur = React.useCallback(() => {
		let newValue = Number.parseFloat(sampleValue);
		if (Number.isNaN(newValue)) newValue = 0;
		setMagnitude(newValue);
		setSampleValue(newValue.toString());
	}, [sampleValue]);

	const handleOnValueChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setSampleValue(event.target.value);
	}, []);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === Key.Enter.valueOf()) {
				let newValue = Number.parseFloat(sampleValue);
				if (Number.isNaN(newValue)) newValue = 0;
				setMagnitude(newValue);
				setSampleValue(newValue.toString());
				e.preventDefault();
			}
		},
		[sampleValue]
	);

	const activePersistenceUnitLabel = formatSpec ? formatSpec.persistenceUnit.label : persistenceUnit?.label ?? "";
	const formattedValue = formatSpec ? formatSpec.applyFormatting(magnitude) : "";

	return (
		<>
			{!hideLabels && <span className={"uicore-label"}>{translate("QuantityFormat.labels.value")}</span>}
			<span className="components-inline">
				<Input data-testid="format-sample-v2-input" className="components-quantity-persistence-input" value={sampleValue} onChange={handleOnValueChange} onKeyDown={handleKeyDown} onBlur={handleOnValueBlur} size="small" />
				{activePersistenceUnitLabel}
        <Divider orientation="vertical" />
        <Tag variant="default">{formattedValue}</Tag>
        <Divider orientation="vertical" />
        <Tag variant="basic">{formattedValue}</Tag>
			</span>

				{/* <span data-testid="format-sample-v2-formatted" className={"uicore-label components-quantity-formatted-sample"}>
					{formattedValue}
				</span> */}
		</>
	);
}
