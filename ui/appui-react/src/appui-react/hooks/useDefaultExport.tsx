/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useOptionalModule } from "./useOptionalModule.js";

/**
 * Dynamically imports a module and returns the default export.
 * Useful for optional dependencies that may not be installed in the project.
 */
export function useDefaultExport<T extends { default: unknown }>(
  importFunc: () => Promise<T>
): T["default"] | undefined {
  const module = useOptionalModule(importFunc);
  return module?.default;
}
