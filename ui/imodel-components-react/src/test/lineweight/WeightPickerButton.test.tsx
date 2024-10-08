/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { fireEvent, render } from "@testing-library/react";
import { WeightPickerButton } from "../../imodel-components-react/lineweight/WeightPickerButton.js";

describe("<WeightPickerButton/>", () => {
  const colorDef = ColorDef.create(ColorByName.blue);
  const activeWeight = 3;
  const weights = [1, 2, 3, 4, 5, 6];

  it("should render", () => {
    const renderedComponent = render(
      <WeightPickerButton
        activeWeight={activeWeight}
        weights={weights}
        colorDef={colorDef}
      />
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("button press should open popup and allow weight selection", async () => {
    const spyOnWeightPick = vi.fn();

    function handleWeightPick(weight: number): void {
      expect(weight).toEqual(1);
      spyOnWeightPick();
    }

    const renderedComponent = render(
      <WeightPickerButton
        activeWeight={activeWeight}
        weights={weights}
        onLineWeightPick={handleWeightPick}
        dropDownTitle="test-title"
      />
    );
    expect(renderedComponent.getByTestId("components-weightpicker-button")).to
      .exist;
    const pickerButton = renderedComponent.getByTestId(
      "components-weightpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    let expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("false");

    fireEvent.click(pickerButton);
    expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("true");

    // getByTestId will trigger failure if not found so need to add separate 'expect' to test
    const popupDiv = renderedComponent.getByTestId(
      "components-weightpicker-popup-lines"
    );
    if (popupDiv) {
      const title = renderedComponent.getByText("test-title");
      expect(title).toBeTruthy();

      const firstColorButton = popupDiv.firstChild as HTMLElement;
      expect(firstColorButton).toBeTruthy();
      fireEvent.click(firstColorButton);
      expect(spyOnWeightPick).toHaveBeenCalledOnce();
    }
  });

  it("button press should open popup and allow weight selection (Enter to close)", async () => {
    const spyOnWeightPick = vi.fn();

    function buildIdForWeight(weight: number): string {
      return `ui-core-lineweight-${weight}`;
    }

    function handleWeightPick(weight: number): void {
      expect(weight).toEqual(2);
      spyOnWeightPick();
    }

    const renderedComponent = render(
      <WeightPickerButton
        activeWeight={activeWeight}
        weights={weights}
        onLineWeightPick={handleWeightPick}
        dropDownTitle="test-title"
      />
    );
    expect(renderedComponent.getByTestId("components-weightpicker-button")).to
      .exist;
    const pickerButton = renderedComponent.getByTestId(
      "components-weightpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    let expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("false");

    fireEvent.click(pickerButton);
    expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("true");

    // getByTestId will trigger failure if not found so need to add separate 'expect' to test
    const popupDiv = renderedComponent.getByTestId(
      "components-weightpicker-popup-lines"
    );
    if (popupDiv) {
      const title = renderedComponent.getByText("test-title");
      expect(title).toBeTruthy();

      const firstColorButton = popupDiv.firstChild as HTMLElement;
      expect(firstColorButton).toBeTruthy();

      // wait for button to receive focus
      await new Promise((r) => {
        setTimeout(r, 80);
      });

      // focus on weight 2 and press enter key which should close popup
      const node = popupDiv.querySelector(
        `#${buildIdForWeight(2)}`
      ) as HTMLElement;
      if (node) {
        node.focus();
        fireEvent.keyDown(popupDiv, { key: "Enter" });

        expect(spyOnWeightPick).toHaveBeenCalledOnce();
      }
    }
  });

  it("button press should open popup and move selection via arrow (Enter to close)", async () => {
    const spyOnWeightPick = vi.fn();

    function handleWeightPick(weight: number): void {
      expect(weight).toEqual(2);
      spyOnWeightPick();
    }

    const renderedComponent = render(
      <WeightPickerButton
        activeWeight={activeWeight}
        weights={weights}
        onLineWeightPick={handleWeightPick}
        dropDownTitle="test-title"
      />
    );
    expect(renderedComponent.getByTestId("components-weightpicker-button")).to
      .exist;
    const pickerButton = renderedComponent.getByTestId(
      "components-weightpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    let expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("false");

    fireEvent.click(pickerButton);
    expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("true");

    // getByTestId will trigger failure if not found so need to add separate 'expect' to test
    const popupDiv = renderedComponent.getByTestId(
      "components-weightpicker-popup-lines"
    );
    if (popupDiv) {
      const title = renderedComponent.getByText("test-title");
      expect(title).toBeTruthy();

      const firstColorButton = popupDiv.firstChild as HTMLElement;
      expect(firstColorButton).toBeTruthy();

      // wait for button to receive focus
      await new Promise((r) => {
        setTimeout(r, 80);
      });

      fireEvent.keyDown(popupDiv, { key: "ArrowDown" }); // down to 4
      fireEvent.keyDown(popupDiv, { key: "ArrowUp" }); // back up to 3
      fireEvent.keyDown(popupDiv, { key: "ArrowUp" }); // up to 2
      fireEvent.keyDown(popupDiv, { key: "Enter" });
      expect(spyOnWeightPick).toHaveBeenCalledOnce();
    }
  });

  it("button press should open popup, move selection via arrow & wraparound as needed", async () => {
    const spyOnWeightPick = vi.fn();

    function handleWeightPick(weight: number): void {
      expect(weight).toEqual(5);
      spyOnWeightPick();
    }

    const renderedComponent = render(
      <WeightPickerButton
        activeWeight={activeWeight}
        weights={weights}
        onLineWeightPick={handleWeightPick}
        dropDownTitle="test-title"
      />
    );
    expect(renderedComponent.getByTestId("components-weightpicker-button")).to
      .exist;
    const pickerButton = renderedComponent.getByTestId(
      "components-weightpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    let expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("false");

    fireEvent.click(pickerButton);
    expandedAttribute = pickerButton.getAttribute("aria-expanded");
    expect(expandedAttribute).toEqual("true");

    // getByTestId will trigger failure if not found so need to add separate 'expect' to test
    const popupDiv = renderedComponent.getByTestId(
      "components-weightpicker-popup-lines"
    );
    if (popupDiv) {
      const title = renderedComponent.getByText("test-title");
      expect(title).toBeTruthy();

      const firstColorButton = popupDiv.firstChild as HTMLElement;
      expect(firstColorButton).toBeTruthy();

      // wait for button to receive focus
      await new Promise((r) => {
        setTimeout(r, 80);
      });

      fireEvent.keyDown(popupDiv, { key: "ArrowDown" }); // down to 4
      fireEvent.keyDown(popupDiv, { key: "ArrowDown" }); // down to 5
      fireEvent.keyDown(popupDiv, { key: "ArrowDown" }); // down to 6
      fireEvent.keyDown(popupDiv, { key: "ArrowDown" }); // wraparound to 1
      fireEvent.keyDown(popupDiv, { key: "ArrowUp" }); // back down to 6
      fireEvent.keyDown(popupDiv, { key: "ArrowUp" }); // up to 5
      fireEvent.keyDown(popupDiv, { key: "Enter" });
      expect(spyOnWeightPick).toHaveBeenCalledOnce();
    }
  });

  it("readonly - button press should not open popup", async () => {
    const renderedComponent = render(
      <WeightPickerButton
        activeWeight={activeWeight}
        weights={weights}
        readonly={true}
      />
    );
    const pickerButton = renderedComponent.getByTestId(
      "components-weightpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.click(pickerButton);
    // use queryByTestId to avoid exception if it is not found.
    const corePopupDiv = renderedComponent.queryByTestId("core-popup");
    expect(corePopupDiv).toEqual(null);
  });
});
