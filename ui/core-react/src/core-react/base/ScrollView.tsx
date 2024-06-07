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

/** Scroll View React functional component.
 * Scrolls content vertically and
 * has the 'overflow-y: auto' CSS property and has a height and width of 100%.
 * @public
 * @deprecated in 4.12.x. Use {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow overflow property} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function ScrollView(props: CommonDivProps) {
  // eslint-disable-next-line deprecation/deprecation
  return <Div {...props} mainClassName="uicore-scrollview" />;
}
