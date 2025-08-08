/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { StationOffsetV2 } from "../../../imodel-components-react/quantityformat/v2/internal/StationOffsetV2.js";

describe("StationOffsetV2", () => {
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;
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
    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );
  });

  it("should render with default station offset", async () => {
    const formatProps: FormatProps = {
      type: "station",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <StationOffsetV2 formatProps={formatProps} onChange={onChange} />
    );

    const comboBox = within(
      renderedComponent.getByLabelText(
        "QuantityFormat.labels.stationOffsetLabel"
      )
    ).getByRole("combobox");
    expect(comboBox).to.exist;
    expect(renderedComponent.getByText("QuantityFormat.station_size.two")).to
      .exist;
  });

  it("should render with specified station offset", async () => {
    const formatProps: FormatProps = {
      type: "station",
      stationOffsetSize: 3,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <StationOffsetV2 formatProps={formatProps} onChange={onChange} />
    );

    const comboBox = within(
      renderedComponent.getByLabelText(
        "QuantityFormat.labels.stationOffsetLabel"
      )
    ).getByRole("combobox");
    expect(comboBox).to.exist;
    expect(renderedComponent.getByText("QuantityFormat.station_size.three")).to
      .exist;
  });

  it("should call onChange when station offset changes", async () => {
    const formatProps: FormatProps = {
      type: "station",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <StationOffsetV2 formatProps={formatProps} onChange={onChange} />
    );

    const comboBox = within(
      renderedComponent.getByLabelText(
        "QuantityFormat.labels.stationOffsetLabel"
      )
    ).getByRole("combobox");

    fireEvent.click(comboBox);
    fireEvent.click(
      renderedComponent.getByRole("option", {
        name: "QuantityFormat.station_size.three",
      })
    );

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      stationOffsetSize: 3,
    });
  });

  it("should disable station offset when disabled prop is true", async () => {
    const formatProps: FormatProps = {
      type: "station",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <StationOffsetV2
        formatProps={formatProps}
        onChange={onChange}
        disabled={true}
      />
    );

    const comboBox = within(
      renderedComponent.getByLabelText(
        "QuantityFormat.labels.stationOffsetLabel"
      )
    ).getByRole("combobox");
    expect(
      comboBox.hasAttribute("aria-disabled") ||
        comboBox.hasAttribute("disabled")
    ).to.be.true;
  });
});
