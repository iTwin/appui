/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */
import * as React from "react";
import {
  Button,
  NotificationMarker,
  Popover,
  Tabs,
} from "@itwin/itwinui-react";

import { SvgChat } from "@itwin/itwinui-icons-react";
import { Icon } from "@itwin/core-react";
import { UiFramework } from "../../UiFramework";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { MessageCenterMessage } from "./MessageCenterMessage";
import { MessageManager } from "../../messages/MessageManager";
import { TitleBar } from "../../layout/footer/dialog/TitleBar";

import type { NotifyMessageDetailsType } from "../../messages/ReactNotifyMessageDetails";
import "./MessageCenterField.scss";

/**
 * Type for Status state to satisfy NotificationMarker type checking
 */
type NotificationMarkerStatus = "primary" | "negative" | "positive";

/** Message Center Field React component.
 * @public
 */
export function MessageCenterField() {
  const [messages, setMessages] = React.useState(MessageManager.messages);
  const [notify, setNotify] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] =
    React.useState<NotificationMarkerStatus>("primary");

  const indicatorRef = React.useRef<HTMLButtonElement>(null);
  const title = UiFramework.translate("messageCenter.messages");

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

  const getMessages = (tab: string) => {
    return [...messages].reverse().map((message, index) => {
      if (messages.length > 0) {
        const iconClassName = MessageManager.getIconClassName(message);
        const iconSpec = MessageManager.getIconSpecFromDetails(message);

        if ((tab === "error" && isProblemStatus(message)) || tab === "all") {
          return (
            <MessageCenterMessage
              key={index.toString()}
              message={message.briefMessage}
              details={message.detailedMessage}
              icon={<Icon iconSpec={iconSpec} className={iconClassName} />}
            />
          );
        }
        return;
      } else {
        return (
          <span className="uifw-message-prompt" key={`${index.toString()}`}>
            No Messages.
          </span>
        );
      }
    });
  };

  const tabs = (
    <>
      {["all", "error"].map((tabType) => {
        return (
          <Tabs.Panel value={tabType} key={tabType}>
            <div className="uifw-statusFields-messageCenter-messageCenterField">
              {getMessages(tabType)}
            </div>
          </Tabs.Panel>
        );
      })}
    </>
  );

  return (
    <Popover
      visible={isOpen}
      onVisibleChange={(visible) => handleOpenChange(visible)}
      placement="top"
      className="uifw-statusFields-messageCenter-popover"
      content={
        <>
          <TitleBar title={title}></TitleBar>

          <Tabs.Wrapper type="pill">
            <Tabs.TabList>
              <Tabs.Tab label="All" key="all" value="all" />
              <Tabs.Tab label="Error" key="error" value="error" />
            </Tabs.TabList>
            {tabs}
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
      >
        {title}
      </Button>
    </Popover>
  );
}
