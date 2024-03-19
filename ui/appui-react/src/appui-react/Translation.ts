/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "./UiFramework";

interface Localization {
  translate: (key: string) => string;
}

/**
 * Returns a localization object.
 * @internal
 */
export function useTranslation(): Localization {
  const translate = (key: string) => {
    return UiFramework.translate(key);
  };

  return { translate };
}
