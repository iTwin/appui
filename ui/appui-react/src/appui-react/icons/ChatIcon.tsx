import * as React from "react";
import { Icon as StratakitIcon } from '@stratakit/foundations';

/**
 * Chat SVG Icon component from stratakit.
 */
export default function SvgChat() {
  const chat = new URL("@stratakit/icons/chat.svg", import.meta.url).href;
  return <StratakitIcon href={chat} />;
}
