/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import {
  FractionalPrimaryChildren,
  FractionalSecondaryChildren,
} from "../../../imodel-components-react/quantityformat/v2/panels/Fractional.js";

describe("Fractional Panel V2", () => {
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;
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
    persistenceUnit = await unitsProvider.findUnitByName("Units.M");
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiIModelComponents();
    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );
  });

  describe("FractionalPrimaryChildren", () => {
    it("should render primary children with format type", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
        precision: 4,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalPrimaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      expect(renderedComponent.getByLabelText("Format Type")).to.exist;
      expect(renderedComponent.getByText("Units")).to.exist;
      expect(renderedComponent.getByLabelText("Precision")).to.exist;
    });

    it("should render unit label controls when showUnitLabel is enabled", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
        formatTraits: ["showUnitLabel"],
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalPrimaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      await waitFor(() => {
        expect(renderedComponent.getByLabelText("Unit Separator")).to.exist;
      });
    });
  });

  describe("FractionalSecondaryChildren", () => {
    it("should render secondary children with all format options", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
        precision: 4,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      expect(renderedComponent.getByLabelText("Sign Option")).to.exist;
      expect(renderedComponent.getByLabelText("Show Trailing Zeros")).to.exist;
      expect(renderedComponent.getByLabelText("Keep Single Zero")).to.exist;
      expect(renderedComponent.getByLabelText("Zero Empty")).to.exist;
    });

    it("should handle show trailing zeros changes", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText("Show Trailing Zeros");
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["trailZeroes"],
      });
    });

    it("should handle keep single zero changes", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText("Keep Single Zero");
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["keepSingleZero"],
      });
    });

    it("should handle zero empty changes", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText("Zero Empty");
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["zeroEmpty"],
      });
    });

    it("should not render keep decimal point for fractional format", async () => {
      const formatProps: FormatProps = {
        type: "fractional",
        precision: 4,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <FractionalSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      // Fractional format should not have keep decimal point option
      expect(renderedComponent.queryByLabelText("Keep Decimal Point")).to.not
        .exist;
    });
  });
});
