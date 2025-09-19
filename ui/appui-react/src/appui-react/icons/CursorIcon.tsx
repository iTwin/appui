import * as React from "react";
import { Icon as StratakitIcon } from '@stratakit/foundations';

/**
 * Cursor SVG Icon component from stratakit.
 */
export default function SvgCursor() {
  const cursor = new URL("@stratakit/icons/cursor.svg", import.meta.url).href;
  return <StratakitIcon href={cursor} />;
}
