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
import { Popup, PopupProps } from "@itwin/core-react";

/** Popup component used in [[Footer]] component.
 * @internal
 */
export function FooterPopup(props: Partial<PopupProps>) {
  const { className, ...other } = props;
  return (
    <Popup
      className={classnames(
        "nz-footer-popup",
        className,
      )}
      position={RelativePosition.Top}
      showArrow
      showShadow={true}
      {...other}
    />
  );
}
