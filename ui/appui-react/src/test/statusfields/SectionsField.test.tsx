/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { MockRender } from "@itwin/core-frontend";
import { WidgetState } from "@itwin/appui-abstract";
import { ConfigurableCreateInfo, ConfigurableUiControlType } from "../../appui-react/configurableui/ConfigurableUiControl";
import { StatusBar } from "../../appui-react/statusbar/StatusBar";
import { StatusBarWidgetControl } from "../../appui-react/statusbar/StatusBarWidgetControl";
import { SectionsStatusField } from "../../appui-react/statusfields/SectionsField";
import { WidgetDef } from "../../appui-react/widgets/WidgetDef";
import TestUtils, { userEvent } from "../TestUtils";
import { render, screen } from "@testing-library/react";

describe(`SectionsField`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(()=>{
    theUserTo = userEvent.setup();
  });
  class AppStatusBarWidgetControl extends StatusBarWidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }

    public getReactNode(): React.ReactNode {
      return (
        <>
          <SectionsStatusField />
        </>
      );
    }
  }

  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup();

    const statusBarWidgetDef = new WidgetDef({
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
    });
    widgetControl = statusBarWidgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should open/close on click", async () => {
    render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} />
    </Provider>);

    await theUserTo.click(screen.getByTitle("tools.sectionTools").firstElementChild!);

    expect(screen.getByText("tools.sectionTools", {selector: ".nz-title"})).to.exist;

    await theUserTo.click(screen.getByTitle("tools.sectionTools").firstElementChild!);

    expect(screen.queryByText("tools.sectionTools")).to.be.null;
  });

});
