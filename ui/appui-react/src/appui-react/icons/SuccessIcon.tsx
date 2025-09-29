import * as React from "react";
import { Icon } from '@stratakit/foundations';

/**
 * Cursor SVG Icon component from stratakit.
 */
export default function SvgSuccess() {
  const success = new URL("@stratakit/icons/status-success.svg", import.meta.url).href;
  return <Icon href={success} />;
}
