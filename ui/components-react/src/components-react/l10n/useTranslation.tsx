/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as defaults from "../UiComponents.json";
import * as React from "react";
import { usePackageTranslation } from "@itwin/core-react/internal";
import { UiComponents } from "../UiComponents.js";

/** Returns a translation function.
 * @internal
 */
export function useTranslation() {
  const fallback = React.useCallback((key: string) => {
    if (!UiComponents.initialized) {
      return undefined;
    }
    return UiComponents.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiComponents.localizationNamespace,
    fallback,
    defaults,
  });
}
