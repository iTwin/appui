import * as React from "react";
import { Icon } from "@stratakit/foundations";

/**
 * Info SVG Icon component from stratakit.
 */
export default function SvgInfo() {
  const info = new URL("@stratakit/icons/info.svg", import.meta.url).href;
  return <Icon href={info} size="large" fill="informational" />;
}
