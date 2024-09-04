/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

// TODO: add support for panels and sections
/** @internal */
export type DraggedOverTargets = "widget" | "tab";

interface WidgetDraggedOverContextType {
  target: DraggedOverTargets | undefined;
  setTarget: (target: DraggedOverTargets | undefined) => void;
}

/** @internal */
export const WidgetDraggedOverContext = React.createContext<
  WidgetDraggedOverContextType | undefined
>(undefined);
