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

/** Full height & width and centered React functional component.
 * Displays content centered vertically and horizontally and has a height and width of 100%.
 * @public
 * @deprecated in 4.12.0. Use CSS to style an element or {@link https://itwinui.bentley.com/docs/flex iTwinUI Flex} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FillCentered(props: CommonDivProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <Div {...props} mainClassName="uicore-fill-centered" />;
}
