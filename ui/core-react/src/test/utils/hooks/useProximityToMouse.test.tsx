/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { userEvent } from "@testing-library/user-event";
import {
  calculateBackdropFilterBlur,
  calculateBoxShadowOpacity,
  calculateProximityScale,
  calculateToolbarOpacity,
  getToolbarBackdropFilter,
  getToolbarBackgroundColor,
  getToolbarBoxShadow,
  TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT,
  TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT,
  TOOLBAR_OPACITY_DEFAULT,
  useProximityToMouse,
  WidgetElementSet,
} from "../../../core-react/utils/hooks/useProximityToMouse.js";

const ProximityToMouse = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const elementSet = new WidgetElementSet();
  elementSet.add(ref);
  const scale = useProximityToMouse(elementSet, true);

  return <div ref={ref}>Scale: {scale}</div>;
};

describe("useProximityToMouse", () => {
  it("should trigger useEffect handler processing", async () => {
    const theUserTo = userEvent.setup();
    render(<ProximityToMouse />);

    await theUserTo.pointer({ coords: { x: 50, y: 50, pageX: 50, pageY: 50 } });
    expect(screen.getByText("Scale: 1")).to.exist;

    // Due to this bug https://github.com/testing-library/user-event/issues/1037
    // I "move" the reference element on top of moving the pointer, as pageX/pageY is always 0;
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ x: 350, y: 350, height: 50, width: 50 })
    );

    await theUserTo.pointer({ coords: { x: 0, y: 0, pageX: 0, pageY: 0 } });
    expect(screen.getByText("Scale: 0")).to.exist;
  });
});

describe("calculateProximityScale", () => {
  it("should calculate the correct proximity scale", () => {
    let proximityScale = calculateProximityScale(50);
    expect(proximityScale).toEqual(0.5);

    proximityScale = calculateProximityScale(50, false, 100);
    expect(proximityScale).toEqual(0.5);

    proximityScale = calculateProximityScale(100, false, 200);
    expect(proximityScale).toEqual(0.5);

    proximityScale = calculateProximityScale(100, false, 60);
    expect(proximityScale).toEqual(0.0);

    proximityScale = calculateProximityScale(50, true, 100);
    expect(proximityScale).toEqual(1.0);

    proximityScale = calculateProximityScale(200, true, 100);
    expect(proximityScale).toEqual(0);
  });
});

describe("calculateToolbarOpacity", () => {
  it("should calculate the correct toolbar opacity", () => {
    let toolbarOpacity = calculateToolbarOpacity(1.0);
    expect(toolbarOpacity).toEqual(TOOLBAR_OPACITY_DEFAULT);

    toolbarOpacity = calculateToolbarOpacity(0.5);
    expect(toolbarOpacity).toEqual(TOOLBAR_OPACITY_DEFAULT / 2);
  });
});

describe("calculateBoxShadowOpacity", () => {
  it("should calculate the correct box-shadow opacity", () => {
    let boxShadowOpacity = calculateBoxShadowOpacity(1.0);
    expect(boxShadowOpacity).toEqual(TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT);

    boxShadowOpacity = calculateBoxShadowOpacity(0.5);
    expect(boxShadowOpacity).toEqual(TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT / 2);
  });
});

describe("calculateBackdropFilterBlur", () => {
  it("should calculate the correct backdrop-filter blur", () => {
    let backdropFilterBlur = calculateBackdropFilterBlur(1.0);
    expect(backdropFilterBlur).toEqual(TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT);

    backdropFilterBlur = calculateBackdropFilterBlur(0.5);
    expect(backdropFilterBlur).toEqual(
      TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT / 2
    );
  });
});

describe("getToolbarBackgroundColor", () => {
  it("should calculate the correct toolbar background-color", () => {
    let backgroundColor = getToolbarBackgroundColor(1.0);
    expect(backgroundColor).toEqual(`hsl(var(--iui-color-background-hsl) / 1)`);

    backgroundColor = getToolbarBackgroundColor(0.5);
    expect(backgroundColor).toEqual(
      `hsl(var(--iui-color-background-hsl) / 0.5)`
    );
  });
});

describe("getToolbarBoxShadow", () => {
  it("should calculate the correct toolbar box-shadow", () => {
    let boxShadow = getToolbarBoxShadow(0.35);
    expect(boxShadow).toEqual(`0 1px 3px 0 rgba(0, 0, 0, 0.35)`);

    boxShadow = getToolbarBoxShadow(0.175);
    expect(boxShadow).toEqual(`0 1px 3px 0 rgba(0, 0, 0, 0.175)`);
  });
});

describe("getToolbarBackdropFilter", () => {
  it("should calculate the correct toolbar backdrop-filter", () => {
    let backdropFilter = getToolbarBackdropFilter(10);
    expect(backdropFilter).toEqual(`blur(10px)`);

    backdropFilter = getToolbarBackdropFilter(5);
    expect(backdropFilter).toEqual(`blur(5px)`);
  });
});
