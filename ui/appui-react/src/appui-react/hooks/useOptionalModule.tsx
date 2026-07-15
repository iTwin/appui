/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

/** Dynamically imports a module. Useful for optional dependencies that may not be installed in the project.
 * @internal
 */
export function useOptionalModule<T>(importFunc: () => Promise<T>) {
  const [module, setModule] = React.useState<T | undefined>(undefined);
  React.useEffect(() => {
    let disposed = false;
    void (async () => {
      try {
        const imported = await importFunc();
        if (!disposed) setModule(imported);
      } catch {
        if (!disposed) setModule(undefined);
      }
    })();
    return () => {
      disposed = true;
    };
  }, [importFunc]);

  return module;
}
