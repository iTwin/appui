/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { expect, vi } from "vitest";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { FormatPanelV2 } from "../../../imodel-components-react/quantityformat/v2/FormatPanelV2.js";

describe("FormatPanelV2", () => {
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

  it("should render decimal format panel", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    // Check primary children
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.type")).to
      .exist;
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.precision"))
      .to.exist;

    // Check that secondary children are collapsed by default
    expect(renderedComponent.getByText("Advanced Options")).to.exist;

    // Expand secondary children
    const expandButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(expandButton);

    await waitFor(() => {
      const comboBox = within(
        renderedComponent
          .getByText("QuantityFormat.labels.signOptionLabel")
          .closest(".format-inline-row")!
      ).getByRole("combobox");
      expect(comboBox).to.exist;

      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.decimalSeparatorLabel"
        )
      ).to.exist;
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
  });

  it("should render scientific format panel", async () => {
    const formatProps: FormatProps = {
      type: "scientific",
      precision: 3,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    // Check primary children
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.type")).to
      .exist;
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.precision"))
      .to.exist;

    // Expand secondary children
    const expandButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(expandButton);

    await waitFor(() => {
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
  });

  it("should render station format panel", async () => {
    const formatProps: FormatProps = {
      type: "station",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    // Check primary children
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.type")).to
      .exist;
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.precision"))
      .to.exist;

    // Expand secondary children
    const expandButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(expandButton);

    await waitFor(() => {
      const comboBox = within(
        renderedComponent
          .getByText("QuantityFormat.labels.signOptionLabel")
          .closest(".format-inline-row")!
      ).getByRole("combobox");
      expect(comboBox).to.exist;
      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.stationOffsetLabel"
        )
      ).to.exist;
      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.stationSeparatorLabel"
        )
      ).to.exist;
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
  });

  it("should render fractional format panel", async () => {
    const formatProps: FormatProps = {
      type: "fractional",
      precision: 4,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    // Check primary children
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.type")).to
      .exist;
    expect(renderedComponent.getByLabelText("QuantityFormat.labels.precision"))
      .to.exist;

    // Expand secondary children
    const expandButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(expandButton);

    await waitFor(() => {
      const comboBox = within(
        renderedComponent
          .getByText("QuantityFormat.labels.signOptionLabel")
          .closest(".format-inline-row")!
      ).getByRole("combobox");
      expect(comboBox).to.exist;
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
  });

  it("should handle format type changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    const formatTypeSelector = within(
      renderedComponent
        .getByText("QuantityFormat.labels.type")
        .closest(".format-type-row")!
    ).getByRole("combobox");
    fireEvent.click(formatTypeSelector);
    fireEvent.click(
      renderedComponent.getByRole("option", {
        name: "QuantityFormat.scientific",
      })
    );

    expect(onFormatChange).toHaveBeenCalledWith({
      ...formatProps,
      type: "Scientific",
      scientificType: "Normalized",
      precision: 6,
    });
  });

  it("should handle precision changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    const precisionSelector = within(
      renderedComponent
        .getByText("QuantityFormat.labels.precision")
        .closest(".format-inline-row")!
    ).getByRole("combobox");
    fireEvent.click(precisionSelector);

    await waitFor(() => {
      fireEvent.click(
        renderedComponent.getByRole("option", {
          name: "QuantityFormat.decimal_precision.four",
        })
      );
    });

    expect(onFormatChange).toHaveBeenCalledWith({
      ...formatProps,
      precision: 4,
    });
  });

  it("should handle unit label changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    const unitLabelCheckbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.appendUnitLabel"
    );
    fireEvent.click(unitLabelCheckbox);

    expect(onFormatChange).toHaveBeenCalledWith({
      ...formatProps,
      formatTraits: ["showUnitLabel"],
    });
  });

  it("should handle secondary children changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    // Expand secondary children
    const expandButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(expandButton);

    await waitFor(() => {
      const keepDecimalPointCheckbox = renderedComponent.getByLabelText(
        "QuantityFormat.labels.keepDecimalPointLabel"
      );
      fireEvent.click(keepDecimalPointCheckbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["keepDecimalPoint"],
      });
    });
  });

  it("should collapse secondary children when clicking hide options", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      precision: 2,
    };
    const onFormatChange = vi.fn();

    const renderedComponent = render(
      <FormatPanelV2
        formatProps={formatProps}
        onFormatChange={onFormatChange}
        unitsProvider={unitsProvider}
        persistenceUnit={persistenceUnit}
      />
    );

    // Expand secondary children
    const expandButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(expandButton);

    await waitFor(() => {
      const comboBox = within(
        renderedComponent
          .getByText("QuantityFormat.labels.signOptionLabel")
          .closest(".format-inline-row")!
      ).getByRole("combobox");
      expect(comboBox).to.exist;
    });

    // Collapse secondary children
    const collapseButton = renderedComponent.getByText("Advanced Options");
    fireEvent.click(collapseButton);

    await waitFor(() => {
      expect(
        renderedComponent.queryByLabelText(
          "QuantityFormat.labels.signOptionLabel"
        )
      ).to.not.exist;
    });
  });
});
