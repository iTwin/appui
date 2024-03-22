/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { IModelApp } from "@itwin/core-frontend";

interface UseTranslationResult {
  translate: (key: string) => string;
}

/**
 * Returns a translation function.
 * @internal
 */
export function useTranslation(): UseTranslationResult {
  const translate = (key: string) => {
    return TestAppLocalization.translate(key);
  };

  return { translate };
}

/** Provides static localization for standalone test-app.
 * @internal
 */
export class TestAppLocalization {
  public static readonly localizationNamespace = "SampleApp";

  /** convenience method for getting localized strings from keys */
  public static translate(key: string) {
    return IModelApp.localization.getLocalizedString(
      `${TestAppLocalization.localizationNamespace}:${key}`
    );
  }
}
