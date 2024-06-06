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

/** Flex Wrap Container React functional component.
 * Wraps content onto multiple lines and
 * has the 'display: flex' and 'flex-wrap: wrap' CSS properties.
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/flex iTwinUI Flex} instead.
 */
export function FlexWrapContainer(props: CommonDivProps) {
  // eslint-disable-next-line deprecation/deprecation
  return <Div {...props} mainClassName="uicore-flex-wrap-container" />;
}
