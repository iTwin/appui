/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useOptionalModule } from "./useOptionalModule.js";

/**
 * Dynamically imports a module and returns its default export.
 * Useful for optional dependencies that may not be installed in the project.
 * @internal
 */
export function useDefaultExport<T extends { default: unknown }>(
  importFunc?: () => Promise<T>
): [T["default"] | undefined, boolean] {
  const [module, isLoading] = useOptionalModule(importFunc);
  const defaultExport = module?.default;
  return [defaultExport, isLoading];
}
