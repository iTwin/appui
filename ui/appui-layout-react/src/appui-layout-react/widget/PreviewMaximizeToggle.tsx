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
import { useFloatingWidgetId } from "./FloatingWidget";
import { create } from "zustand";

/** Maximized widget preview feature state.
 * @internal */
// istanbul ignore next (preview)
export const usePreviewMaximizedWidgetStore = create<{
  maximizedWidget: string | undefined;
  setMaximizedWidget: (id: string | undefined) => void;
}>((set) => ({
  maximizedWidget: undefined,
  setMaximizedWidget: (id) => set({ maximizedWidget: id }),
}));

/** @internal */
// istanbul ignore next (preview)
export function PreviewMaximizeToggle() {
  const { maximizedWidget, setMaximizedWidget } =
    usePreviewMaximizedWidgetStore();

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
    <button
      // Reusing for simplification
      className="nz-widget-popoutToggle"
      onClick={() => {
        setMaximizedWidget(id);
      }}
      title={title}
    >
      <Icon iconSpec={iconSpec} />
    </button>
  );
}
