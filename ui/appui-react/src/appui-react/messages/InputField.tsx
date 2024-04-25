/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./InputField.scss";
import classnames from "classnames";
import * as React from "react";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { RelativePosition } from "@itwin/appui-abstract";
import { Icon, MessageRenderer, Popup } from "@itwin/core-react";
import type { InputFieldMessageEventArgs } from "../messages/MessageManager";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageType } from "./ReactNotifyMessageDetails";
import {
  SvgClose,
  SvgInfoCircularHollow,
  SvgStatusError,
  SvgStatusWarning,
} from "@itwin/itwinui-icons-react";

/** Properties of [[InputFieldMessage]] component.
 * @public
 */
interface InputFieldMessageProps {
  showCloseButton?: boolean;
}

/** [[InputFieldMessage]] state.
 * @internal
 */
interface InputFieldMessageState {
  isVisible: boolean;
  priority: OutputMessagePriority;
  message: NotifyMessageType;
  detailedMessage?: NotifyMessageType;
  inputFieldElement?: HTMLElement;
  showCloseButton?: boolean;
}

/** InputField message pops up near pointer when attempting an invalid interaction.
 * @public
 */
export class InputFieldMessage extends React.PureComponent<
  InputFieldMessageProps,
  InputFieldMessageState
> {
  public override readonly state: Readonly<InputFieldMessageState> = {
    message: "",
    isVisible: false,
    priority: OutputMessagePriority.None,
    showCloseButton: !!this.props.showCloseButton,
  };

  public override render(): React.ReactNode {
    const {
      isVisible,
      inputFieldElement,
      message,
      priority,
      detailedMessage,
      showCloseButton,
    } = this.state;

    if (!inputFieldElement || !message) {
      return null;
    }

    let iconComponent = <SvgInfoCircularHollow />;
    switch (priority) {
      case OutputMessagePriority.Warning:
        iconComponent = <SvgStatusWarning />;
        break;
      case OutputMessagePriority.Error:
        iconComponent = <SvgStatusError />;
        break;
      case OutputMessagePriority.Info:
        iconComponent = <SvgInfoCircularHollow />;
        break;
    }

    return (
      <Popup
        isOpen={isVisible}
        position={RelativePosition.BottomLeft}
        onClose={this._onInputMessageClose}
        target={inputFieldElement}
      >
        <div className="uifw-popup-message-inputField">
          <div className="uifw-popup-message-inputField-content">
            <div className="uifw-popup-message-inputField-primary">
              {iconComponent && (
                <span className="uifw-popup-message-icon">
                  {" "}
                  <i className={classnames("icon", "core-svg-icon")}>
                    {iconComponent}
                  </i>{" "}
                </span>
              )}
              <span className="uifw-popup-message-text">
                <MessageRenderer
                  className="uifw-popup-message-brief"
                  message={message}
                />
                {detailedMessage && (
                  <MessageRenderer
                    className="uifw-popup-message-detailed"
                    message={detailedMessage}
                  />
                )}
              </span>
            </div>
          </div>
          {showCloseButton && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              className="uifw-popup-message-close"
              onClick={this._onInputMessageClose}
              role="button"
              tabIndex={-1}
            >
              <Icon iconSpec={<SvgClose />} />
            </div>
          )}
        </div>
      </Popup>
    );
  }

  public override componentDidMount(): void {
    MessageManager.onInputFieldMessageAddedEvent.addListener(
      this._handleInputFieldMessageAddedEvent
    );
    MessageManager.onInputFieldMessageRemovedEvent.addListener(
      this._handleInputFieldMessageRemovedEvent
    );
  }

  public override componentWillUnmount(): void {
    MessageManager.onInputFieldMessageAddedEvent.removeListener(
      this._handleInputFieldMessageAddedEvent
    );
    MessageManager.onInputFieldMessageRemovedEvent.removeListener(
      this._handleInputFieldMessageRemovedEvent
    );
  }

  private _onInputMessageClose = () => {
    this.setState({ isVisible: false });
  };

  private _handleInputFieldMessageAddedEvent = (
    args: InputFieldMessageEventArgs // eslint-disable-line deprecation/deprecation
  ) => {
    this.setState({
      inputFieldElement: args.target as HTMLElement,
      message: args.messageText,
      isVisible: true,
      priority: args.priority,
      detailedMessage: args.detailedMessage,
    });
  };

  private _handleInputFieldMessageRemovedEvent = () => {
    this.setState({ isVisible: false });
  };
}
