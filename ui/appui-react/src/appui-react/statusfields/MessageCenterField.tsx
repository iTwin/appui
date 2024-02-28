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
import { UiFramework } from "../UiFramework";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { MessageCenterMessage } from "../layout/footer/message-center/Message";
import { MessageManager } from "../messages/MessageManager";
import { TitleBar } from "../layout/footer/dialog/TitleBar";
import type { NotifyMessageDetailsType } from "../messages/ReactNotifyMessageDetails";
import "../layout/footer/message-center/Dialog.scss";

/** Message Center Field React component.
 * @public
 */
export const MessageCenterField: React.FC = () => {
  const [messages, setMessages] = React.useState(MessageManager.messages);
  const [notify, setNotify] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const indicator = React.createRef<HTMLDivElement>();
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

  const notifyStatus = () =>
    messages.some((msg) => isProblemStatus(msg)) ? "negative" : "primary";

  const handleMessagesUpdatedEvent = () => {
    // istanbul ignore else
    setNotify(notifyStatus());
    setMessages(MessageManager.messages);
  };

  React.useEffect(() => {
    MessageManager.onMessagesUpdatedEvent.addListener(
      handleMessagesUpdatedEvent
    );
    MessageManager.registerAnimateOutToElement(indicator.current);

    return () => {
      MessageManager.onMessagesUpdatedEvent.removeListener(
        handleMessagesUpdatedEvent
      );
    };
  });

  const getMessages = (tab: string): React.JSX.Element[] => {
    console.log(messages);
    return [...messages]
      .reverse()
      .map((details: NotifyMessageDetailsType, index: number) => {
        /* istanbul ignore else */
        if (messages.length > 0) {
          const iconClassName = MessageManager.getIconClassName(details);
          const iconSpec = MessageManager.getIconSpecFromDetails(details);
          const message: MessageType = details.briefMessage;
          /* istanbul ignore else */
          if ((tab === "error" && isProblemStatus(details)) || tab === "all") {
            return (
              <MessageCenterMessage
                key={index.toString()}
                message={message}
                details={details.detailedMessage}
                icon={<Icon iconSpec={iconSpec} className={iconClassName} />}
              />
            );
          }
          // these returns are a work around to avoid 'Not all paths return a value error"
          return <></>;
        } else {
          return (
            <span className="nz-message-prompt" key={`${details.briefMessage}`}>
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

          <Tabs.Wrapper type="pill" role="tablist">
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
            <NotificationMarker status={notifyStatus()}>
              <SvgChat />
            </NotificationMarker>
          )
        }
      >
        <div // eslint-disable-line jsx-a11y/click-events-have-key-events
          ref={indicator}
          role="button"
          tabIndex={-1}
        >
          {title !== undefined && <span className="nz-label">{title}</span>}
        </div>
      </Button>
    </Popover>
  );
};
