/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Text
 */

import * as React from "react";
import { StyledText } from "./StyledText";
import type { TextProps } from "./TextProps";

/** Styled block text React functional component
 * @public
 * @deprecated in 4.12.x. Use {@link https://itwinui.bentley.com/docs/typography#text iTwinUI Text} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function BlockText(props: TextProps) {
  // eslint-disable-next-line deprecation/deprecation
  return <StyledText {...props} mainClassName="uicore-text-block" />;
}
