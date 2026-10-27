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
 * BottomContentToolWidgetComposer composes a bottom-left Tool Widget with no tools defined by default.
 * UiItemsProviders are used to populate the toolbars by providing items with
 * `ToolbarUsage.BottomContentManipulation`.
 * @public
 */
export function BottomContentToolWidgetComposer() {
  return (
    <BottomToolWidgetComposer
      horizontalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.BottomContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
        />
      }
      verticalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.BottomContentManipulation}
          orientation={ToolbarOrientation.Vertical}
        />
      }
    />
  );
}
