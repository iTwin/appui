/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import { isPromiseLike } from "@bentley/ui-core";
import { PropertyValueRendererContext } from "../../ValueRendererManager";

const internalWithContextStyle = (node: React.ReactNode, context?: PropertyValueRendererContext) => {
  if (!context || !context.style)
    return node;
  return (<span style={context.style}>{node}</span>);
};

/** Wraps a React component with a span element with a given style attribute
 * @public
 */
export const withContextStyle = (value: React.ReactNode | Promise<React.ReactNode>, context?: PropertyValueRendererContext) => {
  if (isPromiseLike(value))
    return value.then((v) => internalWithContextStyle(v, context));
  return internalWithContextStyle(value, context);
};
