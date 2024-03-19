/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { AppUiTestProviders } from "./AppUiTestProviders";

interface Localization {
  translate: (key: string) => string;
}

/**
 * Returns a localization object.
 * @internal
 */
export function useTranslation(): Localization {
  const translate = (key: string) => {
    return AppUiTestProviders.translate(key);
  };

  return { translate };
}
