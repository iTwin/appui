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

/** Styled muted/gray text React functional component
 * @public
 * @deprecated in 4.0.0. Use \<Text isMuted /\> from iTwinUI-react package.
 */
// eslint-disable-next-line deprecation/deprecation
export function MutedText(props: TextProps) {
  // eslint-disable-next-line deprecation/deprecation
  return <StyledText {...props} mainClassName="uicore-text-muted" />;
}
