/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./useHorizontalPanelAlignment.scss";
import * as React from "react";
import { HorizontalPanelAlignContext } from "./PreviewHorizontalPanelAlign";
import type { PanelSide } from "../../layout/widget-panels/PanelTypes";

/** @internal */
export function useHorizontalPanelAlignment(side: PanelSide) {
  const { enabled, alignments } = React.useContext(HorizontalPanelAlignContext);

  return enabled
    ? {
        attributes: {
          "data-preview-horizontal-panel-align-top": alignments.top,
          "data-preview-horizontal-panel-align-bottom": alignments.bottom,
        },
        classNames: {
          [`uifw-preview-horizontalPanelAlignment_${side}`]: true,
        },
      }
    : {};
}
