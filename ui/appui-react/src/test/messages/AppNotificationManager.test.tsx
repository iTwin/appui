/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import {
  ActivityMessageDetails,
  ActivityMessageEndReason,
  MessageBoxIconType,
  MessageBoxType,
  MessageBoxValue,
  NotifyMessageDetails,
  OutputMessageAlert,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import {
  AppNotificationManager,
  ElementTooltip,
  MessageManager,
  ModalDialogRenderer,
  UiFramework,
} from "../../appui-react";
import { userEvent, waitForPosition } from "../TestUtils";
import { render, screen } from "@testing-library/react";

describe("AppNotificationManager", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  let notifications: AppNotificationManager;

  beforeEach(() => {
    notifications = new AppNotificationManager();
    theUserTo = userEvent.setup();
  });

  it("outputPromptByKey", () => {
    const spy = sinon.spy(MessageManager, "outputPrompt");
    notifications.outputPromptByKey("Framework:tests.label");
    expect(spy.calledOnce).toEqual(true);
  });

  it("outputPrompt", () => {
    const spy = sinon.spy(MessageManager, "outputPrompt");
    notifications.outputPrompt("This is a prompt.");
    expect(spy.calledOnce).toEqual(true);
  });

  it("outputMessage", () => {
    const spy = sinon.spy(MessageManager, "addMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message."
    );
    notifications.outputMessage(details);
    expect(spy.calledOnce).toEqual(true);
  });

  it("outputMessage with Alert", () => {
    const spy = sinon.spy(MessageManager, "addMessage");
    const alertBoxMethod = sinon.spy(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(
      OutputMessagePriority.Success,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Alert
    );
    notifications.outputMessage(details);
    expect(spy.calledOnce).toEqual(true);
    expect(alertBoxMethod.calledOnce).toEqual(true);

    UiFramework.dialogs.modal.close();
  });

  it("outputMessage with Alert & Balloon", () => {
    const spy = sinon.spy(MessageManager, "addMessage");
    const alertBoxMethod = sinon.spy(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Alert,
      OutputMessageAlert.Balloon
    );
    notifications.outputMessage(details);
    expect(spy.calledOnce).toEqual(true);
    expect(alertBoxMethod.calledOnce).to.be.false;
  });

  it("outputMessage with InputField", () => {
    const spy = sinon.spy(MessageManager, "addMessage");
    const spy2 = sinon.spy(MessageManager, "displayInputFieldMessage");
    const spy3 = sinon.spy(MessageManager, "hideInputFieldMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.InputField
    );
    let divElement: HTMLElement | null;
    render(
      <div
        ref={(el) => {
          divElement = el;
        }}
      />
    );
    details.setInputFieldTypeDetails(divElement!);
    notifications.outputMessage(details);
    expect(spy.calledOnce).toEqual(true);
    expect(spy2.calledOnce).toEqual(true);
    notifications.closeInputFieldMessage();
    expect(spy3.calledOnce).toEqual(true);
  });

  it("outputMessage with InputField but without setInputFieldTypeDetails", () => {
    const spy = sinon.spy(MessageManager, "addMessage");
    const spy2 = sinon.spy(MessageManager, "displayInputFieldMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.InputField
    );
    notifications.outputMessage(details);
    expect(spy.calledOnce).toEqual(true);
    expect(spy2.called).to.be.false;
  });

  it("openMessageBox", async () => {
    render(<ModalDialogRenderer />);

    const spy = sinon.spy(MessageManager, "openMessageBox");
    expect(UiFramework.dialogs.modal.count).toEqual(0);
    const boxResult = notifications.openMessageBox(
      MessageBoxType.OkCancel,
      "Message string",
      MessageBoxIconType.Information
    );
    await waitForPosition();

    expect(spy).toHaveBeenCalledOnce();
    expect(UiFramework.dialogs.modal.count).toEqual(1);

    await theUserTo.click(screen.getByRole("button", { name: "dialog.ok" }));
    expect(UiFramework.dialogs.modal.count).toEqual(0);

    const boxValue = await boxResult;
    expect(boxValue).toEqual(MessageBoxValue.Ok);
  });

  it("setupActivityMessage", () => {
    const spy = sinon.spy(MessageManager, "setupActivityMessageDetails");
    const details = new ActivityMessageDetails(true, true, true, true);
    notifications.setupActivityMessage(details);
    expect(spy.calledOnce).toEqual(true);
  });

  it("outputActivityMessage", () => {
    const spy = sinon.spy(MessageManager, "setupActivityMessageValues");
    notifications.outputActivityMessage("Message text", 50);
    expect(spy.calledOnce).toEqual(true);
  });

  it("endActivityMessage", () => {
    const spy = sinon.spy(MessageManager, "endActivityMessage");
    notifications.endActivityMessage(ActivityMessageEndReason.Cancelled);
    notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    expect(spy.calledTwice).toEqual(true);
  });

  it("ElementTooltip", () => {
    const showMethod = sinon.spy(ElementTooltip, "showTooltip");
    const hideMethod = sinon.spy(ElementTooltip, "hideTooltip");
    let divElement: HTMLElement | null;
    render(
      <div
        ref={(el) => {
          divElement = el;
        }}
      />
    );
    notifications.openToolTip(divElement!, "Tooltip message");
    notifications.clearToolTip();
    expect(showMethod.calledOnce).toEqual(true);
    expect(hideMethod.calledOnce).toEqual(true);
    expect(notifications.isToolTipSupported).toEqual(true);
  });

  it("ElementTooltip with a React component", () => {
    const showMethod = sinon.spy(ElementTooltip, "showTooltip");
    const hideMethod = sinon.spy(ElementTooltip, "hideTooltip");
    let divElement: HTMLElement | null;
    render(
      <div
        ref={(el) => {
          divElement = el;
        }}
      />
    );
    const reactNode = <span>Tooltip message</span>;
    MessageManager.openToolTip(divElement!, { reactNode });
    notifications.clearToolTip();
    expect(showMethod.calledOnce).toEqual(true);
    expect(hideMethod.calledOnce).toEqual(true);
  });

  it("ActivityMessage with a React component", () => {
    const spy = sinon.spy(MessageManager, "setupActivityMessageValues");
    const reactNode = <span>Activity message</span>;
    MessageManager.outputActivityMessage({ reactNode }, 50);
    expect(spy.calledOnce).toEqual(true);
  });
});
