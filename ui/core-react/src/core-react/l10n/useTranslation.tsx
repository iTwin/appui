/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as localizationDefaults from "../UiCore.json";
import * as React from "react";
import { defaultNamespace, UiCore } from "../UiCore";
import { useLocalization } from "./LocalizationProvider";

function getDefaultValue(propertyKey: string) {
  const keys = propertyKey.split(".");
  let prop = localizationDefaults as any;
  for (const key of keys) {
    if (!prop) break;
    prop = prop[key];
  }
  if (typeof prop !== "string") {
    return undefined;
  }
  return prop;
}

/** Returns a translation function.
 * @internal
 */
export function useTranslation() {
  const localization = useLocalization();
  const translate = React.useCallback(
    (key: string) => {
      if (localization) {
        return localization.getLocalizedString(`${defaultNamespace}:${key}`);
      }
      if (UiCore.initialized) {
        return UiCore.translate(key);
      }
      const defaultValue = getDefaultValue(key);
      return defaultValue ?? key;
    },
    [localization]
  );
  return { translate };
}
