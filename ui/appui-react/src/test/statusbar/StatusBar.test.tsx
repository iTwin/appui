/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { ActivityMessageDetails, ActivityMessageEndReason, NoRenderApp, NotifyMessageDetails, OutputMessagePriority, OutputMessageType } from "@itwin/core-frontend";
import {
  AppNotificationManager, MessageManager, StatusBar, StatusBarCenterSection, StatusBarLeftSection, StatusBarRightSection, StatusBarSpaceBetween,
} from "../../appui-react";
import TestUtils from "../TestUtils";

describe("StatusBar", () => {
  let notifications: AppNotificationManager;

  before(async () => {
    await TestUtils.initializeUiFramework();

    notifications = new AppNotificationManager();
    await NoRenderApp.startup();
    MessageManager.clearMessages();
  });

  after(async () => {
    TestUtils.terminateUiFramework();
  });

  it("StatusBar should render a Toast message", async () => {
    render(<StatusBar />);

    const details = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message.", "A detailed message.");
    act(() => {
      notifications.outputMessage(details);
    });
    expect(await screen.findByText("A brief message.")).to.be.not.null;

    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message."));
  });

  it("StatusBar should render a Sticky message", async () => {
    render(<StatusBar />);

    const details = new NotifyMessageDetails(OutputMessagePriority.Info, "A brief message.", "A detailed message.", OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details);
    });
    expect(await screen.findByText("A brief message.")).to.be.not.null;

    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message."));
  });

  it("Sticky message should close on button click", async () => {
    render(<StatusBar />);

    const details = new NotifyMessageDetails(OutputMessagePriority.Error, "A brief message.", "A detailed message.", OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details);
    });
    expect(await screen.findByText("A brief message.")).to.be.not.null;

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(screen.queryByText("A brief message."));
    act(() => {
      MessageManager.clearMessages();
    });
  });

  it("StatusBar should render an Activity message", async () => {
    render(<StatusBar />);

    const details = new ActivityMessageDetails(true, true, false);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    expect(await screen.findByText("Message text")).to.be.not.null;

    act(() => {
      notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    });
    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("Activity message should be canceled", async () => {
    render(<StatusBar />);

    const details = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    expect(await screen.findByText("Message text")).to.be.not.null;

    const cancelLink = await screen.findByText("dialog.cancel");
    fireEvent.click(cancelLink);

    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("Activity message should be dismissed", async () => {
    render(<StatusBar />);

    const details = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details);
    notifications.setupActivityMessage(details);
    act(() => {
      notifications.outputActivityMessage("Message text", 50);
    });
    expect(await screen.findByText("Message text")).to.be.not.null;

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(screen.queryByText("Message text"));
  });

  it("StatusBar should render Toast, Sticky & Activity messages", async () => {
    render(<StatusBar />);

    const details1 = new NotifyMessageDetails(OutputMessagePriority.Warning, "A brief message.", "A detailed message.");
    const details2 = new NotifyMessageDetails(OutputMessagePriority.None, "A brief sticky message.", "A detailed message.", OutputMessageType.Sticky);
    const details3 = new ActivityMessageDetails(true, true, true);
    notifications.setupActivityMessage(details3);
    act(() => {
      notifications.outputMessage(details1);
      notifications.outputMessage(details2);
      notifications.outputActivityMessage("Message text", 50);
    });
    expect(await screen.findByText("A brief message.")).to.be.not.null;
    expect(await screen.findByText("A brief sticky message.")).to.be.not.null;
    expect(await screen.findByText("Message text")).to.be.not.null;
    act(() => {
      notifications.endActivityMessage(ActivityMessageEndReason.Completed);
    });
    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief sticky message."));
  });

  it("StatusBar should render maximum of 3 Sticky messages", async () => {
    MessageManager.maxDisplayedStickyMessages = 3;

    render(<StatusBar />);

    const details1 = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message 1.", undefined, OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details1);
    });
    expect(await screen.findByText("A brief message 1.")).to.be.not.null;
    const details2 = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message 2.", undefined, OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details2);
    });
    expect(await screen.findByText("A brief message 2.")).to.be.not.null;
    const details3 = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message 3.", undefined, OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details3);
    });
    expect(await screen.findByText("A brief message 3.")).to.be.not.null;

    const details4 = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message 4.", undefined, OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details4);
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message 1."));
    expect(await screen.findByText("A brief message 4.")).to.be.not.null;

    act(() => {
      MessageManager.closeAllMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief message 4."));
  });

  it("StatusBar should not render a Pointer message", () => {
    render(<StatusBar />);

    const details = new NotifyMessageDetails(OutputMessagePriority.Info, "A brief message.", "A detailed message.", OutputMessageType.Pointer);
    act(() => {
      notifications.outputMessage(details);
    });

    expect(screen.queryByText("A brief message.")).to.be.null;
  });

  it("StatusBar should clear messages", async () => {
    render(<StatusBar />);

    const details = new NotifyMessageDetails(OutputMessagePriority.Info, "A brief toast message.", "A detailed message.", OutputMessageType.Sticky);
    act(() => {
      notifications.outputMessage(details);
    });
    expect(await screen.findByText("A brief toast message.")).to.be.not.null;

    act(() => {
      MessageManager.clearMessages();
    });
    await waitForElementToBeRemoved(screen.queryByText("A brief toast message."));
  });

  it("StatusBarSpaceBetween should render correctly", () => {
    const { container } = render(<StatusBarSpaceBetween>Hello</StatusBarSpaceBetween>);
    expect(container.querySelectorAll("div.uifw-statusbar-space-between").length).to.eq(1);
  });

  it("StatusBarLeftSection should render correctly", () => {
    const { container } = render(<StatusBarLeftSection>Hello</StatusBarLeftSection>);
    expect(container.querySelectorAll("div.uifw-statusbar-left").length).to.eq(1);
  });

  it("StatusBarCenterSection should render correctly", () => {
    const { container } = render(<StatusBarCenterSection>Hello</StatusBarCenterSection>);
    expect(container.querySelectorAll("div.uifw-statusbar-center").length).to.eq(1);
  });

  it("StatusBarRightSection should render correctly", () => {
    const { container } = render(<StatusBarRightSection>Hello</StatusBarRightSection>);
    expect(container.querySelectorAll("div.uifw-statusbar-right").length).to.eq(1);
  });
});
