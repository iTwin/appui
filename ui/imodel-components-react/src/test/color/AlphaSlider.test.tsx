/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { AlphaSlider } from "../../imodel-components-react/color/AlphaSlider.js";

/* eslint-disable @typescript-eslint/no-deprecated */

describe("<AlphaSlider />", () => {
  const alpha = 0.5;
  const alphaDivStyle: React.CSSProperties = {
    height: `120px`,
  };

  const createBubbledEvent = (type: string, props = {}) => {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, props);
    return event;
  };

  it("horizontal slider should render", () => {
    const renderedComponent = render(
      <AlphaSlider alpha={alpha} isHorizontal={true} />
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("vertical slider should render", () => {
    const renderedComponent = render(
      <div style={alphaDivStyle}>
        <AlphaSlider alpha={alpha} isHorizontal={false} />
      </div>
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("Use keyboard to pick Transparency - Horizontal", async () => {
    let index = 0;

    // starting value is .5
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
      0.45, 0.45, 0.55, 0.55, 0, 1, 0.25, 0.75, 0.4, 0.4, 0.6, 0.6, 0, 1, 0, 1,
    ];

    const spyOnPick = vi.fn();
    function handleAlphaChange(_transparency: number): void {
      expect(_transparency).toEqual(values[index]);
      spyOnPick();
    }

    const renderedComponent = render(
      <AlphaSlider
        alpha={alpha}
        onAlphaChange={handleAlphaChange}
        isHorizontal={true}
      />
    );
    const sliderDiv = renderedComponent.getByTestId("alpha-slider");
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

  it("Use keyboard to pick Alpha - Vertical", async () => {
    let index = 0;

    // starting value is .5
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
    const values = [0.45, 0.45, 0.55, 0.55, 0, 1, 0.25, 0.75];

    const spyOnPick = vi.fn();
    function handleAlphaChange(_transparency: number): void {
      expect(_transparency).toEqual(values[index]);
      spyOnPick();
    }

    const renderedComponent = render(
      <div style={alphaDivStyle}>
        <AlphaSlider
          alpha={alpha}
          onAlphaChange={handleAlphaChange}
          isHorizontal={false}
        />
      </div>
    );
    const sliderDiv = renderedComponent.getByTestId("alpha-slider");
    expect(sliderDiv).toBeTruthy();
    expect(sliderDiv.tagName).toEqual("DIV");

    keys.forEach((keyName) => {
      fireEvent.keyDown(sliderDiv, { key: keyName });
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
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(0);
      }

      const renderedComponent = render(
        <AlphaSlider
          alpha={alpha}
          onAlphaChange={handleAlphaChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 0, pageY: 0 })
      );
    });

    it("point @200,0", () => {
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(1);
      }

      const renderedComponent = render(
        <AlphaSlider
          alpha={alpha}
          onAlphaChange={handleAlphaChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 200, pageY: 0 })
      );
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
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(0);
      }

      const renderedComponent = render(
        <AlphaSlider
          alpha={alpha}
          onAlphaChange={handleAlphaChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 0, pageY: 0 }] })
      );
    });

    it("point @200,0", () => {
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(1);
      }

      const renderedComponent = render(
        <AlphaSlider
          alpha={alpha}
          onAlphaChange={handleAlphaChange}
          isHorizontal={true}
        />
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", {
          touches: [{ pageX: 200, pageY: 0 }],
        })
      );
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
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(1);
      }

      const renderedComponent = render(
        <div style={alphaDivStyle}>
          <AlphaSlider
            alpha={alpha}
            onAlphaChange={handleAlphaChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 0, pageY: 0 })
      );
    });

    it("point @0,200", () => {
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(0);
      }

      const renderedComponent = render(
        <div style={alphaDivStyle}>
          <AlphaSlider
            alpha={alpha}
            onAlphaChange={handleAlphaChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
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
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(1);
      }

      const renderedComponent = render(
        <div style={alphaDivStyle}>
          <AlphaSlider
            alpha={alpha}
            onAlphaChange={handleAlphaChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 0, pageY: 0 }] })
      );
    });

    it("point @200,0", () => {
      function handleAlphaChange(_transparency: number): void {
        expect(_transparency).toEqual(0);
      }

      const renderedComponent = render(
        <div style={alphaDivStyle}>
          <AlphaSlider
            alpha={alpha}
            onAlphaChange={handleAlphaChange}
            isHorizontal={false}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("alpha-slider");
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
