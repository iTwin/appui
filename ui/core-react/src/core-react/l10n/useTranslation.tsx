/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as defaults from "../UiCore.json";
import * as React from "react";
import { UiCore } from "../UiCore";
import { usePackageTranslation } from "./usePackageTranslation";

/** Returns a translation function to localize package components.
 * @internal
 */
export function useTranslation() {
  const fallback = React.useCallback((key: string) => {
    if (!UiCore.initialized) {
      return undefined;
    }

    return UiCore.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiCore.localizationNamespace,
    fallback,
    defaults,
  });
}
