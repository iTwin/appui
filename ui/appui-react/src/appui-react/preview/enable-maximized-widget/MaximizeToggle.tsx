/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import {
  SvgWindowMaximize,
  SvgWindowMinimize,
} from "@itwin/itwinui-icons-react";
import { WidgetAction } from "../../layout/widget/WidgetAction.js";
import { WidgetIdContext } from "../../layout/widget/Widget.js";
import { MaximizedWidgetContext } from "./MaximizedWidget.js";
import { usePreviewFeatures } from "../PreviewFeatures.js";
import { useFloatingWidgetId } from "../../layout/widget/FloatingWidget.js";
import { usePanelWidgetId } from "../../layout/widget/usePanelWidgetId.js";

/** @internal */
export function MaximizeToggle() {
  const widgetId = React.useContext(WidgetIdContext);
  const { maximizedWidget, setMaximizedWidget } = React.useContext(
    MaximizedWidgetContext
  );

  const { id, label, iconSpec } =
    maximizedWidget === widgetId
      ? {
          id: undefined,
          label: "Restore",
          iconSpec: <SvgWindowMinimize />,
        }
      : {
          id: widgetId,
          label: "Maximize",
          iconSpec: <SvgWindowMaximize />,
        };

  return (
    <WidgetAction
      icon={iconSpec}
      label={label}
      onClick={() => {
        setMaximizedWidget(id);
      }}
    />
  );
}

/** @internal */
export function useMaximizeToggle() {
  const { enableMaximizedFloatingWidget, enableMaximizedPanelWidget } =
    usePreviewFeatures();
  const floatingWidgetId = useFloatingWidgetId();
  const panelWidgetId = usePanelWidgetId();

  if (enableMaximizedFloatingWidget && floatingWidgetId) return true;
  if (enableMaximizedPanelWidget && panelWidgetId) return true;
  return false;
}
