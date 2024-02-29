/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Footer
 */

import "./Popup.scss";
import classnames from "classnames";
import * as React from "react";
import { RelativePosition } from "@itwin/appui-abstract";
import type { PopupProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";

/** Popup component used in [[Footer]] component.
 * @note Use `popup` prop of [StatusBarIndicator]($appui-react) instead
 * @internal
 */
export function FooterPopup(props: Partial<PopupProps>) {
  const { className, showArrow, ...other } = props;
  return (
    <Popup
      className={classnames("nz-footer-popup", className)}
      position={RelativePosition.Top}
      showArrow={showArrow ?? true}
      showShadow={true}
      {...other}
    />
  );
}
