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
import { ActionButton } from "../widget-action-dropdown/Button";
import { WidgetIdContext } from "../../layout/widget/Widget";
import { MaximizedWidgetContext } from "./MaximizedWidget";
import { usePreviewFeatures } from "../PreviewFeatures";
import { useFloatingWidgetId } from "../../layout/widget/FloatingWidget";
import { usePanelWidgetId } from "../../layout/widget/usePanelWidgetId";

/** @internal */
export function MaximizeToggle() {
  const widgetId = React.useContext(WidgetIdContext);
  const { maximizedWidget, setMaximizedWidget } = React.useContext(
    MaximizedWidgetContext
  );

  const { id, title, iconSpec } =
    maximizedWidget === widgetId
      ? {
          id: undefined,
          title: "Restore",
          iconSpec: <SvgWindowMinimize />,
        }
      : {
          id: widgetId,
          title: "Maximize",
          iconSpec: <SvgWindowMaximize />,
        };

  return (
    <ActionButton
      icon={iconSpec}
      title={title}
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
