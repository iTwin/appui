/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "./UiFramework";

interface UseTranslationResult {
  translate: (key: string) => string;
}

/**
 * Returns a translation function.
 * @internal
 */
export function useTranslation(): UseTranslationResult {
  const translate = (key: string) => {
    return UiFramework.translate(key);
  };

  return { translate };
}
