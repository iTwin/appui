/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { WidgetState } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo, ConfigurableUiControlType, MessageCenterField, StatusBar, StatusBarWidgetControl, WidgetDef,
} from "../../appui-react";
import TestUtils, { mount } from "../TestUtils";

describe("StatusBarWidgetControl", () => {

  class AppStatusBarWidgetControl extends StatusBarWidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }

    public getReactNode(): React.ReactNode {
      return (
        <>
          <MessageCenterField />
        </>
      );
    }
  }

  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await TestUtils.initializeUiFramework();

    const statusBarWidgetDef = new WidgetDef({ // eslint-disable-line deprecation/deprecation
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
    });
    widgetControl = statusBarWidgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("StatusBarWidgetControl should be instantiated", () => {
    expect(widgetControl).to.not.be.undefined;
    if (widgetControl)
      expect(widgetControl.getType()).to.eq(ConfigurableUiControlType.StatusBarWidget);

    mount(<StatusBar widgetControl={widgetControl} />);
  });

});
