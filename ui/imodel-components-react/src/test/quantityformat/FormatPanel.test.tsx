/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps, UnitProps, UnitsProvider } from "@itwin/core-quantity";
import { Format, FormatterSpec, FormatTraits, getTraitString, RatioType } from "@itwin/core-quantity";
import { Checkbox, Label } from "@itwin/itwinui-react";
import { TestUtils } from "../TestUtils.js";
import { FormatPanel } from "../../imodel-components-react/quantityformat/FormatPanel.js";
import { FormatSample } from "../../imodel-components-react/quantityformat/FormatSample.js";
import { FormatPrecision } from "../../imodel-components-react/quantityformat/FormatPrecision.js";
import { AzimuthOptions } from "../../imodel-components-react/quantityformat/misc/AzimuthOptions.js";
import { RatioTypeSelector } from "../../imodel-components-react/quantityformat/misc/RatioType.js";
import { userEvent } from "@testing-library/user-event";

function setFormatTrait(formatProps: FormatProps, trait: FormatTraits, setActive: boolean) {
	const traitStr = getTraitString(trait);
	if (undefined === traitStr) return;
	let formatTraits: string[] | undefined;
	if (setActive) {
		// setting trait
		if (!formatProps.formatTraits) {
			formatTraits = [traitStr];
		} else {
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
	return { ...formatProps, formatTraits };
}

function provideSecondaryChildren(formatProps: FormatProps, fireFormatChange: (newProps: FormatProps) => void) {
	const inProps = formatProps;
	const onChange = fireFormatChange;
	const handleUseThousandsSeparatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newProps = setFormatTrait(inProps, FormatTraits.Use1000Separator, e.target.checked);
		if (newProps) onChange(newProps);
	};

	return (
		<>
			<span className={"uicore-label"}>Secondary (1000 sep)</span>
			<Checkbox checked={Format.isFormatTraitSetInProps(formatProps, FormatTraits.Use1000Separator)} onChange={handleUseThousandsSeparatorChange} />
		</>
	);
}

function providePrimaryChildren(formatProps: FormatProps, fireFormatChange: (newProps: FormatProps) => void) {
	const inProps = formatProps;
	const onChange = fireFormatChange;
	const handleUseThousandsSeparatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newProps = setFormatTrait(inProps, FormatTraits.Use1000Separator, e.target.checked);
		if (newProps) onChange(newProps);
	};

	return (
		<>
			<span className={"uicore-label"}>Primary (1000 sep)</span>
			<Checkbox checked={Format.isFormatTraitSetInProps(formatProps, FormatTraits.Use1000Separator)} onChange={handleUseThousandsSeparatorChange} />
		</>
	);
}

async function provideFormatSpec(formatProps: FormatProps, persistenceUnit: UnitProps, unitsProvider: UnitsProvider, formatName?: string) {
	const actualFormat = await Format.createFromJSON(formatName ?? "custom", unitsProvider, formatProps);
	return FormatterSpec.create(actualFormat.name, actualFormat, unitsProvider, persistenceUnit);
}

const initialFormatProps: FormatProps = {
	formatTraits: ["keepSingleZero", "applyRounding", "showUnitLabel"],
	precision: 4,
	type: "Decimal",
	uomSeparator: " ",
	decimalSeparator: ".",
};

describe("FormatPanel", () => {
	const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(IModelApp, "requestNextAnimation")!;
	function requestNextAnimation() {}

	beforeEach(async () => {
		// Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
		Object.defineProperty(IModelApp, "requestNextAnimation", {
			get: () => requestNextAnimation,
		});
		await TestUtils.initializeUiIModelComponents();
		await NoRenderApp.startup();
	});

	afterEach(async () => {
		await IModelApp.shutdown();
		TestUtils.terminateUiIModelComponents();
		Object.defineProperty(IModelApp, "requestNextAnimation", rnaDescriptorToRestore);
	});

	it("should render panel", async () => {
		const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
		const pu = await unitsProvider.findUnitByName("Units.M");
		const formatterSpec = await provideFormatSpec(initialFormatProps, pu, unitsProvider, "numeric");
		const spy = vi.fn();

		const renderedComponent = render(
			<FormatPanel
				initialFormat={formatterSpec.format.toJSON()}
				showSample={true}
				onFormatChange={spy}
				initialMagnitude={123.45}
				unitsProvider={unitsProvider}
				persistenceUnit={formatterSpec.persistenceUnit}
				provideFormatSpec={provideFormatSpec}
				providePrimaryChildren={providePrimaryChildren}
				provideSecondaryChildren={provideSecondaryChildren}
			/>
		);

		await waitFor(() => {
			const spanElement = renderedComponent.getByTestId("format-sample-formatted") as HTMLSpanElement;
			expect(spanElement.textContent).to.be.eql(`123.45 m`);
		});
	});

	it("should use generic format spec generator if not specified", async () => {
		const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
		const pu = await unitsProvider.findUnitByName("Units.M");
		const formatterSpec = await provideFormatSpec(initialFormatProps, pu, unitsProvider, "numeric");

		const renderedComponent = render(
			<FormatPanel
				initialFormat={formatterSpec.format.toJSON()}
				showSample={true}
				initialMagnitude={123.45}
				unitsProvider={unitsProvider}
				persistenceUnit={formatterSpec.persistenceUnit}
				providePrimaryChildren={providePrimaryChildren}
				provideSecondaryChildren={provideSecondaryChildren}
			/>
		);
		await waitFor(() => renderedComponent.getByText("123.45 m"));
	});
});

describe("FormatSample", () => {
	it("should render FormatSample with hideLabels", async () => {
		const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
		const pu = await unitsProvider.findUnitByName("Units.M");
		const formatterSpec = await provideFormatSpec(initialFormatProps, pu, unitsProvider, "numeric");
		const renderedComponent = render(<FormatSample formatSpec={formatterSpec} hideLabels />);
		expect(renderedComponent.getByTestId("progress-forward")).toBeTruthy();
	});
});

describe("FormatPrecision", () => {
	it("should render FormatPrecision with fractional type & no precision", async () => {
		const formatProps: FormatProps = { type: "fractional" };
		const renderedComponent = render(<FormatPrecision formatProps={formatProps} />);
		expect(renderedComponent.getByLabelText("Precision")).to.exist;
	});

	it("should render FormatPrecision with decimal type & no precision", async () => {
		const formatProps: FormatProps = { type: "decimal" };
		const renderedComponent = render(<FormatPrecision formatProps={formatProps} />);
		expect(renderedComponent.getByLabelText("Precision")).to.exist;
	});
});

describe("AzimuthOptions", () => {
	it("should render azimuth options", async () => {
		const formatProps: FormatProps = {
			type: "azimuth",
			azimuthBase: 0,
			azimuthCounterClockwise: false,
		};
		const onChange = vi.fn();
		const renderedComponent = render(<AzimuthOptions formatProps={formatProps} onChange={onChange} disabled={false} />);

		expect(renderedComponent.getByLabelText(/Azimuth Base/i)).to.exist;
		expect(renderedComponent.getByLabelText(/Enable Azimuth Counter-Clockwise/i)).to.exist;

		const checkbox = renderedComponent.getByLabelText(/Enable Azimuth Counter-Clockwise/i) as HTMLInputElement;
		expect(checkbox.checked).to.be.false;

		checkbox.click();
		expect(onChange.mock.calls[0][0]).toEqual({
			...formatProps,
			azimuthCounterClockwise: true,
		});
	});

	it("should render azimuth base input, and update on change", async () => {
		const formatProps: FormatProps = {
			type: "azimuth",
			azimuthBase: 0,
			azimuthCounterClockwise: false,
		};
		const onChange = vi.fn();
		const renderedComponent = render(<AzimuthOptions formatProps={formatProps} onChange={onChange} disabled={false} />);

		const input = renderedComponent.getByLabelText(/Azimuth Base/i) as HTMLInputElement;
		expect(input.value).to.equal("0");

		// Use fireEvent from @testing-library/react to trigger the change event
		fireEvent.change(input, { target: { value: "45.00" } });

		expect(onChange.mock.calls[0][0]).toEqual({
			...formatProps,
			azimuthBase: 45.0,
		});

		fireEvent.keyDown(input, { key: "A", code: "KeyA" });
		expect(onChange).toHaveBeenCalledTimes(1); // No change should occur on key down with a letter
	});

	it("should render ratioType selector", async () => {
		const user = userEvent.setup();

		const onChange = vi.fn();
		const renderedComponent = render(
			<>
				<Label id="ratio-type-selector">RatioTypeLabel</Label>
				<RatioTypeSelector type={RatioType.NToOne} onChange={onChange} disabled={false} aria-labelledby="ratio-type-selector" />
			</>
		);

		expect(renderedComponent.getByLabelText("RatioTypeLabel")).to.exist;

		// Find the first span in the rendered component and expect it to equal 'N:1'
		const span = renderedComponent.container.querySelector("span");
		expect(span?.textContent).to.equal("N:1");

		const selector = renderedComponent.container.querySelector('[role="combobox"]');
		await user.click(selector!);

		const options = screen.getAllByRole("option");

		expect(options.length).toEqual(4);
	});
});
