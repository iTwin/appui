/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

// Cache of resolved modules
const moduleCache = new WeakMap<object, unknown>();

/** Dynamically imports a module. Useful for optional dependencies that may not be installed in the project.
 * @internal
 */
export function useOptionalModule<T>(importFunc?: () => Promise<T>) {
  const [module, setModule] = React.useState<T | undefined>(() => {
    if (!importFunc) return undefined;
    return moduleCache.get(importFunc) as T | undefined;
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(
    importFunc !== undefined && !module
  );

  React.useEffect(() => {
    if (!importFunc) {
      setModule(undefined);
      setIsLoading(false);
      return;
    }

    const cachedModule = moduleCache.get(importFunc);
    if (cachedModule) {
      setModule(cachedModule as T);
      setIsLoading(false);
      return;
    }

    let disposed = false;
    setIsLoading(true);
    void (async () => {
      try {
        const imported = await importFunc();
        moduleCache.set(importFunc, imported);

        if (!disposed) {
          setModule(imported);
          setIsLoading(false);
        }
      } catch {
        if (!disposed) {
          setModule(undefined);
          setIsLoading(false);
        }
      }
    })();
    return () => {
      disposed = true;
    };
  }, [importFunc]);

  return [module, isLoading] as const;
}
