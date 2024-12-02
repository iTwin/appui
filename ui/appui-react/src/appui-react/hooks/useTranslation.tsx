/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as defaults from "../UiFramework.json";
import * as React from "react";
import { usePackageTranslation } from "@itwin/core-react/internal";
import { UiFramework } from "../UiFramework.js";
import { IModelApp } from "@itwin/core-frontend";

/** Returns a translation function.
 * @internal
 */
export function useTranslation() {
  const fallback = React.useCallback((key: string) => {
    if (!UiFramework.initialized || !IModelApp.initialized) {
      return undefined;
    }
    return UiFramework.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiFramework.localizationNamespace,
    fallback,
    defaults,
  });
}
