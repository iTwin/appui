/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { RatioTypeV2 } from "../../../imodel-components-react/quantityformat/v2/internal/RatioTypeV2.js";

describe("RatioTypeV2", () => {
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

	it("should render with default ratio type", async () => {
		const formatProps: FormatProps = {
			type: "ratio",
		};
		const onChange = vi.fn();

		const renderedComponent = render(<RatioTypeV2 formatProps={formatProps} onChange={onChange} />);

		expect(renderedComponent.getByText("QuantityFormat.labels.ratioTypeLabel")).to.exist;
		expect(renderedComponent.getByText("QuantityFormat.ratio-type.n-to-one.label")).to.exist;
	});

	it("should render with specified ratio type", async () => {
		const formatProps: FormatProps = {
			type: "ratio",
		};
		const onChange = vi.fn();

		const renderedComponent = render(<RatioTypeV2 formatProps={formatProps} onChange={onChange} />);

		expect(renderedComponent.getByText("QuantityFormat.labels.ratioTypeLabel")).to.exist;
	});

	it("should handle ratio type change", async () => {
		const formatProps: FormatProps = {
			type: "ratio",
		};
		const onChange = vi.fn();

		const renderedComponent = render(<RatioTypeV2 formatProps={formatProps} onChange={onChange} />);

		const combobox = renderedComponent.getByRole("combobox");
		expect(combobox).to.exist;

		fireEvent.click(combobox);
		fireEvent.click(
			renderedComponent.getByRole("option", {
				name: "QuantityFormat.ratio-type.use-greatest-common-divisor.label QuantityFormat.ratio-type.use-greatest-common-divisor.description",
			})
		);

		expect(onChange).toHaveBeenCalledWith({
			...formatProps,
			ratioType: "GCD",
		});
	});

	it("should be disabled when disabled prop is true", async () => {
		const formatProps: FormatProps = {
			type: "ratio",
		};
		const onChange = vi.fn();

		const renderedComponent = render(<RatioTypeV2 formatProps={formatProps} onChange={onChange} disabled />);

		const combobox = renderedComponent.getByRole("combobox");
		expect(combobox.getAttribute("aria-disabled")).to.equal("true");
	});
});
