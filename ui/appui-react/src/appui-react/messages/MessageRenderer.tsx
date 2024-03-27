/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import * as React from "react";
import type { ReactMessage } from "@itwin/core-react";
import { MessageRenderer as CoreMessageRenderer } from "@itwin/core-react";
import { ProgressLinear, Text, useToaster } from "@itwin/itwinui-react";
import type { ActivityMessageEventArgs } from "../messages/MessageManager";
import { MessageManager } from "../messages/MessageManager";
import { OutputMessagePriority, OutputMessageType } from "@itwin/core-frontend";
import { useTranslation } from "../hooks/useTranslation";

interface UseActivityMessageProps {
  cancelActivityMessage?: () => void;
  dismissActivityMessage?: () => void;
  activityMessageInfo?: ActivityMessageEventArgs;
}

/** Hook to render an Activity message.
 * @internal
 */
function useActivityMessage({
  activityMessageInfo,
  dismissActivityMessage,
  cancelActivityMessage,
}: UseActivityMessageProps) {
  const toaster = useToaster();
  const { translate } = useTranslation();
  const recentToast = React.useRef<{ close: () => void } | undefined>();
  React.useEffect(() => {
    toaster.setSettings({ placement: "bottom" });
  }, [toaster]);

  React.useEffect(() => {
    if (activityMessageInfo?.restored) {
      recentToast.current = toaster.informational(
        <ActivityMessageContent
          initialActivityMessageInfo={activityMessageInfo}
        />,
        {
          onRemove: dismissActivityMessage,
          type: "persisting",
          link:
            activityMessageInfo?.details?.supportsCancellation &&
            cancelActivityMessage
              ? {
                  title: translate("dialog.cancel"),
                  onClick: cancelActivityMessage,
                }
              : undefined,
        }
      );
    }
    if (!activityMessageInfo) {
      recentToast.current?.close();
    }
  }, [
    activityMessageInfo,
    cancelActivityMessage,
    dismissActivityMessage,
    toaster,
    translate,
  ]);
}

/** Component that renders activity, toast and sticky messages dispatched from message manager.
 * @internal
 */
export function MessageRenderer() {
  const [activityMessageInfo, setActivityMessageInfo] = React.useState<
    ActivityMessageEventArgs | undefined
  >();
  React.useEffect(() => {
    return MessageManager.onActivityMessageUpdatedEvent.addListener((args) => {
      setActivityMessageInfo(args);
    });
  }, []);

  React.useEffect(() => {
    return MessageManager.onActivityMessageCancelledEvent.addListener(() => {
      setActivityMessageInfo(undefined);
    });
  }, []);

  const cancelActivityMessage = React.useCallback(() => {
    MessageManager.endActivityMessage(false);
  }, []);

  useActivityMessage({ activityMessageInfo, cancelActivityMessage });
  useDisplayMessage();
  return null;
}

/** Component used to show and update activity message content.
 * @internal
 */
function ActivityMessageContent({
  initialActivityMessageInfo,
}: {
  initialActivityMessageInfo: ActivityMessageEventArgs;
}) {
  const { translate } = useTranslation();

  const percentCompleteLabel = translate("activityCenter.percentComplete");
  const [activityMessageInfo, setActivityMessageInfo] = React.useState(
    initialActivityMessageInfo
  );

  React.useEffect(() => {
    const handleActivityMessageUpdatedEvent = (
      args: ActivityMessageEventArgs
    ) => {
      setActivityMessageInfo(args);
    };

    return MessageManager.onActivityMessageUpdatedEvent.addListener(
      handleActivityMessageUpdatedEvent
    );
  }, []);

  return (
    <>
      {activityMessageInfo.message && (
        <Text>
          <>
            {(activityMessageInfo.message as ReactMessage).reactNode ||
              activityMessageInfo.message}
          </>
        </Text>
      )}
      {!!activityMessageInfo.details?.showPercentInMessage && (
        <Text variant="small">{`${activityMessageInfo.percentage} ${percentCompleteLabel}`}</Text>
      )}
      {activityMessageInfo.details?.showProgressBar && (
        <ProgressLinear value={activityMessageInfo?.percentage} />
      )}
    </>
  );
}

function useDisplayMessage() {
  const toaster = useToaster();
  React.useEffect(() => {
    return MessageManager.onDisplayMessage.addListener((args) => {
      const { message, options, settings, animateOutToElement } = args;
      const toastOptions: typeof options = {
        hasCloseButton: true,
        duration: message.displayTime.milliseconds,
        type:
          message.msgType === OutputMessageType.Sticky
            ? "persisting"
            : "temporary",
        animateOutTo: animateOutToElement,
        ...options,
      };
      toaster.setSettings({
        placement: "bottom",
        order: "ascending",
        ...settings,
      });
      const content = (
        <>
          <CoreMessageRenderer message={message.briefMessage} />
          {message.detailedMessage && (
            <Text variant="small">
              <CoreMessageRenderer message={message.detailedMessage} />
            </Text>
          )}
        </>
      );

      let toast;
      switch (message.priority) {
        case OutputMessagePriority.Warning: {
          toast = toaster.warning(content, toastOptions);
          break;
        }
        case OutputMessagePriority.Info: {
          toast = toaster.informational(content, toastOptions);
          break;
        }
        case OutputMessagePriority.Error:
        case OutputMessagePriority.Fatal: {
          toast = toaster.negative(content, toastOptions);
          break;
        }
        default:
          toast = toaster.positive(content, toastOptions);
      }

      args.close = toast.close;
    });
  }, [toaster]);
}
