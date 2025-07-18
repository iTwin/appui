/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { KeepDecimalPointV2 } from "../../../imodel-components-react/quantityformat/v2/internal/KeepDecimalPointV2.js";

describe("KeepDecimalPointV2", () => {
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

  it("should render with default keep decimal point setting", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <KeepDecimalPointV2 formatProps={formatProps} onChange={onChange} />
    );

    expect(
      renderedComponent.getByLabelText(
        "QuantityFormat.labels.keepDecimalPointLabel"
      )
    ).to.exist;
    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.keepDecimalPointLabel"
    ) as HTMLInputElement;
    expect(checkbox.checked).to.be.false;
  });

  it("should render with keep decimal point enabled", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      formatTraits: ["keepDecimalPoint"],
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <KeepDecimalPointV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.keepDecimalPointLabel"
    ) as HTMLInputElement;
    expect(checkbox.checked).to.be.true;
  });

  it("should call onChange when keep decimal point checkbox changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <KeepDecimalPointV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.keepDecimalPointLabel"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      formatTraits: ["keepDecimalPoint"],
    });
  });

  it("should disable keep decimal point when disabled prop is true", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <KeepDecimalPointV2
        formatProps={formatProps}
        onChange={onChange}
        disabled={true}
      />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.keepDecimalPointLabel"
    ) as HTMLInputElement;
    expect(checkbox.disabled).to.be.true;
  });

  it("should handle toggling keep decimal point off", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      formatTraits: ["keepDecimalPoint", "trailZeroes"],
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <KeepDecimalPointV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.keepDecimalPointLabel"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      formatTraits: ["trailZeroes"],
    });
  });
});
