/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
<<<<<<< HEAD
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { StandardContentLayouts } from "@itwin/appui-abstract";
=======
>>>>>>> 79f71b01f (Move /content apis from appui-abstract into appui-react (#1033))
import type {
  ConfigurableCreateInfo,
  ContentGroupProps,
} from "../../appui-react";
import {
  ContentControl,
  ContentGroup,
  MessageManager,
  PopupManager,
  StandardContentLayouts,
  UiFramework,
  WidgetControl,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { InternalConfigurableUiManager } from "../../appui-react/configurableui/InternalConfigurableUiManager";

class TableExampleContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = <div />;
  }
}

describe("InternalConfigurableUiManager", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();

    InternalConfigurableUiManager.initialize();
    InternalConfigurableUiManager.register(
      "TableExampleContent",
      TableExampleContentControl
    );
  });

  after(async () => {
    InternalConfigurableUiManager.unregister("TableExampleContent");
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("setActiveFrontstageDef passed no argument", async () => {
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
    expect(UiFramework.frontstages.activeFrontstageDef).to.be.undefined;
  });

  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;
    }
  }

  it("getConstructorClassId should return undefined before registration", () => {
    const classId =
      InternalConfigurableUiManager.getConstructorClassId(TestWidget);
    expect(classId).to.be.undefined;
  });

  it("registerControl & createConfigurable using same classId", () => {
    InternalConfigurableUiManager.register("TestWidget", TestWidget);
    expect(InternalConfigurableUiManager.create("TestWidget", "1")).to.not.be
      .undefined;
  });

  it("registerControl trying to register a classId already registered", () => {
    expect(() =>
      InternalConfigurableUiManager.register("TestWidget", TestWidget)
    ).to.throw(Error);
  });

  it("unregisterControl removes a registered control", () => {
    InternalConfigurableUiManager.unregister("TestWidget");
    expect(InternalConfigurableUiManager.isRegistered("TestWidget")).to.be
      .false;
  });

  it("createConfigurable trying to create an unregistered control", () => {
    expect(() => InternalConfigurableUiManager.create("invalid", "1")).to.throw(
      Error
    );
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
    InternalConfigurableUiManager.closeUi();

    expect(MessageManager.messages.length).to.eq(0);
    expect(UiFramework.dialogs.modeless.count).to.eq(0);
    expect(UiFramework.dialogs.modal.count).to.eq(0);
    expect(PopupManager.popupCount).to.eq(0);
  });
});
