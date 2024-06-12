/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import type * as React from "react";

/** Props used by components that expect class name to be passed in.
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export interface ClassNameProps {
  /** Custom CSS class name */
  className?: string;
}

/** Common props used by components.
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
// eslint-disable-next-line deprecation/deprecation
export interface CommonProps extends ClassNameProps {
  /** Custom CSS style properties */
  style?: React.CSSProperties;
  /** Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id */
  itemId?: string;
}

/** Common properties using a div element.
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export interface CommonDivProps
  extends React.AllHTMLAttributes<HTMLDivElement>,
    CommonProps {} // eslint-disable-line deprecation/deprecation

/** Props used by components that do not expect children to be passed in.
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export interface NoChildrenProps {
  children?: undefined;
}

/** Omit children property from T.
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export type OmitChildrenProp<T extends { children?: React.ReactNode }> = Omit<
  T,
  "children"
>;
