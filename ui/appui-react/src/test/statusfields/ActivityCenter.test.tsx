/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { fireEvent, render } from "@testing-library/react";
import { WidgetState } from "@itwin/appui-abstract";
import { ConfigurableUiControlType, MessageManager, StatusBar, StatusBarWidgetControl, WidgetDef } from "../../appui-react";
import TestUtils from "../TestUtils";
import { MockRender } from "@itwin/core-frontend";

describe("ActivityCenter", () => {
  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await MockRender.App.startup();
    await TestUtils.initializeUiFramework();

    const widgetDef = WidgetDef.create({
      id: "statusBar",
      defaultState: WidgetState.Open,
    });
    widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;

  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await MockRender.App.shutdown();
  });

  it("should show ActivityCenterField", async () => {
    const { findByText, findByTitle } = render(<StatusBar widgetControl={widgetControl} />);
    const message = "Test";
    const percentage = 50;
    MessageManager.setupActivityMessageValues(message, percentage);

    await findByText("50 activityCenter.percentComplete");
    await findByTitle("Test-activityCenter.moreDetails");
  });

  it("should hide ActivityCenterField", async () => {
    const { findByText, queryAllByText } = render(<StatusBar widgetControl={widgetControl} />);

    MessageManager.setupActivityMessageValues("Test", 50);
    await findByText(/activityCenter.percentComplete/);

    MessageManager.endActivityMessage(false);
    expect(queryAllByText(/activityCenter.percentComplete/)).to.length(0);
  });

  it("click should be handled", async () => {
    const { findByTitle } = render(<StatusBar widgetControl={widgetControl} />);

    MessageManager.setupActivityMessageValues("Test", 50);
    const field = await findByTitle(/activityCenter.moreDetails/);

    const spy = sinon.spy(MessageManager, "setupActivityMessageValues");
    fireEvent.click(field);
    sinon.assert.calledOnce(spy);
  });

});
