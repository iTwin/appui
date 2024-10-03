/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import { withOnOutsideClick } from "../hocs/withOnOutsideClick.js";
import type { CommonDivProps } from "../utils/Props.js";
import type { useOnOutsideClick } from "../utils/hooks/useOnOutsideClick.js";

/** Div element with Outside Click behavior
 * @public
 * @deprecated in 4.12.0. Use props of a basic component, like {@link https://itwinui.bentley.com/docs/popover iTwinUI popover `closeOnOutsideClick`} or {@link useOnOutsideClick} hook.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DivWithOutsideClick = withOnOutsideClick(
  (props: CommonDivProps) => <div {...props} /> // eslint-disable-line @typescript-eslint/no-deprecated
);
