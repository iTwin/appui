/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Button, Icon, NotificationMarker, Tabs } from "@itwin/itwinui-react";
import {
  SvgChat,
  SvgInfo,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from "@itwin/itwinui-icons-react";
import { OutputMessagePriority } from "@itwin/core-frontend";

import { MessageCenterMessage } from "./MessageCenterMessage.js";
import { MessageManager } from "../../messages/MessageManager.js";
import { TitleBar } from "../../layout/footer/dialog/TitleBar.js";

import type { NotifyMessageDetailsType } from "../../messages/ReactNotifyMessageDetails.js";
import "./MessageCenterField.scss";
import { useTranslation } from "../../hooks/useTranslation.js";
import { StatusBarPopover } from "../../statusbar/popup/StatusBarPopover.js";
import { usePosition } from "../usePosition.js";
import classNames from "classnames";

/** Type for Status state to satisfy NotificationMarker type checking. */
type NotificationMarkerStatus = Required<
  React.ComponentProps<typeof NotificationMarker>
>["status"];

const tabs = ["all", "errors"] as const;

/** Message Center Field React component.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function MessageCenterField(props: CommonProps) {
  const [messages, setMessages] = React.useState(MessageManager.messages);
  const [notify, setNotify] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] =
    React.useState<NotificationMarkerStatus>("primary");
  const { translate } = useTranslation();

  const indicatorRef = React.useRef<HTMLButtonElement>(null);
  const { position } = usePosition(indicatorRef);

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
      setMessages(newMessages);

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

  return (
    <StatusBarPopover
      style={{ left: position.current.left }}
      visible={isOpen}
      onVisibleChange={(visible) => handleOpenChange(visible)}
      className="uifw-statusFields-messageCenter-messageCenterField_popover"
      content={
        <>
          <TitleBar title={translate("messageCenter.messages")}></TitleBar>

          <Tabs.Wrapper type="pill">
            <Tabs.TabList>
              {tabs.map((tab) => (
                <Tabs.Tab
                  label={translate(`messageCenter.${tab}`)}
                  key={tab}
                  value={tab}
                />
              ))}
            </Tabs.TabList>
            {tabs.map((tab) => {
              let tabMessages = [...messages].reverse();
              tabMessages =
                tab === "errors"
                  ? tabMessages.filter(isErrorMessage)
                  : tabMessages;
              return (
                <Tabs.Panel
                  value={tab}
                  key={tab}
                  className="uifw-statusFields-messageCenter-messageCenterField_panel"
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
                          message={message.briefMessage}
                          details={message.detailedMessage}
                          icon={<MessageIcon priority={message.priority} />}
                        />
                      );
                    })
                  )}
                </Tabs.Panel>
              );
            })}
          </Tabs.Wrapper>
        </>
      }
    >
      <Button
        ref={indicatorRef}
        styleType="borderless"
        startIcon={
          <NotificationMarker status={status} enabled={notify}>
            <SvgChat />
          </NotificationMarker>
        }
        className={classNames(
          `uifw-statusFields-messageCenter-messageCenterField_button`,
          props.className,
          { pressed: isOpen }
        )}
        style={props.style}
      >
        {translate("messageCenter.messages")}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}

interface MessageIconProps {
  priority: OutputMessagePriority;
}

function MessageIcon({ priority }: MessageIconProps) {
  switch (priority) {
    case OutputMessagePriority.Error:
    case OutputMessagePriority.Fatal:
      return (
        <Icon fill="negative">
          <SvgStatusError />
        </Icon>
      );
    case OutputMessagePriority.Warning:
      return (
        <Icon fill="warning">
          <SvgStatusWarning />
        </Icon>
      );
    case OutputMessagePriority.Info:
      return (
        <Icon fill="informational">
          <SvgInfo />
        </Icon>
      );
  }
  return (
    <Icon fill="positive">
      <SvgStatusSuccess />
    </Icon>
  );
}
