/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { HSVColor } from "@itwin/core-common";
import { fireEvent, render } from "@testing-library/react";
import { TestUtils } from "../TestUtils.js";
import { HueSlider } from "../../imodel-components-react/color/HueSlider.js";

/* eslint-disable @typescript-eslint/no-deprecated */

describe("<HueSlider />", () => {
  const hsv = new HSVColor(60, 100, 50);

  beforeEach(async () => {
    await TestUtils.initializeUiIModelComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  const createBubbledEvent = (type: string, props = {}) => {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, props);
    return event;
  };

  const hueDivStyle: React.CSSProperties = {
    height: `120px`,
  };

  it("horizontal slider should render", () => {
    const renderedComponent = render(
      <HueSlider hsv={hsv} isHorizontal={true} />
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("vertical slider should render", () => {
    const renderedComponent = render(
      <div style={hueDivStyle}>
        <HueSlider hsv={hsv} isHorizontal={false} />
      </div>
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("Use keyboard to pick hue", async () => {
    let index = 0;

    // starting value is 60
    const keys = [
      "ArrowLeft",
      "ArrowDown",
      "ArrowRight",
      "ArrowUp",
      "Home",
      "End",
      "PageDown",
      "PageUp",
    ];
    const values = [
      59, 59, 61, 61, 0, 359, 0, 120, 50, 50, 70, 70, 0, 359, 0, 240,
    ];

    const spyOnPick = vi.fn();
    function handleHueChange(newColor: HSVColor): void {
      expect(newColor.h).toEqual(values[index]);
      spyOnPick();
    }

    const renderedComponent = render(
      <HueSlider hsv={hsv} onHueChange={handleHueChange} isHorizontal={true} />
    );
    const sliderDiv = renderedComponent.getByTestId("hue-slider");
    expect(sliderDiv).toBeTruthy();
    expect(sliderDiv.tagName).toEqual("DIV");

    keys.forEach((keyName) => {
      fireEvent.keyDown(sliderDiv, { key: keyName });
      expect(spyOnPick).toHaveBeenCalledOnce();
      spyOnPick.mockReset();
      index = index + 1;
    });

    keys.forEach((keyName) => {
      fireEvent.keyDown(sliderDiv, { key: keyName, ctrlKey: true });
      expect(spyOnPick).toHaveBeenCalledOnce();
      spyOnPick.mockReset();
      index = index + 1;
    });
  });

  describe("using mouse location - horizontal ", () => {
    const getBoundingClientRect = Element.prototype.getBoundingClientRect;

    // force getBoundingClientRect to return info we need during testing
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 30,
        left: 0,
        right: 0,
        toJSON: () => {},
        top: 0,
        width: 200,
        x: 0,
        y: 0,
      });
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it("point @0,0", () => {
      function handleHueChange(newColor: HSVColor): void {
        expect(newColor.h).toEqual(0);
      }

      const renderedComponent = render(
        <HueSlider
          hsv={hsv}
          onHueChange={handleHueChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 0, pageY: 0 })
      );
    });

    it("point @200,0", () => {
      let value = 0;
      function handleHueChange(newColor: HSVColor): void {
        expect(Math.abs(newColor.h - value)).to.be.lessThan(2);
      }

      const renderedComponent = render(
        <HueSlider
          hsv={hsv}
          onHueChange={handleHueChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      const pointerDiv = renderedComponent.getByTestId("hue-pointer");
      pointerDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );
      value = 180;
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousemove", { pageX: 100, pageY: 0 })
      );
      value = 359;
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 200, pageY: 0 })
      );
    });
  });

  describe("using touch location - horizontal", () => {
    const getBoundingClientRect = Element.prototype.getBoundingClientRect;

    // force getBoundingClientRect to return info we need during testing
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 30,
        left: 0,
        right: 0,
        toJSON: () => {},
        top: 0,
        width: 200,
        x: 0,
        y: 0,
      });
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it("point @0,0", () => {
      function handleHueChange(newColor: HSVColor): void {
        expect(newColor.h).toEqual(0);
      }

      const renderedComponent = render(
        <HueSlider
          hsv={hsv}
          onHueChange={handleHueChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 0, pageY: 0 }] })
      );
    });

    it("point @200,0", () => {
      let value = 0;
      function handleHueChange(newColor: HSVColor): void {
        expect(Math.abs(newColor.h - value)).to.be.lessThan(2);
      }

      const renderedComponent = render(
        <HueSlider
          hsv={hsv}
          onHueChange={handleHueChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      const pointerDiv = renderedComponent.getByTestId("hue-pointer");
      pointerDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );
      value = 180;
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchmove", { touches: [{ pageX: 100, pageY: 0 }] })
      );
      value = 359;
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 200, pageY: 0 }] })
      );
    });
  });

  describe("using mouse location - vertical ", () => {
    const getBoundingClientRect = Element.prototype.getBoundingClientRect;

    // force getBoundingClientRect to return info we need during testing
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 200,
        left: 0,
        right: 0,
        toJSON: () => {},
        top: 0,
        width: 30,
        x: 0,
        y: 0,
      });
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it("point @0,0", () => {
      function handleHueChange(newColor: HSVColor): void {
        expect(newColor.h).toEqual(359);
      }

      const renderedComponent = render(
        <div style={hueDivStyle}>
          <HueSlider
            hsv={hsv}
            onHueChange={handleHueChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 0, pageY: 0 })
      );
    });

    it("point @0,200", () => {
      function handleHueChange(newColor: HSVColor): void {
        expect(newColor.h).toEqual(0);
      }

      const renderedComponent = render(
        <div style={hueDivStyle}>
          <HueSlider
            hsv={hsv}
            onHueChange={handleHueChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 200 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 0, pageY: 200 })
      );
    });
  });

  describe("using touch location - vertical", () => {
    const getBoundingClientRect = Element.prototype.getBoundingClientRect;

    // force getBoundingClientRect to return info we need during testing
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => ({
        bottom: 0,
        height: 200,
        left: 0,
        right: 0,
        toJSON: () => {},
        top: 0,
        width: 30,
        x: 0,
        y: 0,
      });
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it("point @0,0", () => {
      function handleHueChange(newColor: HSVColor): void {
        expect(newColor.h).toEqual(359);
      }

      const renderedComponent = render(
        <div style={hueDivStyle}>
          <HueSlider
            hsv={hsv}
            onHueChange={handleHueChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 0, pageY: 0 }] })
      );
    });

    it("point @200,0", () => {
      function handleHueChange(newColor: HSVColor): void {
        expect(newColor.h).toEqual(0);
      }

      const renderedComponent = render(
        <div style={hueDivStyle}>
          <HueSlider
            hsv={hsv}
            onHueChange={handleHueChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("hue-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", {
          touches: [{ pageX: 0, pageY: 200 }],
        })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 0, pageY: 200 }] })
      );
    });
  });
});
