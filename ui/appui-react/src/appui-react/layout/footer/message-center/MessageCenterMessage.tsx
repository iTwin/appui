/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

import "./Message.scss";
import * as React from "react";
import type { CommonProps, MessageType } from "@itwin/core-react";
import { MessageRenderer } from "@itwin/core-react";
import { Icon, Text } from "@itwin/itwinui-react";

/** Properties of [[MessageCenterMessage]] component.
 * @internal
 */
export interface MessageCenterMessageProps extends CommonProps {
  /** Message content. */
  message?: MessageType;
  /** Message icon. */
  icon?: React.ReactNode;
  /** Additional Details */
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
    <div className={"nz-footer-messageCenter-message"} style={style}>
      {icon && <Icon size="small">{icon}</Icon>}
      {message && (
        <div className="nz-content">
          <MessageRenderer message={message} className={className} useSpan />
          {details && (
            <Text variant="small">
              <MessageRenderer message={details} />
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
