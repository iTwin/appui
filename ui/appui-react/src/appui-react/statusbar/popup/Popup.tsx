/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./Popup.scss";
import classnames from "classnames";
import * as React from "react";
import { RelativePosition } from "@itwin/appui-abstract";
import { Popup, type PopupProps } from "@itwin/core-react";

/** Popup component used in [[StatusBar]] component.
 * @beta
 */
export function StatusBarPopup(props: Partial<PopupProps>) {
  const { className, ...other } = props;
  return (
    <Popup
      className={classnames("nz-status-bar-popup", className)}
      position={RelativePosition.Top}
      showShadow={true}
      {...other}
      showArrow={false}
    />
  );
}
