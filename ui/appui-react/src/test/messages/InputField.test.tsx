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
import TestUtils, { childStructure } from "../TestUtils";
import { render, screen, waitFor } from "@testing-library/react";

describe("InputFieldMessage", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
    UiFramework.keyboardShortcuts.closeMenu();
  });

  afterEach(() => {
    TestUtils.terminateUiFramework();
  });

  // TODO: These look for the webfont icon classnames. This only tests that an icon is displayed and should be replaced with visual testing
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

    expect(await screen.findByText("Input field message.")).to.exist;

    expect(screen.getByRole("dialog")).to.satisfy(
      childStructure(".uifw-popup-message-icon")
    );

    MessageManager.hideInputFieldMessage();

    await waitFor(() => {
      expect(screen.queryByText("Input field message.")).to.be.null;
    });

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

    expect(await screen.findByRole("dialog")).to.satisfy(
      childStructure(".uifw-popup-message-icon")
    );

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

    await waitFor(() => {
      expect(screen.getByRole("dialog")).to.satisfy(
        childStructure(".uifw-popup-message-icon")
      );
    });

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

    await waitFor(() => {
      expect(screen.queryByText("Input field message.")).to.be.null;
    });
  });
});
