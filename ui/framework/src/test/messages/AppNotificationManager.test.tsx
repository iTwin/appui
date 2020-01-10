/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import * as sinon from "sinon";
import TestUtils from "../TestUtils";
import { AppNotificationManager, MessageManager, ElementTooltip, ModalDialogManager, ModalDialogRenderer } from "../../ui-framework";
import { NotifyMessageDetails, OutputMessagePriority, MessageBoxType, MessageBoxIconType, ActivityMessageDetails, ActivityMessageEndReason, OutputMessageType, OutputMessageAlert, MessageBoxValue } from "@bentley/imodeljs-frontend";

describe("AppNotificationManager", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  let notifications: AppNotificationManager;

  beforeEach(() => {
    notifications = new AppNotificationManager();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("outputPromptByKey", () => {
    const spyMethod = sinon.spy(MessageManager, "outputPrompt");
    notifications.outputPromptByKey("Framework:tests.label");
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("outputPrompt", () => {
    const spyMethod = sinon.spy(MessageManager, "outputPrompt");
    notifications.outputPrompt("This is a prompt.");
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("outputMessage", () => {
    const spyMethod = sinon.spy(MessageManager, "addMessage");
    const details = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.");
    notifications.outputMessage(details);
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("outputMessage with Alert", () => {
    const spyMethod = sinon.spy(MessageManager, "addMessage");
    const alertBoxMethod = sinon.spy(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.", "A detailed message.", OutputMessageType.Alert);
    notifications.outputMessage(details);
    expect(spyMethod.calledOnce).to.be.true;
    expect(alertBoxMethod.calledOnce).to.be.true;

    ModalDialogManager.closeDialog();
  });

  it("outputMessage with Alert & Balloon", () => {
    const spyMethod = sinon.spy(MessageManager, "addMessage");
    const alertBoxMethod = sinon.spy(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.", "A detailed message.", OutputMessageType.Alert, OutputMessageAlert.Balloon);
    notifications.outputMessage(details);
    expect(spyMethod.calledOnce).to.be.true;
    expect(alertBoxMethod.calledOnce).to.be.false;
  });

  it("outputMessage with InputField", () => {
    const spyMethod = sinon.spy(MessageManager, "addMessage");
    const spyMethod2 = sinon.spy(MessageManager, "displayInputFieldMessage");
    const spyMethod3 = sinon.spy(MessageManager, "hideInputFieldMessage");
    const details = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.", "A detailed message.", OutputMessageType.InputField);
    let divElement: HTMLElement | null;
    mount(<div ref={(el) => { divElement = el; }} />);
    details.setInputFieldTypeDetails(divElement!);
    notifications.outputMessage(details);
    expect(spyMethod.calledOnce).to.be.true;
    expect(spyMethod2.calledOnce).to.be.true;
    notifications.closeInputFieldMessage();
    expect(spyMethod3.calledOnce).to.be.true;
  });

  it("openMessageBox", async () => {
    const wrapper = mount(<ModalDialogRenderer />);

    const spyMethod = sinon.spy(MessageManager, "openMessageBox");
    expect(ModalDialogManager.dialogCount).to.eq(0);
    const boxResult = notifications.openMessageBox(MessageBoxType.OkCancel, "Message string", MessageBoxIconType.Information);

    expect(spyMethod.calledOnce).to.be.true;
    expect(ModalDialogManager.dialogCount).to.eq(1);

    wrapper.update();
    wrapper.find("button.dialog-button-ok").simulate("click");
    expect(ModalDialogManager.dialogCount).to.eq(0);

    const boxValue = await boxResult;
    expect(boxValue).to.eq(MessageBoxValue.Ok);
    wrapper.unmount();
  });

  it("setupActivityMessage", () => {
    const spyMethod = sinon.spy(MessageManager, "setupActivityMessageDetails");
    const details = new ActivityMessageDetails(true, true, true, true);
    notifications.setupActivityMessage(details);
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("outputActivityMessage", () => {
    const spyMethod = sinon.spy(MessageManager, "setupActivityMessageValues");
    notifications.outputActivityMessage("Message text", 50);
    expect(spyMethod.calledOnce).to.be.true;
  });

  it("endActivityMessage", () => {
    const spyMethod = sinon.spy(MessageManager, "endActivityMessage");
    notifications.endActivityMessage(ActivityMessageEndReason.Cancelled);
    notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    expect(spyMethod.calledTwice).to.be.true;
  });

  it("ElementTooltip", () => {
    const showMethod = sinon.spy(ElementTooltip, "showTooltip");
    const hideMethod = sinon.spy(ElementTooltip, "hideTooltip");
    let divElement: HTMLElement | null;
    mount(<div ref={(el) => { divElement = el; }} />);
    notifications.openToolTip(divElement!, "Tooltip message");
    notifications.clearToolTip();
    expect(showMethod.calledOnce).to.be.true;
    expect(hideMethod.calledOnce).to.be.true;
    expect(notifications.isToolTipSupported).to.be.true;
  });

});
