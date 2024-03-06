/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import * as React from "react";
import { OutputMessagePriority } from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { Icon, MessageRenderer } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import { MessageCenterDialog } from "./message-center/Dialog";
import { MessageCenter } from "./message-center/Indicator";
import { MessageCenterMessage } from "./message-center/Message";
import { MessageCenterTab } from "./message-center/Tab";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageDetailsType } from "../messages/ReactNotifyMessageDetails";
import { StatusBar } from "../statusbar/StatusBar";

/** Enum for the [[MessageCenterField]] active tab
 * @internal
 */
enum MessageCenterActiveTab {
  AllMessages,
  Problems,
}

/** State for the [[MessageCenterField]] React component
 * @internal
 */
interface MessageCenterState {
  activeTab: MessageCenterActiveTab;
  target: HTMLDivElement | null;
  messageCount: number;
  isOpen: boolean;
}

/** Message Center Field React component.
 * @public
 */
export class MessageCenterField extends React.Component<
  CommonProps,
  MessageCenterState
> {
  private _indicator = React.createRef<HTMLDivElement>();
  private _title = UiFramework.translate("messageCenter.messages");
  private _unloadMessagesUpdatedHandler?: () => void;
  private _removeOpenMessagesCenterHandler?: () => void;

  constructor(p: CommonProps) {
    super(p);

    this.state = {
      activeTab: MessageCenterActiveTab.AllMessages,
      target: null,
      messageCount: MessageManager.messages.length,
      isOpen: false,
    };
  }

  /** @internal */
  public override componentDidMount() {
    this._unloadMessagesUpdatedHandler =
      MessageManager.onMessagesUpdatedEvent.addListener(
        this._handleMessagesUpdatedEvent,
        this
      );
    this._removeOpenMessagesCenterHandler =
      MessageManager.onOpenMessageCenterEvent.addListener(
        this._handleOpenMessageCenterEvent,
        this
      );
    MessageManager.registerAnimateOutToElement(this._indicator.current);
  }

  /** @internal */
  public override componentWillUnmount() {
    // istanbul ignore else
    if (this._unloadMessagesUpdatedHandler) {
      this._unloadMessagesUpdatedHandler();
      this._unloadMessagesUpdatedHandler = undefined;
    }
    // istanbul ignore else
    if (this._removeOpenMessagesCenterHandler) {
      this._removeOpenMessagesCenterHandler();
      this._removeOpenMessagesCenterHandler = undefined;
    }
  }

  private _handleMessagesUpdatedEvent = () => {
    // istanbul ignore else
    if (this._unloadMessagesUpdatedHandler)
      this.setState({ messageCount: MessageManager.messages.length });
  };

  private _handleOpenMessageCenterEvent = () => {
    this.setIsOpen(true);
  };

  public override render(): React.ReactNode {
    const tooltip = `${this.state.messageCount} ${this._title}`;
    const divStyle = { ...this.props.style, height: "100%" };
    const footerMessages = (
      <>
        <div ref={this._indicator}>{this.state.messageCount.toString()}</div>
        <StatusBar.Popup isOpen={this.state.isOpen} onClose={this._handleClose}>
          <MessageCenterDialog
            prompt={UiFramework.translate("messageCenter.prompt")}
            tabs={
              <di>
                <MessageCenterTab
                  isActive={
                    this.state.activeTab === MessageCenterActiveTab.AllMessages
                  }
                  onClick={() =>
                    this._changeActiveTab(MessageCenterActiveTab.AllMessages)
                  }
                >
                  {UiFramework.translate("messageCenter.all")}
                </MessageCenterTab>
                <MessageCenterTab
                  isActive={
                    this.state.activeTab === MessageCenterActiveTab.Problems
                  }
                  onClick={() =>
                    this._changeActiveTab(MessageCenterActiveTab.Problems)
                  }
                >
                  {UiFramework.translate("messageCenter.errors")}
                </MessageCenterTab>
              </>
            }
            title={this._title}
          >
            {this.getMessages()}
          </MessageCenterDialog>
        </StatusBar.Popup>
      </>
    );

    return footerMessages;
  }

  private _handleClose = () => {
    this.setIsOpen(false);
  };



  private _changeActiveTab = (tab: MessageCenterActiveTab) => {
    this.setState({ activeTab: tab });
  };

  private getMessages(): React.ReactChild[] {
    const messages = MessageManager.messages.slice(0).reverse();
    const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

    messages.forEach((details: NotifyMessageDetailsType, index: number) => {
      /* istanbul ignore else */
      if (
        this.state.activeTab === MessageCenterActiveTab.AllMessages ||
        this.isProblemStatus(details.priority)
      ) {
        const iconClassName = MessageManager.getIconClassName(details);
        const iconSpec = MessageManager.getIconSpecFromDetails(details);
        const message = details.briefMessage;

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
    });

    return tabRows;
  }

  private isProblemStatus(priority: OutputMessagePriority): boolean {
    // See priority values in DgnPlatform defined in NotificationManager

    if (
      priority === OutputMessagePriority.Error ||
      priority === OutputMessagePriority.Fatal
    )
      return true;

    return false;
  }

  private setIsOpen(isOpen: boolean) {
    this.setState({ isOpen });
  }
}
