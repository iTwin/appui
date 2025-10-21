/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

import * as React from "react";
import { MessageRenderer } from "./MessageRenderer.js";
import { Text } from "@stratakit/bricks";
import "./MessageCenterMessage.scss";

/** Message types that can be used in stratakit version of [[MessageCenterMessage]].
 * @internal
 */
export type MessageType = string | HTMLElement | React.ReactNode;

/** Properties of [[MessageCenterMessage]] component.
 * @internal
 */
export interface MessageCenterMessageProps {
  message?: MessageType;
  icon?: React.ReactNode;
  details?: MessageType;
  className?: string;
  style?: object;
}

/** Message entry in [[MessageCenter]] component.
 * @internal
 */
export function MessageCenterMessage(props: MessageCenterMessageProps) {
  const { icon, message, details, style, className } = props;

  return (
    <div
      className={"uifw-statusFields-messageCenter-messageCenterMessage"}
      style={style}
    >
      {icon}
      {message && (
        <span className="uifw-content">
          <MessageRenderer message={message} className={className} inline />.
          {details && (
            <Text variant="body-sm">
              <MessageRenderer message={details} />
            </Text>
          )}
        </span>
      )}
    </div>
  );
}
