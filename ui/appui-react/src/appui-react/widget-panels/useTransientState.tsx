/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { assert } from "@itwin/core-bentley";
import * as React from "react";
import {
  TabIdContext,
  useTabTransientState,
} from "../layout/widget/ContentRenderer.js";

/** Hook that allows to save and restore transient DOM state (i.e. scroll offset) of a widget.
 * @public
 */
export function useTransientState(onSave?: () => void, onRestore?: () => void) {
  const tabId = React.useContext(TabIdContext);
  assert(!!tabId);
  return useTabTransientState(tabId, onSave, onRestore);
}
