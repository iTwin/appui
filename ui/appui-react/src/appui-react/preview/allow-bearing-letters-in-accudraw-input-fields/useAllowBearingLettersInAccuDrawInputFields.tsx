/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { usePreviewFeatures } from "../PreviewFeatures.js";

/**  If `true`, the accudraw input field will accept letters for bearing angles `N, S, E, W`. Defaults to `false`.
 * @internal
 */
export function useAllowBearingLettersInAccuDrawInputFields() {
  const { allowBearingLettersInAccuDrawInputFields } = usePreviewFeatures();
  return allowBearingLettersInAccuDrawInputFields;
}
