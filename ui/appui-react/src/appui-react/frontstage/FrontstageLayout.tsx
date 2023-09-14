/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { WidgetPanelsFrontstage } from "../widget-panels/Frontstage";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { isCustomFrontstageConfig } from "../frontstage/FrontstageConfig";
import { defaultLayout, LayoutContext } from "../layout/Layout";

/** @internal */
export function FrontstageLayout() {
  const frontstageDef = useActiveFrontstageDef();
  const config = frontstageDef?.initialConfig;
  if (config && isCustomFrontstageConfig(config)) {
    return (
      <LayoutContext.Provider value={config.layout ?? defaultLayout}>
        {config.content}
      </LayoutContext.Provider>
    );
  }
  return <WidgetPanelsFrontstage />;
}
