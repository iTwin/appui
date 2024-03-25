/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import * as React from "react";
import { Key } from "ts-key-enum";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp, QuantityType } from "@itwin/core-frontend";
import { QuantityInput } from "../../imodel-components-react/inputs/QuantityInput";
import { TestUtils } from "../TestUtils";

describe("QuantityInput", () => {
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;
  function requestNextAnimation() {}

  before(async () => {
    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
    });
    await TestUtils.initializeUiIModelComponents();
    await NoRenderApp.startup();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiIModelComponents();
    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );
  });

  it("should render input for Length", () => {
    const initialLength = 1; // 1 meter
    const spyOnChange = sinon.spy();
    const component = render(
      <QuantityInput
        initialValue={initialLength}
        quantityType={QuantityType.Length}
        onQuantityChange={spyOnChange}
      />
    );
    const input = component.getByTestId("components-parsed-input");
    fireEvent.change(input, { target: { value: "2.5" } });
    expect(spyOnChange).not.to.have.been.called;
    fireEvent.keyDown(input, { key: Key.Enter });
    expect(spyOnChange).to.have.been.calledOnce;
  });

  const overrideLengthFormats = {
    metric: {
      composite: {
        includeZero: true,
        spacer: " ",
        units: [{ label: "cm", name: "Units.CM" }],
      },
      formatTraits: ["keepSingleZero", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
    },
    imperial: {
      composite: {
        includeZero: true,
        spacer: " ",
        units: [{ label: "in", name: "Units.IN" }],
      },
      formatTraits: ["keepSingleZero", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
    },
    usCustomary: {
      composite: {
        includeZero: true,
        spacer: " ",
        units: [{ label: "in", name: "Units.IN" }],
      },
      formatTraits: ["keepSingleZero", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
    },
    usSurvey: {
      composite: {
        includeZero: true,
        spacer: " ",
        units: [{ label: "in", name: "Units.US_SURVEY_IN" }],
      },
      formatTraits: ["keepSingleZero", "showUnitLabel"],
      precision: 4,
      type: "Decimal",
    },
  };

  it("should process ESC key", async () => {
    const initialLength = 1; // 1 meter
    const spyOnChange = sinon.spy();

    // set active unit system to be metric and wait to make sure quantity format cache is set
    await IModelApp.quantityFormatter.setActiveUnitSystem("metric");

    const component = render(
      <QuantityInput
        initialValue={initialLength}
        quantityType={QuantityType.Length}
        onQuantityChange={spyOnChange}
      />
    );

    const input = component.getByTestId(
      "components-parsed-input"
    ) as HTMLInputElement;
    const initialValue = input.value;
    fireEvent.change(input, { target: { value: "2.5" } });
    fireEvent.keyDown(input, { key: Key.Escape });
    expect(spyOnChange).not.to.have.been.called; // value did not change after ESC was pressed
    expect(initialValue).toEqual(input.value);
    fireEvent.change(input, { target: { value: "3.5" } });
    fireEvent.keyDown(input, { key: Key.Enter });
    expect(spyOnChange).to.have.been.called;
    expect(input.value).toEqual("3.5 m");

    // set active unit system to be imperial and wait to make sure quantity format cache is set
    await act(async () => {
      await IModelApp.quantityFormatter.setActiveUnitSystem("imperial");
    });
    expect(input.value).toEqual("3'-3 3/8\"");

    // set override for length to inches and insure proper format is returned
    await act(async () => {
      await IModelApp.quantityFormatter.setOverrideFormats(
        QuantityType.Length,
        overrideLengthFormats
      );
    });
    expect(input.value).toEqual("39.3701 in");

    await act(async () => {
      await IModelApp.quantityFormatter.clearOverrideFormats(
        QuantityType.Length
      );
    });
    expect(input.value).toEqual("3'-3 3/8\"");
  });

  it("should attach 'components-parsed-input-has-error' when bad input", async () => {
    const initialLength = 1; // 1 meter
    const spyOnChange = sinon.spy();

    const component = render(
      <QuantityInput
        initialValue={initialLength}
        quantityType={QuantityType.Length}
        onQuantityChange={spyOnChange}
      />
    );
    const input = component.getByTestId(
      "components-parsed-input"
    ) as HTMLInputElement;
    const initialValue = input.value;
    input.focus();
    fireEvent.change(input, { target: { value: "abc" } });
    input.blur();
    await waitFor(() => {
      expect(input.classList.contains("components-parsed-input-has-error")).to
        .be.true;
    });
    fireEvent.keyDown(input, { key: Key.Escape });
    expect(spyOnChange).not.to.have.been.called; // value did not change after ESC was pressed
    const currentValue = input.value;
    expect(input.classList.contains("components-parsed-input-has-error")).to.be
      .false;
    expect(initialValue).toEqual(currentValue);
  });
});
