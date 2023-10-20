/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  ActivityMessageDetails,
  ActivityMessageEndReason,
  NoRenderApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { AppNotificationManager, MessageManager } from "../../appui-react";
import TestUtils from "../TestUtils";
import { ActivityMessageRenderer } from "../../appui-react/messages/ActivityMessage";

describe("ActivityMessageRenderer", () => {
  let notifications: AppNotificationManager;

  beforeAll(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();

    notifications = new AppNotificationManager();
    MessageManager.clearMessages();
  });

  afterAll(async () => {
    TestUtils.terminateUiFramework();
  });

  it("ActivityMessageRenderer should render an Activity message", async () => {
    render(<ActivityMessageRenderer />);

    const details = new ActivityMessageDetails(true, true, false);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    await waitFor(() => {
      expect(screen.getByText("Message text")).to.be.not.null;
    });

    act(() => {
      notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    });
    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("Activity message should be canceled", async () => {
    render(<ActivityMessageRenderer />);

    const details = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    await waitFor(() => {
      expect(screen.getByText("Message text")).to.be.not.null;
    });

    const cancelLink = await screen.findByText("dialog.cancel");
    fireEvent.click(cancelLink);

    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("Activity message should be dismissed", async () => {
    render(<ActivityMessageRenderer />);

    const details = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    await waitFor(() => {
      expect(screen.getByText("Message text")).to.be.not.null;
    });

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("Should render Toast, Sticky & Activity messages", async () => {
    render(<ActivityMessageRenderer />);

    const details1 = new NotifyMessageDetails(
      OutputMessagePriority.Warning,
      "A brief message.",
      "A detailed message."
    );
    const details2 = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief sticky message.",
      "A detailed message.",
      OutputMessageType.Sticky
    );
    const details3 = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details3);
    act(() => {
      notifications.outputMessage(details1);
      notifications.outputMessage(details2);
      notifications.outputActivityMessage("Message text", 50);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message.")).to.be.not.null;
    });
    await waitFor(() => {
      expect(screen.getByText("A brief sticky message.")).to.be.not.null;
    });
    await waitFor(() => {
      expect(screen.getByText("Message text")).to.be.not.null;
    });
    act(() => {
      notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    });
    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(
      screen.queryByText("A brief sticky message.")
    );
  });
});
