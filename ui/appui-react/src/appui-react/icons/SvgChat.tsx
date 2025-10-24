/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";

/**
 * Chat SVG Icon component from stratakit.
 */
export default function SvgChat() {
  const chat = new URL("@stratakit/icons/chat.svg", import.meta.url).href;
  return <Icon href={chat} />;
}
