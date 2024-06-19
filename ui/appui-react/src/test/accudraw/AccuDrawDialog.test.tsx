/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import { CompassMode, IModelApp } from "@itwin/core-frontend";
import { Orientation } from "@itwin/core-react";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { AccuDrawDialog } from "../../appui-react/accudraw/AccuDrawDialog";
import { UiFramework } from "../../appui-react";

describe("AccuDrawDialog", () => {
  beforeEach(() => {
    const accuDraw = new FrameworkAccuDraw();
    vi.spyOn(IModelApp, "accuDraw", "get").mockReturnValue(accuDraw);
  });

  it("should render Rectangular", () => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    render(<AccuDrawDialog opened={true} dialogId="accudraw" />);
  });

  it("should render Polar", () => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
    render(
      <AccuDrawDialog
        opened={true}
        dialogId="accudraw"
        orientation={Orientation.Horizontal}
      />
    );
  });

  it("should call onClose on close", () => {
    const spy = vi.fn();
    const component = render(
      <AccuDrawDialog opened={true} dialogId="accudraw" onClose={spy} />
    );

    const closeButton = component.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(spy).toHaveBeenCalledOnce();
  });
});
