/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import { MockRender } from "@itwin/core-frontend";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo, ConfigurableUiManager, ContentControl, ContentGroup, ContentGroupProps, CoreTools, FrontstageManager, FrontstageProps, FrontstageProvider,
  MessageManager, ModalDialogManager, ModelessDialogManager, PopupManager, WidgetControl,
} from "../../appui-react";
import TestUtils from "../TestUtils";

class TableExampleContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = <div />;
  }
}

describe("ConfigurableUiManager", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup();

    ConfigurableUiManager.initialize();
    ConfigurableUiManager.registerControl("TableExampleContent", TableExampleContentControl);
  });

  after(async () => {
    ConfigurableUiManager.unregisterControl("TableExampleContent");
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("setActiveFrontstageDef passed no argument", async () => {
    await FrontstageManager.setActiveFrontstageDef(undefined);
    expect(FrontstageManager.activeFrontstageDef).to.be.undefined;
  });

  it("addFrontstageProvider & getFrontstageDef", async () => {
    class Frontstage1 extends FrontstageProvider {
      public static stageId = "TestFrontstage2";
      public override get id(): string {
        return Frontstage1.stageId;
      }

      public override get frontstage(): FrontstageProps {
        return {
          id: Frontstage1.stageId,
          defaultTool: CoreTools.selectElementCommand,
          contentGroup: TestUtils.TestContentGroup1,
        };
      }
    }

    ConfigurableUiManager.addFrontstageProvider(new Frontstage1());
    const frontstageDef2 = await FrontstageManager.getFrontstageDef(Frontstage1.stageId);
    expect(frontstageDef2).to.not.be.undefined;
    await FrontstageManager.setActiveFrontstageDef(frontstageDef2);
  });

  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;
    }
  }

  it("getConstructorClassId should return undefined before registration", () => {
    const classId = ConfigurableUiManager.getConstructorClassId(TestWidget);
    expect(classId).to.be.undefined;
  });

  it("registerControl & createConfigurable using same classId", () => {
    ConfigurableUiManager.registerControl("TestWidget", TestWidget);
    expect(ConfigurableUiManager.createControl("TestWidget", "1")).to.not.be.undefined;
  });

  it("registerControl trying to register a classId already registered", () => {
    expect(() => ConfigurableUiManager.registerControl("TestWidget", TestWidget)).to.throw(Error);
  });

  it("unregisterControl removes a registered control", () => {
    ConfigurableUiManager.unregisterControl("TestWidget");
    expect(ConfigurableUiManager.isControlRegistered("TestWidget")).to.be.false;
  });

  it("createConfigurable trying to create an unregistered control", () => {
    expect(() => ConfigurableUiManager.createControl("invalid", "1")).to.throw(Error);
  });

  it("loadContentGroup and read applicationData from control", () => {
    const contentGroupProps: ContentGroupProps = {
      id: "testContentGroup1",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "test-content-control",
          classId: "TableExampleContent",
          applicationData: { label: "Content 1a", bgColor: "black" },
        },
      ],
    };
    const contentGroup = new ContentGroup(contentGroupProps);
    expect(contentGroup).to.not.be.undefined;
    // force controls to be creates
    const controls = contentGroup?.getContentControls();
    expect(controls).to.not.be.undefined;
    const control = contentGroup?.getContentControlById("test-content-control");
    expect(control).to.not.be.undefined;
    expect(control?.applicationData.label).eql("Content 1a");
  });

  it("closeUi", () => {
    ConfigurableUiManager.closeUi();

    expect(MessageManager.messages.length).to.eq(0);
    expect(ModelessDialogManager.dialogCount).to.eq(0);
    expect(ModalDialogManager.dialogCount).to.eq(0);
    expect(PopupManager.popupCount).to.eq(0);
  });

});
