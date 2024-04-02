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
import { RelativePosition } from "@itwin/appui-abstract";
import { AppNotificationManager, PointerMessage } from "../../appui-react";
import { selectorMatches } from "../TestUtils";
import { render, screen } from "@testing-library/react";

describe("PointerMessage", () => {
  let notifications: AppNotificationManager;
  let details: NotifyMessageDetails;
  const viewport = document.activeElement as HTMLElement;
  const point = { x: 0, y: 0 };

  beforeEach(() => {
    notifications = new AppNotificationManager();
    details = new NotifyMessageDetails(
      OutputMessagePriority.None,
      "Brief",
      "Detailed",
      OutputMessageType.Pointer
    );
  });

  it("should display the message", async () => {
    render(<PointerMessage />);

    notifications.outputMessage(details);

    expect(await screen.findByText("Brief")).to.satisfy(
      selectorMatches(
        ".uifw-pointer-message .nz-content .uifw-pointer-message-content .uifw-pointer-message-text .uifw-pointer-message-brief"
      )
    );
  });

  it("should hide the message", () => {
    const hideMessage = vi.spyOn(PointerMessage, "hideMessage");
    notifications.closePointerMessage();
    expect(hideMessage).toHaveBeenCalled();
  });

  it("should display a warning message", () => {
    const showMessage = vi.spyOn(PointerMessage, "showMessage");
    const localDetails = new NotifyMessageDetails(
      OutputMessagePriority.Warning,
      "Brief",
      "Detailed",
      OutputMessageType.Pointer
    );
    notifications.outputMessage(localDetails);
    expect(showMessage).toHaveBeenCalled();
  });

  it("should display an error message", () => {
    const showMessage = vi.spyOn(PointerMessage, "showMessage");
    const localDetails = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "Brief",
      "Detailed",
      OutputMessageType.Pointer
    );
    notifications.outputMessage(localDetails);
    expect(showMessage).toHaveBeenCalled();
  });

  it("should offset the message", () => {
    render(<PointerMessage />);
    details.setPointerTypeDetails(viewport, point, RelativePosition.Top);
    notifications.outputMessage(details);

    details.setPointerTypeDetails(viewport, point, RelativePosition.TopRight);
    notifications.outputMessage(details);

    details.setPointerTypeDetails(viewport, point, RelativePosition.Right);
    notifications.outputMessage(details);

    details.setPointerTypeDetails(
      viewport,
      point,
      RelativePosition.BottomRight
    );
    notifications.outputMessage(details);

    details.setPointerTypeDetails(viewport, point, RelativePosition.Bottom);
    notifications.outputMessage(details);

    details.setPointerTypeDetails(viewport, point, RelativePosition.BottomLeft);
    notifications.outputMessage(details);

    details.setPointerTypeDetails(viewport, point, RelativePosition.Left);
    notifications.outputMessage(details);

    details.setPointerTypeDetails(viewport, point, RelativePosition.TopLeft);
    notifications.outputMessage(details);
  });

  it("should update the message", () => {
    const updateMessage = vi.spyOn(PointerMessage, "updateMessage");
    render(<PointerMessage />);
    notifications.updatePointerMessage(
      { x: 1, y: 1 },
      RelativePosition.BottomRight
    );
    expect(updateMessage).toHaveBeenCalled();
  });
});
