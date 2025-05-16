/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { usePreviewFeatures } from "../PreviewFeatures.js";

/**  If `true`, tool settings will use editors based on the new editors system.
 * @internal
 */
export function useToolSettingsNewEditors() {
  const { toolSettingsNewEditors } = usePreviewFeatures();
  return toolSettingsNewEditors;
}
