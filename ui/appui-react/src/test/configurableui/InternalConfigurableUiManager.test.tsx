/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import type {
  ConfigurableCreateInfo,
  ContentGroupProps,
} from "../../appui-react";
import {
  ContentControl,
  ContentGroup,
  MessageManager,
  PopupManager,
  UiFramework,
  WidgetControl,
} from "../../appui-react";
import { InternalConfigurableUiManager } from "../../appui-react/configurableui/InternalConfigurableUiManager";

class TableExampleContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = <div />;
  }
}

describe("InternalConfigurableUiManager", () => {
  beforeEach(async () => {
    InternalConfigurableUiManager.register(
      "TableExampleContent",
      TableExampleContentControl
    );
  });

  afterEach(async () => {
    InternalConfigurableUiManager.unregister("TableExampleContent");
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
    expect(InternalConfigurableUiManager.isRegistered("TestWidget")).toEqual(
      false
    );
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
    expect(contentGroup).toBeTruthy();
    // force controls to be creates
    const controls = contentGroup?.getContentControls();
    expect(controls).toBeTruthy();
    const control = contentGroup?.getContentControlById("test-content-control");
    expect(control).toBeTruthy();
    expect(control?.applicationData.label).eql("Content 1a");
  });

  it("closeUi", () => {
    InternalConfigurableUiManager.closeUi();

    expect(MessageManager.messages.length).toEqual(0);
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    expect(UiFramework.dialogs.modal.count).toEqual(0);
    expect(PopupManager.popupCount).toEqual(0);
  });
});
