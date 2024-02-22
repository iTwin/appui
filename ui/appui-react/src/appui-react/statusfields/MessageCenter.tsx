/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import { OutputMessagePriority } from "@itwin/core-frontend";
import { Tab, Tabs } from "@itwin/itwinui-react";
import { Orientation } from "@itwin/core-react";
import type { CommonProps } from "@itwin/itwinui-react/cjs/core/utils";
import { Icon } from "@itwin/core-react";
import * as React from "react";
import { UiFramework } from "../UiFramework";
import { MessageCenterDialog } from "../layout/footer/message-center/Dialog";
import { MessageCenter } from "../layout/footer/message-center/Indicator";
import { MessageCenterMessage } from "../layout/footer/message-center/Message";
import { MessageManager } from "../messages/MessageManager";
import { MessageDiv, MessageSpan } from "../messages/MessageSpan";
import type { NotifyMessageDetailsType } from "../messages/ReactNotifyMessageDetails";
import { StatusBar } from "../statusbar/StatusBar";
import { useState } from "react";

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

  // export const MessageCenterField : React.FC (props : <CommonProps,
  //   MessageCenterState>)=> {
  //   const {
  //     style,
  //     className,
  //     activeTab,
  //     target,
  //     messageCount,
  //     isOpen,
  //   } = props

  //   const _indicator = React.createRef<HTMLDivElement>();
  //   const _title = UiFramework.translate("messageCenter.messages");
  //   let _unloadMessagesUpdatedHandler?: () => void;
  //   let _removeOpenMessagesCenterHandler?: () => void;

  // const [activeTab, setActiveTab] = useState( MessageCenterActiveTab.AllMessages : MessageCenterActiveTabs);
  // const [target, setTarget] = useState(null)
  // const [messageCount, setMessageCount] = useState(MessageManager.messages.length)
  // const [isOpen, setIsOpen] = useState(false : boolean)

  constructor(p: CommonProps) {
    super(p);

    this.state = {
      activeTab: MessageCenterActiveTab.AllMessages,
      target: null,
      messageCount: MessageManager.messages.length,
      isOpen: false,
    };
  }

  /*

  const componentDidMount = () => {
    _unloadMessagesUpdatedHandler =
      MessageManager.onMessagesUpdatedEvent.addListener(
        this._handleMessagesUpdatedEvent,
        this
      );
    _removeOpenMessagesCenterHandler =
      MessageManager.onOpenMessageCenterEvent.addListener(
        this._handleOpenMessageCenterEvent,
        this
      );
    MessageManager.registerAnimateOutToElement(this._indicator.current);
  }

  */

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

  /*
    const componentWillUnmount = () => {
      // istanbul ignore else
      if (_unloadMessagesUpdatedHandler) {
        _unloadMessagesUpdatedHandler();
        _unloadMessagesUpdatedHandler = undefined;
      }
      // istanbul ignore else
      if (_removeOpenMessagesCenterHandler) {
        _removeOpenMessagesCenterHandler();
        _removeOpenMessagesCenterHandler = undefined;
      }
    }


  */

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

  /*
  const _handleMessagesUpdatedEvent = () => {
    // istanbul ignore else
    if (_unloadMessagesUpdatedHandler)
      setCount({ messageCount: MessageManager.messages.length });
  };
*/

  private _handleMessagesUpdatedEvent = () => {
    // istanbul ignore else
    if (this._unloadMessagesUpdatedHandler)
      this.setState({ messageCount: MessageManager.messages.length });
  };

  /*

  Event Handlers

  const _changeActiveTab = (tab: MessageCenterActiveTab) => {
    setActiveTab(tab);
  };


  const setOpen = (isOpenState : boolean) => {
    setIsOpen(isOpenState)
  }

  const _handleMessageIndicatorClick = () => {
    setIsOpen(!isOpen);
  };

  const _handleOpenMessageCenterEvent = () => {
    setIsOpen(true);
  };

  private _handleClose = () => {
    setIsOpen(false);
};


*/

  private _handleOpenMessageCenterEvent = () => {
    this.setIsOpen(true);
  };

  /*

  should this stay as a render? ot should it just be the return

  const tooltip = `${messageCount} ${_title}`;
  const divStyle = { ...style, height: "100%" };

  return (
      <>
        <div className={className} style={divStyle} title={tooltip}>
          <MessageCenter
            indicatorRef={_indicator}
            label={this._title}
            onClick={_handleMessageIndicatorClick}
          >
            {messageCount.toString()}
          </MessageCenter>
        </div>
        <StatusBar.Popup
          showArrow={false}
          isOpen={isOpen}
          onClose={handleClose}
          onOutsideClick={_handleOutsideClick}
          target={_indicator.current}
        >
          <MessageCenterDialog
            prompt={UiFramework.translate("messageCenter.prompt")}
            title={_title}
          >
            <Tabs
              type="pill"
              labels={[
                <Tab key="All" label="All" />,
                <Tab key="Errors" label="Errors" />,
              ]}
            >
              {"content"}
            </Tabs>
            {getMessages()}
          </MessageCenterDialog>
        </StatusBar.Popup>
      </>
    );



  */

  public override render(): React.ReactNode {
    const tooltip = `${this.state.messageCount} ${this._title}`;
    const divStyle = { ...this.props.style, height: "100%" };
    const footerMessages = (
      <>
        <div className={this.props.className} style={divStyle} title={tooltip}>
          <MessageCenter
            indicatorRef={this._indicator}
            label={this._title}
            onClick={this._handleMessageIndicatorClick}
          >
            {this.state.messageCount.toString()}
          </MessageCenter>
        </div>
        <StatusBar.Popup
          showArrow={false}
          isOpen={this.state.isOpen}
          onClose={this._handleClose}
          onOutsideClick={this._handleOutsideClick}
          target={this._indicator.current}
        >
          <MessageCenterDialog
            prompt={UiFramework.translate("messageCenter.prompt")}
            title={this._title}
          >
            <Tabs
              type="pill"
              labels={[
                <Tab key="All" label="All" />,
                <Tab key="Errors" label="Errors" />,
              ]}
            >
              {"content"}
            </Tabs>
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

  /*
  const _handleOutsideClick = (e: MouseEvent) => {
    if (
      !_indicator.current ||
      !(e.target instanceof Node) ||
      _indicator.current.contains(e.target)
    )
      return;

    _handleClose();
  };

  */

  private _handleOutsideClick = (e: MouseEvent) => {
    if (
      !this._indicator.current ||
      !(e.target instanceof Node) ||
      this._indicator.current.contains(e.target)
    )
      return;

    this._handleClose();
  };

  private _handleMessageIndicatorClick = () => {
    this.setIsOpen(!this.state.isOpen);
  };

  private _changeActiveTab = (tab: MessageCenterActiveTab) => {
    this.setState({ activeTab: tab });
  };

  /*
  const getMessages : React.ReactChild[]  = () => {
    const messages = MessageManager.messages.slice(0).reverse();
    const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

    messages.forEach((details: NotifyMessageDetailsType, index: number) => {
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
            <MessageSpan message={message} />
            {details.detailedMessage && (
              <MessageDiv
                className="iui-text-small"
                message={details.detailedMessage}
              />
            )}
          </MessageCenterMessage>
        );
      }
    });

    return tabRows;
  }
  */

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
            <MessageSpan message={message} />
            {details.detailedMessage && (
              <MessageDiv
                className="iui-text-small"
                message={details.detailedMessage}
              />
            )}
          </MessageCenterMessage>
        );
      }
    });

    return tabRows;
  }

  /*

    const isProblemStatus : boolean = (priority: OutputMessagePriority) => {
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

  */

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
