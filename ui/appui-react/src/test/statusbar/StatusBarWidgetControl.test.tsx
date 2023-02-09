/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { WidgetState } from "@itwin/appui-abstract";
import { ConfigurableUiControlType, StatusBar, StatusBarWidgetControl, WidgetDef } from "../../appui-react";
import TestUtils, { selectorMatches } from "../TestUtils";
import { render, screen } from "@testing-library/react";
import { MockRender } from "@itwin/core-frontend";
import { EmptyLocalization } from "@itwin/core-common";

describe("StatusBarWidgetControl", () => {
  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup({ localization: new EmptyLocalization() });

    const widgetDef = WidgetDef.create({
      id: "statusBar",
      defaultState: WidgetState.Open,
    });
    widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("StatusBarWidgetControl should be instantiated", () => {
    expect(widgetControl).to.not.be.undefined;
    if (widgetControl)
      expect(widgetControl.getType()).to.eq(ConfigurableUiControlType.StatusBarWidget);

    render(<StatusBar widgetControl={widgetControl} />);

    expect(screen.getByTestId("my-inner-node")).to.satisfy(selectorMatches(
      ".nz-footer-footer .nz-indicators div"
    ));
  });

});
