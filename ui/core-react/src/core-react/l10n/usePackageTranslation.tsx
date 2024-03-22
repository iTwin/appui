/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useLocalization } from "./LocalizationProvider";

/** Used by AppUI packages internally to define package specific `useTranslation` hook.
 * Uses a localization provider to translate the provided key with a specified namespace. Multiple fallback layers are used to resolve the translation:
 * - Return value of a specified `fallback` function.
 * - Default value looked up from a specified `defaults` object.
 * - Lastly `key` argument of the translation function is returned.
 * @internal
 */
export function usePackageTranslation({
  namespace,
  fallback,
  defaults,
}: {
  namespace: string;
  fallback: (key: string) => string | undefined;
  defaults: object;
}) {
  const localization = useLocalization();
  const [registered, setRegistered] = React.useState(false);
  React.useEffect(() => {
    if (!localization) return;

    let ignore = false;
    setRegistered(false);
    void (async () => {
      await localization.registerNamespace(namespace);
      if (ignore) return;
      setRegistered(true);
    })();
    return () => {
      ignore = true;
    };
  }, [localization, namespace]);
  const translate = React.useCallback(
    (key: string) => {
      if (localization && registered) {
        // TODO: might flicker even if the localization is registered?
        return localization.getLocalizedString(`${namespace}:${key}`);
      }

      const fallbackTranslation = fallback(key);
      if (fallbackTranslation !== undefined) {
        return fallbackTranslation;
      }

      const defaultValue = getDefaultValue(defaults, key);
      return defaultValue ?? key;
    },
    [localization, namespace, fallback, defaults, registered]
  );
  return { translate };
}

function getDefaultValue(defaults: object, propertyKey: string) {
  const keys = propertyKey.split(".");
  let prop: any = defaults;
  for (const key of keys) {
    if (!(key in prop)) {
      prop = undefined;
      break;
    }
    prop = prop[key];
  }
  if (typeof prop !== "string") {
    return undefined;
  }
  return prop;
}
