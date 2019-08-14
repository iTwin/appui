/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import * as sinon from "sinon";

import { MockRender, ToolAssistance, ToolAssistanceImage } from "@bentley/imodeljs-frontend";
import { Logger } from "@bentley/bentleyjs-core";
import { FooterPopup } from "@bentley/ui-ninezone";
import { Checkbox, LocalUiSettings } from "@bentley/ui-core";

import TestUtils, { storageMock } from "../../TestUtils";
import {
  StatusBar,
  ToolAssistanceField,
  StatusBarWidgetControl,
  WidgetState,
  ConfigurableCreateInfo,
  ConfigurableUiControlType,
  WidgetDef,
  StatusBarWidgetControlArgs,
  AppNotificationManager,
  CursorPopupManager,
  FrontstageManager,
} from "../../../ui-framework";

describe("ToolAssistanceField", () => {

  class AppStatusBarWidgetControl extends StatusBarWidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }

    public getReactNode({ isInFooterMode, onOpenWidget, openWidget }: StatusBarWidgetControlArgs): React.ReactNode {
      const uiSettings = new LocalUiSettings({ localStorage: storageMock() } as Window);
      uiSettings.saveSetting("ToolAssistance", "showPromptAtCursor", true);

      return (
        <>
          <ToolAssistanceField isInFooterMode={isInFooterMode} onOpenWidget={onOpenWidget} openWidget={openWidget}
            includePromptAtCursor={true}
            uiSettings={uiSettings} />
        </>
      );
    }
  }

  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await TestUtils.initializeUiFramework();
    MockRender.App.startup();

    const statusBarWidgetDef = new WidgetDef({
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
      isFreeform: false,
      isStatusBar: true,
    });
    widgetControl = statusBarWidgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(() => {
    TestUtils.terminateUiFramework();
    MockRender.App.shutdown();
  });

  // cSpell:Ignore TOOLPROMPT

  it("Status Bar with ToolAssistanceField should mount", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const helloWorld = "Hello World!";
    const notifications = new AppNotificationManager();
    notifications.outputPrompt(helloWorld);
    wrapper.update();

    wrapper.unmount();
  });

  it("dialog should open and close on click", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const helloWorld = "Hello World!";
    const notifications = new AppNotificationManager();
    notifications.outputPrompt(helloWorld);
    wrapper.update();

    let indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find("div.nz-footer-toolAssistance-dialog").length).to.eq(1);

    indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find("div.nz-footer-toolAssistance-dialog").length).to.eq(0);

    wrapper.unmount();
  });

  it("passing isNew:true should use newDot", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Click on something", true);

    const instruction1 = ToolAssistance.createInstruction(ToolAssistanceImage.AcceptPoint, "xyz", true);
    const instruction2 = ToolAssistance.createKeyboardInstruction(ToolAssistance.createKeyboardInfo(["A"]), "Press a key", true);
    const section1 = ToolAssistance.createSection([instruction1, instruction2], "Inputs");

    const instructions = ToolAssistance.createInstructions(mainInstruction, [section1]);

    notifications.setToolAssistance(instructions);
    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find(".nz-footer-toolAssistance-newDot").length).to.eq(3);
    expect(wrapper.find(".nz-text-new").length).to.eq(3);

    wrapper.unmount();
  });

  it("ToolAssistanceImage.Keyboard with a single key should generate key image", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.AcceptPoint, "xyz");
    const instruction1 = ToolAssistance.createKeyboardInstruction(ToolAssistance.createKeyboardInfo(["A"]), "Press a key");
    const section1 = ToolAssistance.createSection([instruction1], "Inputs");
    const instructions = ToolAssistance.createInstructions(mainInstruction, [section1]);
    notifications.setToolAssistance(instructions);

    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find(".nz-content-dialog .uifw-toolassistance-key").length).to.eq(1);

    wrapper.unmount();
  });

  it("should support known icons and multiple sections", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction("icon-clock", "This is the prompt that is fairly long 1234567890");

    const instruction1 = ToolAssistance.createInstruction(ToolAssistanceImage.AcceptPoint, "xyz");
    const instruction2 = ToolAssistance.createInstruction(ToolAssistanceImage.MouseWheel, "xyz");
    const section1 = ToolAssistance.createSection([instruction1, instruction2], "Inputs");

    const instruction21 = ToolAssistance.createInstruction(ToolAssistanceImage.LeftClick, "xyz");
    const instruction22 = ToolAssistance.createInstruction(ToolAssistanceImage.RightClick, "xyz");
    const instruction23 = ToolAssistance.createInstruction(ToolAssistanceImage.LeftClickDrag, "xyz");
    const instruction24 = ToolAssistance.createInstruction(ToolAssistanceImage.RightClickDrag, "xyz");
    const instruction25 = ToolAssistance.createInstruction(ToolAssistanceImage.MouseWheelClickDrag, "xyz");
    const section2 = ToolAssistance.createSection([instruction21, instruction22, instruction23, instruction24, instruction25], "More Inputs");

    const instructions = ToolAssistance.createInstructions(mainInstruction, [section1, section2]);

    notifications.setToolAssistance(instructions);
    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find("div.nz-footer-toolAssistance-dialog").length).to.eq(1);
    expect(wrapper.find("div.nz-footer-toolAssistance-separator").length).to.eq(3);
    expect(wrapper.find("div.nz-footer-toolAssistance-instruction").length).to.eq(8);

    wrapper.unmount();
  });

  it("ToolAssistanceImage.Keyboard with a key containing multiple chars should use large key", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.AcceptPoint, "xyz");
    const instruction1 = ToolAssistance.createKeyboardInstruction(ToolAssistance.shiftKeyboardInfo, "Press the Shift key");
    const section1 = ToolAssistance.createSection([instruction1], "Inputs");
    const instructions = ToolAssistance.createInstructions(mainInstruction, [section1]);

    notifications.setToolAssistance(instructions);
    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find(".nz-content-dialog .uifw-toolassistance-key-large").length).to.eq(1);

    wrapper.unmount();
  });

  it("ToolAssistanceImage.Keyboard with 2 keys should use medium keys", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.AcceptPoint, "xyz");
    const instruction1 = ToolAssistance.createKeyboardInstruction(ToolAssistance.createKeyboardInfo(["A", "B"]), "Press one of two keys");
    const section1 = ToolAssistance.createSection([instruction1], "Inputs");
    const instructions = ToolAssistance.createInstructions(mainInstruction, [section1]);

    notifications.setToolAssistance(instructions);
    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find(".nz-content-dialog .uifw-toolassistance-key-medium").length).to.eq(2);

    wrapper.unmount();
  });

  it("ToolAssistanceImage.Keyboard with bottomRow should use small keys", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.AcceptPoint, "xyz");
    const instruction1 = ToolAssistance.createKeyboardInstruction(ToolAssistance.createKeyboardInfo(["W"], ["A", "S", "D"]), "Press one of four keys");
    const section1 = ToolAssistance.createSection([instruction1], "Inputs");
    const instructions = ToolAssistance.createInstructions(mainInstruction, [section1]);

    notifications.setToolAssistance(instructions);
    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    expect(wrapper.find(".nz-content-dialog .uifw-toolassistance-key-small").length).to.eq(4);

    wrapper.unmount();
  });

  it("ToolAssistanceImage.Keyboard but keyboardInfo should log error", () => {
    const spyMethod = sinon.spy(Logger, "logError");
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.Keyboard, "Press a key" /* No keyboardInfo */);
    const instructions = ToolAssistance.createInstructions(mainInstruction);

    notifications.setToolAssistance(instructions);

    spyMethod.called.should.true;

    wrapper.unmount();
    (Logger.logError as any).restore();
  });

  it("ToolAssistanceImage.Keyboard with invalid keyboardInfo should log error", () => {
    const spyMethod = sinon.spy(Logger, "logError");
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={true} />);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createKeyboardInstruction(ToolAssistance.createKeyboardInfo([]), "Press key");
    const instructions = ToolAssistance.createInstructions(mainInstruction);

    notifications.setToolAssistance(instructions);

    spyMethod.called.should.true;

    wrapper.unmount();
    (Logger.logError as any).restore();
  });

  it("should close on outside click", () => {
    const wrapper = mount<StatusBar>(<StatusBar widgetControl={widgetControl} isInFooterMode />);
    const footerPopup = wrapper.find(FooterPopup);

    const statusBarInstance = wrapper.instance();
    statusBarInstance.setState(() => ({ openWidget: "test-widget" }));

    const outsideClick = new MouseEvent("");
    sinon.stub(outsideClick, "target").get(() => document.createElement("div"));
    footerPopup.prop("onOutsideClick")!(outsideClick);

    expect(statusBarInstance.state.openWidget).null;
  });

  it("should set showPromptAtCursor on checkbox click", async () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={false} />);

    const toolAssistanceField = wrapper.find(ToolAssistanceField);
    expect(toolAssistanceField.length).to.eq(1);
    expect(toolAssistanceField.state("showPromptAtCursor")).to.be.true;

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Click on something", true);
    const instructions = ToolAssistance.createInstructions(mainInstruction);
    notifications.setToolAssistance(instructions);
    wrapper.update();

    const indicator = wrapper.find("div.nz-indicator");
    expect(indicator.length).to.eq(1);
    indicator.simulate("click");
    wrapper.update();

    const checkBox = wrapper.find(Checkbox);
    expect(checkBox.length).to.eq(1);
    checkBox.find("input").simulate("change", { target: { checked: false } });

    expect(toolAssistanceField.state("showPromptAtCursor")).to.be.false;

    wrapper.unmount();
  });

  it("cursorPrompt should open when tool assistance set", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={false} />);

    const toolAssistanceField = wrapper.find(ToolAssistanceField);
    expect(toolAssistanceField.length).to.eq(1);
    toolAssistanceField.setState({ showPromptAtCursor: true });

    const spyMethod = sinon.spy();
    CursorPopupManager.onCursorPopupUpdatePositionEvent.addListener(spyMethod);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Click on something", true);
    const instructions = ToolAssistance.createInstructions(mainInstruction);
    notifications.setToolAssistance(instructions);
    wrapper.update();

    spyMethod.called.should.true;

    CursorPopupManager.onCursorPopupUpdatePositionEvent.removeListener(spyMethod);
    wrapper.unmount();
  });

  it("cursorPrompt should open when tool icon changes", () => {
    const wrapper = mount(<StatusBar widgetControl={widgetControl} isInFooterMode={false} />);

    FrontstageManager.onToolIconChangedEvent.emit({ iconSpec: "icon-placeholder" });

    const toolAssistanceField = wrapper.find(ToolAssistanceField);
    expect(toolAssistanceField.length).to.eq(1);
    toolAssistanceField.setState({ showPromptAtCursor: true });

    // emit before instructions set
    FrontstageManager.onToolIconChangedEvent.emit({ iconSpec: "icon-placeholder" });

    const spyMethod = sinon.spy();
    CursorPopupManager.onCursorPopupUpdatePositionEvent.addListener(spyMethod);

    const notifications = new AppNotificationManager();
    const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, "Click on something", true);
    const instructions = ToolAssistance.createInstructions(mainInstruction);
    notifications.setToolAssistance(instructions);

    // emit after instructions set
    FrontstageManager.onToolIconChangedEvent.emit({ iconSpec: "icon-placeholder" });

    wrapper.update();

    spyMethod.called.should.true;

    CursorPopupManager.onCursorPopupUpdatePositionEvent.removeListener(spyMethod);
    wrapper.unmount();
  });

});
