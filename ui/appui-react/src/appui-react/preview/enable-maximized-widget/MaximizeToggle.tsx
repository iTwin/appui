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
import { useMaximizedWidget } from "./MaximizedWidget";
import { ActionButton } from "../widget-action-dropdown/Button";
import { useIsToolSettingsTab } from "../../layout/widget/useIsToolSettingsTab";
import { useFloatingWidgetId } from "../../layout/widget/FloatingWidget";

/** @internal */
export function MaximizeToggle() {
  const { maximizedWidget, setMaximizedWidget } = useMaximizedWidget();
  const floatingWidgetId = useFloatingWidgetId();

  const { id, title, iconSpec } =
    maximizedWidget === floatingWidgetId
      ? {
          id: undefined,
          title: "Restore",
          iconSpec: <SvgWindowMinimize />,
        }
      : {
          id: floatingWidgetId,
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
  const { enabled } = useMaximizedWidget();
  const isToolSettings = useIsToolSettingsTab();
  const floatingWidgetId = useFloatingWidgetId();

  return !!(enabled && !isToolSettings && floatingWidgetId);
}
