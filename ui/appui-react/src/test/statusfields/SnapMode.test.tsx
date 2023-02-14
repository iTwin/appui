/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { MockRender, SnapMode } from "@itwin/core-frontend";
import { WidgetState } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo, ConfigurableUiControlType, SnapModeField, StatusBar, StatusBarWidgetControl, UiFramework,
  WidgetDef,
} from "../../appui-react";
import TestUtils from "../TestUtils";

describe("SnapModeField", () => {

  class AppStatusBarWidgetControl extends StatusBarWidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }

    public getReactNode(): React.ReactNode {
      return (
        <>
          <SnapModeField />
        </>
      );
    }
  }

  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    // use mock renderer so standards tools are registered.
    await MockRender.App.startup();
    await TestUtils.initializeUiFramework();

    const widgetDef = WidgetDef.create({
      id: "statusBar",
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
    });
    widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await MockRender.App.shutdown();
  });

  it("Status Bar with SnapModes Field should render", () => {
    const wrapper = render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} />
    </Provider>);

    const button = wrapper.container.querySelector(".uifw-statusbar-indicator");
    expect(button).not.to.be.null;
    fireEvent.click(button!);

    const iconContainer = wrapper.container.querySelector(".uifw-icon");
    expect(iconContainer).not.to.be.null;

    const popup = wrapper.getByTestId("core-popup");
    const snaps = popup.querySelectorAll(".nz-footer-snapMode-snap");
    expect(snaps.length).to.eql(7);

    fireEvent.click(button!); // Closes popup
  });

  it("Validate multiple snaps mode", () => {
    // force to use multi-snap
    UiFramework.setAccudrawSnapMode(SnapMode.Intersection | SnapMode.NearestKeypoint);
    const snapMode = UiFramework.getAccudrawSnapMode();
    expect(snapMode).to.be.equal(SnapMode.Intersection | SnapMode.NearestKeypoint);
    const wrapper = render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} />
    </Provider>);
    const iconContainer = wrapper.container.querySelector(".uifw-icon");
    expect(iconContainer).not.to.be.null;
  });

});
