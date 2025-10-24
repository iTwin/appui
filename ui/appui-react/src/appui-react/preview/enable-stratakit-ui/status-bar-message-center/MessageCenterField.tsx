/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */
import * as React from "react";
import { NotificationMarker } from "@itwin/itwinui-react";
import SvgChat from "../../../icons/SvgChat.js";
import SvgInfo from "../../../icons/SvgInfo.js";
import SvgStatusWarning from "../../../icons/SvgStatusWarning.js";
import SvgStatusError from "../../../icons/SvgStatusError.js";
import SvgStatusSuccess from "../../../icons/SvgStatusSuccess.js";
import { Button } from "@stratakit/bricks";
import { Tabs } from "@stratakit/structures";
import { OutputMessagePriority } from "@itwin/core-frontend";
import type { MessageType } from "./MessageCenterMessage.js";
import { MessageCenterMessage } from "./MessageCenterMessage.js";
import { MessageManager } from "../../../messages/MessageManager.js";
import { TitleBar } from "../title-bar/TitleBar.js";

import type { NotifyMessageDetailsType } from "../../../messages/ReactNotifyMessageDetails.js";
import { useTranslation } from "../../../hooks/useTranslation.js";
import { StatusBarPopover } from "../../../statusbar/popup/StatusBarPopover.js";

import "./MessageCenterField.scss";

/** Type for Status state to satisfy NotificationMarker type checking. */
type NotificationMarkerStatus = Required<
  React.ComponentProps<typeof NotificationMarker>
>["status"];

const tabs = ["all", "errors"] as const;

/**
 * Message Center Field React component using Stratakit.
 * @public
 */
export function MessageCenterField() {
  const [messages, setMessages] = React.useState(MessageManager.messages);
  const [notify, setNotify] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] =
    React.useState<NotificationMarkerStatus>("primary");
  const { translate } = useTranslation();

  const indicatorRef = React.useRef<HTMLButtonElement>(null);

  const handleOpenChange = (isOpenState: boolean) => {
    setNotify(false);
    setIsOpen(isOpenState);
  };

  const isErrorMessage = (message: NotifyMessageDetailsType): boolean => {
    return (
      message.priority === OutputMessagePriority.Error ||
      message.priority === OutputMessagePriority.Fatal
    );
  };

  React.useEffect(() => {
    return MessageManager.onOpenMessageCenterEvent.addListener(() => {
      handleOpenChange(true);
    });
  }, []);

  React.useEffect(() => {
    MessageManager.registerAnimateOutToElement(indicatorRef.current);

    return MessageManager.onMessagesUpdatedEvent.addListener(() => {
      const newMessages = MessageManager.messages;
      newMessages.length > 0 ? setNotify(true) : setNotify(false);
      setMessages([...newMessages]);

      const lastMessage = newMessages[newMessages.length - 1];
      if (!lastMessage) return;

      switch (lastMessage.priority) {
        case OutputMessagePriority.Success:
          setStatus("positive");
          break;
        case OutputMessagePriority.Warning:
          setStatus("warning");
          break;
        case OutputMessagePriority.Error:
        case OutputMessagePriority.Fatal:
          setStatus("negative");
          break;
        default:
          setStatus("primary");
      }
    });
  }, []);

  function renderPopoverContent() {
    return (
      <>
        <TitleBar title={translate("messageCenter.messages")} />
        <Tabs.Provider>
          <Tabs.TabList tone="accent">
            {tabs.map((tab) => (
              <Tabs.Tab id={`message-center-tab-${tab}`} key={tab}>
                {translate(`messageCenter.${tab}`)}
              </Tabs.Tab>
            ))}
          </Tabs.TabList>
          {tabs.map((tab) => {
            let tabMessages = [...messages].reverse();
            tabMessages =
              tab === "errors"
                ? tabMessages.filter(isErrorMessage)
                : tabMessages;
            return (
              <Tabs.TabPanel
                tabId={`message-center-tab-${tab}`}
                key={tab}
                className="uifw-statusFields-messageCenter-messageCenterField_sk_panel"
              >
                {tabMessages.length === 0 ? (
                  <span className="uifw-message-prompt">
                    {translate("messageCenter.prompt")}
                  </span>
                ) : (
                  tabMessages.map((message, index) => {
                    return (
                      <MessageCenterMessage
                        key={index}
                        message={message.briefMessage as MessageType}
                        details={message.detailedMessage as MessageType}
                        icon={<MessageIcon priority={message.priority} />}
                      />
                    );
                  })
                )}
              </Tabs.TabPanel>
            );
          })}
        </Tabs.Provider>
      </>
    );
  }

  return (
    <>
      <StatusBarPopover
        visible={isOpen}
        onVisibleChange={(visible: boolean) => handleOpenChange(visible)}
        className="uifw-statusFields-messageCenter-messageCenterField_sk_popover"
        content={renderPopoverContent()}
      >
        <Button
          ref={indicatorRef}
          variant="ghost"
          className={`uifw-statusFields-messageCenter-messageCenterField_sk_button ${
            isOpen ? "pressed" : ""
          }`}
        >
          <NotificationMarker status={status} enabled={notify}>
            <SvgChat />
          </NotificationMarker>
          {translate("messageCenter.messages")}
          <StatusBarPopover.ExpandIndicator />
        </Button>
      </StatusBarPopover>
    </>
  );
}

interface MessageIconProps {
  priority: OutputMessagePriority;
}

function MessageIcon({ priority }: MessageIconProps) {
  switch (priority) {
    case OutputMessagePriority.Error:
    case OutputMessagePriority.Fatal:
      return <SvgStatusError />;
    case OutputMessagePriority.Warning:
      return <SvgStatusWarning />;
    case OutputMessagePriority.Info:
      return <SvgInfo />;
  }
  return <SvgStatusSuccess />;
}
