/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { UiIModelComponents } from "./UiIModelComponents";

interface Localization {
  translate: (key: string) => string;
}

/**
 * Returns a localization object.
 * @internal
 */
export function useTranslation(): Localization {
  const translate = (key: string) => {
    return UiIModelComponents.translate(key);
  };

  return { translate };
}
