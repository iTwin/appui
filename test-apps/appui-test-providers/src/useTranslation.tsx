/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { AppUiTestProviders } from "./AppUiTestProviders";

interface UseTranslationResult {
  translate: (key: string) => string;
}

/**
 * Returns a translation function.
 * @internal
 */
export function useTranslation(): UseTranslationResult {
  const translate = React.useCallback((key: string) => {
    return AppUiTestProviders.translate(key);
  }, []);

  return { translate };
}
