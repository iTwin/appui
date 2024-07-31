/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

import "./MessageCenterMessage.scss";
import * as React from "react";
import type { CommonProps, MessageType } from "@itwin/core-react";
import { MessageRenderer } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";

/** Properties of [[MessageCenterMessage]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface MessageCenterMessageProps extends CommonProps {
  /** Message content. */
  // eslint-disable-next-line deprecation/deprecation
  message?: MessageType;
  /** Message icon. */
  icon?: React.ReactNode;
  /** Additional Details */
  // eslint-disable-next-line deprecation/deprecation
  details?: MessageType;
  /** className */
  className?: string;
  /** Optional style */
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
          {/* eslint-disable-next-line deprecation/deprecation */}
          <MessageRenderer message={message} className={className} useSpan />
          {details && (
            <Text variant="small">
              {/* eslint-disable-next-line deprecation/deprecation */}
              <MessageRenderer message={details} />
            </Text>
          )}
        </span>
      )}
    </div>
  );
}
