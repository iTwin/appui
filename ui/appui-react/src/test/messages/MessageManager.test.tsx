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
  MessageBoxIconType,
  NoRenderApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { MessageSeverity } from "@itwin/appui-abstract";
import { UnderlinedButton } from "@itwin/core-react";
import {
  AppNotificationManager,
  MessageManager,
  ReactNotifyMessageDetails,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import {
  act,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("MessageManager", () => {
  let notifications: AppNotificationManager;

  beforeAll(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();

    notifications = new AppNotificationManager();
    MessageManager.clearMessages();
  });

  beforeEach(async () => {
    act(() => {
      MessageManager.closeAllMessages();
    });
  });

  afterAll(async () => {
    TestUtils.terminateUiFramework();
  });

  it("maxCachedMessages handled correctly", () => {
    const clearSpy = vi.fn();
    MessageManager.onMessagesUpdatedEvent.addListener(clearSpy);
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);
    expect(clearSpy).toHaveBeenCalledOnce();

    for (let i = 0; i < 500; i++) {
      const details = new NotifyMessageDetails(
        OutputMessagePriority.Debug,
        `A brief message - ${i}.`
      );
      MessageManager.addMessage(details);
    }
    expect(MessageManager.messages.length).to.eq(500);

    clearSpy.mockReset();
    const details2 = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      `A brief message.`
    );
    MessageManager.addMessage(details2);
    expect(MessageManager.messages.length).to.eq(376);
    expect(clearSpy).toHaveBeenCalledTimes(2);

    const newMax = 375;
    MessageManager.setMaxCachedMessages(newMax);
    expect(MessageManager.messages.length).to.be.lessThan(newMax);
  });

  it("maxDisplayedStickyMessages handled correctly", () => {
    MessageManager.maxDisplayedStickyMessages = 5;
    expect(MessageManager.maxDisplayedStickyMessages).to.eq(5);
  });

  it("getIconType should return proper icon type", () => {
    let details = new NotifyMessageDetails(
      OutputMessagePriority.Info,
      "A brief message."
    );
    expect(MessageManager.getIconType(details)).to.eq(
      MessageBoxIconType.Information
    );

    details = new NotifyMessageDetails(
      OutputMessagePriority.Warning,
      "A brief message."
    );
    expect(MessageManager.getIconType(details)).to.eq(
      MessageBoxIconType.Warning
    );

    details = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "A brief message."
    );
    expect(MessageManager.getIconType(details)).to.eq(
      MessageBoxIconType.Critical
    );

    details = new NotifyMessageDetails(
      OutputMessagePriority.Fatal,
      "A brief message."
    );
    expect(MessageManager.getIconType(details)).to.eq(
      MessageBoxIconType.Critical
    );

    details = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message."
    );
    expect(MessageManager.getIconType(details)).to.eq(
      MessageBoxIconType.NoSymbol
    );
  });

  it("getSeverity should return proper severity", () => {
    let details = new NotifyMessageDetails(
      OutputMessagePriority.Info,
      "A brief message."
    );
    expect(MessageManager.getSeverity(details)).to.eq(
      MessageSeverity.Information
    );

    details = new NotifyMessageDetails(
      OutputMessagePriority.Warning,
      "A brief message."
    );
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Warning);

    details = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "A brief message."
    );
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Error);

    details = new NotifyMessageDetails(
      OutputMessagePriority.Fatal,
      "A brief message."
    );
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Fatal);

    details = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message."
    );
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Success);

    details = new NotifyMessageDetails(
      OutputMessagePriority.Success,
      "A brief message."
    );
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Success);
  });

  it("non-duplicate message should be added to Message Center", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const details1 = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message."
    );
    MessageManager.addMessage(details1);
    expect(MessageManager.messages.length).to.eq(1);

    const details2 = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "Another brief message."
    );
    MessageManager.addMessage(details2);
    expect(MessageManager.messages.length).to.eq(2);
  });

  it("duplicate message should not be added to Message Center", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const details1 = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message."
    );
    MessageManager.addMessage(details1);
    expect(MessageManager.messages.length).to.eq(1);

    const details2 = new NotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message."
    );
    MessageManager.addMessage(details2);
    expect(MessageManager.messages.length).to.eq(1);
  });

  it("React based message should be supported", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const reactNode = (
      <span>
        For more details, <UnderlinedButton>click here</UnderlinedButton>.
      </span>
    );
    const details1 = new ReactNotifyMessageDetails(
      OutputMessagePriority.Debug,
      "A brief message.",
      { reactNode }
    );
    MessageManager.outputMessage(details1);
    expect(MessageManager.messages.length).to.eq(1);
  });

  it("openMessageCenter raises OpenMessageCenterEvent", () => {
    const onOpenMessageCenterEventSpy = vi.fn();
    MessageManager.onOpenMessageCenterEvent.addOnce(
      onOpenMessageCenterEventSpy
    );

    MessageManager.openMessageCenter();
    expect(onOpenMessageCenterEventSpy).toHaveBeenCalledOnce();
  });

  it("MessageManager should render a Toast message", async () => {
    const details = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message.",
      "A detailed message."
    );
    act(() => {
      notifications.outputMessage(details);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message.")).to.be.not.null;
    });

    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message."));
  });

  it("MessageManager should render a Sticky message", async () => {
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Info,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Sticky
    );
    act(() => {
      notifications.outputMessage(details);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message.")).to.be.not.null;
    });

    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message."));
  });

  it("Sticky message should close on button click", async () => {
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "A brief message.",
      "A detailed message.",
      OutputMessageType.Sticky
    );
    act(() => {
      notifications.outputMessage(details);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message.")).to.be.not.null;
    });

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(screen.queryByText("A brief message."));
    act(() => {
      MessageManager.clearMessages();
    });
  });

  it("StatusBar should render maximum of 3 Sticky messages", async () => {
    MessageManager.maxDisplayedStickyMessages = 3;

    const details1 = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message 1.",
      undefined,
      OutputMessageType.Sticky
    );
    act(() => {
      notifications.outputMessage(details1);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message 1.")).to.be.not.null;
    });
    const details2 = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message 2.",
      undefined,
      OutputMessageType.Sticky
    );
    act(() => {
      notifications.outputMessage(details2);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message 2.")).to.be.not.null;
    });
    const details3 = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message 3.",
      undefined,
      OutputMessageType.Sticky
    );
    act(() => {
      notifications.outputMessage(details3);
    });
    await waitFor(() => {
      expect(screen.getByText("A brief message 3.")).to.be.not.null;
    });

    const details4 = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message 4.",
      undefined,
      OutputMessageType.Sticky
    );
    act(() => {
      notifications.outputMessage(details4);
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message 1."));
    await waitFor(() => {
      expect(screen.getByText("A brief message 4.")).to.be.not.null;
    });

    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message 4."));
  });
});
