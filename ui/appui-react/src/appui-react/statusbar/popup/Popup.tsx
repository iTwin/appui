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

/** Popup component used in [[StatusBar]] component.
 * @beta
 */
export function StatusBarPopup(props: Partial<PopupProps>) {
  const { className, offset, ...other } = props;

  // Even though StatusBarPopup has no arrow, we want the gap
  // between popup and field component to be the same as with arrow.
  // Note that this should be removed if showArrow is set to true.
  const arrowOffset = 6;
  return (
    <Popup
      className={classnames("nz-status-bar-popup", className)}
      position={RelativePosition.Top}
      showShadow={true}
      {...other}
      showArrow={false}
      offset={
        offset
          ? offset + arrowOffset
          : Popup.defaultProps.offset
          ? Popup.defaultProps.offset + arrowOffset
          : arrowOffset
      }
    />
  );
}
