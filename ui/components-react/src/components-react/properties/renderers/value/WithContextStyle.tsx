/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { PropertyValueRendererContext } from "../../ValueRendererManager.js";

/** Wraps a React component with a span element with a given style attribute
 * @public
 */
export const withContextStyle = (
  node: React.ReactNode,
  context?: PropertyValueRendererContext
): React.ReactNode => {
  if (!context || !context.style) return node;
  return <span style={context.style}>{node}</span>;
};
