/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { HSVColor } from "@itwin/core-common";
import { fireEvent, render } from "@testing-library/react";
import { TestUtils } from "../TestUtils.js";
import { SaturationPicker } from "../../imodel-components-react/color/SaturationPicker.js";

/* eslint-disable @typescript-eslint/no-deprecated */

describe("<SaturationPicker />", () => {
  const hsv = new HSVColor(30, 30, 30);

  beforeEach(async () => {
    await TestUtils.initializeUiIModelComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  const satDivStyle: React.CSSProperties = {
    top: `0`,
    left: `0`,
    width: `200px`,
    height: `200px`,
    position: `absolute`,
  };

  const createBubbledEvent = (type: string, props = {}) => {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, props);
    return event;
  };

  it("picker should render", () => {
    const renderedComponent = render(
      <div style={satDivStyle}>
        <SaturationPicker hsv={hsv} />
      </div>
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("Use keyboard to change saturation", async () => {
    let index = 0;

    // starting value is 30
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
    const satValues = [
      29, 30, 31, 30, 0, 100, 30, 30, 20, 30, 40, 30, 0, 100, 30, 30,
    ];
    const vValues = [
      30, 29, 30, 31, 30, 30, 0, 100, 30, 20, 30, 40, 30, 30, 0, 100,
    ];

    const spyOnPick = vi.fn();

    function handleSaturationChange(newHsv: HSVColor): void {
      expect(newHsv.s).toEqual(satValues[index]);
      expect(newHsv.v).toEqual(vValues[index]);
      spyOnPick();
    }

    const renderedComponent = render(
      <div style={satDivStyle}>
        <SaturationPicker
          hsv={hsv}
          onSaturationChange={handleSaturationChange}
        />
      </div>
    );
    const sliderDiv = renderedComponent.getByTestId("saturation-region");
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

  describe("using mouse location", () => {
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
        width: 200,
        x: 0,
        y: 0,
      });
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it("point @0,0", () => {
      function handleSaturationChange(newHsv: HSVColor): void {
        expect(newHsv.s).toEqual(0);
        expect(newHsv.v).toEqual(100);
      }

      const renderedComponent = render(
        <div style={satDivStyle}>
          <SaturationPicker
            hsv={hsv}
            onSaturationChange={handleSaturationChange}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("saturation-region");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 0, pageY: 0 })
      );
    });

    it("drag @0,0 -> @200,200 ", () => {
      let expectedS = 0;
      let expectedV = 100;

      function handleSaturationChange(newHsv: HSVColor): void {
        expect(Math.abs(newHsv.s - expectedS)).to.be.lessThan(2);
        expect(Math.abs(newHsv.v - expectedV)).to.be.lessThan(2);
      }

      const renderedComponent = render(
        <div style={satDivStyle}>
          <SaturationPicker
            hsv={hsv}
            onSaturationChange={handleSaturationChange}
          />
        </div>
      );
      const pointerDiv = renderedComponent.getByTestId("saturation-pointer");
      const sliderDiv = renderedComponent.getByTestId("saturation-region");
      pointerDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 0, pageY: 0 })
      );

      expectedS = 50;
      expectedV = 50;
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousemove", { pageX: 100, pageY: 100 })
      );

      expectedS = 100;
      expectedV = 0;
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 200, pageY: 200 })
      );
    });

    it("point @200,200", () => {
      function handleSaturationChange(newHsv: HSVColor): void {
        expect(newHsv.s).toEqual(100);
        expect(newHsv.v).toEqual(0);
      }

      const renderedComponent = render(
        <div style={satDivStyle}>
          <SaturationPicker
            hsv={hsv}
            onSaturationChange={handleSaturationChange}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("saturation-region");
      sliderDiv.dispatchEvent(
        createBubbledEvent("mousedown", { pageX: 200, pageY: 200 })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("mouseup", { pageX: 200, pageY: 200 })
      );
    });
  });

  describe("using touch location", () => {
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
        width: 200,
        x: 0,
        y: 0,
      });
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it("point @0,0", () => {
      function handleSaturationChange(newHsv: HSVColor): void {
        expect(newHsv.s).toEqual(0);
        expect(newHsv.v).toEqual(100);
      }

      const renderedComponent = render(
        <div style={satDivStyle}>
          <SaturationPicker
            hsv={hsv}
            onSaturationChange={handleSaturationChange}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("saturation-region");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", { touches: [{ pageX: 0, pageY: 0 }] })
      );
    });

    it("drag @0,0 -> @200,200 ", () => {
      let expectedS = 0;
      let expectedV = 100;

      function handleSaturationChange(newHsv: HSVColor): void {
        expect(Math.abs(newHsv.s - expectedS)).to.be.lessThan(1);
        expect(Math.abs(newHsv.v - expectedV)).to.be.lessThan(1);
      }

      const renderedComponent = render(
        <div style={satDivStyle}>
          <SaturationPicker
            hsv={hsv}
            onSaturationChange={handleSaturationChange}
          />
        </div>
      );
      const pointerDiv = renderedComponent.getByTestId("saturation-pointer");
      const sliderDiv = renderedComponent.getByTestId("saturation-region");
      pointerDiv.dispatchEvent(
        createBubbledEvent("touchstart", { touches: [{ pageX: 0, pageY: 0 }] })
      );

      expectedS = 50;
      expectedV = 50;
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchmove", {
          touches: [{ pageX: 100, pageY: 100 }],
        })
      );

      expectedS = 100;
      expectedV = 0;
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", {
          touches: [{ pageX: 200, pageY: 200 }],
        })
      );
    });

    it("point @200,200", () => {
      function handleSaturationChange(newHsv: HSVColor): void {
        expect(newHsv.s).toEqual(100);
        expect(newHsv.v).toEqual(0);
      }

      const renderedComponent = render(
        <div style={satDivStyle}>
          <SaturationPicker
            hsv={hsv}
            onSaturationChange={handleSaturationChange}
          />
        </div>
      );
      const sliderDiv = renderedComponent.getByTestId("saturation-region");
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchstart", {
          touches: [{ pageX: 200, pageY: 200 }],
        })
      );
      sliderDiv.dispatchEvent(
        createBubbledEvent("touchend", {
          touches: [{ pageX: 200, pageY: 200 }],
        })
      );
    });
  });
});
