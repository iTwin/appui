/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
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
    const spy = vi.spyOn(MessageManager, "outputPrompt");
    notifications.outputPromptByKey("Framework:tests.label");
    expect(spy).toHaveBeenCalledOnce();
  });

  it("outputPrompt", () => {
    const spy = vi.spyOn(MessageManager, "outputPrompt");
    notifications.outputPrompt("This is a prompt.");
    expect(spy).toHaveBeenCalledOnce();
  });

  it("outputMessage", () => {
    const spy = vi.spyOn(MessageManager, "addMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message."
    );
    notifications.outputMessage(details);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("outputMessage with Alert", () => {
    const spy = vi.spyOn(MessageManager, "addMessage");
    const alertBoxMethod = vi.spyOn(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(
      OutputMessagePriority.Success,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Alert
    );
    notifications.outputMessage(details);
    expect(spy).toHaveBeenCalledOnce();
    expect(alertBoxMethod).toHaveBeenCalledOnce();

    UiFramework.dialogs.modal.close();
  });

  it("outputMessage with Alert & Balloon", () => {
    const spy = vi.spyOn(MessageManager, "addMessage");
    const alertBoxMethod = vi.spyOn(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Alert,
      OutputMessageAlert.Balloon
    );
    notifications.outputMessage(details);
    expect(spy).toHaveBeenCalledOnce();
    expect(alertBoxMethod).not.toBeCalled();
  });

  it("outputMessage with InputField", () => {
    const spy = vi.spyOn(MessageManager, "addMessage");
    const spy2 = vi.spyOn(MessageManager, "displayInputFieldMessage");
    const spy3 = vi.spyOn(MessageManager, "hideInputFieldMessage");
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
    expect(spy).toHaveBeenCalledOnce();
    expect(spy2).toHaveBeenCalledOnce();
    notifications.closeInputFieldMessage();
    expect(spy3).toHaveBeenCalledOnce();
  });

  it("outputMessage with InputField but without setInputFieldTypeDetails", () => {
    const spy = vi.spyOn(MessageManager, "addMessage");
    const spy2 = vi.spyOn(MessageManager, "displayInputFieldMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.InputField
    );
    notifications.outputMessage(details);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy2).not.toBeCalled();
  });

  it("openMessageBox", async () => {
    render(<ModalDialogRenderer />);

    const spy = vi.spyOn(MessageManager, "openMessageBox");
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
    const spy = vi.spyOn(MessageManager, "setupActivityMessageDetails");
    const details = new ActivityMessageDetails(true, true, true, true);
    notifications.setupActivityMessage(details);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("outputActivityMessage", () => {
    const spy = vi.spyOn(MessageManager, "setupActivityMessageValues");
    notifications.outputActivityMessage("Message text", 50);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("endActivityMessage", () => {
    const spy = vi.spyOn(MessageManager, "endActivityMessage");
    notifications.endActivityMessage(ActivityMessageEndReason.Cancelled);
    notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("ElementTooltip", () => {
    const showMethod = vi.spyOn(ElementTooltip, "showTooltip");
    const hideMethod = vi.spyOn(ElementTooltip, "hideTooltip");
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
    expect(showMethod).toHaveBeenCalledOnce();
    expect(hideMethod).toHaveBeenCalledOnce();
    expect(notifications.isToolTipSupported).toEqual(true);
  });

  it("ElementTooltip with a React component", () => {
    const showMethod = vi.spyOn(ElementTooltip, "showTooltip");
    const hideMethod = vi.spyOn(ElementTooltip, "hideTooltip");
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
    expect(showMethod).toHaveBeenCalledOnce();
    expect(hideMethod).toHaveBeenCalledOnce();
  });

  it("ActivityMessage with a React component", () => {
    const spy = vi.spyOn(MessageManager, "setupActivityMessageValues");
    const reactNode = <span>Activity message</span>;
    MessageManager.outputActivityMessage({ reactNode }, 50);
    expect(spy).toHaveBeenCalledOnce();
  });
});
