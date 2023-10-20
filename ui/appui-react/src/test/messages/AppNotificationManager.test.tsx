/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import * as React from "react";
import {
  ActivityMessageDetails,
  ActivityMessageEndReason,
  IModelApp,
  MessageBoxIconType,
  MessageBoxType,
  MessageBoxValue,
  NoRenderApp,
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
import TestUtils, { userEvent } from "../TestUtils";
import { render, screen } from "@testing-library/react";

describe("AppNotificationManager", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;

  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  let notifications: AppNotificationManager;

  beforeEach(() => {
    notifications = new AppNotificationManager();
    theUserTo = userEvent.setup();
  });

  it("outputPromptByKey", () => {
    const spyMethod = vi.spyOn(MessageManager, "outputPrompt");
    notifications.outputPromptByKey("Framework:tests.label");
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("outputPrompt", () => {
    const spyMethod = vi.spyOn(MessageManager, "outputPrompt");
    notifications.outputPrompt("This is a prompt.");
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("outputMessage", () => {
    const spyMethod = vi.spyOn(MessageManager, "addMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message."
    );
    notifications.outputMessage(details);
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("outputMessage with Alert", () => {
    const spyMethod = vi.spyOn(MessageManager, "addMessage");
    const alertBoxMethod = vi.spyOn(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(
      OutputMessagePriority.Success,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Alert
    );
    notifications.outputMessage(details);
    expect(spyMethod).toHaveBeenCalledOnce();
    expect(alertBoxMethod).toHaveBeenCalledOnce();

    UiFramework.dialogs.modal.close();
  });

  it("outputMessage with Alert & Balloon", () => {
    const spyMethod = vi.spyOn(MessageManager, "addMessage");
    const alertBoxMethod = vi.spyOn(MessageManager, "showAlertMessageBox");

    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Alert,
      OutputMessageAlert.Balloon
    );
    notifications.outputMessage(details);
    expect(spyMethod).toHaveBeenCalledOnce();
    expect(alertBoxMethod).toHaveBeenCalledOnce();
  });

  it("outputMessage with InputField", () => {
    const spyMethod = vi.spyOn(MessageManager, "addMessage");
    const spyMethod2 = vi.spyOn(MessageManager, "displayInputFieldMessage");
    const spyMethod3 = vi.spyOn(MessageManager, "hideInputFieldMessage");
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
    expect(spyMethod).toHaveBeenCalledOnce();
    expect(spyMethod2).toHaveBeenCalledOnce();
    notifications.closeInputFieldMessage();
    expect(spyMethod3).toHaveBeenCalledOnce();
  });

  it("outputMessage with InputField but without setInputFieldTypeDetails", () => {
    const spyMethod = vi.spyOn(MessageManager, "addMessage");
    const spyMethod2 = vi.spyOn(MessageManager, "displayInputFieldMessage");
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.InputField
    );
    notifications.outputMessage(details);
    expect(spyMethod).toHaveBeenCalledOnce();
    expect(spyMethod2).not.toHaveBeenCalled();
  });

  it("openMessageBox", async () => {
    render(<ModalDialogRenderer />);

    const spyMethod = vi.spyOn(MessageManager, "openMessageBox");
    expect(UiFramework.dialogs.modal.count).to.eq(0);
    const boxResult = notifications.openMessageBox(
      MessageBoxType.OkCancel,
      "Message string",
      MessageBoxIconType.Information
    );

    expect(spyMethod).toHaveBeenCalledOnce();
    expect(UiFramework.dialogs.modal.count).to.eq(1);

    await theUserTo.click(
      await screen.findByRole("button", { name: "dialog.ok" })
    );
    expect(UiFramework.dialogs.modal.count).to.eq(0);

    const boxValue = await boxResult;
    expect(boxValue).to.eq(MessageBoxValue.Ok);
  });

  it("setupActivityMessage", () => {
    const spyMethod = vi.spyOn(MessageManager, "setupActivityMessageDetails");
    const details = new ActivityMessageDetails(true, true, true, true);
    notifications.setupActivityMessage(details);
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("outputActivityMessage", () => {
    const spyMethod = vi.spyOn(MessageManager, "setupActivityMessageValues");
    notifications.outputActivityMessage("Message text", 50);
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("endActivityMessage", () => {
    const spyMethod = vi.spyOn(MessageManager, "endActivityMessage");
    notifications.endActivityMessage(ActivityMessageEndReason.Cancelled);
    notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    expect(spyMethod).toHaveBeenCalledTimes(2);
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
    expect(notifications.isToolTipSupported).to.be.true;
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
    const spyMethod = vi.spyOn(MessageManager, "setupActivityMessageValues");
    const reactNode = <span>Activity message</span>;
    MessageManager.outputActivityMessage({ reactNode }, 50);
    expect(spyMethod).toHaveBeenCalledOnce();
  });
});
