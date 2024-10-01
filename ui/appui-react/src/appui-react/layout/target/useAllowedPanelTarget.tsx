/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useAllowedSideTarget } from "./useAllowedSideTarget.js";

/** Check the docking side against allowed regions
 * @internal
 */
export function useAllowedPanelTarget() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);

  return useAllowedSideTarget(side);
}
