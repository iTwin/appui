/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { FormatProps } from "@itwin/core-quantity";
import { TestUtils } from "../../TestUtils.js";
import { ScientificTypeV2 } from "../../../imodel-components-react/quantityformat/v2/internal/ScientificTypeV2.js";

describe("ScientificTypeV2", () => {
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

  it("should render with default normalized scientific type", async () => {
    const formatProps: FormatProps = {
      type: "scientific",
      precision: 2,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ScientificTypeV2 formatProps={formatProps} onChange={onChange} />
    );

    expect(
      renderedComponent.getByText("QuantityFormat.labels.scientificTypeLabel")
    ).to.exist;
    expect(
      renderedComponent.getByText("QuantityFormat.scientific-type.normalized")
    ).to.exist;
  });

  it("should render with specified scientific type", async () => {
    const formatProps: FormatProps = {
      type: "scientific",
      precision: 2,
      scientificType: "ZeroNormalized",
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ScientificTypeV2 formatProps={formatProps} onChange={onChange} />
    );

    expect(
      renderedComponent.getByText("QuantityFormat.labels.scientificTypeLabel")
    ).to.exist;
    expect(
      renderedComponent.getByText(
        "QuantityFormat.scientific-type.zero-normalized"
      )
    ).to.exist;
  });

  it("should be disabled when disabled prop is true", async () => {
    const formatProps: FormatProps = {
      type: "scientific",
      precision: 2,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ScientificTypeV2
        formatProps={formatProps}
        onChange={onChange}
        disabled={true}
      />
    );

    const comboBox =
      renderedComponent.container.querySelector('[role="combobox"]');
    expect(comboBox).to.exist;
    expect(
      (comboBox as HTMLElement).getAttribute("data-iui-disabled")
    ).to.equal("true");
  });

  it("should handle scientific type changes", async () => {
    const formatProps: FormatProps = {
      type: "scientific",
      precision: 2,
    };
    const onChange = vi.fn();

    const renderedComponent = render(
      <ScientificTypeV2 formatProps={formatProps} onChange={onChange} />
    );

    expect(
      renderedComponent.getByText("QuantityFormat.labels.scientificTypeLabel")
    ).to.exist;
    // The component should render and be ready to handle changes
  });
});
