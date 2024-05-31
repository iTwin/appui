/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessageAlert,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { AppUiStory } from "../../AppUiStory";
import { UiFramework } from "@itwin/appui-react";
import { RelativePosition } from "@itwin/appui-abstract";

interface NotificationsStoryProps {
  messagePriority: OutputMessagePriority;
  briefMessage: string | HTMLElement;
  detailedMessage?: string | HTMLElement;
  messageType?: OutputMessageType;
  messageAlert?: OutputMessageAlert;
}

/** [AppNotificationManager.outputMessage](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/) can be used to display notifications. */
export function NotificationsStory({
  messagePriority,
  briefMessage,
  detailedMessage,
  messageType,
  messageAlert,
  ...props
}: NotificationsStoryProps) {
  React.useEffect(() => {
    return () => {
      UiFramework.dialogs.modal.close();
      UiFramework.dialogs.modeless.close();
    };
  }, []);
  return (
    <AppUiStory
      layout="fullscreen"
      onFrontstageActivated={() => {
        const message = new NotifyMessageDetails(
          messagePriority,
          briefMessage,
          detailedMessage,
          messageType,
          messageAlert
        );
        // Needed for pointer message.
        message.viewport = document.documentElement;
        IModelApp.notifications.outputMessage(message);
      }}
      {...props}
    >
      <PointerPosition />
    </AppUiStory>
  );
}

// Update pointer message position.
function PointerPosition() {
  React.useEffect(() => {
    const listener = (e: PointerEvent) => {
      IModelApp.notifications.updatePointerMessage(
        {
          x: e.clientX + 10,
          y: e.clientY - 10,
        },
        // TODO: required in AppNotificationManager
        RelativePosition.Top
      );
    };
    document.addEventListener("pointermove", listener);
    return () => {
      document.removeEventListener("pointermove", listener);
    };
  }, []);
  return null;
}
