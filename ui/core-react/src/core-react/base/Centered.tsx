/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import type { CommonDivProps } from "../utils/Props.js";
import { Div } from "./Div.js";

/** Centered React functional component.
 * Displays content centered vertically and horizontally.
 * @public
 * @deprecated in 4.12.0. Use CSS to style an element or {@link https://itwinui.bentley.com/docs/flex iTwinUI Flex} instead, i.e. `<Flex justifyContent="center" />`.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function Centered(props: CommonDivProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <Div {...props} mainClassName="uicore-centered" />;
}
