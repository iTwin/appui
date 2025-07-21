/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps, UnitProps, UnitsProvider } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { BearingPrimaryChildren, BearingSecondaryChildren } from "../../../imodel-components-react/quantityformat/v2/panels/Bearing.js";

describe("Bearing Panel V2", () => {
	const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(IModelApp, "requestNextAnimation")!;
	function requestNextAnimation() {}

	let unitsProvider: UnitsProvider;
	let persistenceUnit: UnitProps;

	beforeEach(async () => {
		// Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
		Object.defineProperty(IModelApp, "requestNextAnimation", {
			get: () => requestNextAnimation,
		});
		await TestUtils.initializeUiIModelComponents();
		await NoRenderApp.startup();
		unitsProvider = IModelApp.quantityFormatter.unitsProvider;
		persistenceUnit = await unitsProvider.findUnitByName("Units.ARC_DEG");
	});

	afterEach(async () => {
		await IModelApp.shutdown();
		TestUtils.terminateUiIModelComponents();
		Object.defineProperty(IModelApp, "requestNextAnimation", rnaDescriptorToRestore);
	});

	describe("BearingPrimaryChildren", () => {
		it("should render bearing primary children with correct format type", async () => {
			const formatProps: FormatProps = {
				type: "Bearing",
				precision: 0,
				composite: {
					includeZero: true,
					spacer: "",
					units: [
						{ label: "°", name: "Units.ARC_DEG" },
						{ label: "'", name: "Units.ARC_MINUTE" },
						{ label: '"', name: "Units.ARC_SECOND" },
					],
				},
				revolutionUnit: "Units.RAD",
			};

			const onFormatChange = vi.fn();

			const renderedComponent = render(<BearingPrimaryChildren formatProps={formatProps} onFormatChange={onFormatChange} unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} />);

			await waitFor(() => {
				expect(renderedComponent.getByDisplayValue("Bearing")).toBeTruthy();
			});
		});

		it("should render units control", async () => {
			const formatProps: FormatProps = {
				type: "Bearing",
				precision: 0,
				composite: {
					includeZero: true,
					spacer: "",
					units: [{ label: "°", name: "Units.ARC_DEG" }],
				},
				revolutionUnit: "Units.RAD",
			};

			const onFormatChange = vi.fn();

			const renderedComponent = render(<BearingPrimaryChildren formatProps={formatProps} onFormatChange={onFormatChange} unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} />);

			await waitFor(() => {
				expect(renderedComponent.getByDisplayValue("Bearing")).toBeTruthy();
				expect(renderedComponent.getByText("Units")).toBeTruthy();
			});
		});

		it("should render unit label control", async () => {
			const formatProps: FormatProps = {
				type: "Bearing",
				precision: 0,
				formatTraits: ["showUnitLabel"],
				composite: {
					includeZero: true,
					spacer: "",
					units: [{ label: "°", name: "Units.ARC_DEG" }],
				},
				revolutionUnit: "Units.RAD",
			};

			const onFormatChange = vi.fn();

			const renderedComponent = render(<BearingPrimaryChildren formatProps={formatProps} onFormatChange={onFormatChange} unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} />);

			await waitFor(() => {
				expect(renderedComponent.getByRole("checkbox", { name: /append unit label/i })).toBeTruthy();
			});
		});
	});

	describe("BearingSecondaryChildren", () => {
		it("should render bearing secondary children container", async () => {
			const formatProps: FormatProps = {
				type: "Bearing",
				precision: 0,
				composite: {
					includeZero: true,
					spacer: "",
					units: [{ label: "°", name: "Units.ARC_DEG" }],
				},
				revolutionUnit: "Units.RAD",
			};

			const onFormatChange = vi.fn();

			const renderedComponent = render(<BearingSecondaryChildren formatProps={formatProps} onFormatChange={onFormatChange} unitsProvider={unitsProvider} persistenceUnit={persistenceUnit} />);

			await waitFor(() => {
				expect(renderedComponent.container.querySelector(".format-panel-secondary-children")).toBeTruthy();
			});
		});
	});
});
