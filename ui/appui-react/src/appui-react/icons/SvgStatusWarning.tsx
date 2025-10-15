import * as React from "react";
import { Icon } from "@stratakit/foundations";

/**
 * Warning SVG Icon component from stratakit.
 */
export default function SvgStatusWarning() {
  const info = new URL("@stratakit/icons/status-warning.svg", import.meta.url)
    .href;
  return <Icon href={info} size="large" fill="warning" />;
}
