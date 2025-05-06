/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { MessageSeverity } from "@itwin/appui-abstract";
import {
  MessageBoxIconType,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { ThemeProvider } from "@itwin/itwinui-react";
import {
  AppNotificationManager,
  MessageManager,
  ReactNotifyMessageDetails,
} from "../../appui-react.js";
import { MessageRenderer } from "../../appui-react/messages/MessageRenderer.js";

describe("MessageManager", () => {
  const notifications = new AppNotificationManager();

  afterEach(() => {
    MessageManager.closeAllMessages();
    MessageManager.clearMessages();
  });

  it.skip("FLAKY:maxCachedMessages handled correctly", () => {
    const spy = vi.fn();
    MessageManager.onMessagesUpdatedEvent.addListener(spy);
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).toEqual(0);
    expect(spy).toHaveBeenCalledOnce();

    for (let i = 0; i < 500; i++) {
      MessageManager.addMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Debug,
          `A brief message - ${i}.`
        )
      );
    }
    expect(MessageManager.messages.length).toEqual(500);

    spy.mockReset();
    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, `A brief message.`)
    );
    expect(MessageManager.messages.length).toEqual(376);
    expect(spy).toHaveBeenCalledTimes(2);

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

  it("should activate the same message once", async () => {
    function getActiveMessages() {
      return MessageManager.activeMessageManager.messages.map(({ id }) => id);
    }
    function getMessages() {
      return MessageManager.messages.map(({ briefMessage }) =>
        typeof briefMessage === "string" ? briefMessage : "Brief message"
      );
    }

    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "Message 1")
    );
    expect(getActiveMessages()).toEqual(["0"]);
    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "Message 2")
    );
    expect(getActiveMessages()).toEqual(["1", "0"]);
    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "Message 1")
    );
    expect(getActiveMessages(), "Message 1 is already active").toEqual([
      "1",
      "0",
    ]);

    // `Message 1` is removed when i.e. toast is closed
    MessageManager.activeMessageManager.remove("0");

    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "Message 1")
    );
    expect(getActiveMessages()).toEqual(["2", "1"]);

    MessageManager.addMessage(
      new NotifyMessageDetails(OutputMessagePriority.Debug, "Message 2")
    );
    expect(getActiveMessages(), "Message 2 is still active").toEqual([
      "2",
      "1",
    ]);

    expect(getMessages()).toEqual(["Message 1", "Message 2", "Message 1"]);
  });

  it("React based message should be supported", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).toEqual(0);

    const reactNode = <span>For more details, click here.</span>;
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
    const onOpenMessageCenterEventSpy = vi.fn();
    MessageManager.onOpenMessageCenterEvent.addOnce(
      onOpenMessageCenterEventSpy
    );

    MessageManager.openMessageCenter();
    expect(onOpenMessageCenterEventSpy).toHaveBeenCalledOnce();
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
    expect(component.queryByText("A brief message.")).toEqual(null);
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
    expect(component.queryByText("A brief message.")).toEqual(null);
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

    expect(component.queryByText("A brief message.")).toEqual(null);
  });

  it("should respect `maxDisplayedStickyMessages`", async () => {
    vi.spyOn(
      MessageManager,
      "maxDisplayedStickyMessages",
      "get"
    ).mockImplementation(() => 3);

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
    expect(component.queryByText("A brief message 1.")).toEqual(null);
    component.getByText("A brief message 2.");
    component.getByText("A brief message 3.");
    component.getByText("A brief message 4.");

    act(() => {
      MessageManager.closeAllMessages();
    });
    expect(component.queryByText("A brief message 1.")).toEqual(null);
    expect(component.queryByText("A brief message 2.")).toEqual(null);
    expect(component.queryByText("A brief message 3.")).toEqual(null);
    expect(component.queryByText("A brief message 4.")).toEqual(null);
  });
});
