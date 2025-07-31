/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import {
  AzimuthPrimaryChildren,
  AzimuthSecondaryChildren,
} from "../../../imodel-components-react/quantityformat/v2/panels/Azimuth.js";

describe("Azimuth Panel V2", () => {
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
    persistenceUnit = await unitsProvider.findUnitByName("Units.ARC_DEG");
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

  describe("AzimuthPrimaryChildren", () => {
    it("should render primary children with format type", async () => {
      const formatProps: FormatProps = {
        type: "azimuth",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <AzimuthPrimaryChildren
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
        type: "azimuth",
        formatTraits: ["showUnitLabel"],
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <AzimuthPrimaryChildren
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

  describe("AzimuthSecondaryChildren", () => {
    it("should render secondary children container", async () => {
      const formatProps: FormatProps = {
        type: "azimuth",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <AzimuthSecondaryChildren
          formatProps={formatProps}
          onFormatChange={onFormatChange}
          unitsProvider={unitsProvider}
          persistenceUnit={persistenceUnit}
        />
      );

      expect(renderedComponent.container.firstChild).to.exist;
    });
  });
});
