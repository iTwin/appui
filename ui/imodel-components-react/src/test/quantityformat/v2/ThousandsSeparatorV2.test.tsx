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
import {
  ThousandsSeparatorSelector,
  UseThousandsSeparator,
} from "../../../imodel-components-react/quantityformat/v2/internal/ThousandsSeparatorV2.js";

describe("ThousandsSeparatorV2", () => {
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

  describe("UseThousandsSeparator", () => {
    it("should render thousands separator checkbox", async () => {
      const formatProps: FormatProps = {
        type: "decimal",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <UseThousandsSeparator
          formatProps={formatProps}
          onChange={onFormatChange}
        />
      );

      expect(
        renderedComponent.getByLabelText(
          "QuantityFormat.labels.useThousandSeparatorLabel"
        )
      ).to.exist;
    });

    it("should handle thousands separator checkbox toggle", async () => {
      const formatProps: FormatProps = {
        type: "decimal",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <UseThousandsSeparator
          formatProps={formatProps}
          onChange={onFormatChange}
        />
      );

      const checkbox = renderedComponent.getByLabelText(
        "QuantityFormat.labels.useThousandSeparatorLabel"
      );
      fireEvent.click(checkbox);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        formatTraits: ["use1000Separator"],
      });
    });
  });

  describe("ThousandsSeparatorSelector", () => {
    it("should not render when Use1000Separator trait is not set", async () => {
      const formatProps: FormatProps = {
        type: "decimal",
        precision: 2,
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ThousandsSeparatorSelector
          formatProps={formatProps}
          onChange={onFormatChange}
        />
      );

      expect(
        renderedComponent.queryByText(
          "QuantityFormat.labels.thousandSeparatorLabel"
        )
      ).to.be.null;
    });

    it("should render when Use1000Separator trait is set", async () => {
      const formatProps: FormatProps = {
        type: "decimal",
        precision: 2,
        formatTraits: ["use1000Separator"],
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ThousandsSeparatorSelector
          formatProps={formatProps}
          onChange={onFormatChange}
        />
      );

      expect(
        renderedComponent.getByText(
          "QuantityFormat.labels.thousandSeparatorLabel"
        )
      ).to.exist;
    });

    it("should handle thousands separator changes", async () => {
      const formatProps: FormatProps = {
        type: "decimal",
        precision: 2,
        formatTraits: ["use1000Separator"],
        thousandSeparator: ",",
        decimalSeparator: ".",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ThousandsSeparatorSelector
          formatProps={formatProps}
          onChange={onFormatChange}
        />
      );

      const selector = renderedComponent.getByRole("combobox");
      fireEvent.click(selector);

      // Test selecting a different separator
      const spaceOption = renderedComponent.getByRole("option", {
        name: "QuantityFormat.thousand_separator.point",
      });
      fireEvent.click(spaceOption);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        thousandSeparator: ".",
        decimalSeparator: ",", // Should change to avoid conflict
      });
    });

    it("should update decimal separator when thousands separator conflicts", async () => {
      const formatProps: FormatProps = {
        type: "decimal",
        precision: 2,
        formatTraits: ["use1000Separator"],
        thousandSeparator: ",",
        decimalSeparator: ".",
      };
      const onFormatChange = vi.fn();

      const renderedComponent = render(
        <ThousandsSeparatorSelector
          formatProps={formatProps}
          onChange={onFormatChange}
        />
      );

      const selector = renderedComponent.getByRole("combobox");
      fireEvent.click(selector);

      // Test selecting period (.) which should change decimal separator to comma
      const periodOption = renderedComponent.getByRole("option", {
        name: "QuantityFormat.thousand_separator.point",
      });
      fireEvent.click(periodOption);

      expect(onFormatChange).toHaveBeenCalledWith({
        ...formatProps,
        thousandSeparator: ".",
        decimalSeparator: ",", // Should change to avoid conflict
      });
    });
  });
});
