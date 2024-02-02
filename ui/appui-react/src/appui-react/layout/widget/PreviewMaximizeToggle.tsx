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
import { useFloatingWidgetId } from "./FloatingWidget";
import { Button } from "@itwin/itwinui-react";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab";

/** Maximized widget preview feature state.
 * @internal
 */
export function usePreviewMaximizedWidget() {
  return React.useContext(MaximizedWidgetContext);
}

/** Properties of [[PreviewMaximizedWidgetFeatureProvider]] component.
 * @internal
 */
export interface PreviewMaximizedWidgetFeatureProviderProps {
  enabled?: boolean;
  children?: React.ReactNode;
}

interface MaximizedWidgetState {
  enabled: boolean | undefined;
  maximizedWidget: string | undefined;
  setMaximizedWidget: (id: string | undefined) => void;
}

/** Context containing configuration and state for preview maximized widget feature. */
const MaximizedWidgetContext = React.createContext<MaximizedWidgetState>({
  enabled: false,
  maximizedWidget: undefined,
  setMaximizedWidget: () => {},
});

/** Preview maximized widget feature provider.
 * @internal
 */
export function PreviewMaximizedWidgetFeatureProvider({
  enabled,
  children,
}: PreviewMaximizedWidgetFeatureProviderProps) {
  const [maximizedWidget, setMaximizedWidget] = React.useState<
    string | undefined
  >(undefined);
  return (
    <MaximizedWidgetContext.Provider
      value={{ enabled, maximizedWidget, setMaximizedWidget }}
    >
      {children}
    </MaximizedWidgetContext.Provider>
  );
}

/** @internal */
export function PreviewMaximizeToggle() {
  const { maximizedWidget, setMaximizedWidget } = usePreviewMaximizedWidget();
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
    <Button
      styleType="borderless"
      size="small"
      onClick={() => {
        setMaximizedWidget(id);
      }}
      title={title}
    >
      {iconSpec}
    </Button>
  );
}

/** @internal */
export function useMaximizeToggle() {
  const { enabled } = usePreviewMaximizedWidget();
  const isToolSettings = useIsToolSettingsTab();
  const floatingWidgetId = useFloatingWidgetId();

  return !!(enabled && !isToolSettings && floatingWidgetId);
}
