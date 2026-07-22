/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@stratakit/foundations";
import svgDockBottom from "@stratakit/icons/dock-bottom.svg";
import svgDockLeft from "@stratakit/icons/dock-left.svg";
import svgDockRight from "@stratakit/icons/dock-right.svg";
import svgDockTop from "@stratakit/icons/dock-top.svg";
import { StrataKitSymbol } from "./appui-react/preview/PreviewFeatures.js";

/** @public */
export function enable() {
  const foundations: {
    Icon: typeof Icon;
  } = {
    Icon,
  };
  const modules = {
    foundations,
    icons: {
      svgDockBottom,
      svgDockLeft,
      svgDockRight,
      svgDockTop,
    },
  };
  return {
    [StrataKitSymbol]: modules,
  };
}
