/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as defaults from "./UiIModelComponents.json";
import * as React from "react";
import { usePackageTranslation } from "@itwin/core-react/internal";
import { UiIModelComponents } from "./UiIModelComponents.js";

/** Returns a translation function.
 * @internal
 */
export function useTranslation() {
  const fallback = React.useCallback((key: string) => {
    if (!UiIModelComponents.initialized) {
      return undefined;
    }
    return UiIModelComponents.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiIModelComponents.localizationNamespace,
    fallback,
    defaults,
  });
}
