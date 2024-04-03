/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { Key } from "ts-key-enum";
import { fireEvent, render } from "@testing-library/react";
import { RelativePosition } from "@itwin/appui-abstract";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { ColorValue } from "@itwin/itwinui-react";
import { TestUtils } from "../TestUtils";
import { ColorPickerPopup } from "../../imodel-components-react/color/ColorPickerPopup";

/* eslint-disable deprecation/deprecation */

describe("<ColorPickerPopup/>", () => {
  const colorDef = ColorDef.create(ColorByName.blue);

  beforeEach(async () => {
    await TestUtils.initializeUiIModelComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  it("should render", () => {
    const component = render(<ColorPickerPopup initialColor={colorDef} />);
    expect(component).toBeTruthy();
    expect(component.container.querySelector(".components-caret")).toEqual(
      null
    );
  });

  it("should render with caret", () => {
    const component = render(
      <ColorPickerPopup initialColor={colorDef} showCaret />
    );
    expect(component).toBeTruthy();
    expect(component.container.querySelector(".components-caret")).toBeTruthy();
  });

  it("button press should open popup and allow color selection", async () => {
    const spy = vi.fn();
    const component = render(
      <ColorPickerPopup initialColor={colorDef} onColorChange={spy} showCaret />
    );
    component.getByTestId("components-colorpicker-popup-button");
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    component.getByTestId("caret-down");
    fireEvent.click(pickerButton);
    component.getByTestId("caret-up");

    const colorSwatch = component.getByRole("button", {
      name: ColorValue.fromTbgr(ColorByName.red)
        .toHslString(true)
        .toUpperCase(),
    });
    fireEvent.click(colorSwatch);

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ tbgr: ColorByName.red })
    );
  });

  it("button press should open popup and allow color selection of specified preset", async () => {
    const spy = vi.fn();

    const component = render(
      <ColorPickerPopup
        initialColor={colorDef}
        popupPosition={RelativePosition.BottomRight}
        colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
        onColorChange={spy}
      />
    );
    expect(component.getByTestId("components-colorpicker-popup-button")).to
      .exist;
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.click(pickerButton);

    const colorSwatch = component.getByRole("button", {
      name: ColorValue.fromTbgr(ColorByName.green)
        .toHslString(true)
        .toUpperCase(),
    });
    fireEvent.click(colorSwatch);

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ tbgr: ColorByName.green })
    );
  });

  it("readonly - button press should not open popup", async () => {
    const component = render(
      <ColorPickerPopup
        initialColor={colorDef}
        colorDefs={[ColorDef.blue, ColorDef.black, ColorDef.red]}
        readonly={true}
      />
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.click(pickerButton);

    const corePopupDiv = component.queryByTestId("core-popup");
    expect(corePopupDiv).toBeTruthy();
    if (corePopupDiv)
      expect(corePopupDiv.classList.contains("visible")).toEqual(false);
  });

  it("button press should open popup and allow trigger color selection when popup closed", async () => {
    const spy = vi.fn();

    const component = render(
      <ColorPickerPopup
        initialColor={colorDef}
        popupPosition={RelativePosition.BottomRight}
        colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
        onClose={spy}
      />
    );
    expect(component.getByTestId("components-colorpicker-popup-button")).to
      .exist;
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    expect(pickerButton.tagName).toEqual("BUTTON");
    fireEvent.click(pickerButton);

    const colorSwatch = component.getByRole("button", {
      name: ColorValue.fromTbgr(ColorDef.green.tbgr)
        .toHslString(true)
        .toUpperCase(),
    });
    fireEvent.click(colorSwatch);

    fireEvent.click(pickerButton); /* close popup */

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ tbgr: ColorDef.green.tbgr })
    );
  });

  it("captureClicks property should stop mouse click propagation", async () => {
    const spy = vi.fn();

    const component = render(
      /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      <div onClick={spy}>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
          captureClicks={true}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);
    expect(spy).not.toBeCalled();

    const colorSwatch = component.getByRole("button", {
      name: ColorValue.fromTbgr(ColorDef.green.tbgr)
        .toHslString(true)
        .toUpperCase(),
    });
    fireEvent.click(colorSwatch);
    expect(spy).not.toBeCalled();
  });

  it("mouse click should propagate if captureClicks not set to true", async () => {
    const spy = vi.fn();

    const component = render(
      /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      <div onClick={spy}>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);
    expect(spy).toHaveBeenCalled();

    const colorSwatch = component.getByRole("button", {
      name: ColorValue.fromTbgr(ColorDef.green.tbgr)
        .toHslString(true)
        .toUpperCase(),
    });
    fireEvent.click(colorSwatch);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("ensure update prop is handled", async () => {
    const component = render(
      <div>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
        />
      </div>
    );

    let colorSwatch = component.container.querySelector(
      "div.components-colorpicker-button-color-swatch"
    ) as HTMLElement;
    expect(colorSwatch.style.backgroundColor).to.eql("rgb(0, 0, 255)");
    // ensure update prop is handled
    const newColorDef = ColorDef.create(ColorByName.green); // green = 0x008000,
    component.rerender(
      <div>
        <ColorPickerPopup
          initialColor={newColorDef}
          popupPosition={RelativePosition.BottomRight}
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
        />
      </div>
    );
    colorSwatch = component.container.querySelector(
      "div.components-colorpicker-button-color-swatch"
    ) as HTMLElement;
    expect(colorSwatch.style.backgroundColor).to.eql("rgb(0, 128, 0)");
  });

  it("ensure closing X is shown", async () => {
    const spyOnClick = vi.fn();

    const component = render(
      <div>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
          captureClicks={true}
          onClick={spyOnClick}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);

    const popupDiv = component.getByTestId("core-popup");
    expect(popupDiv).toBeTruthy();

    const closeButton = component.getByTestId("core-dialog-close");
    fireEvent.click(closeButton);
    await TestUtils.flushAsyncOperations();

    expect(
      component.container.querySelector("button.core-dialog-close")
    ).toBeTruthy();
  });

  it("ensure closing X is NOT shown", async () => {
    const spyOnClick = vi.fn();

    const component = render(
      <div>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          hideCloseButton
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
          captureClicks={true}
          onClick={spyOnClick}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);

    const popupDiv = component.getByTestId("core-popup");
    expect(popupDiv).toBeTruthy();

    expect(popupDiv.querySelector("button.core-dialog-close")).toEqual(null);
  });

  it("ensure rgb values are shown", async () => {
    const spy = vi.fn();
    const component = render(
      <div>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorInputType="rgb"
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
          captureClicks={true}
          onColorChange={spy}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);

    const redInput = component.getByRole("spinbutton", {
      name: "Red",
    }) as HTMLInputElement;
    fireEvent.change(redInput, { target: { value: "100" } });
    expect(redInput.value).toEqual("100");
    fireEvent.keyDown(redInput, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("ensure hsl values are shown", async () => {
    const spy = vi.fn();
    const component = render(
      <div>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorInputType="hsl"
          colorDefs={[ColorDef.green, ColorDef.black, ColorDef.red]}
          captureClicks={true}
          onColorChange={spy}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);

    const hueInput = component.getByRole("spinbutton", {
      name: "Hue",
    }) as HTMLInputElement;
    fireEvent.change(hueInput, { target: { value: "100" } });
    expect(hueInput.value).toEqual("100");
    fireEvent.keyDown(hueInput, { key: Key.Enter });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should not show swatches", async () => {
    const component = render(
      <div>
        <ColorPickerPopup
          initialColor={colorDef}
          popupPosition={RelativePosition.BottomRight}
          colorDefs={[]}
          captureClicks={true}
        />
      </div>
    );
    const pickerButton = component.getByTestId(
      "components-colorpicker-popup-button"
    );
    fireEvent.click(pickerButton);

    const popupDiv = component.getByTestId("core-popup");
    expect(
      popupDiv.querySelectorAll(".components-colorpicker-button-color-swatch")
    ).to.have.length(0);
  });
});
