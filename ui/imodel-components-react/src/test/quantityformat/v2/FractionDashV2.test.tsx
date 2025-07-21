/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { FractionDashV2 } from "../../../imodel-components-react/quantityformat/v2/internal/FractionDashV2.js";

describe("FractionDashV2", () => {
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

  it("should render with unchecked checkbox when FractionDash trait is not set", async () => {
    const formatProps: FormatProps = {
      type: "fractional",
      precision: 2,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <FractionDashV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.fractionDashLabel"
    );
    expect(checkbox).to.exist;
    expect((checkbox as HTMLInputElement).checked).to.be.false;
  });

  it("should render with checked checkbox when FractionDash trait is set", async () => {
    const formatProps: FormatProps = {
      type: "fractional",
      precision: 2,
      formatTraits: ["fractionDash"],
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <FractionDashV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.fractionDashLabel"
    );
    expect(checkbox).to.exist;
    expect((checkbox as HTMLInputElement).checked).to.be.true;
  });

  it("should handle checkbox changes", async () => {
    const formatProps: FormatProps = {
      type: "fractional",
      precision: 2,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <FractionDashV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.fractionDashLabel"
    );
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      formatTraits: ["fractionDash"],
    });
  });

  it("should be disabled when disabled prop is true", async () => {
    const formatProps: FormatProps = {
      type: "fractional",
      precision: 2,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <FractionDashV2
        formatProps={formatProps}
        onChange={onChange}
        disabled={true}
      />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.fractionDashLabel"
    );
    expect((checkbox as HTMLInputElement).disabled).to.be.true;
  });
});
