/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MessageSeverity } from "@itwin/appui-abstract";
import {
  MessageBoxIconType,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { UnderlinedButton } from "@itwin/core-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import {
  AppNotificationManager,
  MessageManager,
  ReactNotifyMessageDetails,
} from "../../appui-react";
import { MessageRenderer } from "../../appui-react/messages/MessageRenderer";

describe("MessageManager", () => {
  const notifications = new AppNotificationManager();

  afterEach(async () => {
    act(() => {
      MessageManager.closeAllMessages();
      MessageManager.clearMessages();
    });
  });

  it("maxCachedMessages handled correctly", () => {
    const clearSpy = sinon.spy();
    MessageManager.onMessagesUpdatedEvent.addListener(clearSpy);
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).toEqual(0);
    clearexpect(spy).toHaveBeenCalledOnce();

    for (let i = 0; i < 500; i++) {
      MessageManager.addMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Debug,
          `A brief message - ${i}.`
        )
      );
    }
    expect(MessageManager.messages.length).toEqual(500);

    clearspy.mockReset();
    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, `A brief message.`)
    );
    expect(MessageManager.messages.length).toEqual(376);
    clearSpy.calledTwice.should.true;

    const newMax = 375;
    MessageManager.setMaxCachedMessages(newMax);
    expect(MessageManager.messages.length).to.be.lessThan(newMax);
  });

  it("maxDisplayedStickyMessages handled correctly", () => {
    MessageManager.maxDisplayedStickyMessages = 5;
    expect(MessageManager.maxDisplayedStickyMessages).toEqual(5);
  });

  it("getIconType should return proper icon type", () => {
    expect(
      MessageManager.getIconType(
        new NotifyMessageDetails(OutputMessagePriority.Info, "A brief message.")
      )
    ).toEqual(MessageBoxIconType.Information);

    expect(
      MessageManager.getIconType(
        new NotifyMessageDetails(
          OutputMessagePriority.Warning,
          "A brief message."
        )
      )
    ).toEqual(MessageBoxIconType.Warning);

    expect(
      MessageManager.getIconType(
        new NotifyMessageDetails(
          OutputMessagePriority.Error,
          "A brief message."
        )
      )
    ).toEqual(MessageBoxIconType.Critical);

    expect(
      MessageManager.getIconType(
        new NotifyMessageDetails(
          OutputMessagePriority.Fatal,
          "A brief message."
        )
      )
    ).toEqual(MessageBoxIconType.Critical);

    expect(
      MessageManager.getIconType(
        new NotifyMessageDetails(OutputMessagePriority.None, "A brief message.")
      )
    ).toEqual(MessageBoxIconType.NoSymbol);
  });

  it("getSeverity should return proper severity", () => {
    expect(
      MessageManager.getSeverity(
        new NotifyMessageDetails(OutputMessagePriority.Info, "A brief message.")
      )
    ).toEqual(MessageSeverity.Information);

    expect(
      MessageManager.getSeverity(
        new NotifyMessageDetails(
          OutputMessagePriority.Warning,
          "A brief message."
        )
      )
    ).toEqual(MessageSeverity.Warning);

    expect(
      MessageManager.getSeverity(
        new NotifyMessageDetails(
          OutputMessagePriority.Error,
          "A brief message."
        )
      )
    ).toEqual(MessageSeverity.Error);

    expect(
      MessageManager.getSeverity(
        new NotifyMessageDetails(
          OutputMessagePriority.Fatal,
          "A brief message."
        )
      )
    ).toEqual(MessageSeverity.Fatal);

    expect(
      MessageManager.getSeverity(
        new NotifyMessageDetails(OutputMessagePriority.None, "A brief message.")
      )
    ).toEqual(MessageSeverity.Success);

    expect(
      MessageManager.getSeverity(
        new NotifyMessageDetails(
          OutputMessagePriority.Success,
          "A brief message."
        )
      )
    ).toEqual(MessageSeverity.Success);
  });

  it("non-duplicate message should be added to Message Center", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).toEqual(0);

    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.")
    );
    expect(MessageManager.messages.length).toEqual(1);

    MessageManager.addMessage(
      new NotifyMessageDetails(
        OutputMessagePriority.Error,
        "Another brief message."
      )
    );
    expect(MessageManager.messages.length).toEqual(2);
  });

  it("duplicate message should not be added to Message Center", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).toEqual(0);

    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.")
    );
    expect(MessageManager.messages.length).toEqual(1);

    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.")
    );
    expect(MessageManager.messages.length).toEqual(1);
  });

  it("React based message should be supported", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).toEqual(0);

    const reactNode = (
      <span>
        For more details, <UnderlinedButton>click here</UnderlinedButton>.
      </span>
    );
    MessageManager.outputMessage(
      new ReactNotifyMessageDetails(
        OutputMessagePriority.Debug,
        "A brief message.",
        { reactNode }
      )
    );
    expect(MessageManager.messages.length).toEqual(1);
  });

  it("openMessageCenter raises OpenMessageCenterEvent", () => {
    const onOpenMessageCenterEventSpy = sinon.spy();
    MessageManager.onOpenMessageCenterEvent.addOnce(
      onOpenMessageCenterEventSpy
    );

    MessageManager.openMessageCenter();
    expect(onOpenMessageCenterEventSpy.callCount).toEqual(1);
  });

  it("should render a toast message", async () => {
    const component = render(<MessageRenderer />, { wrapper: ThemeProvider });
    const details = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "A brief message.",
      "A detailed message."
    );
    act(() => {
      notifications.outputMessage(details);
    });
    component.getByText("A brief message.");

    act(() => {
      MessageManager.closeAllMessages();
    });
    expect(component.queryByText("A brief message.")).to.be.null;
  });

  it("should render a sticky message", async () => {
    const component = render(<MessageRenderer />, { wrapper: ThemeProvider });
    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Info,
          "A brief message.",
          "A detailed message.",
          OutputMessageType.Sticky
        )
      );
    });
    component.getByText("A brief message.");

    act(() => {
      MessageManager.closeAllMessages();
    });
    expect(component.queryByText("A brief message.")).to.be.null;
  });

  it("should close sticky message on click", async () => {
    const component = render(<MessageRenderer />, { wrapper: ThemeProvider });

    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Error,
          "A brief message.",
          "A detailed message.",
          OutputMessageType.Sticky
        )
      );
    });
    component.getByText("A brief message.");

    const closeButton = component.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    await waitForElementToBeRemoved(() =>
      component.queryByText("A brief message.")
    );
  });

  it("should respect `maxDisplayedStickyMessages`", async () => {
    vi.spyOn(MessageManager, "maxDisplayedStickyMessages").get(() => 3);

    const component = render(<MessageRenderer />, { wrapper: ThemeProvider });
    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.None,
          "A brief message 1.",
          undefined,
          OutputMessageType.Sticky
        )
      );
    });
    component.getByText("A brief message 1.");

    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.None,
          "A brief message 2.",
          undefined,
          OutputMessageType.Sticky
        )
      );
    });
    component.getByText("A brief message 1.");
    component.getByText("A brief message 2.");

    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.None,
          "A brief message 3.",
          undefined,
          OutputMessageType.Sticky
        )
      );
    });
    component.getByText("A brief message 1.");
    component.getByText("A brief message 2.");
    component.getByText("A brief message 3.");

    act(() => {
      notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.None,
          "A brief message 4.",
          undefined,
          OutputMessageType.Sticky
        )
      );
    });
    expect(component.queryByText("A brief message 1.")).to.be.null;
    component.getByText("A brief message 2.");
    component.getByText("A brief message 3.");
    component.getByText("A brief message 4.");

    act(() => {
      MessageManager.closeAllMessages();
    });
    expect(component.queryByText("A brief message 1.")).to.be.null;
    expect(component.queryByText("A brief message 2.")).to.be.null;
    expect(component.queryByText("A brief message 3.")).to.be.null;
    expect(component.queryByText("A brief message 4.")).to.be.null;
  });
});
