/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Notification */

import * as React from "react";

import { NotifyMessageDetails, OutputMessagePriority } from "@bentley/imodeljs-frontend";

import "../configurableui/configurableui.scss";

import UiFramework from "../UiFramework";

import { StatusBarFieldId, IStatusBar } from "../widgets/StatusBarWidgetControl";
import { MessageManager } from "../messages/MessageManager";

import { MessageCenterIndicator, MessageCenterTab, MessageCenterMessage, MessageCenter, MessageCenterButton } from "@bentley/ui-ninezone";

/** Properties for the [[MessageCenterField]] React component */
export interface MessageCenterProps {
  statusBar: IStatusBar;
  isInFooterMode: boolean;
  openWidget: StatusBarFieldId;
}

/** Enum for the [[MessageCenterField]] active tab */
export enum MessageCenterActiveTab {
  AllMessages,
  Problems,
}

/** State for the [[MessageCenterField]] React component */
export interface MessageCenterState {
  activeTab: MessageCenterActiveTab;
}

/** Message Center Field React component.
 */
export class MessageCenterField extends React.Component<MessageCenterProps, MessageCenterState> {
  private _className: string;
  private _element: any;

  public readonly state: Readonly<MessageCenterState> = {
    activeTab: MessageCenterActiveTab.AllMessages,
  };

  constructor(p: MessageCenterProps) {
    super(p);

    const instance = this.constructor;
    this._className = instance.name;
  }

  public render(): React.ReactNode {
    const messageCount = MessageManager.messages.length;
    const footerMessages = (
      <MessageCenterIndicator
        ref={(element: any) => { this._element = element; }}
        label={UiFramework.i18n.translate("UiFramework:messageCenter.messages")}
        isLabelVisible={this.props.isInFooterMode}
        balloonLabel={messageCount.toString()}
        onClick={this._handleMessageIndicatorClick}
        dialog={
          this.props.openWidget !== this._className ? undefined :
            <MessageCenter
              title={UiFramework.i18n.translate("UiFramework:messageCenter.messages")}
              buttons={
                <>
                  <MessageCenterButton>
                    <i className={"icon icon-export"} />
                  </MessageCenterButton>
                  <MessageCenterButton onClick={this._handleCloseMessageIndicatorClick}>
                    <i className={"icon icon-close"} />
                  </MessageCenterButton>
                </>
              }
              tabs={
                <>
                  <MessageCenterTab
                    isOpen={this.state.activeTab === MessageCenterActiveTab.AllMessages}
                    onClick={() => this._changeActiveTab(MessageCenterActiveTab.AllMessages)}
                  >
                    {UiFramework.i18n.translate("UiFramework:messageCenter.all")}
                  </MessageCenterTab>
                  <MessageCenterTab
                    isOpen={this.state.activeTab === MessageCenterActiveTab.Problems}
                    onClick={() => this._changeActiveTab(MessageCenterActiveTab.Problems)}
                  >
                    {UiFramework.i18n.translate("UiFramework:messageCenter.problems")}
                  </MessageCenterTab>
                </>
              }
              messages={this.getMessages()}
              prompt={UiFramework.i18n.translate("UiFramework:messageCenter.prompt")}
            />
        }
      />
    );

    this.props.statusBar.setFooterMessages(this._element);

    return footerMessages;
  }

  private _handleMessageIndicatorClick = () => {
    const isOpen = this.props.openWidget === this._className;
    if (isOpen)
      this.setOpenWidget(null);
    else
      this.setOpenWidget(this._className);
  }

  private _handleCloseMessageIndicatorClick = () => {
    this.setOpenWidget(null);
  }

  private _changeActiveTab = (tab: MessageCenterActiveTab) => {
    this.setState((_prevState) => {
      return {
        activeTab: tab,
      };
    });
  }

  private getMessages(): React.ReactChild[] {
    const messages = MessageManager.messages.slice(0).reverse();
    const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

    messages.forEach((details: NotifyMessageDetails, index: number) => {
      /* istanbul ignore else */
      if (this.state.activeTab === MessageCenterActiveTab.AllMessages || this.isProblemStatus(details.priority)) {

        const iconClassName = MessageManager.getIconClassName(details);

        let message = details.briefMessage;
        /* istanbul ignore else */
        if (details.detailedMessage)
          message = message + "<br><br>" + details.detailedMessage;

        tabRows.push(
          <MessageCenterMessage
            key={index.toString()}
            icon={<i className={iconClassName} />}
            content={<span dangerouslySetInnerHTML={{ __html: message }} />}
          />,
        );
      }
    });

    return tabRows;
  }

  private isProblemStatus(priority: OutputMessagePriority): boolean {
    // See priority values in DgnPlatform defined in NotificationManager

    if (priority === OutputMessagePriority.Error || priority === OutputMessagePriority.Fatal)
      return true;

    return false;
  }

  private setOpenWidget(openWidget: StatusBarFieldId) {
    this.props.statusBar.setOpenWidget(openWidget);
  }

}
