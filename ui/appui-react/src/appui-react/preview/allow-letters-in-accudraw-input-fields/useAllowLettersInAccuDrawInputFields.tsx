/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal
 *  If `true`, the accudraw input field will accept letters. Defaults to `false`.
 */
export function useAllowLettersInAccuDrawInputFields() {
  const { allowLettersInAccuDrawInputFields } = usePreviewFeatures();
  return allowLettersInAccuDrawInputFields;
}
