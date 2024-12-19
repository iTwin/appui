/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { EditorSpec } from "../Types.js";

interface EditorsRegistry {
  editors: EditorSpec[];
}

/**
 * Context for storing registered editors.
 * @internal
 */
export const editorsRegistryContext = React.createContext<EditorsRegistry>({
  editors: [],
});
