/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tool } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import { ToolUtilities } from "../imodel-components-react.js";

describe("ToolUtilities.defineIcon", () => {
  it("should define an icon property for a specified ToolType", () => {
    class MyTool extends Tool {}

    const ToolWithIcon = ToolUtilities.defineIcon(MyTool, <span>My SVG</span>);
    expect(ToolWithIcon.iconElement).toBeDefined();
    expect(MyTool).toHaveProperty("iconElement");

    const { getByText } = render(ToolWithIcon.iconElement);
    getByText("My SVG");
  });

  it("should override `iconElement`", () => {
    class MyTool extends Tool {}

    const ToolWithIcon = ToolUtilities.defineIcon(MyTool, <span>My SVG</span>);

    class MyNewTool extends ToolWithIcon {
      public static override iconElement = (<span>My new SVG</span>);
    }

    const { getByText } = render(MyNewTool.iconElement);
    getByText("My new SVG");
  });

  it("should create an instance from a newly returned type", () => {
    class MyTool extends Tool {
      public test() {}
    }
    const spy = vi.spyOn(MyTool.prototype, "test");

    const ToolWithIcon = ToolUtilities.defineIcon(MyTool, <span>My SVG</span>);
    new ToolWithIcon().test();
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe("ToolUtilities.isWithIcon", () => {
  it("static `iconElement` property", () => {
    expect(ToolUtilities.isWithIcon(Tool)).toBe(false);

    class MyTool extends Tool {
      public static iconElement = (<span>My SVG</span>);
    }
    expect(ToolUtilities.isWithIcon(MyTool)).toBe(true);

    class ToolWithIncorrectType extends Tool {
      public static iconElement = "icon-placeholder";
    }
    expect(ToolUtilities.isWithIcon(ToolWithIncorrectType)).toBe(false);
  });

  it("`defineIcon` helper", () => {
    class MyTool extends Tool {}
    expect(ToolUtilities.isWithIcon(MyTool)).toBe(false);

    const ToolWithIcon = ToolUtilities.defineIcon(MyTool, <span>My SVG</span>);
    expect(ToolUtilities.isWithIcon(MyTool)).toBe(true);
    expect(ToolUtilities.isWithIcon(ToolWithIcon)).toBe(true);
  });
});
