/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import {
  ScientificPrimaryChildren,
  ScientificSecondaryChildren,
} from "../../../imodel-components-react/quantityformat/v2/panels/Scientific.js";

describe("Scientific Panel V2", () => {
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

  describe("ScientificPrimaryChildren", () => {
    it("should render primary children with format type", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
        precision: 3,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificPrimaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      expect(renderedComponent.getByLabelText("QuantityFormat.labels.type")).to
        .exist;
      expect(
        renderedComponent.getByLabelText("QuantityFormat.labels.precision")
      ).to.exist;
    });

    it("should render unit label controls when showUnitLabel is enabled", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
        formatTraits: ["showUnitLabel"],
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificPrimaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      await waitFor(() => {
        expect(
          renderedComponent.getByLabelText(
            "QuantityFormat.labels.appendUnitLabel"
          )
        ).to.exist;
      });
    });
  });

  describe("ScientificSecondaryChildren", () => {
    it("should render secondary children with all format options", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
        precision: 3,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const comboBox = within(
        renderedComponent
          .getByText("QuantityFormat.labels.signOptionLabel")
          .closest(".format-inline-row")!
      ).getByRole("combobox");
      expect(comboBox).to.exist;
      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.keepDecimalPointLabel"
        )
      ).to.exist;
      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.showTrailZerosLabel"
        )
      ).to.exist;
      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.keepSingleZeroLabel"
        )
      ).to.exist;
      expect(
        renderedComponent.getByLabelText("QuantityFormat.labels.zeroEmptyLabel")
      ).to.exist;
    });

    it("should handle keep decimal point changes", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText(
        "QuantityFormat.labels.keepDecimalPointLabel"
      );
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["keepDecimalPoint"],
      });
    });

    it("should handle show trailing zeros changes", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText(
        "QuantityFormat.labels.showTrailZerosLabel"
      );
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["trailZeroes"],
      });
    });

    it("should handle keep single zero changes", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText(
        "QuantityFormat.labels.keepSingleZeroLabel"
      );
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["keepSingleZero"],
      });
    });

    it("should handle zero empty changes", async () => {
      const formatProps: FormatProps = {
        type: "scientific",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ScientificSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      const checkbox = renderedComponent.getByLabelText(
        "QuantityFormat.labels.zeroEmptyLabel"
      );
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["zeroEmpty"],
      });
    });
  });
});
