/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { PopupProps } from "@itwin/core-react";
import { FooterPopup } from "@itwin/appui-layout-react";

/** Popup component used in [[StatusBar]] component.
 * @beta
 */
export function StatusBarPopup(props: Partial<PopupProps>) {
  return (
    <FooterPopup
      {...props}
    />
  );
}
