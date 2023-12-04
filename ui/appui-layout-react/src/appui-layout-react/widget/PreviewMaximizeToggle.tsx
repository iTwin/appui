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

/** Maximized widget preview feature state.
 * @internal */
// istanbul ignore next (preview)
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
// istanbul ignore next (preview)
const MaximizedWidgetContext = React.createContext<MaximizedWidgetState>({
  enabled: false,
  maximizedWidget: undefined,
  setMaximizedWidget: () => {},
});

/** Preview maximized widget feature provider.
 * @internal
 */
// istanbul ignore next (preview)
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
// istanbul ignore next (preview)
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
