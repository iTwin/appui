/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

import "./Message.scss";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { MessageType } from "@itwin/core-react";
import { MessageRenderer } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";

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
export const MessageCenterMessage: React.FC<MessageCenterMessageProps> = (
  props
) => {
  const { icon, message, details, style } = props;

  return (
    <div className={"nz-footer-messageCenter-message"} style={style}>
      {icon && <div className="nz-icon">{icon}</div>}
      {message && (
        <div className="nz-content">
          <MessageRenderer message={message} useSpan />
          {details && (
            <Text variant="small">
              <MessageRenderer message={details} />
            </Text>
          )}
        </div>
      )}
    </div>
  );
};
