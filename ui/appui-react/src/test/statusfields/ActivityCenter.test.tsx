/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { WidgetState } from "@itwin/appui-abstract";
import {
  ActivityCenterField, ConfigurableCreateInfo, ConfigurableUiControlType, MessageManager, StatusBar, StatusBarWidgetControl,
  WidgetDef,
} from "../../appui-react";
import TestUtils, { mount } from "../TestUtils";
import { MockRender } from "@itwin/core-frontend";

describe("ActivityCenter", () => {

  class AppStatusBarWidgetControl extends StatusBarWidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }

    public getReactNode(): React.ReactNode {
      return (
        <>
          <ActivityCenterField />
        </>
      );
    }
  }
  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await MockRender.App.startup();
    await TestUtils.initializeUiFramework();

    const statusBarWidgetDef = new WidgetDef({
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
    });
    widgetControl = statusBarWidgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;

  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await MockRender.App.shutdown();
  });

  it("Status Bar with ActivityCenterField should mount", () => {
    mount(<StatusBar widgetControl={widgetControl} />);
  });

  it("MessageManager.onActivityMessageUpdatedEvent should be handled", async () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} />);
    const message = "Test";
    const percentage = 50;
    MessageManager.setupActivityMessageValues(message, percentage);
    await TestUtils.flushAsyncOperations();
    const field = wrapper.find(ActivityCenterField).at(0);
    expect(field.state("message")).to.eq(message);
    expect(field.state("percentage")).to.eq(percentage);
    expect(field.state("isActivityMessageVisible")).to.be.true;
  });

  it("MessageManager.onActivityMessageCancelledEvent should be handled", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} />);

    MessageManager.setupActivityMessageValues("Test", 50);
    const field = wrapper.find(ActivityCenterField).at(0);
    expect(field.state("isActivityMessageVisible")).to.be.true;

    MessageManager.endActivityMessage(false);
    expect(field.state("isActivityMessageVisible")).to.be.false;
  });

  it("click should be handled", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} />);

    MessageManager.setupActivityMessageValues("Test", 50);
    wrapper.update();

    const field = wrapper.find(ActivityCenterField).at(0);
    expect(field.state("isActivityMessageVisible")).to.be.true;

    const clickable = wrapper.find("div.open-activity-message");
    clickable.simulate("click");
    expect(field.state("isActivityMessageVisible")).to.be.true;
  });

});
