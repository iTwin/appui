/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { WidgetDef } from "../../widgets/WidgetDef.js";
import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal */
export function useReparentPopoutWidget(id: WidgetDef["id"]) {
  const { reparentPopoutWidgets } = usePreviewFeatures();
  if (reparentPopoutWidgets === true) {
    return true;
  }
  if (
    Array.isArray(reparentPopoutWidgets) &&
    reparentPopoutWidgets.indexOf(id) >= 0
  ) {
    return true;
  }

  return false;
}
