/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { TabState } from "../../layout/state/TabState.js";
import { useControlWidgetVisibility } from "../control-widget-visibility/CloseWidgetButton.js";
import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal */
export function useWidgetTabActions() {
  const { widgetTabActions } = usePreviewFeatures();
  return !!widgetTabActions;
}

/** @internal */
export function useWidgetTabCloseAction(tabId: TabState["id"]) {
  const { widgetTabActions } = usePreviewFeatures();
  const controlWidgetVisibility = useControlWidgetVisibility(tabId);
  return !!widgetTabActions && !!controlWidgetVisibility;
}
