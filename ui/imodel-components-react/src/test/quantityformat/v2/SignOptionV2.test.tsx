/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { ShowSignOption } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { SignOptionV2 } from "../../../imodel-components-react/quantityformat/v2/internal/SignOptionV2.js";

describe("SignOptionV2", () => {
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

  it("should render with default showSignOption", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <SignOptionV2 formatProps={formatProps} onChange={onChange} />
    );

    const comboBox = within(
      renderedComponent
        .getByText("QuantityFormat.labels.signOptionLabel")
        .closest(".icr-quantityFormat-v2-formatInlineRow")!
    ).getByRole("combobox");
    expect(comboBox).to.exist;
    expect(
      renderedComponent.getByText("QuantityFormat.sign_option.onlyNegative")
    ).to.exist;
  });

  it("should render with specified showSignOption", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      showSignOption: ShowSignOption.SignAlways,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <SignOptionV2 formatProps={formatProps} onChange={onChange} />
    );

    const comboBox = within(
      renderedComponent
        .getByText("QuantityFormat.labels.signOptionLabel")
        .closest(".icr-quantityFormat-v2-formatInlineRow")!
    ).getByRole("combobox");
    expect(comboBox).to.exist;
    expect(renderedComponent.getByText("QuantityFormat.sign_option.signAlways"))
      .to.exist;
  });

  it("should call onChange when sign option changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      showSignOption: ShowSignOption.OnlyNegative,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <SignOptionV2 formatProps={formatProps} onChange={onChange} />
    );

    const comboBox = within(
      renderedComponent
        .getByText("QuantityFormat.labels.signOptionLabel")
        .closest(".icr-quantityFormat-v2-formatInlineRow")!
    ).getByRole("combobox");
    fireEvent.click(comboBox);
    fireEvent.click(
      renderedComponent.getByRole("option", {
        name: "QuantityFormat.sign_option.signAlways",
      })
    );

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      showSignOption: ShowSignOption.SignAlways,
    });
  });

  it("should render help tooltip", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <SignOptionV2 formatProps={formatProps} onChange={onChange} />
    );

    const tooltipButton = renderedComponent.container.querySelector(
      ".icr-quantityFormat-v2-formatHelpTooltip"
    );
    expect(tooltipButton).to.exist;
  });

  it("should handle disabled state", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <SignOptionV2
        formatProps={formatProps}
        onChange={onChange}
        disabled={true}
      />
    );

    const comboBox = within(
      renderedComponent
        .getByText("QuantityFormat.labels.signOptionLabel")
        .closest(".icr-quantityFormat-v2-formatInlineRow")!
    ).getByRole("combobox");
    expect(
      comboBox.hasAttribute("aria-disabled") ||
        comboBox.hasAttribute("disabled")
    ).to.be.true;
  });
});
