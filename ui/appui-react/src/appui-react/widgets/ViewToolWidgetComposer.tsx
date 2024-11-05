/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import classnames from "classnames";
import * as React from "react";
import { ToolbarComposer } from "../toolbar/ToolbarComposer.js";
import { useUiVisibility } from "../hooks/useUiVisibility.js";
import { NavigationWidgetComposer } from "./NavigationWidgetComposer.js";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem.js";

/**
 * Props for [[ViewToolWidgetComposer]].
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof ViewToolWidgetComposer>`
 */
export interface ViewToolWidgetComposerProps {
  /** If true no navigation aid will be shown. Defaults to `false`. */
  hideNavigationAid?: boolean;
  /** Overrides the default navigation aid. */
  navigationAid?: React.ReactNode;
}

/**
 * ViewToolWidgetComposer composes a Navigation Widget with no tools defined by default. UiItemsProviders
 * must be used to provide tools to populate the toolbars. See [[StandardNavigationToolsProvider]].
 * @example
 * ```
 * <ViewToolWidgetComposer />
 * ```
 * If no NavigationAid control is to be shown set hideNavigationAid.
 *  * ```
 * <ViewToolWidgetComposer hideNavigationAid />
 * ```
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function ViewToolWidgetComposer(props: ViewToolWidgetComposerProps) {
  const uiIsVisible = useUiVisibility();
  const className = classnames(!uiIsVisible && "nz-hidden");

  return (
    <NavigationWidgetComposer
      className={className}
      hideNavigationAid={props.hideNavigationAid}
      navigationAidHost={props.navigationAid}
      horizontalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.ViewNavigation}
          orientation={ToolbarOrientation.Horizontal}
        />
      }
      verticalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.ViewNavigation}
          orientation={ToolbarOrientation.Vertical}
        />
      }
    />
  );
}
