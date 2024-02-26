/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import { OutputMessagePriority } from "@itwin/core-frontend";
import { Tabs } from "@itwin/itwinui-react";
import * as React from "react";
import { Icon, MessageRenderer } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import { MessageCenterDialog } from "../layout/footer/message-center/Dialog";
// import { MessageCenter } from "../layout/footer/message-center/Indicator";
import { MessageCenterMessage } from "../layout/footer/message-center/Message";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageDetailsType } from "../messages/ReactNotifyMessageDetails";
import { Popover } from "@itwin/itwinui-react";
import "../layout/footer/Indicator.scss";
import classnames from "classnames";
// import type { FooterIndicatorProps } from "../Indicator";
import { FooterIndicator } from "../layout/footer/Indicator";
import { SvgChat } from "@itwin/itwinui-icons-react";
import { NotificationMarker } from "@itwin/itwinui-react";

/** Message Center Field React component.
 * @public
 */
export const MessageCenterField: React.FC = () => {
  const indicator = React.createRef<HTMLDivElement>();
  const [messages, setMessages] = React.useState(MessageManager.messages);
  const [notify, setNotify] = React.useState("none");
  const title = UiFramework.translate("messageCenter.messages");
  const tooltip = `${messages.length} ${title}`;
  const divStyle = { height: "100%" };

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (isOpenState: boolean) => setIsOpen(isOpenState);

  const handleMessagesUpdatedEvent = () => {
    // istanbul ignore else
    setNotify(notifyStatus);
    setMessages(MessageManager.messages);
  };

  const handleOpenMessageCenterEvent = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    MessageManager.onMessagesUpdatedEvent.addListener(
      handleMessagesUpdatedEvent
    );
    MessageManager.onOpenMessageCenterEvent.addListener(
      handleOpenMessageCenterEvent
    );
    MessageManager.registerAnimateOutToElement(indicator.current);
  });

  // /** @internal */
  // public override componentWillUnmount() {
  //   // istanbul ignore else
  //   if (this._unloadMessagesUpdatedHandler) {
  //     this._unloadMessagesUpdatedHandler();
  //     this._unloadMessagesUpdatedHandler = undefined;
  //   }
  //   // istanbul ignore else
  //   if (this._removeOpenMessagesCenterHandler) {
  //     this._removeOpenMessagesCenterHandler();
  //     this._removeOpenMessagesCenterHandler = undefined;
  //   }
  // }

  const isProblemStatus = (): boolean => {
    // See priority values in DgnPlatform defined in NotificationManager
    return messages.some(
      (message) =>
        message.priority === OutputMessagePriority.Error ||
        message.priority === OutputMessagePriority.Fatal
    );
  };

  const getMessages = (tab: string): React.ReactChild[] => {
    const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

    messages
      .slice(0)
      .reverse()
      .forEach((details: NotifyMessageDetailsType, index: number) => {
        /* istanbul ignore else */
        if (messages.length > 0 || isProblemStatus()) {
          const iconClassName = MessageManager.getIconClassName(details);
          const iconSpec = MessageManager.getIconSpecFromDetails(details);
          const message = details.briefMessage;

          // THIS COULD BE BETTER. FIGURE OUT WHAT IT"S DOING and HOW AND MAE IT BETTER
          if ((tab === "error" && details.msgType > 3) || tab === "all") {
            tabRows.push(
              <MessageCenterMessage
                key={index.toString()}
                icon={<Icon iconSpec={iconSpec} className={iconClassName} />}
              >
                <MessageRenderer message={message} useSpan />
                {details.detailedMessage && (
                  <Text variant="small">
                    <MessageRenderer message={details.detailedMessage} />
                  </Text>
                )}
              </MessageCenterMessage>
            );
          }
        } else {
          tabRows.push(<span>nothing to see here!</span>);
        }
      });

    return tabRows;
  };

  const messageCenterContent = (
    <MessageCenterDialog
      prompt={UiFramework.translate("messageCenter.prompt")}
      title={title}
    >
      <Tabs.Wrapper type="pill">
        <Tabs.TabList>
          <Tabs.Tab label="All" key="all" value="all" />
          <Tabs.Tab label="Error" key="error" value="error" />
        </Tabs.TabList>
        {["all", "error"].map((tabType) => {
          return (
            <Tabs.Panel value={tabType} key={tabType}>
              {getMessages(tabType)}
            </Tabs.Panel>
          );
        })}
      </Tabs.Wrapper>
    </MessageCenterDialog>
  );

  const notifyStatus = () => {
    return isProblemStatus()
      ? "negative"
      : messages.length > 0
      ? "primary"
      : "white";
  };

  // return (
  //   <FooterIndicator
  //     className={classnames("nz-footer-messageCenter-indicator")}
  //   >
  //     <div // eslint-disable-line jsx-a11y/click-events-have-key-events
  //       className="nz-indicator"
  //       onClick={() => handleOpenChange(!isOpen)}
  //       ref={indicator}
  //       role="button"
  //       tabIndex={-1}
  //     >
  //       {setNotification()}
  //       {title !== undefined && <span className="nz-label">{title}</span>}
  //       <div className="nz-container">
  //         <div className="nz-target" />
  //       </div>
  //     </div>
  //   </FooterIndicator>
  // );

  return (
    <Popover content={messageCenterContent} applyBackground>
      <div style={divStyle} title={tooltip}>
        <FooterIndicator
          className={classnames("nz-footer-messageCenter-indicator")}
        >
          <div // eslint-disable-line jsx-a11y/click-events-have-key-events
            className="nz-indicator"
            onClick={() => handleOpenChange(!isOpen)}
            ref={indicator}
            role="button"
            tabIndex={-1}
          >
            <NotificationMarker status={notifyStatus()}>
              <SvgChat />
            </NotificationMarker>
            {title !== undefined && <span className="nz-label">{title}</span>}
            <div className="nz-container">
              <div className="nz-target" />
            </div>
          </div>
        </FooterIndicator>
      </div>
    </Popover>
  );
};
