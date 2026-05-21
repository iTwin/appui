/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { ToolbarComposer } from "../toolbar/ToolbarComposer.js";
import { BottomToolWidgetComposer } from "./BottomToolWidgetComposer.js";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem.js";

/**
 * BottomViewToolWidgetComposer composes a bottom-right navigation tool widget populated by
 * UiItemsProviders using the `BottomViewNavigation` usage.
 * @public
 */
export function BottomViewToolWidgetComposer() {
  return (
    <BottomToolWidgetComposer
      horizontalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.BottomViewNavigation}
          orientation={ToolbarOrientation.Horizontal}
        />
      }
      verticalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.BottomViewNavigation}
          orientation={ToolbarOrientation.Vertical}
        />
      }
    />
  );
}
