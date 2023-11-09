/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./PopoutToggle.scss";
import * as React from "react";
import { Icon } from "@itwin/core-react";
import {
  SvgWindowMaximize,
  SvgWindowMinimize,
} from "@itwin/itwinui-icons-react";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import { useFloatingWidgetId } from "./FloatingWidget";

/** @internal */
// istanbul ignore next (preview)
export function PreviewMaximizeToggle() {
  const {
    enableMaximizedFloatingWidget: previewEnableMaximizedFloatingWidget,
    previewState,
    previewDispatch,
  } = usePreviewFeatures();
  const floatingWidgetId = useFloatingWidgetId();

  const { id, title, iconSpec } =
    previewState.maximizedWidget === floatingWidgetId &&
    previewEnableMaximizedFloatingWidget
      ? {
          id: undefined,
          title: "Minimize",
          iconSpec: <SvgWindowMinimize />,
        }
      : {
          id: floatingWidgetId,
          title: "Maximize",
          iconSpec: <SvgWindowMaximize />,
        };

  return (
    <button
      // Reusing for simplification
      className="nz-widget-popoutToggle"
      onClick={() => {
        previewDispatch({
          type: "SET_MAXIMIZED_WIDGET",
          id,
        });
      }}
      title={title}
    >
      <Icon iconSpec={iconSpec} />
    </button>
  );
}
