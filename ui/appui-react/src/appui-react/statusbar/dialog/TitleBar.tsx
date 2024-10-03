/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonProps } from "@itwin/core-react";
import * as React from "react";
import { TitleBar } from "../../layout/footer/dialog/TitleBar.js";

/** Properties of [[StatusBarDialogTitleBar]] component.
 * @beta
 */
// eslint-disable-next-line deprecation/deprecation
export interface StatusBarDialogTitleBarProps extends CommonProps {
  /** Title bar buttons. */
  children?: React.ReactNode;
  /** Title bar title. */
  title?: string;
}

/** Dialog component used in a [[StatusBarDialog]] component.
 * @beta
 */
export function StatusBarDialogTitleBar(props: StatusBarDialogTitleBarProps) {
  return <TitleBar {...props} />;
}
