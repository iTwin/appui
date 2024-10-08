/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ElementTooltip } from "../../appui-react.js";

describe("ElementTooltip", () => {
  it("showTooltip & hideTooltip set isTooltipVisible appropriately", () => {
    const divElement = document.createElement("div");
    render(<ElementTooltip />);

    ElementTooltip.showTooltip(divElement, "Tooltip message", { x: 10, y: 10 });
    ElementTooltip.showTooltip(divElement, "Tooltip message 2", {
      x: 20,
      y: 20,
    });
    expect(ElementTooltip.isTooltipVisible).toEqual(true);

    ElementTooltip.hideTooltip();
    expect(ElementTooltip.isTooltipVisible).toEqual(false);
  });

  it("showTooltip should support HTMLElement", async () => {
    const divElement = document.createElement("div");
    render(<ElementTooltip />);

    const para = document.createElement("p"); // Create a <p> element
    const t = document.createTextNode("HTMLElement message"); // Create a text node
    para.appendChild(t); // Append the text to <p>

    ElementTooltip.showTooltip(divElement, para, { x: 10, y: 10 });
    expect(ElementTooltip.isTooltipVisible).toEqual(true);

    expect(await screen.findByText(`HTMLElement message`)).to.exist;
  });
});
