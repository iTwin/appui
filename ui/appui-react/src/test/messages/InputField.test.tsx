/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import {
  InputFieldMessage,
  MessageManager,
  UiFramework,
} from "../../appui-react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("InputFieldMessage", () => {
  beforeEach(async () => {
    UiFramework.keyboardShortcuts.closeMenu();
  });

  it("outputMessage with InputField", async () => {
    let details = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "Input field message.",
      "Detailed input field message.",
      OutputMessageType.InputField
    );
    const divElement = document.createElement("div");
    details.setInputFieldTypeDetails(divElement);
    render(<InputFieldMessage showCloseButton />);
    MessageManager.displayInputFieldMessage(
      details.inputField!,
      details.briefMessage,
      details.detailedMessage,
      details.priority
    );

    await vi.waitFor(() => screen.getByText("Input field message."));
    screen.getByRole("dialog");

    MessageManager.hideInputFieldMessage();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Input field message.")
    );

    // Warning icon
    details = new NotifyMessageDetails(
      OutputMessagePriority.Warning,
      "Input field message.",
      "Detailed input field message.",
      OutputMessageType.InputField
    );
    details.setInputFieldTypeDetails(divElement);
    MessageManager.displayInputFieldMessage(
      details.inputField!,
      details.briefMessage,
      details.detailedMessage,
      details.priority
    );

    await vi.waitFor(() => screen.getByText("Input field message."));

    MessageManager.hideInputFieldMessage();

    // Info icon
    details = new NotifyMessageDetails(
      OutputMessagePriority.Info,
      "Input field message.",
      "Detailed input field message.",
      OutputMessageType.InputField
    );
    details.setInputFieldTypeDetails(divElement);
    MessageManager.displayInputFieldMessage(
      details.inputField!,
      details.briefMessage,
      details.detailedMessage,
      details.priority
    );

    await vi.waitFor(() => screen.getByText("Input field message."));

    MessageManager.hideInputFieldMessage();

    // Without an inputFieldElement
    details = new NotifyMessageDetails(
      OutputMessagePriority.Info,
      "Input field message.",
      undefined,
      OutputMessageType.InputField
    );
    MessageManager.displayInputFieldMessage(
      details.inputField!,
      details.briefMessage,
      details.detailedMessage,
      details.priority
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Input field message.")
    );
  });
});
