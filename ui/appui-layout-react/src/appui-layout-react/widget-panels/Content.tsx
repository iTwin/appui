/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./Content.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";

/** Properties of [[WidgetPanelsContentProps]] component.
 * @internal
 */
export interface WidgetPanelsContentProps extends CommonProps {
  children?: React.ReactNode;
  pinnedLeft?: boolean;
  pinnedRight?: boolean;
  pinnedTop?: boolean;
  pinnedBottom?: boolean;
}

/** Component that displays widget panels content.
 * @internal
 */
export const WidgetPanelsContent = React.forwardRef<
  HTMLDivElement,
  WidgetPanelsContentProps
>(function WidgetPanelsContent(props, ref) {
  const className = classnames(
    "nz-widgetPanels-content",
    props.pinnedLeft && "nz-pinned-left",
    props.pinnedRight && "nz-pinned-right",
    props.pinnedTop && "nz-pinned-top",
    props.pinnedBottom && "nz-pinned-bottom",
    props.className
  );
  return (
    <div className={className} ref={ref} style={props.style}>
      {props.children}
    </div>
  );
});
