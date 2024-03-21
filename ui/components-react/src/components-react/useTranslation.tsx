/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as localizationDefaults from "./UiComponents.json";
import * as React from "react";
import { useLocalization } from "@itwin/core-react";
import { defaultNamespace, UiComponents } from "./UiComponents";

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
      if (UiComponents.initialized) {
        return UiComponents.translate(key);
      }
      const defaultValue = getDefaultValue(key);
      return defaultValue ?? key;
    },
    [localization]
  );
  return { translate };
}
