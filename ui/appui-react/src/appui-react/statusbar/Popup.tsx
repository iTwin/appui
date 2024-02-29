/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { PopupProps } from "@itwin/core-react";
import * as React from "react";
import { FooterPopup } from "../layout/footer/Popup";

/** Popup component used in [[StatusBar]] component.
 * @beta
 */
export function StatusBarPopup(props: Partial<PopupProps>) {
  return <FooterPopup showArrow={false} {...props} />;
}
