/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import type { CommonDivProps } from "../utils/Props";
import { Div } from "./Div";

/** Centered React functional component.
 * Displays content centered vertically and horizontally.
 * @public
 * @deprecated in 4.12.x. Use CSS or {@link https://itwinui.bentley.com/docs/flex iTwinUI Flex} instead.
 */
export function Centered(props: CommonDivProps) {
  return <Div {...props} mainClassName="uicore-centered" />;
}
