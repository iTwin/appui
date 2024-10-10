/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal
 * If `true`, the accudraw input field will not have colors for the X, Y, Z axis. Defaults to `false`.
 */
export function useEnableColorlessAccuDrawInputFields() {
  const { enableColorlessAccuDrawInputFields } = usePreviewFeatures();
  return enableColorlessAccuDrawInputFields;
}
