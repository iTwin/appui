import * as React from "react";
import { Icon } from "@stratakit/foundations";

/**
 * Info SVG Icon component from stratakit.
 */
export default function SvgInfo({ fill }: { fill?: string }) {
  const info = new URL("@stratakit/icons/svgInfo.svg", import.meta.url).href;
  return <Icon href={info} fill={fill} />;
}
