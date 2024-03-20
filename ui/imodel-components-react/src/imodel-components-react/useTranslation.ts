/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { UiIModelComponents } from "./UiIModelComponents";

interface UseTranslationResult {
  translate: (key: string) => string;
}

/**
 * Returns a translation function.
 * @internal
 */
export function useTranslation(): UseTranslationResult {
  const translate = (key: string) => {
    return UiIModelComponents.translate(key);
  };

  return { translate };
}
