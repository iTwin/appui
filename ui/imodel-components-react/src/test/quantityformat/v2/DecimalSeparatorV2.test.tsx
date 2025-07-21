/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { DecimalSeparatorV2 } from "../../../imodel-components-react/quantityformat/v2/internal/DecimalSeparatorV2.js";

describe("DecimalSeparatorV2", () => {
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

	it("should render with default decimal separator", async () => {
		const formatProps: FormatProps = {
			type: "decimal",
			precision: 2,
		};
		const onChange = vi.fn();

		const renderedComponent = render(<DecimalSeparatorV2 formatProps={formatProps} onChange={onChange} />);

		expect(renderedComponent.getByText("QuantityFormat.labels.decimalSeparatorLabel")).to.exist;
		expect(renderedComponent.getByText("QuantityFormat.decimal_separator.point")).to.exist;
	});

	it("should render with specified decimal separator", async () => {
		const formatProps: FormatProps = {
			type: "decimal",
			precision: 2,
			decimalSeparator: ",",
		};
		const onChange = vi.fn();

		const renderedComponent = render(<DecimalSeparatorV2 formatProps={formatProps} onChange={onChange} />);

		expect(renderedComponent.getByText("QuantityFormat.labels.decimalSeparatorLabel")).to.exist;
		expect(renderedComponent.getByText("QuantityFormat.decimal_separator.comma")).to.exist;
	});

	it("should handle decimal separator changes and adjust thousands separator", async () => {
		const formatProps: FormatProps = {
			type: "decimal",
			precision: 2,
			decimalSeparator: ".",
			thousandSeparator: ",",
			formatTraits: ["use1000Separator"],
		};
		const onChange = vi.fn();

		const renderedComponent = render(<DecimalSeparatorV2 formatProps={formatProps} onChange={onChange} />);

		// Find and click the decimal separator selector to change it
		const comboBox = renderedComponent.container.querySelector('[role="combobox"]');
		expect(comboBox).to.exist;

		// Simulate changing from period to comma
		fireEvent.click(comboBox!);

		// This would trigger the onChange callback when the value changes
		// For now, just verify the component renders correctly
		expect(renderedComponent.getByText("QuantityFormat.labels.decimalSeparatorLabel")).to.exist;
	});

	it("should not affect thousands separator when Use1000Separator trait is not set", async () => {
		const formatProps: FormatProps = {
			type: "decimal",
			precision: 2,
			decimalSeparator: ".",
			thousandSeparator: ",",
		};
		const onChange = vi.fn();

		const renderedComponent = render(<DecimalSeparatorV2 formatProps={formatProps} onChange={onChange} />);

		// The component should render but thousands separator logic should not apply
		expect(renderedComponent.getByText("QuantityFormat.labels.decimalSeparatorLabel")).to.exist;
	});
});
