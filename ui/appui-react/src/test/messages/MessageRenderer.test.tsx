/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  ActivityMessageDetails,
  ActivityMessageEndReason,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { AppNotificationManager, MessageManager } from "../../appui-react";
import { MessageRenderer } from "../../appui-react/messages/MessageRenderer";
import { ThemeProvider } from "@itwin/itwinui-react";

describe("MessageRenderer", () => {
  let notifications: AppNotificationManager;

  beforeEach(async () => {
    notifications = new AppNotificationManager();
    MessageManager.clearMessages();
  });

  afterEach(() => {
    MessageManager.clearMessages();
  });

  it("should render an activity message", async () => {
    render(<MessageRenderer />, { wrapper: ThemeProvider });

    notifications.setupActivityMessage(
      new ActivityMessageDetails(true, true, false)
    );
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    screen.getByText("Message text");

    act(() => {
      notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    });
    expect(screen.queryByText("Message text")).to.be.null;
  });

  it("should cancel an activity message", async () => {
    render(<MessageRenderer />, { wrapper: ThemeProvider });

    notifications.setupActivityMessage(
      new ActivityMessageDetails(true, true, true)
    );
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    screen.getByText("Message text");

    const cancelLink = await screen.findByText("dialog.cancel");
    fireEvent.click(cancelLink);
    expect(screen.queryByText("Message text")).to.be.null;
  });

  it("should dismiss an activity message", async () => {
    render(<MessageRenderer />, { wrapper: ThemeProvider });

    const details = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    screen.getByText("Message text");

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("should render toast, sticky & activity messages", async () => {
    render(<MessageRenderer />, { wrapper: ThemeProvider });

    notifications.setupActivityMessage(
      new ActivityMessageDetails(true, true, true)
    );
    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Warning,
          "A brief message.",
          "A detailed message."
        )
      );
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.None,
          "A brief sticky message.",
          "A detailed message.",
          OutputMessageType.Sticky
        )
      );
      notifications.outputActivityMessage("Message text", 50);
    });
    screen.getByText("A brief message.");
    screen.getByText("A brief sticky message.");
    screen.getByText("Message text");

    act(() => {
      notifications.endActivityMessage(ActivityMessageEndReason.Completed);
      MessageManager.closeAllMessages();
    });
    expect(screen.queryByText("A brief sticky message.")).to.be.null;
  });
});
