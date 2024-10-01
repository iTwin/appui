/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Text
 */
import * as React from "react";
import { StyledText } from "./StyledText.js";
import type { TextProps } from "./TextProps.js";

/* eslint-disable deprecation/deprecation */

/** Styled disabled text React functional component
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.
 */
export function DisabledText(props: TextProps) {
  return <StyledText {...props} mainClassName="uicore-text-disabled" />;
}
