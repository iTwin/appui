/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { MockRender, NotifyMessageDetails, OutputMessagePriority } from "@itwin/core-frontend";
import { WidgetState } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo, ConfigurableUiControlType, MessageCenterField, MessageManager, StatusBar, StatusBarWidgetControl,
  UiFramework, WidgetDef,
} from "../../appui-react";
import TestUtils, { childStructure, userEvent } from "../TestUtils";
import { render, screen } from "@testing-library/react";
import { EmptyLocalization } from "@itwin/core-common";

describe(`MessageCenter`, () => {
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
          <MessageCenterField />
        </>
      );
    }
  }

  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup({localization: new EmptyLocalization()});

    UiFramework.controls.unregister("AppStatusBar");
    UiFramework.controls.register("AppStatusBar", AppStatusBarWidgetControl);

    const widgetDef = WidgetDef.create({
      id: "statusBar",
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
    });
    widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("Message Center should support all message types", async () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const infoMessage = new NotifyMessageDetails(OutputMessagePriority.Info, "Info text.");
    MessageManager.addMessage(infoMessage);
    const warningMessage = new NotifyMessageDetails(OutputMessagePriority.Warning, "Warning text.");
    MessageManager.addMessage(warningMessage);
    const errorMessage = new NotifyMessageDetails(OutputMessagePriority.Error, "Error text.");
    MessageManager.addMessage(errorMessage);
    const fatalMessage = new NotifyMessageDetails(OutputMessagePriority.Fatal, "Fatal text.");
    MessageManager.addMessage(fatalMessage);
    expect(MessageManager.messages.length).to.eq(4);

    render(<StatusBar widgetControl={widgetControl} />);

    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByText("Fatal text.", {
      selector: ".nz-footer-messageCenter-message > .nz-content > span",
    }).parentElement?.parentElement).to.satisfy(childStructure(
      "i.icon-status-rejected.core-message-box-fatal"
    ));
    expect(screen.getByText("Warning text.", {
      selector: ".nz-footer-messageCenter-message > .nz-content > span",
    }).parentElement?.parentElement).to.satisfy(childStructure(
      "i.icon-status-warning.core-message-box-warning"
    ));
    expect(screen.getByText("Error text.", {
      selector: ".nz-footer-messageCenter-message > .nz-content > span",
    }).parentElement?.parentElement).to.satisfy(childStructure(
      "i.icon-status-error.core-message-box-error"
    ));
    expect(screen.getByText("Info text.", {
      selector: ".nz-footer-messageCenter-message > .nz-content > span",
    }).parentElement?.parentElement).to.satisfy(childStructure(
      "i.icon-info.core-message-box-information"
    ));
    await theUserTo.click(screen.getByRole("button"));
  });

  it("Message Center should change tabs", async () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const infoMessage = new NotifyMessageDetails(OutputMessagePriority.Info, "Info text.", "Detail text");
    MessageManager.addMessage(infoMessage);
    const errorMessage = new NotifyMessageDetails(OutputMessagePriority.Error, "Error text.");
    MessageManager.addMessage(errorMessage);
    expect(MessageManager.messages.length).to.eq(2);

    render(<StatusBar widgetControl={widgetControl} />);

    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByText("Info text.")).to.exist;
    expect(screen.getByText("Error text.")).to.exist;
    expect(screen.getByRole("tablist")).to.have.property("childNodes").that.have.lengthOf(2);

    await theUserTo.click(screen.getByText("messageCenter.errors"));

    expect(screen.queryByText("Info text.")).to.be.null;
    expect(screen.getByText("Error text.")).to.exist;

    await theUserTo.click(screen.getByText("messageCenter.all"));

    expect(screen.getByText("Info text.")).to.exist;
    expect(screen.getByText("Error text.")).to.exist;
  });

  it("Message Center should close on outside click", async () => {
    render(<div title="outside"><StatusBar widgetControl={widgetControl} /></div>);
    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByRole("tablist")).to.exist;

    await theUserTo.click(screen.getByTitle("outside"));

    expect(screen.queryByRole("tablist")).to.be.null;
  });

  it("Message Center should open on OpenMessageCenterEvent", () => {
    render(<StatusBar widgetControl={widgetControl} />);
    expect(screen.queryByRole("tablist")).to.be.null;
    MessageManager.onOpenMessageCenterEvent.emit({});
    expect(screen.getByRole("tablist")).to.exist;
  });
});
