/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

/*

I HAVE A VERY STRONG SUSPICION THAT THIS FILE CAN BE DELETED. WHILE THIS COMPONENT IS REFERENCED EXTENSIVELY
IT:S NOT BEING USED ANYWHERE I CAN SEE.


*/

import "./Indicator.scss";
import classnames from "classnames";
import * as React from "react";
import type { FooterIndicatorProps } from "../Indicator";
import { FooterIndicator } from "../Indicator";
import { SvgChat } from "@itwin/itwinui-icons-react";
import { NotificationMarker } from "@itwin/itwinui-react";
// import { NotifyMessageDetailsType } from "../../../messages/ReactNotifyMessageDetails"

/** Properties of [[MessageCenter]] component.
 * @internal
 */
export interface MessageCenterProps extends FooterIndicatorProps {
  /** Clickable part of the indicator. */
  indicatorRef?: React.Ref<HTMLDivElement>;
  /** Message center label. */
  label?: string;
  /** Function called when indicator is clicked. */
  onClick?: () => void;
  /** Message center dialog target. */
  targetRef?: React.Ref<HTMLDivElement>;
  /** Messages */
  messages: any;
}

/** Message center indicator used in [[Footer]] component.
 * @note Used with [[MessageCenterDialog]] component.
 * @internal
 */
export const MessageCenter: React.FC<MessageCenterProps> = (props) => {
  const { messages, className, indicatorRef, label, onClick, targetRef } =
    props;

  const checkForErrors = () => {
    return messages?.some(
      (message: NotifyMessageDetailsType) => message.msgType > 3
    )
      ? "negative"
      : "primary";
  };

  const setNotification = () => {
    if (messages?.length > 0) {
      return (
        <NotificationMarker status={checkForErrors()}>
          <SvgChat />
        </NotificationMarker>
      );
    } else {
      return <SvgChat />;
    }
  };

  return (
    <FooterIndicator
      className={classnames("nz-footer-messageCenter-indicator", className)}
      {...props}
    >
      <div // eslint-disable-line jsx-a11y/click-events-have-key-events
        className="nz-indicator"
        onClick={onClick}
        ref={indicatorRef}
        role="button"
        tabIndex={-1}
      >
        {setNotification()}
        {label !== undefined && <span className="nz-label">{label}</span>}
        <div className="nz-container" onClick={onClick}>
          <div className="nz-target" ref={targetRef} />
        </div>
      </div>
    </FooterIndicator>
  );
};
