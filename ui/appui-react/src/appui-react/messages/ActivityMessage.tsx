/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import * as React from "react";
import type { ReactMessage } from "@itwin/core-react";
import { UiCore } from "@itwin/core-react";
import { ProgressLinear, Text, useToaster } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import type { ActivityMessageEventArgs } from "../messages/MessageManager";
import { MessageManager } from "../messages/MessageManager";

interface UseActivityMessageProps {
  cancelActivityMessage?: () => void;
  dismissActivityMessage?: () => void;
  activityMessageInfo?: ActivityMessageEventArgs;
}

/**
 * Hook to render an Activity message.
 * @internal
 */
function useActivityMessage({
  activityMessageInfo,
  dismissActivityMessage,
  cancelActivityMessage,
}: UseActivityMessageProps) {
  const toaster = useToaster();
  const [cancelLabel] = React.useState(UiCore.translate("dialog.cancel"));
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
              ? { title: cancelLabel, onClick: cancelActivityMessage }
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
    cancelLabel,
    dismissActivityMessage,
    toaster,
  ]);
}

/**
 * Component wrapping the `useActivityMessage` hook to use in class components.
 * @internal
 */
export function ActivityMessageRenderer() {
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
  return <></>;
}

/**
 * Component used to show and update activity message content.
 * @internal
 */
function ActivityMessageContent({
  initialActivityMessageInfo,
}: {
  initialActivityMessageInfo: ActivityMessageEventArgs;
}) {
  const [percentCompleteLabel] = React.useState(
    UiFramework.translate("activityCenter.percentComplete")
  );
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
