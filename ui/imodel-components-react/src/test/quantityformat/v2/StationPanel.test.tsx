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
  StationPrimaryChildren,
  StationSecondaryChildren,
} from "../../../imodel-components-react/quantityformat/v2/panels/Station.js";

describe("Station Panel V2", () => {
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

  describe("StationPrimaryChildren", () => {
    it("should render primary children with format type", async () => {
      const formatProps: FormatProps = {
        type: "station",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationPrimaryChildren
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
        type: "station",
        formatTraits: ["showUnitLabel"],
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationPrimaryChildren
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

  describe("StationSecondaryChildren", () => {
    it("should render secondary children with all format options", async () => {
      const formatProps: FormatProps = {
        type: "station",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      expect(renderedComponent.getByLabelText("Sign Option")).to.exist;
      expect(renderedComponent.getByLabelText("Station Offset")).to.exist;
      expect(renderedComponent.getByLabelText("Station Separator")).to.exist;
      expect(renderedComponent.getByLabelText("Keep Decimal Point")).to.exist;
      expect(renderedComponent.getByLabelText("Show Trailing Zeros")).to.exist;
      expect(renderedComponent.getByLabelText("Keep Single Zero")).to.exist;
      expect(renderedComponent.getByLabelText("Zero Empty")).to.exist;
    });

    it("should handle station offset changes", async () => {
      const formatProps: FormatProps = {
        type: "station",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const input = renderedComponent.getByLabelText("Station Offset");
      fireEvent.change(input, { target: { value: "100" } });

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        stationOffsetSize: 100,
      });
    });

    it("should handle station separator changes", async () => {
      const formatProps: FormatProps = {
        type: "station",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const input = renderedComponent.getByLabelText("Station Separator");
      fireEvent.change(input, { target: { value: "-" } });

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        stationSeparator: "-",
      });
    });

    it("should handle keep decimal point changes", async () => {
      const formatProps: FormatProps = {
        type: "station",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText("Keep Decimal Point");
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["keepDecimalPoint"],
      });
    });

    it("should handle show trailing zeros changes", async () => {
      const formatProps: FormatProps = {
        type: "station",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
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
        type: "station",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
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
        type: "station",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <StationSecondaryChildren
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
  });
});
