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

/** Styled block text React functional component
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function BlockText(props: TextProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <StyledText {...props} mainClassName="uicore-text-block" />;
}
