/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./InputField.scss";
import * as React from "react";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { RelativePosition } from "@itwin/appui-abstract";
import { Icon as CoreIcon, MessageRenderer, Popup } from "@itwin/core-react";
import {
  SvgClose,
  SvgInfoCircularHollow,
  SvgStatusErrorHollow,
  SvgStatusSuccess,
  SvgStatusWarning,
} from "@itwin/itwinui-icons-react";
import { Icon } from "@itwin/itwinui-react";
import type { InputFieldMessageEventArgs } from "../messages/MessageManager";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageType } from "./ReactNotifyMessageDetails";

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
 * @note Use `MessageManager.displayInputFieldMessage()` to open the message.
 * @public
 * @deprecated in 4.16.0. Used internally.
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

    return (
      // eslint-disable-next-line deprecation/deprecation
      <Popup
        isOpen={isVisible}
        position={RelativePosition.BottomLeft}
        onClose={this._onInputMessageClose}
        target={inputFieldElement}
      >
        <div className="uifw-popup-message-inputField">
          <div className="uifw-popup-message-inputField-content">
            <div className="uifw-popup-message-inputField-primary">
              <FieldIcon priority={priority} />
              <span className="uifw-popup-message-text">
                {/* eslint-disable-next-line deprecation/deprecation */}
                <MessageRenderer
                  className="uifw-popup-message-brief"
                  message={message}
                />
                {detailedMessage && (
                  // eslint-disable-next-line deprecation/deprecation
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
              {/* eslint-disable-next-line deprecation/deprecation */}
              <CoreIcon iconSpec={<SvgClose />} />
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

function FieldIcon({ priority }: { priority: OutputMessagePriority }) {
  let svg = <SvgInfoCircularHollow />;
  switch (priority) {
    case OutputMessagePriority.Success:
      svg = <SvgStatusSuccess />;
      break;
    case OutputMessagePriority.Warning:
      svg = <SvgStatusWarning />;
      break;
    case OutputMessagePriority.Fatal:
    case OutputMessagePriority.Error:
      svg = <SvgStatusErrorHollow />;
      break;
  }

  return <Icon>{svg}</Icon>;
}
