/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal */
export function useWidgetTabActions() {
  const { widgetTabActions } = usePreviewFeatures();
  return !!widgetTabActions;
}

/** @internal */
export function useWidgetTabCloseAction() {
  const { widgetTabActions } = usePreviewFeatures();
  const { controlWidgetVisibility } = usePreviewFeatures();
  return widgetTabActions && controlWidgetVisibility;
}
