/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import * as React from "react";
import classnames from "classnames";
import { MessageRenderer } from "@itwin/core-react";
import type { NotifyMessageType } from "./ReactNotifyMessageDetails";

/** Message String/Label
 * @internal
 */
export function MessageLabel(props: {
  message: NotifyMessageType;
  className: string;
}) {
  const classNames = classnames(
    "uifw-statusbar-message-label",
    props.className
  );
  return <MessageRenderer className={classNames} message={props.message} />;
}
