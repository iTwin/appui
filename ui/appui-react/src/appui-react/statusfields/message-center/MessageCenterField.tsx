/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import {
  Button,
  NotificationMarker,
  Popover,
  Tabs,
} from "@itwin/itwinui-react";
import { SvgChat } from "@itwin/itwinui-icons-react";
import { OutputMessagePriority } from "@itwin/core-frontend";

import { MessageCenterMessage } from "./MessageCenterMessage";
import { MessageManager } from "../../messages/MessageManager";
import { TitleBar } from "../../layout/footer/dialog/TitleBar";

import type { NotifyMessageDetailsType } from "../../messages/ReactNotifyMessageDetails";
import "./MessageCenterField.scss";
import { useTranslation } from "../../hooks/useTranslation";

/** Type for Status state to satisfy NotificationMarker type checking. */
type NotificationMarkerStatus = "primary" | "negative" | "positive";

const tabs = ["all", "errors"] as const;

/** Message Center Field React component.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export function MessageCenterField(props: CommonProps) {
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

  const isProblemStatus = (message: NotifyMessageDetailsType): boolean => {
    // See priority values in DgnPlatform defined in NotificationManager
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
    const determineStatus = () => {
      const message = [...MessageManager.messages].pop();

      if (message) {
        if (isProblemStatus(message)) {
          return setStatus("negative");
        } else if (message.priority === OutputMessagePriority.Success) {
          return setStatus("positive");
        } else {
          return setStatus("primary");
        }
      }
      return;
    };

    MessageManager.registerAnimateOutToElement(indicatorRef.current);

    return MessageManager.onMessagesUpdatedEvent.addListener(() => {
      MessageManager.messages.length > 0 ? setNotify(true) : setNotify(false);
      setMessages(MessageManager.messages);
      determineStatus();
    });
  }, []);

  return (
    <Popover
      visible={isOpen}
      onVisibleChange={(visible) => handleOpenChange(visible)}
      placement="top"
      middleware={{
        offset: 4,
      }}
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
                  ? tabMessages.filter(isProblemStatus)
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
                      const iconClassName =
                        MessageManager.getIconClassName(message);
                      const iconSpec =
                        MessageManager.getIconSpecFromDetails(message);

                      return (
                        <MessageCenterMessage
                          key={index}
                          message={message.briefMessage}
                          details={message.detailedMessage}
                          icon={
                            <Icon
                              iconSpec={iconSpec}
                              className={iconClassName}
                            />
                          }
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
      applyBackground
    >
      <Button
        ref={indicatorRef}
        styleType="borderless"
        startIcon={
          <NotificationMarker status={status} enabled={notify}>
            <SvgChat />
          </NotificationMarker>
        }
        className={props.className}
        style={props.style}
      >
        {translate("messageCenter.messages")}
      </Button>
    </Popover>
  );
}
