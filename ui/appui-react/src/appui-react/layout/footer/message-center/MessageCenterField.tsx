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
import type { MessageType } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { UiFramework } from "../../../UiFramework";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { MessageCenterMessage } from "./MessageCenterMessage";
import { MessageManager } from "../../../messages/MessageManager";
import { TitleBar } from "../dialog/TitleBar";
import type { NotifyMessageDetailsType } from "../../../messages/ReactNotifyMessageDetails";
import "./MessageCenterField.scss";

/** Message Center Field React component.
 * @public
 */
export function MessageCenterField() {
  const [messages, setMessages] = React.useState(MessageManager.messages);
  const [notify, setNotify] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const indicatorRef = React.createRef<HTMLDivElement>();
  const messageCount = React.useRef(messages.length);
  MessageManager.registerAnimateOutToElement(indicatorRef.current);

  const title = UiFramework.translate("messageCenter.messages");

  const handleOpenChange = (isOpenState: boolean) => {
    setNotify("");
    setIsOpen(isOpenState);
  };

  const isProblemStatus = (message: NotifyMessageDetailsType): boolean => {
    // See priority values in DgnPlatform defined in NotificationManager
    return (
      message.priority === OutputMessagePriority.Error ||
      message.priority === OutputMessagePriority.Fatal
    );
  };

  const notifyStatus = messages.some((msg) => isProblemStatus(msg))
    ? "negative"
    : "primary";

  React.useEffect(() => {
    return MessageManager.onMessagesUpdatedEvent.addListener(() => {
      setNotify(notifyStatus);
      setMessages(MessageManager.messages);
    });
  });

  const getMessages = (tab: string) => {
    return [...messages].reverse().map((message, index) => {
      if (messages.length > 0) {
        const iconClassName = MessageManager.getIconClassName(message);
        const iconSpec = MessageManager.getIconSpecFromDetails(message);
        const text: MessageType = message.briefMessage;
        if ((tab === "error" && isProblemStatus(message)) || tab === "all") {
          return (
            <MessageCenterMessage
              key={index.toString()}
              message={text}
              details={message.detailedMessage}
              icon={<Icon iconSpec={iconSpec} className={iconClassName} />}
            />
          );
        }
        // these returns are a work around to avoid 'Not all paths return a value error"
        return <></>;
      } else {
        return (
          <span className="nz-message-prompt" key={`${index.toString()}`}>
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
            <div className={"nz-footer-messageCenter-dialog"}>
              {getMessages(tabType)}
            </div>
          </Tabs.Panel>
        );
      })}
    </>
  );

  return (
    <Popover
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
        onClick={() => handleOpenChange(!isOpen)}
        styleType="borderless"
        labelProps={
          <span>
            `${messages.length} ${title}`
          </span>
        }
        startIcon={
          !notify ? ( //  Notification Marker doesn't accept a "none" argument so this is a workaround to render it conditionally
            <SvgChat />
          ) : (
            <NotificationMarker status={notifyStatus}>
              <SvgChat />
            </NotificationMarker>
          )
        }
      >
        <div ref={indicatorRef} className="nz-indicator">
          {title}
        </div>
      </Button>
    </Popover>
  );
}
