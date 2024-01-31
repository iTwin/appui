/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonProps } from "@itwin/core-react";
import * as React from "react";
import { TitleBarButton } from "../../layout/footer/dialog/Button";

/** Properties of [[StatusBarDialogTitleBarButton]] component.
 * @beta
 */
export interface StatusBarDialogTitleBarButtonProps extends CommonProps {
  /** Button content. */
  children?: React.ReactNode;
  /** Function called when button is clicked. */
  onClick?: () => void;
  /** Button title. */
  title?: string;
}

/** Dialog component used in a [[StatusBarDialog]] component.
 * @beta
 */
export function StatusBarDialogTitleBarButton(
  props: StatusBarDialogTitleBarButtonProps
) {
  return <TitleBarButton {...props} />;
}
