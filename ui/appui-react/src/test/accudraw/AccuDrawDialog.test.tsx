/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import { CompassMode, IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { Orientation } from "@itwin/core-react";
import { TestUtils } from "../TestUtils";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { AccuDrawDialog } from "../../appui-react/accudraw/AccuDrawDialog";
import { UiFramework } from "../../appui-react";

describe("AccuDrawDialog", () => {
  beforeEach(async () => {
    await NoRenderApp.startup({
      accuDraw: new FrameworkAccuDraw(),
    });
    await TestUtils.initializeUiFramework();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
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

  it("should set focus to Home on Esc key", () => {
    const spy = vi.spyOn(UiFramework.keyboardShortcuts, "setFocusToHome");
    const component = render(
      <AccuDrawDialog opened={true} dialogId="accudraw" />
    );

    component.baseElement.dispatchEvent(
      new KeyboardEvent("keyup", { key: Key.Escape })
    );
    expect(spy).toHaveBeenCalledOnce();

    (UiFramework.keyboardShortcuts.setFocusToHome as any).restore();
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
