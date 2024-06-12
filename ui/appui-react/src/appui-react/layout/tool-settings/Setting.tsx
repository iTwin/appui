/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Setting.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { useResizeObserver } from "@itwin/core-react";
import { useToolSettingsEntry } from "./Docked";

/** Properties of [[ToolSetting]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface ToolSettingProps extends CommonProps {
  /** Tool setting content. */
  children?: React.ReactNode;
}

/** Used in a [[DockedToolSettings]] component to display a setting.
 * @internal
 */
export function DockedToolSetting(props: ToolSettingProps) {
  const { onResize } = useToolSettingsEntry();
  const ref = useResizeObserver<HTMLDivElement>(onResize);
  const className = classnames("uifw-toolSettings-setting", props.className);
  return (
    <div className={className} ref={ref} style={props.style}>
      {props.children}
    </div>
  );
}
