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

/** Flex Wrap Container React functional component.
 * Wraps content onto multiple lines and
 * has the 'display: flex' and 'flex-wrap: wrap' CSS properties.
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/flex iTwinUI Flex} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FlexWrapContainer(props: CommonDivProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <Div {...props} mainClassName="uicore-flex-wrap-container" />;
}
