/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { ZeroEmptyV2 } from "../../../imodel-components-react/quantityformat/v2/internal/ZeroEmptyV2.js";

describe("ZeroEmptyV2", () => {
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

  it("should render with default zero empty setting", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ZeroEmptyV2 formatProps={formatProps} onChange={onChange} />
    );

    expect(
      renderedComponent.getByLabelText("QuantityFormat.labels.zeroEmptyLabel")
    ).to.exist;
    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.zeroEmptyLabel"
    ) as HTMLInputElement;
    expect(checkbox.checked).to.be.false;
  });

  it("should render with zero empty enabled", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      formatTraits: ["zeroEmpty"],
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ZeroEmptyV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.zeroEmptyLabel"
    ) as HTMLInputElement;
    expect(checkbox.checked).to.be.true;
  });

  it("should call onChange when zero empty checkbox changes", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ZeroEmptyV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.zeroEmptyLabel"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      formatTraits: ["zeroEmpty"],
    });
  });

  it("should disable zero empty when disabled prop is true", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ZeroEmptyV2
        formatProps={formatProps}
        onChange={onChange}
        disabled={true}
      />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.zeroEmptyLabel"
    ) as HTMLInputElement;
    expect(checkbox.disabled).to.be.true;
  });

  it("should handle toggling zero empty off", async () => {
    const formatProps: FormatProps = {
      type: "decimal",
      formatTraits: ["zeroEmpty", "trailZeroes"],
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ZeroEmptyV2 formatProps={formatProps} onChange={onChange} />
    );

    const checkbox = renderedComponent.getByLabelText(
      "QuantityFormat.labels.zeroEmptyLabel"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith({
      ...formatProps,
      formatTraits: ["trailZeroes"],
    });
  });
});
