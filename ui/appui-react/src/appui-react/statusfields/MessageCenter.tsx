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
import { MessageCenter } from "../layout/footer/message-center/Indicator";
import { MessageCenterMessage } from "../layout/footer/message-center/Message";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageDetailsType } from "../messages/ReactNotifyMessageDetails";
import { Popover } from "@itwin/itwinui-react";

/** Message Center Field React component.
 * @public
 */
export const MessageCenterField: React.FC = () => {
  const indicator = React.createRef<HTMLDivElement>();
  const [messageCount, setMessageCount] = React.useState(
    MessageManager.messages.length
  );
  const title = UiFramework.translate("messageCenter.messages");
  const tooltip = `${messageCount} ${title}`;
  const divStyle = { height: "100%" };

  const [isOpen, setIsOpen] = React.useState(false);
  // ADD STATE FOR MESSSAGES OR MAYVE MAKE MESSAGE COUNT A STATE THAT GETS UPDATED SOMEHOW

  const handleOpenChange = (isOpenState: boolean) => setIsOpen(isOpenState);

  const handleMessagesUpdatedEvent = () => {
    // istanbul ignore else
    setMessageCount(MessageManager.messages.length);
    console.log(messageCount);
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

  const isProblemStatus = (priority: OutputMessagePriority): boolean => {
    // See priority values in DgnPlatform defined in NotificationManager

    if (
      priority === OutputMessagePriority.Error ||
      priority === OutputMessagePriority.Fatal
    )
      return true;

    return false;
  };

  const getMessages = (): React.ReactChild[] => {
    const messages = MessageManager.messages.slice(0).reverse();
    const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

    messages.forEach((details: NotifyMessageDetailsType, index: number) => {
      /* istanbul ignore else */
      if (
        // one of these is always true and therefore obsolete.
        // How would errors be handled anyways?
        messages.length > 0 ||
        isProblemStatus(details.priority)
      ) {
        const iconClassName = MessageManager.getIconClassName(details);
        const iconSpec = MessageManager.getIconSpecFromDetails(details);
        const message = details.briefMessage;
        console.log(details);

        // THIS COULD BE BETTER. FIGURE OUT WHAT IT"S DOING and HOW AND MAE IT BETTER
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
        <Tabs.Panel value="all" key="all">
          {getMessages()}
        </Tabs.Panel>
        <Tabs.Panel value="error" key="error">
          {getMessages()}
        </Tabs.Panel>
      </Tabs.Wrapper>
    </MessageCenterDialog>
  );

  return (
    <Popover content={messageCenterContent} applyBackground>
      <div style={divStyle} title={tooltip}>
        <MessageCenter
          indicatorRef={indicator}
          label={title}
          onClick={() => handleOpenChange(!isOpen)} // ADD A PROP BELOW THIS TO MAKE IT RESPONSIVE
        >
          {messageCount.toString()}
        </MessageCenter>
      </div>
    </Popover>
  );
};
