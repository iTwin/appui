/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Overflow.scss";
import classnames from "classnames";
import * as React from "react";
import { useResizeObserver } from "@bentley/ui-core";
import { Ellipsis } from "../base/Ellipsis";
import { ToolSettingProps } from "./Setting";

/** Properties of [[ToolSettingsOverflow]] component.
 * @internal
 */
export interface DockedToolSettingsOverflowProps extends ToolSettingProps {
  /** Function called when button is clicked. */
  onClick?: () => void;
  /** Function called when button is resized. */
  onResize?: (w: number) => void;
}

/** Entry point to overflown tool settings of [[DockedToolSettings]] component.
 * @internal
 */
export const DockedToolSettingsOverflow = React.memo(function DockedToolSettingsOverflow(props: DockedToolSettingsOverflowProps) { // tslint:disable-line: variable-name no-shadowed-variable
  const ref = useResizeObserver<HTMLDivElement>(props.onResize);
  const className = classnames(
    "nz-toolSettings-overflow",
    props.className,
  );
  return (
    <div
      className={className}
      onClick={props.onClick}
      ref={ref}
      style={props.style}
    >
      <Ellipsis />
    </div>
  );
});
