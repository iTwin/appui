/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type { FormatProps } from "@itwin/core-quantity";
import { StationSeparatorSelector } from "../../misc/StationSeparatorSelector.js";
import { useTranslation } from "../../../useTranslation.js";
import { Label } from "@itwin/itwinui-react";

/** Properties of [[StationSeparatorV2]] component.
 * @alpha
 * @internal
 */
export interface StationSeparatorV2Props {
	formatProps: FormatProps;
	onChange?: (format: FormatProps) => void;
	disabled?: boolean;
}

/** Component to show/edit Station Format Separator.
 * @alpha
 * @internal
 */
export function StationSeparatorV2(props: StationSeparatorV2Props) {
	const { formatProps, onChange, disabled = false } = props;
	const { translate } = useTranslation();
	const stationSeparatorSelectorId = React.useId();

	const handleStationSeparatorChange = React.useCallback(
		(value: string) => {
			const newFormatProps = { ...formatProps, stationSeparator: value };
			onChange && onChange(newFormatProps);
		},
		[formatProps, onChange]
	);

	return (
		<div className="format-inline-row">
			<Label className={"uicore-label"} as="div" displayStyle="inline" id={stationSeparatorSelectorId}>
				{translate("QuantityFormat.labels.stationSeparatorLabel")}
			</Label>
			<StationSeparatorSelector aria-labelledby={stationSeparatorSelectorId} separator={formatProps.stationSeparator ?? "+"} disabled={disabled} onChange={handleStationSeparatorChange} />
		</div>
	);
}
