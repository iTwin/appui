/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./Popup.scss";
import * as React from "react";
import classnames from "classnames";
import type { PopupProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";
import { RelativePosition } from "@itwin/appui-abstract";
import { StatusBarPopover } from "./StatusBarPopover.js";

/** Popup component used in [[StatusBar]] component.
 * @beta
 * @deprecated in 4.13.0. Use {@link StatusBarPopover} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function StatusBarPopup(props: Partial<PopupProps>) {
  const { className, offset, ...other } = props;

  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    <Popup
      className={classnames("nz-status-bar-popup", className)}
      position={RelativePosition.Top}
      showShadow={true}
      {...other}
      showArrow={false}
    />
  );
}
