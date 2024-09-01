/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

interface IsTabDraggedContextType {
  isDragged: boolean;
  setIsDragged: (isDragged: boolean) => void;
}

/** @internal */
export const IsTabDraggedContext = React.createContext<
  IsTabDraggedContextType | undefined
>(undefined);
