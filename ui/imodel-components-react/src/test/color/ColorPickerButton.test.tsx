/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { fireEvent, render } from "@testing-library/react";
import { ColorPickerButton } from "../../imodel-components-react/color/ColorPickerButton.js";

/* eslint-disable @typescript-eslint/no-deprecated */

describe("<ColorPickerButton/>", () => {
  const colorDef = ColorDef.create(ColorByName.blue);

  it("should render", () => {
    const renderedComponent = render(
      <ColorPickerButton initialColor={colorDef} />
    );
    expect(renderedComponent).toBeTruthy();
    expect(
      renderedComponent.container.querySelector(".components-caret")
    ).toEqual(null);
  });

  it("should render with caret", () => {
    const renderedComponent = render(
      <ColorPickerButton initialColor={colorDef} showCaret />
    );
    expect(renderedComponent).toBeTruthy();
    expect(
      renderedComponent.container.querySelector(".components-caret")
    ).toBeTruthy();
  });

  it("should re-render properly when initial color prop changes", () => {
    const renderedComponent = render(
      <ColorPickerButton initialColor={colorDef} />
    );
    expect(renderedComponent).toBeTruthy();
    const button = renderedComponent.getByTestId(
      "components-colorpicker-button"
    );
    expect(button.getAttribute("data-value")).toEqual("rgb(0,0,255)"); // blue

    const newColorDef = ColorDef.create(ColorByName.red);
    renderedComponent.rerender(
      <ColorPickerButton initialColor={newColorDef} />
    );
    expect(renderedComponent).toBeTruthy();
    expect(button.getAttribute("data-value")).toEqual("rgb(255,0,0)"); // red

    const colorDefWithAlpha = ColorDef.create(0x80ff0000);
    renderedComponent.rerender(
      <ColorPickerButton initialColor={colorDefWithAlpha} />
    );
    expect(renderedComponent).toBeTruthy();
    expect(button.getAttribute("data-value")).toEqual("rgba(0,0,255,0.50)"); // blue with alpha
  });

  it("round swatches with title should render", () => {
    const renderedComponent = render(
      <ColorPickerButton initialColor={colorDef} round={true} />
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("button press should open popup and allow color selection", async () => {
    const spyOnColorPick = vi.fn();

    function handleColorPick(color: ColorDef): void {
      expect(color.tbgr).toEqual(ColorByName.red);
      spyOnColorPick();
    }

    const renderedComponent = render(
      <ColorPickerButton
        initialColor={colorDef}
        onColorPick={handleColorPick}
        dropDownTitle="test-title"
        showCaret
      />
    );
    const button = renderedComponent.getByTestId(
      "components-colorpicker-button"
    );
    expect(button.getAttribute("data-value")).toEqual("rgb(0,0,255)"); // blue
    expect(renderedComponent.getByTestId("caret-down")).toBeTruthy();
    fireEvent.click(button);
    expect(renderedComponent.getByTestId("caret-up")).toBeTruthy();

    const popupDiv = renderedComponent.getByTestId(
      "components-colorpicker-popup-colors"
    );
    expect(popupDiv).toBeTruthy();
    if (popupDiv) {
      const title = renderedComponent.getByText("test-title");
      expect(title).toBeTruthy();

      const firstColorButton = popupDiv.firstChild as HTMLElement;
      expect(firstColorButton).toBeTruthy();
      fireEvent.click(firstColorButton);

      expect(spyOnColorPick).toHaveBeenCalledOnce();
      expect(button.getAttribute("data-value")).toEqual("rgb(255,0,0)"); // red
    }

    // ensure update prop is handled
    const newColorDef = ColorDef.create(ColorByName.green); // green = 0x008000,
    renderedComponent.rerender(
      <ColorPickerButton
        initialColor={newColorDef}
        onColorPick={handleColorPick}
        dropDownTitle="test-title"
        showCaret
      />
    );
    expect(button.getAttribute("data-value")).toEqual("rgb(0,128,0)"); // green
  });

  it("readonly - button press should not open popup", async () => {
    const renderedComponent = render(
      <ColorPickerButton
        initialColor={colorDef}
        colorDefs={[ColorDef.blue, ColorDef.black, ColorDef.red]}
        readonly={true}
      />
    );
    const pickerButton = renderedComponent.getByTestId(
      "components-colorpicker-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.click(pickerButton);

    const corePopupDiv = renderedComponent.queryByTestId("core-popup");
    expect(corePopupDiv).toBeTruthy();
    if (corePopupDiv)
      expect(corePopupDiv.classList.contains("visible")).toEqual(false);
  });
});
