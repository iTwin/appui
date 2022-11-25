/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { Provider } from "react-redux";
import { WidgetState } from "@itwin/appui-abstract";
import { IModelApp, MockRender } from "@itwin/core-frontend";
import { ConfigurableCreateInfo, ConfigurableUiControlType } from "../../appui-react/configurableui/ConfigurableUiControl";
import { StatusBar } from "../../appui-react/statusbar/StatusBar";
import { StatusBarWidgetControl } from "../../appui-react/statusbar/StatusBarWidgetControl";
import { ViewAttributesStatusField } from "../../appui-react/statusfields/ViewAttributes";
import { WidgetDef } from "../../appui-react/widgets/WidgetDef";
import TestUtils, { userEvent } from "../TestUtils";
import { render, screen } from "@testing-library/react";

describe(`ViewAttributes`, () => {
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
          <ViewAttributesStatusField />
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

    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByText("listTools.viewAttributes", {selector: ".nz-title"})).to.exist;

    await theUserTo.click(screen.getAllByRole("button")[0]);

    expect(screen.queryByText("listTools.viewAttributes")).to.be.null;
  });

  it("should process Checkbox clicks", async () => {
    render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} />
    </Provider>);

    await theUserTo.click(screen.getByRole("button"));
    expect(screen.getByText("listTools.acs").previousElementSibling).to.have.property("checked", false);

    await theUserTo.click(screen.getByText("listTools.acs"));
    expect(screen.getByText("listTools.acs").previousElementSibling).to.have.property("checked", true);

    const spy = sinon.stub(IModelApp.tools, "run");
    await theUserTo.click(screen.getByText("listTools.camera"));
    expect(screen.getByText("listTools.camera").previousElementSibling).to.have.property("checked", true);
    expect(spy).to.have.been.calledWith("View.ToggleCamera", sinon.match.any);

    await theUserTo.click(screen.getAllByRole("button")[0]);
  });
});
