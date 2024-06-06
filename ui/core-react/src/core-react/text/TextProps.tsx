/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Text
 */

import type * as React from "react";
import type { CommonProps } from "../utils/Props";

/** Properties for various text components
 * @public
 * @deprecated in 4.12.0. Props of deprecated text components.
 */
export interface TextProps
  extends React.AllHTMLAttributes<HTMLSpanElement>,
    CommonProps {}
